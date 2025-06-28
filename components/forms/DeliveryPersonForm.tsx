// frontend/components/forms/DeliveryConfirmForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useConfirmDeliveryMutation, useGetDeliveryPersonsQuery, useGetProductsQuery, useGetShopsQuery, TransactionType } from '@/generated/graphql';
import { z } from 'zod';
import { confirmDeliverySchema } from '@/lib/zod-schemas';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface DeliveryConfirmFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    productId?: string;
    shopId?: string;
    deliveryPersonId?: string;
    totalPrice?: number;
    pieces?: number; 
  };
}

const DeliveryConfirmForm: React.FC<DeliveryConfirmFormProps> = ({ onClose, onSuccess, initialData }) => {
  const [productId, setProductId] = useState(initialData?.productId || '');
  const [shopId, setShopId] = useState(initialData?.shopId || '');
  const [deliveryPersonId, setDeliveryPersonId] = useState(initialData?.deliveryPersonId || '');
  const [totalPrice, setTotalPrice] = useState(initialData?.totalPrice?.toString() || '');
  const [transactionType, setTransactionType] = useState<TransactionType>(TransactionType.Cash);
  const [signature, setSignature] = useState('');
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [confirmDelivery, { loading, error }] = useConfirmDeliveryMutation();

  const { data: productsData, loading: productsLoading, error: productsError } = useGetProductsQuery();
  const { data: shopsData, loading: shopsLoading, error: shopsError } = useGetShopsQuery();
  const { data: deliveryPersonsData, loading: deliveryPersonsLoading, error: deliveryPersonsError } = useGetDeliveryPersonsQuery();

  useEffect(() => {
    if (initialData?.pieces && productsData?.products) {
      const product = productsData.products.find(p => p.id === initialData.productId);
      if (product) {
        setTotalPrice((product.price * initialData.pieces).toString());
      }
    }
  }, [initialData, productsData]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitError(null);

    const input = {
      productId,
      shopId,
      deliveryPersonId,
      totalPrice: parseInt(totalPrice),
      transactionType,
      signature: signature || undefined, 
    };

    const validationResult = confirmDeliverySchema.safeParse(input);

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    try {
      await confirmDelivery({
        variables: {
          productId: input.productId,
          shopId: input.shopId,
          deliveryPersonId: input.deliveryPersonId,
          totalPrice: input.totalPrice,
          transactionType: input.transactionType,
          signature: input.signature,
        },
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Confirm Delivery Error:', err);
      setSubmitError(err.message || 'An unexpected error occurred during delivery confirmation.');
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
          onChange={(e) => {
            setProductId(e.target.value);
            const selectedProduct = productsData?.products.find(p => p.id === e.target.value);
            if (selectedProduct && initialData?.pieces) {
              setTotalPrice((selectedProduct.price * initialData.pieces).toString());
            }
          }}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Product</option>
          {productsData?.products.map((p) => (
            <option key={p.id} value={p.id}>{p.title} (Stock: {p.stock})</option>
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
        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-300 mb-1">Total Price</label>
        <input
          type="number"
          id="totalPrice"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter total price"
        />
        {getErrorMessage('totalPrice') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('totalPrice')}</p>}
      </div>

      <div>
        <label htmlFor="transactionType" className="block text-sm font-medium text-gray-300 mb-1">Transaction Type</label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value as TransactionType)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value={TransactionType.Cash}>CASH</option>
          <option value={TransactionType.Transfer}>TRANSFER</option>
          <option value={TransactionType.Nextpayment}>NEXTPAYMENT</option>
        </select>
        {getErrorMessage('transactionType') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('transactionType')}</p>}
      </div>

      <div>
        <label htmlFor="signature" className="block text-sm font-medium text-gray-300 mb-1">Signature (Optional)</label>
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
          {loading ? 'Confirming...' : 'Confirm Delivery'}
        </button>
      </div>
    </form>
  );
};

export default DeliveryConfirmForm;