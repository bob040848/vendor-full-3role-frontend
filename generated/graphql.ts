import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AdminApproval = {
  __typename?: 'AdminApproval';
  admin_id: Scalars['String']['output'];
  approved: Scalars['Boolean']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  vendor_request: VendorRequest;
  vendor_request_id: Scalars['String']['output'];
};

export type CreateDeliveryPersonInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePaymentInput = {
  amount: Scalars['Int']['input'];
  payment_reference?: InputMaybe<Scalars['String']['input']>;
  product_delivered_history_id: Scalars['String']['input'];
  transaction_type: TransactionType;
};

export type CreateProductInput = {
  barcode?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expired_at?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Int']['input'];
  shop_id?: InputMaybe<Scalars['String']['input']>;
  stock: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};

export type CreateShopInput = {
  address: Scalars['String']['input'];
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type CreateShopOrderInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  order_items: Array<ShopOrderItemInput>;
  shop_id: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role: UserRole;
};

export type CreateVendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVendorRequestInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type DailySalesReport = {
  __typename?: 'DailySalesReport';
  cash_sales: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  pending_payments: Scalars['Int']['output'];
  shop: Shop;
  shop_id: Scalars['String']['output'];
  total_orders: Scalars['Int']['output'];
  total_sales: Scalars['Int']['output'];
  transfer_sales: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  vendor: Vendor;
  vendor_id: Scalars['String']['output'];
};

export type DeliveryPerson = {
  __typename?: 'DeliveryPerson';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  product_delivered_history: Array<ProductDeliveredHistory>;
  product_deliveries: Array<ProductDelivery>;
  product_return_history: Array<ProductReturnHistory>;
  updated_at: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  approveVendorRequest: VendorRequest;
  cancelShopOrder: Scalars['Boolean']['output'];
  confirmDelivery: ProductDeliveredHistory;
  createDeliveryPerson: DeliveryPerson;
  createPayment: Payment;
  createProduct: Product;
  createShop: Shop;
  createShopOrder: ShopOrder;
  createUser: User;
  createVendor: Vendor;
  createVendorRequest: VendorRequest;
  deleteDeliveryPerson: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteShop: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  deleteVendor: Scalars['Boolean']['output'];
  deliverProduct: ProductDelivery;
  generateDailySalesReport: DailySalesReport;
  returnProduct: ProductReturnHistory;
  updateDeliveryPerson: DeliveryPerson;
  updateProduct: Product;
  updateShop: Shop;
  updateShopOrder: ShopOrder;
  updateUser: User;
  updateVendor: Vendor;
};


export type MutationApproveVendorRequestArgs = {
  approved: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCancelShopOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationConfirmDeliveryArgs = {
  delivery_person_id: Scalars['String']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
  signature?: InputMaybe<Scalars['String']['input']>;
  total_price: Scalars['Int']['input'];
  transaction_type: TransactionType;
};


export type MutationCreateDeliveryPersonArgs = {
  input: CreateDeliveryPersonInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateShopArgs = {
  input: CreateShopInput;
};


export type MutationCreateShopOrderArgs = {
  input: CreateShopOrderInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateVendorArgs = {
  input: CreateVendorInput;
};


export type MutationCreateVendorRequestArgs = {
  input: CreateVendorRequestInput;
};


export type MutationDeleteDeliveryPersonArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteShopArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteVendorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeliverProductArgs = {
  delivery_person_id: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
};


export type MutationGenerateDailySalesReportArgs = {
  date: Scalars['DateTime']['input'];
  shop_id: Scalars['String']['input'];
  vendor_id: Scalars['String']['input'];
};


export type MutationReturnProductArgs = {
  delivery_person_id: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  product_id: Scalars['String']['input'];
  shop_id: Scalars['String']['input'];
  signature?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateDeliveryPersonArgs = {
  id: Scalars['String']['input'];
  input: UpdateDeliveryPersonInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  input: UpdateProductInput;
};


export type MutationUpdateShopArgs = {
  id: Scalars['String']['input'];
  input: UpdateShopInput;
};


export type MutationUpdateShopOrderArgs = {
  id: Scalars['String']['input'];
  input: UpdateShopOrderInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UpdateUserInput;
};


export type MutationUpdateVendorArgs = {
  id: Scalars['String']['input'];
  input: UpdateVendorInput;
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Pending = 'PENDING',
  Returned = 'RETURNED'
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  paid_at: Scalars['DateTime']['output'];
  payment_reference?: Maybe<Scalars['String']['output']>;
  product_delivered_history: ProductDeliveredHistory;
  product_delivered_history_id: Scalars['String']['output'];
  transaction_type: TransactionType;
};

export type Product = {
  __typename?: 'Product';
  barcode?: Maybe<Scalars['Int']['output']>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  expired_at?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  ingredient?: Maybe<Scalars['String']['output']>;
  price: Scalars['Int']['output'];
  product_delivered_history: Array<ProductDeliveredHistory>;
  product_deliveries: Array<ProductDelivery>;
  product_remaining: Array<ProductRemaining>;
  product_return_history: Array<ProductReturnHistory>;
  product_stock: Array<ProductStock>;
  shop?: Maybe<Shop>;
  shop_id?: Maybe<Scalars['String']['output']>;
  shop_order_items: Array<ShopOrderItem>;
  stock: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  vendor: Vendor;
  vendor_id: Scalars['String']['output'];
};

export type ProductDeliveredHistory = {
  __typename?: 'ProductDeliveredHistory';
  created_at: Scalars['DateTime']['output'];
  delivery_person: DeliveryPerson;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  payment?: Maybe<Payment>;
  product: Product;
  product_id: Scalars['String']['output'];
  shop: Shop;
  shop_id: Scalars['String']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  total_price: Scalars['Int']['output'];
  transaction_type: TransactionType;
  updated_at: Scalars['DateTime']['output'];
};

export type ProductDelivery = {
  __typename?: 'ProductDelivery';
  created_at: Scalars['DateTime']['output'];
  delivery_person: DeliveryPerson;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pieces: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
  shop: Shop;
  shop_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ProductRemaining = {
  __typename?: 'ProductRemaining';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  is_delivered: Scalars['Boolean']['output'];
  pieces: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ProductReturnHistory = {
  __typename?: 'ProductReturnHistory';
  created_at: Scalars['DateTime']['output'];
  delivery_person: DeliveryPerson;
  delivery_person_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pieces: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
  shop: Shop;
  shop_id: Scalars['String']['output'];
  signature?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type ProductStock = {
  __typename?: 'ProductStock';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  is_delivered: Scalars['Boolean']['output'];
  pieces: Scalars['Int']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  dailySalesReports: Array<DailySalesReport>;
  deliveryPerson?: Maybe<DeliveryPerson>;
  deliveryPersons: Array<DeliveryPerson>;
  me?: Maybe<User>;
  myShopOrders: Array<ShopOrder>;
  payment?: Maybe<Payment>;
  payments: Array<Payment>;
  product?: Maybe<Product>;
  productDeliveredHistory: Array<ProductDeliveredHistory>;
  productReturnHistory: Array<ProductReturnHistory>;
  products: Array<Product>;
  productsByShop: Array<Product>;
  salesSummary?: Maybe<DailySalesReport>;
  shop?: Maybe<Shop>;
  shopOrder?: Maybe<ShopOrder>;
  shopOrders: Array<ShopOrder>;
  shops: Array<Shop>;
  user?: Maybe<User>;
  users: Array<User>;
  vendor?: Maybe<Vendor>;
  vendorRequest?: Maybe<VendorRequest>;
  vendorRequests: Array<VendorRequest>;
  vendors: Array<Vendor>;
};


export type QueryDailySalesReportsArgs = {
  filter?: InputMaybe<SalesReportFilter>;
};


export type QueryDeliveryPersonArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentsArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductDeliveredHistoryArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductReturnHistoryArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsByShopArgs = {
  shop_id: Scalars['String']['input'];
};


export type QuerySalesSummaryArgs = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryShopArgs = {
  id: Scalars['String']['input'];
};


export type QueryShopOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryShopOrdersArgs = {
  shop_id?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryVendorArgs = {
  id: Scalars['String']['input'];
};


export type QueryVendorRequestArgs = {
  id: Scalars['String']['input'];
};


export type QueryVendorRequestsArgs = {
  status?: InputMaybe<RequestStatus>;
};

export enum RequestStatus {
  Approved = 'APPROVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type SalesReportFilter = {
  end_date?: InputMaybe<Scalars['DateTime']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  start_date?: InputMaybe<Scalars['DateTime']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type Shop = {
  __typename?: 'Shop';
  address: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  daily_sales_reports: Array<DailySalesReport>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  product_delivered_history: Array<ProductDeliveredHistory>;
  product_deliveries: Array<ProductDelivery>;
  product_return_history: Array<ProductReturnHistory>;
  products: Array<Product>;
  shop_orders: Array<ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
};

export type ShopOrder = {
  __typename?: 'ShopOrder';
  created_at: Scalars['DateTime']['output'];
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  order_items: Array<ShopOrderItem>;
  order_number: Scalars['String']['output'];
  ordered_at: Scalars['DateTime']['output'];
  shop: Shop;
  shop_id: Scalars['String']['output'];
  status: OrderStatus;
  total_amount: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['String']['output'];
  vendor: Vendor;
  vendor_id: Scalars['String']['output'];
};

export type ShopOrderItem = {
  __typename?: 'ShopOrderItem';
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  product: Product;
  product_id: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shop_order: ShopOrder;
  shop_order_id: Scalars['String']['output'];
  total_price: Scalars['Int']['output'];
  unit_price: Scalars['Int']['output'];
};

export type ShopOrderItemInput = {
  product_id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  unit_price: Scalars['Int']['input'];
};

export enum TransactionType {
  Cash = 'CASH',
  Nextpayment = 'NEXTPAYMENT',
  Transfer = 'TRANSFER'
}

export type UpdateDeliveryPersonInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  barcode?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  expired_at?: InputMaybe<Scalars['Int']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  ingredient?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  shop_id?: InputMaybe<Scalars['String']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  vendor_id?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateShopOrderInput = {
  delivered_at?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type UpdateVendorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  shop_orders: Array<ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
  vendor_requests: Array<VendorRequest>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
  Vendor = 'VENDOR'
}

export type Vendor = {
  __typename?: 'Vendor';
  address?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  daily_sales_reports: Array<DailySalesReport>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  phone_number?: Maybe<Scalars['String']['output']>;
  products: Array<Product>;
  shop_orders: Array<ShopOrder>;
  updated_at: Scalars['DateTime']['output'];
};

export type VendorRequest = {
  __typename?: 'VendorRequest';
  address?: Maybe<Scalars['String']['output']>;
  admin_approvals: Array<AdminApproval>;
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  reviewed_at?: Maybe<Scalars['DateTime']['output']>;
  status: RequestStatus;
  updated_at: Scalars['DateTime']['output'];
  user: User;
  user_id: Scalars['String']['output'];
};

export type CreateShopMutationVariables = Exact<{
  input: CreateShopInput;
}>;


export type CreateShopMutation = { __typename?: 'Mutation', createShop: { __typename?: 'Shop', id: string, name: string, address: string, email: string, phone_number?: string | null, image?: string | null, is_active: boolean, created_at: any } };

export type UpdateShopMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateShopInput;
}>;


export type UpdateShopMutation = { __typename?: 'Mutation', updateShop: { __typename?: 'Shop', id: string, name: string, address: string, email: string, phone_number?: string | null, image?: string | null, is_active: boolean, updated_at: any } };

export type DeleteShopMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteShopMutation = { __typename?: 'Mutation', deleteShop: boolean };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Product', id: string, title: string, description?: string | null, stock: number, ingredient?: string | null, barcode?: number | null, price: number, expired_at?: number | null, image?: string | null, created_at: any, shop?: { __typename?: 'Shop', id: string, name: string } | null } };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: { __typename?: 'Product', id: string, title: string, description?: string | null, stock: number, ingredient?: string | null, barcode?: number | null, price: number, expired_at?: number | null, image?: string | null, updated_at: any } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: boolean };

export type CreateDeliveryPersonMutationVariables = Exact<{
  input: CreateDeliveryPersonInput;
}>;


export type CreateDeliveryPersonMutation = { __typename?: 'Mutation', createDeliveryPerson: { __typename?: 'DeliveryPerson', id: string, name: string, image?: string | null, phone_number?: string | null, created_at: any } };

export type UpdateDeliveryPersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateDeliveryPersonInput;
}>;


export type UpdateDeliveryPersonMutation = { __typename?: 'Mutation', updateDeliveryPerson: { __typename?: 'DeliveryPerson', id: string, name: string, image?: string | null, phone_number?: string | null, updated_at: any } };

export type DeleteDeliveryPersonMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteDeliveryPersonMutation = { __typename?: 'Mutation', deleteDeliveryPerson: boolean };

export type DeliverProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  shopId: Scalars['String']['input'];
  deliveryPersonId: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
}>;


export type DeliverProductMutation = { __typename?: 'Mutation', deliverProduct: { __typename?: 'ProductDelivery', id: string, pieces: number, created_at: any, product: { __typename?: 'Product', id: string, title: string }, shop: { __typename?: 'Shop', id: string, name: string }, delivery_person: { __typename?: 'DeliveryPerson', id: string, name: string } } };

export type ConfirmDeliveryMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  shopId: Scalars['String']['input'];
  deliveryPersonId: Scalars['String']['input'];
  totalPrice: Scalars['Int']['input'];
  transactionType: TransactionType;
  signature?: InputMaybe<Scalars['String']['input']>;
}>;


export type ConfirmDeliveryMutation = { __typename?: 'Mutation', confirmDelivery: { __typename?: 'ProductDeliveredHistory', id: string, total_price: number, transaction_type: TransactionType, paid: boolean, paid_at?: any | null, signature?: string | null, created_at: any } };

export type ReturnProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  shopId: Scalars['String']['input'];
  deliveryPersonId: Scalars['String']['input'];
  pieces: Scalars['Int']['input'];
  signature: Scalars['String']['input'];
}>;


export type ReturnProductMutation = { __typename?: 'Mutation', returnProduct: { __typename?: 'ProductReturnHistory', id: string, pieces: number, signature?: string | null, created_at: any } };

export type CreateVendorMutationVariables = Exact<{
  input: CreateVendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: { __typename?: 'Vendor', id: string, name: string, email: string, phone_number?: string | null, address?: string | null, image?: string | null, is_active: boolean, created_at: any } };

export type UpdateVendorMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateVendorInput;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor: { __typename?: 'Vendor', id: string, name: string, email: string, phone_number?: string | null, address?: string | null, image?: string | null, is_active: boolean, updated_at: any } };

export type DeleteVendorMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteVendorMutation = { __typename?: 'Mutation', deleteVendor: boolean };

export type GetShopsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetShopsQuery = { __typename?: 'Query', shops: Array<{ __typename?: 'Shop', id: string, name: string, address: string, is_active: boolean, email: string, phone_number?: string | null, image?: string | null, created_at: any, updated_at: any, products: Array<{ __typename?: 'Product', id: string, title: string, price: number, stock: number, image?: string | null }> }> };

export type GetShopQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetShopQuery = { __typename?: 'Query', shop?: { __typename?: 'Shop', id: string, name: string, address: string, is_active: boolean, email: string, phone_number?: string | null, image?: string | null, created_at: any, updated_at: any, products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, price: number, stock: number, ingredient?: string | null, barcode?: number | null, expired_at?: number | null, image?: string | null, created_at: any, updated_at: any }> } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, stock: number, ingredient?: string | null, barcode?: number | null, price: number, expired_at?: number | null, image?: string | null, created_at: any, updated_at: any, shop?: { __typename?: 'Shop', id: string, name: string, address: string } | null, vendor: { __typename?: 'Vendor', id: string, name: string } }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, title: string, description?: string | null, stock: number, ingredient?: string | null, barcode?: number | null, price: number, expired_at?: number | null, image?: string | null, created_at: any, updated_at: any, shop?: { __typename?: 'Shop', id: string, name: string, address: string, email: string, phone_number?: string | null } | null, product_stock: Array<{ __typename?: 'ProductStock', id: string, pieces: number, is_delivered: boolean, created_at: any }>, product_remaining: Array<{ __typename?: 'ProductRemaining', id: string, pieces: number, is_delivered: boolean, created_at: any }> } | null };

export type GetProductsByShopQueryVariables = Exact<{
  shopId: Scalars['String']['input'];
}>;


export type GetProductsByShopQuery = { __typename?: 'Query', productsByShop: Array<{ __typename?: 'Product', id: string, title: string, description?: string | null, stock: number, price: number, image?: string | null, created_at: any }> };

export type GetDeliveryPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeliveryPersonsQuery = { __typename?: 'Query', deliveryPersons: Array<{ __typename?: 'DeliveryPerson', id: string, name: string, image?: string | null, phone_number?: string | null, created_at: any, updated_at: any }> };

export type GetProductDeliveredHistoryQueryVariables = Exact<{
  shopId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductDeliveredHistoryQuery = { __typename?: 'Query', productDeliveredHistory: Array<{ __typename?: 'ProductDeliveredHistory', id: string, total_price: number, transaction_type: TransactionType, paid: boolean, paid_at?: any | null, signature?: string | null, created_at: any, product: { __typename?: 'Product', id: string, title: string, image?: string | null }, shop: { __typename?: 'Shop', id: string, name: string }, delivery_person: { __typename?: 'DeliveryPerson', id: string, name: string } }> };

export type GetProductReturnHistoryQueryVariables = Exact<{
  shopId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductReturnHistoryQuery = { __typename?: 'Query', productReturnHistory: Array<{ __typename?: 'ProductReturnHistory', id: string, pieces: number, signature?: string | null, created_at: any, product: { __typename?: 'Product', id: string, title: string, image?: string | null }, shop: { __typename?: 'Shop', id: string, name: string }, delivery_person: { __typename?: 'DeliveryPerson', id: string, name: string } }> };

export type GetVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorsQuery = { __typename?: 'Query', vendors: Array<{ __typename?: 'Vendor', id: string, name: string, email: string, phone_number?: string | null, address?: string | null, image?: string | null, is_active: boolean, created_at: any, updated_at: any, products: Array<{ __typename?: 'Product', id: string, title: string, price: number }> }> };

export type GetVendorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetVendorQuery = { __typename?: 'Query', vendor?: { __typename?: 'Vendor', id: string, name: string, email: string, phone_number?: string | null, address?: string | null, image?: string | null, is_active: boolean, created_at: any, updated_at: any, products: Array<{ __typename?: 'Product', id: string, title: string, price: number }> } | null };


export const CreateShopDocument = gql`
    mutation CreateShop($input: CreateShopInput!) {
  createShop(input: $input) {
    id
    name
    address
    email
    phone_number
    image
    is_active
    created_at
  }
}
    `;
export type CreateShopMutationFn = Apollo.MutationFunction<CreateShopMutation, CreateShopMutationVariables>;

/**
 * __useCreateShopMutation__
 *
 * To run a mutation, you first call `useCreateShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShopMutation, { data, loading, error }] = useCreateShopMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateShopMutation(baseOptions?: Apollo.MutationHookOptions<CreateShopMutation, CreateShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateShopMutation, CreateShopMutationVariables>(CreateShopDocument, options);
      }
export type CreateShopMutationHookResult = ReturnType<typeof useCreateShopMutation>;
export type CreateShopMutationResult = Apollo.MutationResult<CreateShopMutation>;
export type CreateShopMutationOptions = Apollo.BaseMutationOptions<CreateShopMutation, CreateShopMutationVariables>;
export const UpdateShopDocument = gql`
    mutation UpdateShop($id: String!, $input: UpdateShopInput!) {
  updateShop(id: $id, input: $input) {
    id
    name
    address
    email
    phone_number
    image
    is_active
    updated_at
  }
}
    `;
export type UpdateShopMutationFn = Apollo.MutationFunction<UpdateShopMutation, UpdateShopMutationVariables>;

/**
 * __useUpdateShopMutation__
 *
 * To run a mutation, you first call `useUpdateShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShopMutation, { data, loading, error }] = useUpdateShopMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateShopMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShopMutation, UpdateShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShopMutation, UpdateShopMutationVariables>(UpdateShopDocument, options);
      }
export type UpdateShopMutationHookResult = ReturnType<typeof useUpdateShopMutation>;
export type UpdateShopMutationResult = Apollo.MutationResult<UpdateShopMutation>;
export type UpdateShopMutationOptions = Apollo.BaseMutationOptions<UpdateShopMutation, UpdateShopMutationVariables>;
export const DeleteShopDocument = gql`
    mutation DeleteShop($id: String!) {
  deleteShop(id: $id)
}
    `;
export type DeleteShopMutationFn = Apollo.MutationFunction<DeleteShopMutation, DeleteShopMutationVariables>;

/**
 * __useDeleteShopMutation__
 *
 * To run a mutation, you first call `useDeleteShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShopMutation, { data, loading, error }] = useDeleteShopMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShopMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShopMutation, DeleteShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShopMutation, DeleteShopMutationVariables>(DeleteShopDocument, options);
      }
export type DeleteShopMutationHookResult = ReturnType<typeof useDeleteShopMutation>;
export type DeleteShopMutationResult = Apollo.MutationResult<DeleteShopMutation>;
export type DeleteShopMutationOptions = Apollo.BaseMutationOptions<DeleteShopMutation, DeleteShopMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    title
    description
    stock
    ingredient
    barcode
    price
    expired_at
    image
    created_at
    shop {
      id
      name
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    title
    description
    stock
    ingredient
    barcode
    price
    expired_at
    image
    updated_at
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: String!) {
  deleteProduct(id: $id)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateDeliveryPersonDocument = gql`
    mutation CreateDeliveryPerson($input: CreateDeliveryPersonInput!) {
  createDeliveryPerson(input: $input) {
    id
    name
    image
    phone_number
    created_at
  }
}
    `;
export type CreateDeliveryPersonMutationFn = Apollo.MutationFunction<CreateDeliveryPersonMutation, CreateDeliveryPersonMutationVariables>;

/**
 * __useCreateDeliveryPersonMutation__
 *
 * To run a mutation, you first call `useCreateDeliveryPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeliveryPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeliveryPersonMutation, { data, loading, error }] = useCreateDeliveryPersonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeliveryPersonMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeliveryPersonMutation, CreateDeliveryPersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeliveryPersonMutation, CreateDeliveryPersonMutationVariables>(CreateDeliveryPersonDocument, options);
      }
export type CreateDeliveryPersonMutationHookResult = ReturnType<typeof useCreateDeliveryPersonMutation>;
export type CreateDeliveryPersonMutationResult = Apollo.MutationResult<CreateDeliveryPersonMutation>;
export type CreateDeliveryPersonMutationOptions = Apollo.BaseMutationOptions<CreateDeliveryPersonMutation, CreateDeliveryPersonMutationVariables>;
export const UpdateDeliveryPersonDocument = gql`
    mutation UpdateDeliveryPerson($id: String!, $input: UpdateDeliveryPersonInput!) {
  updateDeliveryPerson(id: $id, input: $input) {
    id
    name
    image
    phone_number
    updated_at
  }
}
    `;
export type UpdateDeliveryPersonMutationFn = Apollo.MutationFunction<UpdateDeliveryPersonMutation, UpdateDeliveryPersonMutationVariables>;

/**
 * __useUpdateDeliveryPersonMutation__
 *
 * To run a mutation, you first call `useUpdateDeliveryPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeliveryPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeliveryPersonMutation, { data, loading, error }] = useUpdateDeliveryPersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeliveryPersonMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeliveryPersonMutation, UpdateDeliveryPersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeliveryPersonMutation, UpdateDeliveryPersonMutationVariables>(UpdateDeliveryPersonDocument, options);
      }
export type UpdateDeliveryPersonMutationHookResult = ReturnType<typeof useUpdateDeliveryPersonMutation>;
export type UpdateDeliveryPersonMutationResult = Apollo.MutationResult<UpdateDeliveryPersonMutation>;
export type UpdateDeliveryPersonMutationOptions = Apollo.BaseMutationOptions<UpdateDeliveryPersonMutation, UpdateDeliveryPersonMutationVariables>;
export const DeleteDeliveryPersonDocument = gql`
    mutation DeleteDeliveryPerson($id: String!) {
  deleteDeliveryPerson(id: $id)
}
    `;
export type DeleteDeliveryPersonMutationFn = Apollo.MutationFunction<DeleteDeliveryPersonMutation, DeleteDeliveryPersonMutationVariables>;

/**
 * __useDeleteDeliveryPersonMutation__
 *
 * To run a mutation, you first call `useDeleteDeliveryPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDeliveryPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDeliveryPersonMutation, { data, loading, error }] = useDeleteDeliveryPersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDeliveryPersonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDeliveryPersonMutation, DeleteDeliveryPersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDeliveryPersonMutation, DeleteDeliveryPersonMutationVariables>(DeleteDeliveryPersonDocument, options);
      }
export type DeleteDeliveryPersonMutationHookResult = ReturnType<typeof useDeleteDeliveryPersonMutation>;
export type DeleteDeliveryPersonMutationResult = Apollo.MutationResult<DeleteDeliveryPersonMutation>;
export type DeleteDeliveryPersonMutationOptions = Apollo.BaseMutationOptions<DeleteDeliveryPersonMutation, DeleteDeliveryPersonMutationVariables>;
export const DeliverProductDocument = gql`
    mutation DeliverProduct($productId: String!, $shopId: String!, $deliveryPersonId: String!, $pieces: Int!) {
  deliverProduct(
    product_id: $productId
    shop_id: $shopId
    delivery_person_id: $deliveryPersonId
    pieces: $pieces
  ) {
    id
    pieces
    created_at
    product {
      id
      title
    }
    shop {
      id
      name
    }
    delivery_person {
      id
      name
    }
  }
}
    `;
export type DeliverProductMutationFn = Apollo.MutationFunction<DeliverProductMutation, DeliverProductMutationVariables>;

/**
 * __useDeliverProductMutation__
 *
 * To run a mutation, you first call `useDeliverProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeliverProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deliverProductMutation, { data, loading, error }] = useDeliverProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      shopId: // value for 'shopId'
 *      deliveryPersonId: // value for 'deliveryPersonId'
 *      pieces: // value for 'pieces'
 *   },
 * });
 */
export function useDeliverProductMutation(baseOptions?: Apollo.MutationHookOptions<DeliverProductMutation, DeliverProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeliverProductMutation, DeliverProductMutationVariables>(DeliverProductDocument, options);
      }
export type DeliverProductMutationHookResult = ReturnType<typeof useDeliverProductMutation>;
export type DeliverProductMutationResult = Apollo.MutationResult<DeliverProductMutation>;
export type DeliverProductMutationOptions = Apollo.BaseMutationOptions<DeliverProductMutation, DeliverProductMutationVariables>;
export const ConfirmDeliveryDocument = gql`
    mutation ConfirmDelivery($productId: String!, $shopId: String!, $deliveryPersonId: String!, $totalPrice: Int!, $transactionType: TransactionType!, $signature: String) {
  confirmDelivery(
    product_id: $productId
    shop_id: $shopId
    delivery_person_id: $deliveryPersonId
    total_price: $totalPrice
    transaction_type: $transactionType
    signature: $signature
  ) {
    id
    total_price
    transaction_type
    paid
    paid_at
    signature
    created_at
  }
}
    `;
export type ConfirmDeliveryMutationFn = Apollo.MutationFunction<ConfirmDeliveryMutation, ConfirmDeliveryMutationVariables>;

/**
 * __useConfirmDeliveryMutation__
 *
 * To run a mutation, you first call `useConfirmDeliveryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmDeliveryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmDeliveryMutation, { data, loading, error }] = useConfirmDeliveryMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      shopId: // value for 'shopId'
 *      deliveryPersonId: // value for 'deliveryPersonId'
 *      totalPrice: // value for 'totalPrice'
 *      transactionType: // value for 'transactionType'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useConfirmDeliveryMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmDeliveryMutation, ConfirmDeliveryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmDeliveryMutation, ConfirmDeliveryMutationVariables>(ConfirmDeliveryDocument, options);
      }
export type ConfirmDeliveryMutationHookResult = ReturnType<typeof useConfirmDeliveryMutation>;
export type ConfirmDeliveryMutationResult = Apollo.MutationResult<ConfirmDeliveryMutation>;
export type ConfirmDeliveryMutationOptions = Apollo.BaseMutationOptions<ConfirmDeliveryMutation, ConfirmDeliveryMutationVariables>;
export const ReturnProductDocument = gql`
    mutation ReturnProduct($productId: String!, $shopId: String!, $deliveryPersonId: String!, $pieces: Int!, $signature: String!) {
  returnProduct(
    product_id: $productId
    shop_id: $shopId
    delivery_person_id: $deliveryPersonId
    pieces: $pieces
    signature: $signature
  ) {
    id
    pieces
    signature
    created_at
  }
}
    `;
export type ReturnProductMutationFn = Apollo.MutationFunction<ReturnProductMutation, ReturnProductMutationVariables>;

/**
 * __useReturnProductMutation__
 *
 * To run a mutation, you first call `useReturnProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReturnProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [returnProductMutation, { data, loading, error }] = useReturnProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      shopId: // value for 'shopId'
 *      deliveryPersonId: // value for 'deliveryPersonId'
 *      pieces: // value for 'pieces'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useReturnProductMutation(baseOptions?: Apollo.MutationHookOptions<ReturnProductMutation, ReturnProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReturnProductMutation, ReturnProductMutationVariables>(ReturnProductDocument, options);
      }
export type ReturnProductMutationHookResult = ReturnType<typeof useReturnProductMutation>;
export type ReturnProductMutationResult = Apollo.MutationResult<ReturnProductMutation>;
export type ReturnProductMutationOptions = Apollo.BaseMutationOptions<ReturnProductMutation, ReturnProductMutationVariables>;
export const CreateVendorDocument = gql`
    mutation CreateVendor($input: CreateVendorInput!) {
  createVendor(input: $input) {
    id
    name
    email
    phone_number
    address
    image
    is_active
    created_at
  }
}
    `;
export type CreateVendorMutationFn = Apollo.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

/**
 * __useCreateVendorMutation__
 *
 * To run a mutation, you first call `useCreateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorMutation, { data, loading, error }] = useCreateVendorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, options);
      }
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = Apollo.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = Apollo.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const UpdateVendorDocument = gql`
    mutation UpdateVendor($id: String!, $input: UpdateVendorInput!) {
  updateVendor(id: $id, input: $input) {
    id
    name
    email
    phone_number
    address
    image
    is_active
    updated_at
  }
}
    `;
export type UpdateVendorMutationFn = Apollo.MutationFunction<UpdateVendorMutation, UpdateVendorMutationVariables>;

/**
 * __useUpdateVendorMutation__
 *
 * To run a mutation, you first call `useUpdateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVendorMutation, { data, loading, error }] = useUpdateVendorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVendorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVendorMutation, UpdateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVendorMutation, UpdateVendorMutationVariables>(UpdateVendorDocument, options);
      }
export type UpdateVendorMutationHookResult = ReturnType<typeof useUpdateVendorMutation>;
export type UpdateVendorMutationResult = Apollo.MutationResult<UpdateVendorMutation>;
export type UpdateVendorMutationOptions = Apollo.BaseMutationOptions<UpdateVendorMutation, UpdateVendorMutationVariables>;
export const DeleteVendorDocument = gql`
    mutation DeleteVendor($id: String!) {
  deleteVendor(id: $id)
}
    `;
export type DeleteVendorMutationFn = Apollo.MutationFunction<DeleteVendorMutation, DeleteVendorMutationVariables>;

/**
 * __useDeleteVendorMutation__
 *
 * To run a mutation, you first call `useDeleteVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVendorMutation, { data, loading, error }] = useDeleteVendorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVendorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteVendorMutation, DeleteVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteVendorMutation, DeleteVendorMutationVariables>(DeleteVendorDocument, options);
      }
export type DeleteVendorMutationHookResult = ReturnType<typeof useDeleteVendorMutation>;
export type DeleteVendorMutationResult = Apollo.MutationResult<DeleteVendorMutation>;
export type DeleteVendorMutationOptions = Apollo.BaseMutationOptions<DeleteVendorMutation, DeleteVendorMutationVariables>;
export const GetShopsDocument = gql`
    query GetShops {
  shops {
    id
    name
    address
    is_active
    email
    phone_number
    image
    created_at
    updated_at
    products {
      id
      title
      price
      stock
      image
    }
  }
}
    `;

/**
 * __useGetShopsQuery__
 *
 * To run a query within a React component, call `useGetShopsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShopsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShopsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShopsQuery(baseOptions?: Apollo.QueryHookOptions<GetShopsQuery, GetShopsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShopsQuery, GetShopsQueryVariables>(GetShopsDocument, options);
      }
export function useGetShopsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShopsQuery, GetShopsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShopsQuery, GetShopsQueryVariables>(GetShopsDocument, options);
        }
export function useGetShopsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShopsQuery, GetShopsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShopsQuery, GetShopsQueryVariables>(GetShopsDocument, options);
        }
export type GetShopsQueryHookResult = ReturnType<typeof useGetShopsQuery>;
export type GetShopsLazyQueryHookResult = ReturnType<typeof useGetShopsLazyQuery>;
export type GetShopsSuspenseQueryHookResult = ReturnType<typeof useGetShopsSuspenseQuery>;
export type GetShopsQueryResult = Apollo.QueryResult<GetShopsQuery, GetShopsQueryVariables>;
export const GetShopDocument = gql`
    query GetShop($id: String!) {
  shop(id: $id) {
    id
    name
    address
    is_active
    email
    phone_number
    image
    created_at
    updated_at
    products {
      id
      title
      description
      price
      stock
      ingredient
      barcode
      expired_at
      image
      created_at
      updated_at
    }
  }
}
    `;

/**
 * __useGetShopQuery__
 *
 * To run a query within a React component, call `useGetShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShopQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShopQuery(baseOptions: Apollo.QueryHookOptions<GetShopQuery, GetShopQueryVariables> & ({ variables: GetShopQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShopQuery, GetShopQueryVariables>(GetShopDocument, options);
      }
export function useGetShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShopQuery, GetShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShopQuery, GetShopQueryVariables>(GetShopDocument, options);
        }
export function useGetShopSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetShopQuery, GetShopQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetShopQuery, GetShopQueryVariables>(GetShopDocument, options);
        }
export type GetShopQueryHookResult = ReturnType<typeof useGetShopQuery>;
export type GetShopLazyQueryHookResult = ReturnType<typeof useGetShopLazyQuery>;
export type GetShopSuspenseQueryHookResult = ReturnType<typeof useGetShopSuspenseQuery>;
export type GetShopQueryResult = Apollo.QueryResult<GetShopQuery, GetShopQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  products {
    id
    title
    description
    stock
    ingredient
    barcode
    price
    expired_at
    image
    created_at
    updated_at
    shop {
      id
      name
      address
    }
    vendor {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: String!) {
  product(id: $id) {
    id
    title
    description
    stock
    ingredient
    barcode
    price
    expired_at
    image
    created_at
    updated_at
    shop {
      id
      name
      address
      email
      phone_number
    }
    product_stock {
      id
      pieces
      is_delivered
      created_at
    }
    product_remaining {
      id
      pieces
      is_delivered
      created_at
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsByShopDocument = gql`
    query GetProductsByShop($shopId: String!) {
  productsByShop(shop_id: $shopId) {
    id
    title
    description
    stock
    price
    image
    created_at
  }
}
    `;

/**
 * __useGetProductsByShopQuery__
 *
 * To run a query within a React component, call `useGetProductsByShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsByShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsByShopQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useGetProductsByShopQuery(baseOptions: Apollo.QueryHookOptions<GetProductsByShopQuery, GetProductsByShopQueryVariables> & ({ variables: GetProductsByShopQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsByShopQuery, GetProductsByShopQueryVariables>(GetProductsByShopDocument, options);
      }
export function useGetProductsByShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsByShopQuery, GetProductsByShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsByShopQuery, GetProductsByShopQueryVariables>(GetProductsByShopDocument, options);
        }
export function useGetProductsByShopSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsByShopQuery, GetProductsByShopQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsByShopQuery, GetProductsByShopQueryVariables>(GetProductsByShopDocument, options);
        }
export type GetProductsByShopQueryHookResult = ReturnType<typeof useGetProductsByShopQuery>;
export type GetProductsByShopLazyQueryHookResult = ReturnType<typeof useGetProductsByShopLazyQuery>;
export type GetProductsByShopSuspenseQueryHookResult = ReturnType<typeof useGetProductsByShopSuspenseQuery>;
export type GetProductsByShopQueryResult = Apollo.QueryResult<GetProductsByShopQuery, GetProductsByShopQueryVariables>;
export const GetDeliveryPersonsDocument = gql`
    query GetDeliveryPersons {
  deliveryPersons {
    id
    name
    image
    phone_number
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetDeliveryPersonsQuery__
 *
 * To run a query within a React component, call `useGetDeliveryPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeliveryPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeliveryPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeliveryPersonsQuery(baseOptions?: Apollo.QueryHookOptions<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>(GetDeliveryPersonsDocument, options);
      }
export function useGetDeliveryPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>(GetDeliveryPersonsDocument, options);
        }
export function useGetDeliveryPersonsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>(GetDeliveryPersonsDocument, options);
        }
export type GetDeliveryPersonsQueryHookResult = ReturnType<typeof useGetDeliveryPersonsQuery>;
export type GetDeliveryPersonsLazyQueryHookResult = ReturnType<typeof useGetDeliveryPersonsLazyQuery>;
export type GetDeliveryPersonsSuspenseQueryHookResult = ReturnType<typeof useGetDeliveryPersonsSuspenseQuery>;
export type GetDeliveryPersonsQueryResult = Apollo.QueryResult<GetDeliveryPersonsQuery, GetDeliveryPersonsQueryVariables>;
export const GetProductDeliveredHistoryDocument = gql`
    query GetProductDeliveredHistory($shopId: String) {
  productDeliveredHistory(shop_id: $shopId) {
    id
    total_price
    transaction_type
    paid
    paid_at
    signature
    created_at
    product {
      id
      title
      image
    }
    shop {
      id
      name
    }
    delivery_person {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProductDeliveredHistoryQuery__
 *
 * To run a query within a React component, call `useGetProductDeliveredHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductDeliveredHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductDeliveredHistoryQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useGetProductDeliveredHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>(GetProductDeliveredHistoryDocument, options);
      }
export function useGetProductDeliveredHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>(GetProductDeliveredHistoryDocument, options);
        }
export function useGetProductDeliveredHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>(GetProductDeliveredHistoryDocument, options);
        }
export type GetProductDeliveredHistoryQueryHookResult = ReturnType<typeof useGetProductDeliveredHistoryQuery>;
export type GetProductDeliveredHistoryLazyQueryHookResult = ReturnType<typeof useGetProductDeliveredHistoryLazyQuery>;
export type GetProductDeliveredHistorySuspenseQueryHookResult = ReturnType<typeof useGetProductDeliveredHistorySuspenseQuery>;
export type GetProductDeliveredHistoryQueryResult = Apollo.QueryResult<GetProductDeliveredHistoryQuery, GetProductDeliveredHistoryQueryVariables>;
export const GetProductReturnHistoryDocument = gql`
    query GetProductReturnHistory($shopId: String) {
  productReturnHistory(shop_id: $shopId) {
    id
    pieces
    signature
    created_at
    product {
      id
      title
      image
    }
    shop {
      id
      name
    }
    delivery_person {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProductReturnHistoryQuery__
 *
 * To run a query within a React component, call `useGetProductReturnHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductReturnHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductReturnHistoryQuery({
 *   variables: {
 *      shopId: // value for 'shopId'
 *   },
 * });
 */
export function useGetProductReturnHistoryQuery(baseOptions?: Apollo.QueryHookOptions<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>(GetProductReturnHistoryDocument, options);
      }
export function useGetProductReturnHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>(GetProductReturnHistoryDocument, options);
        }
export function useGetProductReturnHistorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>(GetProductReturnHistoryDocument, options);
        }
export type GetProductReturnHistoryQueryHookResult = ReturnType<typeof useGetProductReturnHistoryQuery>;
export type GetProductReturnHistoryLazyQueryHookResult = ReturnType<typeof useGetProductReturnHistoryLazyQuery>;
export type GetProductReturnHistorySuspenseQueryHookResult = ReturnType<typeof useGetProductReturnHistorySuspenseQuery>;
export type GetProductReturnHistoryQueryResult = Apollo.QueryResult<GetProductReturnHistoryQuery, GetProductReturnHistoryQueryVariables>;
export const GetVendorsDocument = gql`
    query GetVendors {
  vendors {
    id
    name
    email
    phone_number
    address
    image
    is_active
    created_at
    updated_at
    products {
      id
      title
      price
    }
  }
}
    `;

/**
 * __useGetVendorsQuery__
 *
 * To run a query within a React component, call `useGetVendorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetVendorsQuery(baseOptions?: Apollo.QueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
      }
export function useGetVendorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
        }
export function useGetVendorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVendorsQuery, GetVendorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVendorsQuery, GetVendorsQueryVariables>(GetVendorsDocument, options);
        }
export type GetVendorsQueryHookResult = ReturnType<typeof useGetVendorsQuery>;
export type GetVendorsLazyQueryHookResult = ReturnType<typeof useGetVendorsLazyQuery>;
export type GetVendorsSuspenseQueryHookResult = ReturnType<typeof useGetVendorsSuspenseQuery>;
export type GetVendorsQueryResult = Apollo.QueryResult<GetVendorsQuery, GetVendorsQueryVariables>;
export const GetVendorDocument = gql`
    query GetVendor($id: String!) {
  vendor(id: $id) {
    id
    name
    email
    phone_number
    address
    image
    is_active
    created_at
    updated_at
    products {
      id
      title
      price
    }
  }
}
    `;

/**
 * __useGetVendorQuery__
 *
 * To run a query within a React component, call `useGetVendorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetVendorQuery(baseOptions: Apollo.QueryHookOptions<GetVendorQuery, GetVendorQueryVariables> & ({ variables: GetVendorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorQuery, GetVendorQueryVariables>(GetVendorDocument, options);
      }
export function useGetVendorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorQuery, GetVendorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorQuery, GetVendorQueryVariables>(GetVendorDocument, options);
        }
export function useGetVendorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetVendorQuery, GetVendorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetVendorQuery, GetVendorQueryVariables>(GetVendorDocument, options);
        }
export type GetVendorQueryHookResult = ReturnType<typeof useGetVendorQuery>;
export type GetVendorLazyQueryHookResult = ReturnType<typeof useGetVendorLazyQuery>;
export type GetVendorSuspenseQueryHookResult = ReturnType<typeof useGetVendorSuspenseQuery>;
export type GetVendorQueryResult = Apollo.QueryResult<GetVendorQuery, GetVendorQueryVariables>;