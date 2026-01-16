'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles?: string[]
) {
  return function AuthenticatedComponent(props: T) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/auth/signin');
          return;
        }

        if (user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          // Redirect to appropriate dashboard based on user role
          if (user.role === 'admin') {
            router.push('/admin/dashboard');
          } else if (user.role === 'service_provider') {
            router.push('/provider/dashboard');
          } else {
            router.push('/customer/dashboard');
          }
          return;
        }
      }
    }, [isAuthenticated, isLoading, user, router]);

    // Don't render if not authenticated or role not allowed
    if (isLoading || !isAuthenticated || (user && allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

// Specific role-based HOCs
export const withAdminAuth = <T extends object>(Component: React.ComponentType<T>) =>
  withAuth(Component, ['admin']);

export const withProviderAuth = <T extends object>(Component: React.ComponentType<T>) =>
  withAuth(Component, ['service_provider']);

export const withCustomerAuth = <T extends object>(Component: React.ComponentType<T>) =>
  withAuth(Component, ['customer']);

export const withCustomerOrProviderAuth = <T extends object>(Component: React.ComponentType<T>) =>
  withAuth(Component, ['customer', 'service_provider']);
