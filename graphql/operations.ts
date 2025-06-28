// frontend/graphql/operations.ts
import { gql } from "@apollo/client";

export const GET_SHOPS = gql`
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

export const GET_SHOP = gql`
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

export const GET_PRODUCTS = gql`
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

export const GET_PRODUCT = gql`
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

export const GET_PRODUCTS_BY_SHOP = gql`
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

export const GET_DELIVERY_PERSONS = gql`
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

export const GET_PRODUCT_DELIVERED_HISTORY = gql`
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

export const GET_PRODUCT_RETURN_HISTORY = gql`
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

export const GET_VENDORS = gql`
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

export const GET_VENDOR = gql`
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

// MUTATIONS
export const CREATE_SHOP = gql`
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

export const UPDATE_SHOP = gql`
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

export const DELETE_SHOP = gql`
  mutation DeleteShop($id: String!) {
    deleteShop(id: $id)
  }
`;

export const CREATE_PRODUCT = gql`
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

export const UPDATE_PRODUCT = gql`
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

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const CREATE_DELIVERY_PERSON = gql`
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

export const UPDATE_DELIVERY_PERSON = gql`
  mutation UpdateDeliveryPerson(
    $id: String!
    $input: UpdateDeliveryPersonInput!
  ) {
    updateDeliveryPerson(id: $id, input: $input) {
      id
      name
      image
      phone_number
      updated_at
    }
  }
`;

export const DELETE_DELIVERY_PERSON = gql`
  mutation DeleteDeliveryPerson($id: String!) {
    deleteDeliveryPerson(id: $id)
  }
`;

export const DELIVER_PRODUCT = gql`
  mutation DeliverProduct(
    $productId: String!
    $shopId: String!
    $deliveryPersonId: String!
    $pieces: Int!
  ) {
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

export const CONFIRM_DELIVERY = gql`
  mutation ConfirmDelivery(
    $productId: String!
    $shopId: String!
    $deliveryPersonId: String!
    $totalPrice: Int!
    $transactionType: TransactionType!
    $signature: String
  ) {
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

export const RETURN_PRODUCT = gql`
  mutation ReturnProduct(
    $productId: String!
    $shopId: String!
    $deliveryPersonId: String!
    $pieces: Int!
    $signature: String!
  ) {
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

export const CREATE_VENDOR = gql`
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

export const UPDATE_VENDOR = gql`
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

export const DELETE_VENDOR = gql`
  mutation DeleteVendor($id: String!) {
    deleteVendor(id: $id)
  }
`;
