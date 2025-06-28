//frontend/app/ClientLayout.tsx
'use client';

import { ApolloWrapper } from '../providers/apollo-provider';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useAuth();
  const [showInitialLoading, setShowInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoaded) {
        setShowInitialLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  if (!isLoaded || showInitialLoading) {
    return <LoadingScreen message="Системд холбогдож байна..." variant="branded" />;
  }

  return (
    <ApolloWrapper>
      <div className="min-h-screen">
        {children}
      </div>
    </ApolloWrapper>
  );
};