'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, tokenManager, userManager } from '../lib/auth';
import { LoginRequest, RegisterRequest, User } from '../lib/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

// Custom hook for authentication state
export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // Get current user
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      if (!tokenManager.isAuthenticated()) {
        return null;
      }
      
      try {
        const response = await authApi.getMe();
        return response.data;
      } catch (error) {
        // If token is invalid, clear auth data
        tokenManager.clearTokens();
        userManager.clearUser();
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const isAuthenticated = !!user && tokenManager.isAuthenticated();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data.data;
      
      // Store tokens and user data
      tokenManager.setTokens(accessToken, refreshToken);
      userManager.setUser(user);
      
      // Update query cache
      queryClient.setQueryData(authKeys.user(), user);
      
      toast.success('Login successful!');
      
      // Redirect to customer dashboard after login
      router.push('/customer/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      const { user, accessToken, refreshToken } = data.data;
      
      // Store tokens and user data
      tokenManager.setTokens(accessToken, refreshToken);
      userManager.setUser(user);
      
      // Update query cache
      queryClient.setQueryData(authKeys.user(), user);
      
      toast.success('Registration successful!');
      
      // Redirect to login page after registration
      router.push('/auth/signin');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear auth data
      tokenManager.clearTokens();
      userManager.clearUser();
      
      // Clear query cache
      queryClient.clear();
      
      toast.success('Logged out successfully');
      router.push('/auth/signin');
    },
    onError: (error: Error) => {
      // Even if logout fails on server, clear local data
      tokenManager.clearTokens();
      userManager.clearUser();
      queryClient.clear();
      
      toast.error(error.message || 'Logout failed');
      router.push('/auth/signin');
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      const updatedUser = data.data;
      
      // Update user data
      if (updatedUser) {
        userManager.setUser(updatedUser);
        queryClient.setQueryData(authKeys.user(), updatedUser);
      }
      
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Profile update failed');
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Password change failed');
    },
  });

  // Forgot password mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success('Password reset email sent');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset email');
    },
  });

  // Reset password mutation
  const resetPasswordMutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully');
      router.push('/auth/signin');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Password reset failed');
    },
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isUserLoading,
    
    // Mutations
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    updateProfile: updateProfileMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    
    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    isSendingResetEmail: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
  };
};

// Hook for user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: tokenManager.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
