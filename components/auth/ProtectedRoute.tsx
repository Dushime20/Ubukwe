'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['customer', 'provider', 'admin'],
  redirectTo = '/auth/signin'
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'provider') {
          router.push('/provider/dashboard');
        } else {
          router.push('/customer/dashboard');
        }
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, redirectTo, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or role not allowed
  if (!isAuthenticated || (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
};

// Specific role-based protection components
export const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['admin']}>
    {children}
  </ProtectedRoute>
);

export const ProviderRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['provider']}>
    {children}
  </ProtectedRoute>
);

export const CustomerRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['customer']}>
    {children}
  </ProtectedRoute>
);

export const CustomerOrProviderRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute allowedRoles={['customer', 'provider']}>
    {children}
  </ProtectedRoute>
);
