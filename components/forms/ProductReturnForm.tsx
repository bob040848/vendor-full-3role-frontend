// frontend/components/forms/ProductReturnForm.tsx
'use client';

import React, { useState } from 'react';
import { useReturnProductMutation, useGetDeliveryPersonsQuery, useGetProductsQuery, useGetShopsQuery } from '@/generated/graphql';
import { z } from 'zod';
import { returnProductSchema } from '@/lib/zod-schemas';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface ProductReturnFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    productId?: string;
    shopId?: string;
    deliveryPersonId?: string;
    pieces?: number;
  };
}

export const ProductReturnForm: React.FC<ProductReturnFormProps> = ({ onClose, onSuccess, initialData }) => {
  const [productId, setProductId] = useState(initialData?.productId || '');
  const [shopId, setShopId] = useState(initialData?.shopId || '');
  const [deliveryPersonId, setDeliveryPersonId] = useState(initialData?.deliveryPersonId || '');
  const [pieces, setPieces] = useState(initialData?.pieces?.toString() || '');
  const [signature, setSignature] = useState('');
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [returnProduct, { loading, error }] = useReturnProductMutation();

  const { data: productsData, loading: productsLoading, error: productsError } = useGetProductsQuery();
  const { data: shopsData, loading: shopsLoading, error: shopsError } = useGetShopsQuery();
  const { data: deliveryPersonsData, loading: deliveryPersonsLoading, error: deliveryPersonsError } = useGetDeliveryPersonsQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitError(null);

    const input = {
      productId,
      shopId,
      deliveryPersonId,
      pieces: parseInt(pieces),
      signature,
    };

    const validationResult = returnProductSchema.safeParse(input);

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    try {
      await returnProduct({
        variables: {
          productId: input.productId,
          shopId: input.shopId,
          deliveryPersonId: input.deliveryPersonId,
          pieces: input.pieces,
          signature: input.signature,
        },
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Return Product Error:', err);
      setSubmitError(err.message || 'An unexpected error occurred during product return.');
    }
  };

  if (productsLoading || shopsLoading || deliveryPersonsLoading) return <LoadingSpinner />;
  if (productsError || shopsError || deliveryPersonsError) {
    return <ErrorMessage message="Failed to load necessary data for the form." />;
  }

  const getErrorMessage = (field: string) => errors.find(err => err.path[0] === field)?.message;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 text-white">
      {submitError && <ErrorMessage message={submitError} />}

      <div>
        <label htmlFor="productId" className="block text-sm font-medium text-gray-300 mb-1">Product</label>
        <select
          id="productId"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Product</option>
          {productsData?.products.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        {getErrorMessage('productId') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('productId')}</p>}
      </div>

      <div>
        <label htmlFor="shopId" className="block text-sm font-medium text-gray-300 mb-1">Shop</label>
        <select
          id="shopId"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Shop</option>
          {shopsData?.shops.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {getErrorMessage('shopId') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('shopId')}</p>}
      </div>

      <div>
        <label htmlFor="deliveryPersonId" className="block text-sm font-medium text-gray-300 mb-1">Delivery Person</label>
        <select
          id="deliveryPersonId"
          value={deliveryPersonId}
          onChange={(e) => setDeliveryPersonId(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Delivery Person</option>
          {deliveryPersonsData?.deliveryPersons.map((dp) => (
            <option key={dp.id} value={dp.id}>{dp.name}</option>
          ))}
        </select>
        {getErrorMessage('deliveryPersonId') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('deliveryPersonId')}</p>}
      </div>

      <div>
        <label htmlFor="pieces" className="block text-sm font-medium text-gray-300 mb-1">Pieces to Return</label>
        <input
          type="number"
          id="pieces"
          value={pieces}
          onChange={(e) => setPieces(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter number of pieces"
        />
        {getErrorMessage('pieces') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('pieces')}</p>}
      </div>

      <div>
        <label htmlFor="signature" className="block text-sm font-medium text-gray-300 mb-1">Signature</label>
        <input
          type="text"
          id="signature"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter signature"
        />
        {getErrorMessage('signature') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('signature')}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Returning...' : 'Return Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductReturnForm;