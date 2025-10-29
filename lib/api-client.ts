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
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

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
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
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
    return Promise.reject(error);
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
      return axiosInstance.get<PaginatedResponse<any>>('/services', { params });
    },
    getById: async (id: string) => {
      return axiosInstance.get<any>(`/services/${id}`);
    },
    create: async (data: any) => {
      return axiosInstance.post<any>('/services', data);
    },
    update: async (id: string, data: any) => {
      return axiosInstance.put<any>(`/services/${id}`, data);
    },
    delete: async (id: string) => {
      return axiosInstance.delete(`/services/${id}`);
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
      return axiosInstance.get<any>('/users/profile');
    },
    updateProfile: async (data: any) => {
      return axiosInstance.put<any>('/users/profile', data);
    },
    uploadAvatar: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      return axiosInstance.post<any>('/users/upload-avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
  };
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export axios instance for custom requests
export { axiosInstance };

