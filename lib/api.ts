import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const API_VERSION = 'v1';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `/api/${API_VERSION}/auth/register`,
    LOGIN: `/api/${API_VERSION}/auth/login`,
    LOGOUT: `/api/${API_VERSION}/auth/logout`,
    REFRESH_TOKEN: `/api/${API_VERSION}/auth/refresh-token`,
    FORGOT_PASSWORD: `/api/${API_VERSION}/auth/forgot-password`,
    RESET_PASSWORD: `/api/${API_VERSION}/auth/reset-password`,
    CHANGE_PASSWORD: `/api/${API_VERSION}/auth/change-password`,
    GET_PROFILE: `/api/${API_VERSION}/auth/profile`,
    UPDATE_PROFILE: `/api/${API_VERSION}/auth/profile`,
    GET_ME: `/api/${API_VERSION}/auth/me`,
  },
  // Health check
  HEALTH: `/health`,
};

// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
  statusCode?: number;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: 'customer' | 'provider';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  status: 'success';
  message: string;
  data: {
    user: {
      id: string;
      uuid: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      isEmailVerified: boolean;
      profilePicture?: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  profilePicture?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  preferences?: {
    notifications: boolean;
    marketing: boolean;
  };
}

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/signin';
        }
      }
    }

    return Promise.reject(error);
  }
);

// API Client Configuration
export const apiClient = {
  async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Network error');
      }
    }
  },

  get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  },

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  },

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  },

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  },
};
