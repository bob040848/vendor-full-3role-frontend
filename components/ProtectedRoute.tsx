// frontend/components/ProtectedRoute.tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

type ProtectedRouteProps ={
  children: ReactNode;
  allowedRoles?: ('ADMIN' | 'VENDOR' | 'USER')[];
  fallbackPath?: string;
}

export function ProtectedRoute({ 
  children, 
  allowedRoles = [], 
  fallbackPath = '/' 
}: ProtectedRouteProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(fallbackPath);
      return;
    }

    if (isLoaded && isSignedIn && allowedRoles.length > 0) {
      const userRole = user?.publicMetadata?.role as string;
      if (!userRole || !allowedRoles.includes(userRole as any)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isLoaded, isSignedIn, user, allowedRoles, router, fallbackPath]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  if (allowedRoles.length > 0) {
    const userRole = user?.publicMetadata?.role as string;
    if (!userRole || !allowedRoles.includes(userRole as any)) {
      return null; 
    }
  }

  return <>{children}</>;
}