// frontend/lib/zod-schemas.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  description: z.string().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  ingredient: z.string().optional(),
  barcode: z.number().int().optional(),
  price: z.number().int().min(0, 'Price cannot be negative'),
  expired_at: z.number().int().optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  vendor_id: z.string().min(1, 'Vendor ID is required'),
  shop_id: z.string().min(1, 'Shop ID is required').optional().or(z.literal('')),
});

export const updateProductSchema = z.object({
  title: z.string().min(1, 'Product title is required').optional(),
  description: z.string().optional(),
  stock: z.number().int().min(0, 'Stock cannot be negative').optional(),
  ingredient: z.string().optional(),
  barcode: z.number().int().optional(),
  price: z.number().int().min(0, 'Price cannot be negative').optional(),
  expired_at: z.number().int().optional(),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  vendor_id: z.string().min(1, 'Vendor ID is required').optional(),
  shop_id: z.string().min(1, 'Shop ID is required').optional().or(z.literal('')),
});

export const deliverProductSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  shopId: z.string().min(1, 'Shop ID is required'),
  deliveryPersonId: z.string().min(1, 'Delivery Person ID is required'),
  pieces: z.number().int().min(1, 'Pieces must be at least 1'),
});

export const confirmDeliverySchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  shopId: z.string().min(1, 'Shop ID is required'),
  deliveryPersonId: z.string().min(1, 'Delivery Person ID is required'),
  totalPrice: z.number().int().min(0, 'Total price cannot be negative'),
  transactionType: z.enum(['CASH', 'TRANSFER', 'NEXTPAYMENT'], {
    required_error: 'Transaction type is required',
  }),
  signature: z.string().optional().or(z.literal('')),
});

export const returnProductSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  shopId: z.string().min(1, 'Shop ID is required'),
  deliveryPersonId: z.string().min(1, 'Delivery Person ID is required'),
  pieces: z.number().int().min(1, 'Pieces must be at least 1'),
  signature: z.string().min(1, 'Signature is required'),
});

export const createShopSchema = z.object({
  name: z.string().min(1, 'Shop name is required'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().optional().or(z.literal('')),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export const updateShopSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone_number: z.string().optional().or(z.literal('')),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  is_active: z.boolean().optional(),
});

export const createDeliveryPersonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  phone_number: z.string().optional().or(z.literal('')),
});

export const createVendorSchema = z.object({
  name: z.string().min(1, 'Vendor name is required'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
});

export const updateVendorSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone_number: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  image: z.string().url('Invalid image URL').optional().or(z.literal('')),
  is_active: z.boolean().optional(),
});
