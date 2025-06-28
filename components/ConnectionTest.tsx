'use client';

import { useQuery, gql } from '@apollo/client';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';

const TEST_QUERY = gql`
  query TestConnection {
    __typename
  }
`;

export function ConnectionTest() {
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const [debugInfo, setDebugInfo] = useState<string>('');
  const { loading, error, data, refetch } = useQuery(TEST_QUERY, {
    errorPolicy: 'all',
    onCompleted: (data) => {
      setDebugInfo(prev => prev + '\n✅ Query completed: ' + JSON.stringify(data));
    },
    onError: (error) => {
      setDebugInfo(prev => prev + '\n❌ Query error: ' + error.message);
    }
  });

  const handleTestConnection = async () => {
    setDebugInfo('🔄 Testing connection...\n');
    
    if (isSignedIn) {
      try {
        const token = await getToken();
        setDebugInfo(prev => prev + `\n🔑 Auth token: ${token ? 'Present' : 'Missing'}`);
      } catch (error) {
        setDebugInfo(prev => prev + `\n❌ Auth error: ${error}`);
      }
    }
    
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3001/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'query { __typename }',
        }),
      });
      
      const result = await response.json();
      setDebugInfo(prev => prev + `\n🌐 Direct fetch result: ${JSON.stringify(result)}`);
    } catch (error) {
      setDebugInfo(prev => prev + `\n❌ Direct fetch error: ${error}`);
    }
    
    refetch();
  };

  if (!isLoaded) {
    return <div className="p-4 text-gray-600">Loading auth...</div>;
  }

  return (
    <div className="p-6 border rounded-lg max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">Frontend-Backend Connection Test</h2>
      
      <div className="mb-4">
        <p className="font-medium">Authentication Status:</p>
        <span className={`px-2 py-1 rounded text-sm ${
          isSignedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {isSignedIn ? '✅ Signed In' : '❌ Not Signed In'}
        </span>
      </div>

      <div className="mb-4">
        <p className="font-medium">GraphQL Connection:</p>
        {loading && <span className="text-blue-600">🔄 Testing connection...</span>}
        {error && (
          <div className="text-red-600">
            <span>❌ Connection failed:</span>
            <pre className="text-xs mt-1 bg-red-50 p-2 rounded overflow-auto">
              {error.message}
            </pre>
          </div>
        )}
        {data && !error && (
          <span className="text-green-600">
            ✅ GraphQL connected successfully!
          </span>
        )}
      </div>

      <div className="mb-4">
        <p className="font-medium">Configuration:</p>
        <pre className="text-xs bg-gray-50 p-2 rounded">
          GraphQL Endpoint: {process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3001/api/graphql'}
        </pre>
      </div>

      {data && (
        <div className="mb-4">
          <p className="font-medium">Response:</p>
          <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {debugInfo && (
        <div className="mb-4">
          <p className="font-medium">Debug Information:</p>
          <pre className="text-xs bg-yellow-50 p-2 rounded overflow-auto whitespace-pre-wrap">
            {debugInfo}
          </pre>
        </div>
      )}

      <button 
        onClick={handleTestConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Run Connection Test'}
      </button>

      <button 
        onClick={() => setDebugInfo('')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Clear Debug
      </button>
    </div>
  );
}