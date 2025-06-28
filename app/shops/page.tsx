// frontend/app/shops/page.tsx
'use client';

import React, { useState } from 'react';
import { useGetShopsQuery, useDeleteShopMutation } from '@/generated/graphql';
import Modal from '@/components/ui/Modal';
import ShopForm from '@/components/forms/ShopForm';
import LoadingSpinner from '@/components//LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';

const ShopsPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetShopsQuery();
  const [deleteShop] = useDeleteShopMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as 'ADMIN' | 'VENDOR' | 'USER' | undefined;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await deleteShop({ variables: { id } });
        refetch();
      } catch (err: any) {
        alert(`Error deleting shop: ${err.message}`);
      }
    }
  };

  const handleEdit = (shop: any) => {
    setSelectedShop(shop);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setSelectedShop(null);
    refetch();
  };

  if (loading || !isLoaded) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const shops = data?.shops || [];

  const canManageShops = userRole === 'ADMIN'; 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8 drop-shadow-lg">Shop Directory</h1>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">All Shops</h2>
            {canManageShops && (
              <button
                onClick={() => { setSelectedShop(null); setIsModalOpen(true); }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Add New Shop
              </button>
            )}
          </div>

          {shops.length === 0 ? (
            <p className="text-center text-gray-400">No shops found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Active
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                    {canManageShops && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {shops.map((shop) => (
                    <tr key={shop.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {shop.image ? (
                          <img
                            src={shop.image}
                            alt={shop.name}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (e.target as HTMLImageElement).src = `https://placehold.co/40x40/525252/FFF?text=NoImg`;
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                            No Img
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{shop.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{shop.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{shop.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${shop.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {shop.is_active ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {shop.updated_at ? format(new Date(shop.updated_at), 'MMM dd,yyyy HH:mm') : 'N/A'}
                      </td>
                      {canManageShops && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(shop)}
                            className="text-orange-500 hover:text-orange-700 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(shop.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedShop ? 'Edit Shop' : 'Create New Shop'}>
        <ShopForm onClose={() => setIsModalOpen(false)} onSuccess={handleFormSuccess} initialData={selectedShop || {}} />
      </Modal>
    </div>
  );
};

export default ShopsPage;