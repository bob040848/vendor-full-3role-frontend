// frontend/providers/apollo-provider.tsx
"use client";

import { ApolloProvider } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";
import { client } from "../lib/apollo-client";
import { ReactNode, useEffect } from "react";

type ApolloWrapperProps = {
  children: ReactNode;
};

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  const { getToken, isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      if (isLoaded) {
        if (isSignedIn) {
          try {
            const token = await getToken();
            if (typeof window !== "undefined") {
              (window as any).__APOLLO_AUTH_TOKEN__ = token;
            }
          } catch (error) {
            console.error("Failed to get auth token:", error);
          }
        } else {
          if (typeof window !== "undefined") {
            (window as any).__APOLLO_AUTH_TOKEN__ = null;
          }
          await client.clearStore();
        }
      }
    };

    updateToken();

    let interval: NodeJS.Timeout | null = null;
    if (isSignedIn) {
      interval = setInterval(updateToken, 30000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [getToken, isSignedIn, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
