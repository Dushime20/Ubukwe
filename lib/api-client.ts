/**
 * API Client Structure
 * 
 * This file provides the structure for API integration.
 * Actual API calls will be implemented when backend is ready.
 * 
 * Usage:
 * import { apiClient } from '@/lib/api-client'
 * const data = await apiClient.services.getAll()
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

// API Configuration
const rawBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://nyurwa-backend.onrender.com').trim();
// Ensure protocol
let baseUrl = rawBaseUrl.startsWith('http') ? rawBaseUrl : `https://${rawBaseUrl}`;
// Clean trailing slashes and redundant /api/v1
const API_BASE_URL = baseUrl.replace(/\/+$/, '').replace(/\/api\/v1$/, '');

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - Add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage/sessionStorage when available
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/signin';
      }
    }

    const responseData = error.response?.data;
    
    // Try to extract a meaningful error message
    let errorMessage = 'An unexpected error occurred';
    
    if (responseData) {
      if (typeof responseData === 'string') {
        errorMessage = responseData;
      } else if (typeof responseData === 'object') {
        if ('message' in responseData && typeof responseData.message === 'string') {
          errorMessage = responseData.message;
        } else if ('detail' in responseData) {
          errorMessage = typeof responseData.detail === 'string' 
            ? responseData.detail 
            : JSON.stringify(responseData.detail);
        } else if ('error' in responseData && typeof responseData.error === 'string') {
          errorMessage = responseData.error;
        } else if ('errors' in responseData) {
          if (typeof responseData.errors === 'object' && responseData.errors !== null) {
            const firstErrorKey = Object.keys(responseData.errors)[0];
            if (firstErrorKey) {
              const firstErrorVal = (responseData.errors as Record<string, any>)[firstErrorKey];
              errorMessage = Array.isArray(firstErrorVal) ? firstErrorVal[0] : firstErrorVal;
            }
          } else if (typeof responseData.errors === 'string') {
            errorMessage = responseData.errors;
          }
        }
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Create a new error with the extracted message or modify the existing one
    const enhancedError = new Error(errorMessage);
    // Copy original error properties if needed, e.g., response, request, config
    Object.assign(enhancedError, error);

    return Promise.reject(enhancedError);
  }
);

// Type definitions for API responses
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Client Interface
class ApiClient {
  // Services API
  services = {
    getAll: async (params?: { category?: string; search?: string; page?: number }) => {
      return axiosInstance.get<PaginatedResponse<any>>('/api/v1/provider/services/', { params });
    },
    getById: async (id: string) => {
      return axiosInstance.get<any>(`/api/v1/provider/services/${id}`);
    },
    create: async (data: any) => {
      return axiosInstance.post<any>('/api/v1/provider/services/', data);
    },
    update: async (id: string, data: any) => {
      return axiosInstance.put<any>(`/api/v1/provider/services/${id}`, data);
    },
    delete: async (id: string) => {
      return axiosInstance.delete(`/api/v1/provider/services/${id}`);
    },
  };

  // Bookings API
  bookings = {
    getAll: async () => {
      return axiosInstance.get<any[]>('/bookings');
    },
    getById: async (id: string) => {
      return axiosInstance.get<any>(`/bookings/${id}`);
    },
    create: async (data: any) => {
      return axiosInstance.post<any>('/bookings', data);
    },
    update: async (id: string, data: any) => {
      return axiosInstance.put<any>(`/bookings/${id}`, data);
    },
    cancel: async (id: string) => {
      return axiosInstance.delete(`/bookings/${id}`);
    },
  };

  // Reviews API
  reviews = {
    getByService: async (serviceId: string) => {
      return axiosInstance.get<any[]>(`/reviews/service/${serviceId}`);
    },
    create: async (data: any) => {
      return axiosInstance.post<any>('/reviews', data);
    },
    update: async (id: string, data: any) => {
      return axiosInstance.put<any>(`/reviews/${id}`, data);
    },
    delete: async (id: string) => {
      return axiosInstance.delete(`/reviews/${id}`);
    },
  };

  // User API
  users = {
    getProfile: async () => {
      return axiosInstance.get<any>('/api/v1/auth/profile');
    },
    updateProfile: async (data: any) => {
      return axiosInstance.put<any>('/api/v1/auth/update-profile', data);
    },
    uploadAvatar: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return axiosInstance.post<any>('/api/v1/auth/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  };

  // Provider API
  provider = {
    getOnboardingStatus: async () => {
      return axiosInstance.get<any>('/api/v1/provider/onboarding/status');
    },
    uploadDocuments: async (businessLicense?: File, portfolio?: File[]) => {
      const formData = new FormData();
      if (businessLicense) formData.append('business_license', businessLicense);
      if (portfolio) {
        portfolio.forEach((file) => formData.append('portfolio', file));
      }
      return axiosInstance.post<any>('/api/v1/provider/profile/upload-documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    registerTeam: async (data: any) => {
      return axiosInstance.post<any>('/api/v1/auth/register-team', data);
    },
  };

  // Admin API
  admin = {
    stats: {
      get: async () => {
        return axiosInstance.get<any>('/api/v1/admin/stats');
      },
    },
    users: {
      getAll: async (params?: { page?: number; limit?: number; role?: string; verified?: boolean; search?: string }) => {
        return axiosInstance.get<any>('/api/v1/admin/users', { params });
      },
      getById: async (id: string) => {
        return axiosInstance.get<any>(`/api/v1/auth/users/${id}`);
      },
      update: async (id: string, data: any) => {
        return axiosInstance.put<any>(`/api/v1/admin/users/${id}`, data);
      },
      suspend: async (id: string, reason: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/users/${id}/suspend`, { reason });
      },
      activate: async (id: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/users/${id}/activate`);
      },
      delete: async (id: string) => {
        return axiosInstance.delete(`/api/v1/admin/users/${id}`);
      },
    },
    providers: {
      getAll: async (status?: string) => {
        return axiosInstance.get<any[]>('/api/v1/admin/providers', { params: { status } });
      },
      getPending: async () => {
        return axiosInstance.get<any[]>('/api/v1/admin/providers/pending');
      },
      getDetails: async (id: string) => {
        return axiosInstance.get<any>(`/api/v1/admin/providers/${id}`);
      },
      approve: async (id: string, notes?: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/providers/${id}/approve`, { notes });
      },
      reject: async (id: string, reason: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/providers/${id}/reject`, { reason });
      },
      suspend: async (id: string, reason: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/providers/${id}/suspend`, { reason });
      },
      activate: async (id: string) => {
        return axiosInstance.put<any>(`/api/v1/admin/providers/${id}/activate`);
      },
    }
  };
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export axios instance for custom requests
export { axiosInstance };

