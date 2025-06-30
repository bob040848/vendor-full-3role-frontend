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
        description
        stock
        ingredient
        barcode
        price
        expired_at
        image
        created_at
        updated_at
      }
      product_deliveries {
        id
        pieces
        created_at
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
      shop_orders {
        id
        order_number
        status
        total_amount
        created_at
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
        created_at
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
        stock
        ingredient
        barcode
        price
        expired_at
        image
        created_at
        updated_at
        vendor {
          id
          name
        }
      }
      product_deliveries {
        id
        pieces
        created_at
        product {
          id
          title
        }
        delivery_person {
          id
          name
        }
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        signature
        created_at
        product {
          id
          title
        }
        delivery_person {
          id
          name
        }
      }
      product_return_history {
        id
        pieces
        signature
        created_at
        product {
          id
          title
        }
        delivery_person {
          id
          name
        }
      }
      shop_orders {
        id
        order_number
        status
        total_amount
        notes
        ordered_at
        delivered_at
        created_at
        updated_at
        vendor {
          id
          name
        }
        user {
          id
          email
        }
        order_items {
          id
          quantity
          unit_price
          total_price
          product {
            id
            title
          }
        }
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
        created_at
        updated_at
        vendor {
          id
          name
        }
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
        email
        phone_number
      }
      vendor {
        id
        name
        email
      }
      product_deliveries {
        id
        pieces
        created_at
        delivery_person {
          id
          name
        }
        shop {
          id
          name
        }
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        signature
        created_at
        delivery_person {
          id
          name
        }
        shop {
          id
          name
        }
      }
      product_return_history {
        id
        pieces
        signature
        created_at
        delivery_person {
          id
          name
        }
        shop {
          id
          name
        }
      }
      product_remaining {
        id
        pieces
        is_delivered
        created_at
      }
      product_stock {
        id
        pieces
        is_delivered
        created_at
      }
      shop_order_items {
        id
        quantity
        unit_price
        total_price
        created_at
        shop_order {
          id
          order_number
          status
        }
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
        is_active
      }
      vendor {
        id
        name
        email
        phone_number
        is_active
      }
      product_deliveries {
        id
        pieces
        created_at
        delivery_person {
          id
          name
          phone_number
        }
        shop {
          id
          name
        }
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        signature
        created_at
        delivery_person {
          id
          name
        }
        shop {
          id
          name
        }
      }
      product_return_history {
        id
        pieces
        signature
        created_at
        delivery_person {
          id
          name
        }
        shop {
          id
          name
        }
      }
      product_remaining {
        id
        pieces
        is_delivered
        created_at
      }
      product_stock {
        id
        pieces
        is_delivered
        created_at
      }
      shop_order_items {
        id
        quantity
        unit_price
        total_price
        created_at
        shop_order {
          id
          order_number
          status
        }
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
      ingredient
      barcode
      price
      expired_at
      image
      created_at
      updated_at
      vendor {
        id
        name
        email
      }
      product_deliveries {
        id
        pieces
        created_at
        delivery_person {
          id
          name
        }
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        signature
        created_at
        delivery_person {
          id
          name
        }
      }
      product_return_history {
        id
        pieces
        signature
        created_at
        delivery_person {
          id
          name
        }
      }
      product_remaining {
        id
        pieces
        is_delivered
        created_at
      }
      product_stock {
        id
        pieces
        is_delivered
        created_at
      }
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
      product_deliveries {
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
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        signature
        created_at
        product {
          id
          title
        }
        shop {
          id
          name
        }
      }
      product_return_history {
        id
        pieces
        signature
        created_at
        product {
          id
          title
        }
        shop {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT_DELIVERED_HISTORY = gql`
  query GetProductDeliveredHistory($shopId: String) {
    productDeliveredHistory(shop_id: $shopId) {
      id
      pieces
      total_price
      transaction_type
      paid
      paid_at
      signature
      created_at
      updated_at
      product {
        id
        title
        image
        price
        vendor {
          id
          name
        }
      }
      shop {
        id
        name
        address
      }
      delivery_person {
        id
        name
        phone_number
      }
      payment {
        id
        amount
        transaction_type
        payment_reference
        paid_at
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
      updated_at
      product {
        id
        title
        image
        vendor {
          id
          name
        }
      }
      shop {
        id
        name
        address
      }
      delivery_person {
        id
        name
        phone_number
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
        description
        price
        stock
        image
        created_at
      }
      shop_orders {
        id
        order_number
        status
        total_amount
        created_at
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
        created_at
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
        description
        price
        stock
        ingredient
        barcode
        expired_at
        image
        created_at
        updated_at
        shop {
          id
          name
        }
      }
      shop_orders {
        id
        order_number
        status
        total_amount
        notes
        ordered_at
        delivered_at
        created_at
        updated_at
        shop {
          id
          name
        }
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
        created_at
        updated_at
        shop {
          id
          name
        }
      }
    }
  }
`;

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
      updated_at
      products {
        id
        title
        price
      }
      product_deliveries {
        id
        pieces
        created_at
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
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
      created_at
      updated_at

      shop_orders {
        id
        order_number
        status
        total_amount
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
      }

      products {
        id
        title
        price
      }
      product_deliveries {
        id
        pieces
        created_at
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
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
      updated_at
      shop {
        id
        name
        address
      }
      vendor {
        id
        name
        email
      }
      product_deliveries {
        id
        pieces
        created_at
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
      product_remaining {
        id
        pieces
        is_delivered
        created_at
      }
      product_stock {
        id
        pieces
        is_delivered
        created_at
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
        email
      }
      product_deliveries {
        id
        pieces
        created_at
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
      product_remaining {
        id
        pieces
        is_delivered
        created_at
      }
      product_stock {
        id
        pieces
        is_delivered
        created_at
      }
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
      updated_at
      product_deliveries {
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
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
    }
  }
`;

export const UPDATE_DELIVERY_PERSON = gql`
  mutation UpdateDeliveryPerson($id: String!, $input: UpdateDeliveryPersonInput!) {
    updateDeliveryPerson(id: $id, input: $input) {
      id
      name
      image
      phone_number
      created_at
      updated_at
      product_deliveries {
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
      }
      product_delivered_history {
        id
        pieces
        total_price
        transaction_type
        paid
        paid_at
        created_at
      }
      product_return_history {
        id
        pieces
        created_at
      }
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
      updated_at
      product {
        id
        title
        price
        vendor {
          id
          name
        }
      }
      shop {
        id
        name
        address
      }
      delivery_person {
        id
        name
        phone_number
      }
    }
  }
`;

export const CONFIRM_DELIVERY = gql`
  mutation ConfirmDelivery(
    $productId: String!
    $shopId: String!
    $deliveryPersonId: String!
    $pieces: Int!
    $totalPrice: Int!
    $transactionType: TransactionType!
    $signature: String
  ) {
    confirmDelivery(
      product_id: $productId
      shop_id: $shopId
      delivery_person_id: $deliveryPersonId
      pieces: $pieces
      total_price: $totalPrice
      transaction_type: $transactionType
      signature: $signature
    ) {
      id
      pieces
      total_price
      transaction_type
      paid
      paid_at
      signature
      created_at
      updated_at
      product {
        id
        title
        vendor {
          id
          name
        }
      }
      shop {
        id
        name
        address
      }
      delivery_person {
        id
        name
        phone_number
      }
      payment {
        id
        amount
        transaction_type
        payment_reference
        paid_at
      }
    }
  }
`;

export const RETURN_PRODUCT = gql`
  mutation ReturnProduct(
    $productId: String!
    $shopId: String!
    $deliveryPersonId: String!
    $pieces: Int!
    $signature: String
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
      updated_at
      product {
        id
        title
        vendor {
          id
          name
        }
      }
      shop {
        id
        name
        address
      }
      delivery_person {
        id
        name
        phone_number
      }
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
      updated_at

      user {
        id
        email
        firstName
        lastName
      }

      products {
        id
        title
        price
        stock
      }
      shop_orders {
        id
        order_number
        status
        total_amount
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
      }
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
      created_at
      updated_at

      user {
        id
        email
        firstName
        lastName
      }

      products {
        id
        title
        price
        stock
      }
      shop_orders {
        id
        order_number
        status
        total_amount
      }
      daily_sales_reports {
        id
        date
        total_sales
        total_orders
        cash_sales
        transfer_sales
        pending_payments
      }
    }
  }
`;

export const DELETE_VENDOR = gql`
  mutation DeleteVendor($id: String!) {
    deleteVendor(id: $id)
  }
`;