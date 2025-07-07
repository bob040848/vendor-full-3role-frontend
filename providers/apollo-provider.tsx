// frontend/providers/apollo-provider.tsx
"use client";

import { ApolloProvider, ApolloError } from "@apollo/client";
import { useAuth } from "@clerk/nextjs";
import { client } from "../lib/apollo-client";
import { ReactNode, useEffect } from "react";
import { GraphQLError } from 'graphql';

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
            const graphqlError = error instanceof ApolloError 
              ? error
              : new GraphQLError('Authentication token retrieval failed');
            console.error("GraphQL Auth Error:", graphqlError);
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
  }, [getToken, isSignedIn, isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
