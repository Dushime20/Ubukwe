import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const rawBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://nyurwa-backend.onrender.com').trim();
// Ensure protocol
let baseUrl = rawBaseUrl.startsWith('http') ? rawBaseUrl : `https://${rawBaseUrl}`;
// Clean trailing slashes and redundant /api/v1
const API_BASE_URL = baseUrl.replace(/\/+$/, '').replace(/\/api\/v1$/, '');
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
    UPDATE_PROFILE: `/api/${API_VERSION}/auth/update-profile`,
    GET_ME: `/api/${API_VERSION}/auth/me`,
    REGISTER_TEAM: `/api/${API_VERSION}/auth/register-team`,
  },
  // Admin endpoints
  ADMIN: {
    STATS: `/api/${API_VERSION}/admin/stats`,
    USERS: `/api/${API_VERSION}/admin/users`,
    USER_DETAILS: `/api/${API_VERSION}/admin/users`, // USES /auth/users/:id
    SUSPEND_USER: `/api/${API_VERSION}/admin/users`, // + /:id/suspend
    ACTIVATE_USER: `/api/${API_VERSION}/admin/users`, // + /:id/activate
    PROVIDERS: `/api/${API_VERSION}/admin/providers`,
    PROVIDER_DETAILS: `/api/${API_VERSION}/admin/providers`, // + /:id
    APPROVE_PROVIDER: `/api/${API_VERSION}/admin/providers`, // + /:id/approve
    SUSPEND_PROVIDER: `/api/${API_VERSION}/admin/providers`, // + /:id/suspend
    ACTIVATE_PROVIDER: `/api/${API_VERSION}/admin/providers`, // + /:id/activate
  },
  // Provider endpoints
  PROVIDER: {
    GET_PROFILE: `/api/${API_VERSION}/provider/profile`,
    UPDATE_PROFILE: `/api/${API_VERSION}/provider/profile`,
    ONBOARDING_STATUS: `/api/${API_VERSION}/provider/onboarding/status`,
    UPLOAD_DOCUMENTS: `/api/${API_VERSION}/provider/profile/upload-documents`,
    SERVICES: `/api/${API_VERSION}/provider/services/`,
  },
  // Customer/Wedding endpoints
  WEDDING: {
    BASE: `/api/${API_VERSION}/wedding`,
    ME: `/api/${API_VERSION}/wedding/me`,
    TASKS: `/api/${API_VERSION}/tasks`,
  },
  // Public Service endpoints
  SERVICES: {
    LIST: `/api/${API_VERSION}/provider/services/search/all`,
    DETAILS: (id: string) => `/api/${API_VERSION}/provider/services/${id}`,
    SEARCH: `/api/${API_VERSION}/provider/services/search/all`,
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
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  role?: 'event_owner' | 'service_provider';
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  user?: User;
}

export interface User {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  role: 'admin' | 'event_owner' | 'service_provider';
  is_verified: boolean;
  phone_number?: string;
  profile_image_url?: string;
  onboarding_completed: boolean;
  business_type?: string;
  years_experience?: number;
  business_description?: string;
  service_categories?: string[];
  address?: string;
  city?: string;
  country?: string;
}

// Wedding & Planning Types
export interface Wedding {
  id: string;
  customer_id: string;
  couple_name: string;
  wedding_date: string;
  venue?: string;
  guest_count: number;
  budget: string; // Decimal from backend
  spent: string;  // Decimal from backend
  created_at: string;
  updated_at?: string;
}

export interface WeddingTask {
  id: string;
  wedding_id: string;
  title: string;
  description?: string;
  category?: string;
  is_completed: boolean;
  status: 'pending' | 'completed';
  created_at: string;
  updated_at?: string;
}

// Service Types
export interface ServiceCategory {
  id: string;
  service_name: string;
  service_type: string;
  description?: string;
  is_active: boolean;
}

export interface ProviderService {
  id: string;
  provider_id: string;
  name: string;
  description?: string;
  category: string;
  location?: string;
  price_range_min?: number;
  price_range_max?: number;
  packages?: any;
  gallery?: string[];
  status: 'draft' | 'active';
  rating: number;
  bookings_count: number;
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
      const responseData = error.response?.data;
      
      // Try to extract a meaningful error message
      let errorMessage = 'An unexpected error occurred';
      
      if (responseData) {
        if (typeof responseData === 'string') {
          errorMessage = responseData;
        } else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.detail) {
          // FastAPI and some other backends use 'detail'
          errorMessage = typeof responseData.detail === 'string' 
            ? responseData.detail 
            : JSON.stringify(responseData.detail);
        } else if (responseData.error) {
          errorMessage = responseData.error;
        } else if (responseData.errors) {
          // Handle object-based errors (e.g. {email: ["Already exists"]})
          if (typeof responseData.errors === 'object') {
            const firstErrorKey = Object.keys(responseData.errors)[0];
            const firstErrorVal = responseData.errors[firstErrorKey];
            errorMessage = Array.isArray(firstErrorVal) ? firstErrorVal[0] : firstErrorVal;
          } else {
            errorMessage = responseData.errors;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
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
