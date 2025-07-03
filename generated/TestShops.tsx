//frontend/components/TestShops.tsx
'use client';

import { useGetShopsQuery } from '../generated/graphql';

export default function ShopsTest() {
  const { data, loading, error } = useGetShopsQuery();

  if (loading) return <p>Loading shops...</p>;
  if (error) return <p>Error fetching shops: {error.message}</p>;

  return (
    <div>
      <h2>Shops List</h2>
      <ul>
        {data?.shops?.map((shop) => (
          <li key={shop.id}>
            {shop.name} - {shop.address}
          </li>
        ))}
      </ul>
    </div>
  );
}
