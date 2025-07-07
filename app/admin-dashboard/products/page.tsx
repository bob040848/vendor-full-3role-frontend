// frontend/app/products/page.tsx
'use client';

import React, { useState } from 'react';
import { useGetProductsQuery, useDeleteProductMutation } from '@/generated/graphql';
import Modal from '@/components/ui/Modal';
import ProductForm from '@/components/forms/ProductForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';

const ProductsPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as 'ADMIN' | 'VENDOR' | 'USER' | undefined;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct({ variables: { id } });
        refetch();
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  if (loading || !isLoaded) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const products = data?.products || [];

  const canManageProducts = userRole === 'ADMIN' || userRole === 'VENDOR';

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8 drop-shadow-lg">Product Catalog</h1>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">All Products</h2>
            {canManageProducts && (
              <button
                onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Add New Product
              </button>
            )}
          </div>

          {products.length === 0 ? (
            <p className="text-center text-gray-400">No products found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Shop
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                    {canManageProducts && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{product.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.shop?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {product.updated_at ? format(new Date(product.updated_at), 'MMM dd,yyyy HH:mm') : 'N/A'}
                      </td>
                      {canManageProducts && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-orange-500 hover:text-orange-700 mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedProduct ? 'Edit Product' : 'Create New Product'}>
        <ProductForm onClose={() => setIsModalOpen(false)} onSuccess={handleFormSuccess} initialData={selectedProduct || {}} />
      </Modal>
    </div>
  );
};

export default ProductsPage;