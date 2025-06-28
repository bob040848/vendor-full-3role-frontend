// frontend/components/forms/ProductForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useCreateProductMutation, useUpdateProductMutation, useGetVendorsQuery, useGetShopsQuery } from '@/generated/graphql';
import { z } from 'zod';
import { createProductSchema, updateProductSchema } from '@/lib/zod-schemas';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

type ProductFormProps ={
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    id?: string;
    title?: string;
    description?: string | null;
    stock?: number;
    ingredient?: string | null;
    barcode?: number | null;
    price?: number;
    expired_at?: number | null;
    image?: string | null;
    vendor_id?: string;
    shop_id?: string | null;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, onSuccess, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [stock, setStock] = useState(initialData?.stock?.toString() || '0');
  const [ingredient, setIngredient] = useState(initialData?.ingredient || '');
  const [barcode, setBarcode] = useState(initialData?.barcode?.toString() || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [expiredAt, setExpiredAt] = useState(initialData?.expired_at?.toString() || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [vendorId, setVendorId] = useState(initialData?.vendor_id || '');
  const [shopId, setShopId] = useState(initialData?.shop_id || '');

  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createProduct, { loading: createLoading }] = useCreateProductMutation();
  const [updateProduct, { loading: updateLoading }] = useUpdateProductMutation();

  const { data: vendorsData, loading: vendorsLoading, error: vendorsError } = useGetVendorsQuery();
  const { data: shopsData, loading: shopsLoading, error: shopsError } = useGetShopsQuery();

  const isEditing = !!initialData?.id;
  const loading = createLoading || updateLoading;

  useEffect(() => {
    if (initialData?.vendor_id) {
      setVendorId(initialData.vendor_id);
    }
    if (initialData?.shop_id) {
      setShopId(initialData.shop_id);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitError(null);

    let validationResult;
    let input: any;

    if (isEditing) {
      input = {
        title: title || undefined,
        description: description === '' ? undefined : description,
        stock: stock === '' ? undefined : parseInt(stock),
        ingredient: ingredient === '' ? undefined : ingredient,
        barcode: barcode === '' ? undefined : parseInt(barcode),
        price: price === '' ? undefined : parseInt(price),
        expired_at: expiredAt === '' ? undefined : parseInt(expiredAt),
        image: image === '' ? undefined : image,
        vendor_id: vendorId || undefined,
        shop_id: shopId === '' ? undefined : shopId,
      };
      validationResult = updateProductSchema.safeParse(input);
    } else {
      input = {
        title,
        description: description || undefined,
        stock: parseInt(stock), 
        ingredient: ingredient || undefined,
        barcode: barcode === '' ? undefined : parseInt(barcode),
        price: parseInt(price), 
        expired_at: expiredAt === '' ? undefined : parseInt(expiredAt),
        image: image || undefined,
        vendor_id: vendorId,
        shop_id: shopId || undefined,
      };
      validationResult = createProductSchema.safeParse(input);
    }

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    try {
      if (isEditing) {
        await updateProduct({
          variables: { id: initialData!.id!, input: input },
        });
      } else {
        await createProduct({
          variables: { input: input },
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Product Form Error:', err);
      setSubmitError(err.message || 'An unexpected error occurred.');
    }
  };

  if (vendorsLoading || shopsLoading) return <LoadingSpinner />;
  if (vendorsError || shopsError) {
    return <ErrorMessage message="Failed to load vendors or shops." />;
  }

  const getErrorMessage = (field: string) => errors.find(err => err.path[0] === field)?.message;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 text-white">
      {submitError && <ErrorMessage message={submitError} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Product Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter product title"
        />
        {getErrorMessage('title') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('title')}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter product description"
        ></textarea>
        {getErrorMessage('description') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('description')}</p>}
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-300 mb-1">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter stock quantity"
        />
        {getErrorMessage('stock') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('stock')}</p>}
      </div>

      <div>
        <label htmlFor="ingredient" className="block text-sm font-medium text-gray-300 mb-1">Ingredient (Optional)</label>
        <input
          type="text"
          id="ingredient"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter ingredients"
        />
        {getErrorMessage('ingredient') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('ingredient')}</p>}
      </div>

      <div>
        <label htmlFor="barcode" className="block text-sm font-medium text-gray-300 mb-1">Barcode (Optional)</label>
        <input
          type="number"
          id="barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter barcode"
        />
        {getErrorMessage('barcode') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('barcode')}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter price"
        />
        {getErrorMessage('price') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('price')}</p>}
      </div>

      <div>
        <label htmlFor="expiredAt" className="block text-sm font-medium text-gray-300 mb-1">Expired At (Days from now - Optional)</label>
        <input
          type="number"
          id="expiredAt"
          value={expiredAt}
          onChange={(e) => setExpiredAt(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter expiration in days"
        />
        {getErrorMessage('expired_at') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('expired_at')}</p>}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">Image URL (Optional)</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter image URL"
        />
        {getErrorMessage('image') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('image')}</p>}
      </div>

      <div>
        <label htmlFor="vendorId" className="block text-sm font-medium text-gray-300 mb-1">Vendor</label>
        <select
          id="vendorId"
          value={vendorId}
          onChange={(e) => setVendorId(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Select Vendor</option>
          {vendorsData?.vendors.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        {getErrorMessage('vendor_id') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('vendor_id')}</p>}
      </div>

      <div>
        <label htmlFor="shopId" className="block text-sm font-medium text-gray-300 mb-1">Assigned Shop (Optional)</label>
        <select
          id="shopId"
          value={shopId}
          onChange={(e) => setShopId(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">No Assigned Shop</option>
          {shopsData?.shops.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        {getErrorMessage('shop_id') && <p className="text-red-400 text-xs mt-1">{getErrorMessage('shop_id')}</p>}
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
          {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;