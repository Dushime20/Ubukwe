import { apiClient, API_ENDPOINTS, LoginRequest, RegisterRequest, AuthResponse, User, ApiResponse } from './api';

// Authentication API functions
export const authApi = {
  // Register a new user
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse['data']>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    
    return {
      status: 'success',
      message: response.message,
      data: response.data!,
    };
  },

  // Login user
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse['data']>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    
    return {
      status: 'success',
      message: response.message,
      data: response.data!,
    };
  },

  // Logout user
  async logout(): Promise<ApiResponse> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
  },

  // Refresh access token
  async refreshToken(): Promise<AuthResponse> {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    const response = await apiClient.post<AuthResponse['data']>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );
    
    return {
      status: 'success',
      message: response.message,
      data: response.data!,
    };
  },

  // Get current user profile
  async getMe(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.GET_ME);
  },

  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.GET_PROFILE);
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>(API_ENDPOINTS.AUTH.UPDATE_PROFILE, data);
  },

  // Change password
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse> {
    return apiClient.put(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  // Reset password
  async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<ApiResponse> {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },
};

// Token management utilities
export const tokenManager = {
  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
  },

  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  },

  getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refreshToken');
  },

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};

// User management utilities
export const userManager = {
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  clearUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  },

  updateUser(updates: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.setUser(updatedUser);
    }
  },
};
