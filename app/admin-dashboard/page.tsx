// frontend/app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import {
  useGetShopsQuery,
  useDeleteShopMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useGetDeliveryPersonsQuery,
  useDeleteDeliveryPersonMutation,
  useGetVendorsQuery,
  useDeleteVendorMutation,
  useGetProductDeliveredHistoryQuery,
} from "@/generated/graphql";
import Modal from "@/components/ui/Modal";
import ShopForm from "@/components/forms/ShopForm";
import ProductForm from "@/components/forms/ProductForm";
import DeliveryPersonForm from "@/components/forms/DeliveryPersonForm";
import VendorForm from "@/components/forms/VendorForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { format } from "date-fns";

const AdminDashboard: React.FC = () => {
  const {
    data: shopsData,
    loading: shopsLoading,
    error: shopsError,
    refetch: refetchShops,
  } = useGetShopsQuery();
  const [deleteShop] = useDeleteShopMutation();
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any>(null);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const {
    data: deliveryPersonsData,
    loading: deliveryPersonsLoading,
    error: deliveryPersonsError,
    refetch: refetchDeliveryPersons,
  } = useGetDeliveryPersonsQuery();
  const [deleteDeliveryPerson] = useDeleteDeliveryPersonMutation();
  const [isDeliveryPersonModalOpen, setIsDeliveryPersonModalOpen] =
    useState(false);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] =
    useState<any>(null);

  const {
    data: vendorsData,
    loading: vendorsLoading,
    error: vendorsError,
    refetch: refetchVendors,
  } = useGetVendorsQuery();
  const [deleteVendor] = useDeleteVendorMutation();
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);

  const {
    data: deliveredHistoryData,
    loading: deliveredHistoryLoading,
    error: deliveredHistoryError,
    refetch: refetchDeliveredHistory,
  } = useGetProductDeliveredHistoryQuery();

  const handleDeleteShop = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await deleteShop({ variables: { id } });
        refetchShops();
      } catch (err: any) {
        alert(`Error deleting shop: ${err.message}`);
      }
    }
  };

  const handleEditShop = (shop: any) => {
    setSelectedShop(shop);
    setIsShopModalOpen(true);
  };

  const handleShopFormSuccess = () => {
    setIsShopModalOpen(false);
    setSelectedShop(null);
    refetchShops();
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({ variables: { id } });
        refetchProducts();
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleProductFormSuccess = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
    refetchProducts();
  };

  const handleDeleteDeliveryPerson = async (id: string) => {
    if (
      window.confirm("Are you sure you want to delete this delivery person?")
    ) {
      try {
        await deleteDeliveryPerson({ variables: { id } });
        refetchDeliveryPersons();
      } catch (err: any) {
        alert(`Error deleting delivery person: ${err.message}`);
      }
    }
  };

  const handleEditDeliveryPerson = (person: any) => {
    setSelectedDeliveryPerson(person);
    setIsDeliveryPersonModalOpen(true);
  };

  const handleDeliveryPersonFormSuccess = () => {
    setIsDeliveryPersonModalOpen(false);
    setSelectedDeliveryPerson(null);
    refetchDeliveryPersons();
  };

  const handleDeleteVendor = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await deleteVendor({ variables: { id } });
        refetchVendors();
      } catch (err: any) {
        alert(`Error deleting vendor: ${err.message}`);
      }
    }
  };

  const handleEditVendor = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsVendorModalOpen(true);
  };

  const handleVendorFormSuccess = () => {
    setIsVendorModalOpen(false);
    setSelectedVendor(null);
    refetchVendors();
  };

  const totalDailyIncome =
    deliveredHistoryData?.productDeliveredHistory.reduce(
      (sum, item) => sum + item.total_price,
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-10 drop-shadow-lg">
          Admin Dashboard
        </h1>

        <section className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Daily Income (All Shops)
          </h2>
          {deliveredHistoryLoading ? (
            <LoadingSpinner />
          ) : deliveredHistoryError ? (
            <ErrorMessage
              message={`Error loading income data: ${deliveredHistoryError.message}`}
            />
          ) : (
            <div className="text-center">
              <p className="text-5xl font-extrabold text-green-400">
                ₮{totalDailyIncome.toLocaleString()}
              </p>
              <p className="text-gray-400 mt-2">
                Total income from all confirmed deliveries.
              </p>
            </div>
          )}
        </section>

        <section className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Shop Management
            </h2>
            <button
              onClick={() => {
                setSelectedShop(null);
                setIsShopModalOpen(true);
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Add New Shop
            </button>
          </div>
          {shopsLoading ? (
            <LoadingSpinner />
          ) : shopsError ? (
            <ErrorMessage
              message={`Error loading shops: ${shopsError.message}`}
            />
          ) : shopsData?.shops.length === 0 ? (
            <p className="text-center text-gray-400">No shops found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {shopsData?.shops.map((shop) => (
                    <tr
                      key={shop.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {shop.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {shop.address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {shop.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            shop.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {shop.is_active ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditShop(shop)}
                          className="text-orange-500 hover:text-orange-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteShop(shop.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Product Management
            </h2>
            <button
              onClick={() => {
                setSelectedProduct(null);
                setIsProductModalOpen(true);
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Add New Product
            </button>
          </div>
          {productsLoading ? (
            <LoadingSpinner />
          ) : productsError ? (
            <ErrorMessage
              message={`Error loading products: ${productsError.message}`}
            />
          ) : productsData?.products.length === 0 ? (
            <p className="text-center text-gray-400">No products found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Shop
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {productsData?.products.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {product.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {product.vendor?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {product.shop?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-orange-500 hover:text-orange-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Vendor Management
            </h2>
            <button
              onClick={() => {
                setSelectedVendor(null);
                setIsVendorModalOpen(true);
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Add New Vendor
            </button>
          </div>
          {vendorsLoading ? (
            <LoadingSpinner />
          ) : vendorsError ? (
            <ErrorMessage
              message={`Error loading vendors: ${vendorsError.message}`}
            />
          ) : vendorsData?.vendors.length === 0 ? (
            <p className="text-center text-gray-400">No vendors found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Active
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vendorsData?.vendors.map((vendor) => (
                    <tr
                      key={vendor.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {vendor.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {vendor.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {vendor.phone_number || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            vendor.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vendor.is_active ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditVendor(vendor)}
                          className="text-orange-500 hover:text-orange-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVendor(vendor.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Delivery Person Management
            </h2>
            <button
              onClick={() => {
                setSelectedDeliveryPerson(null);
                setIsDeliveryPersonModalOpen(true);
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Add New Delivery Person
            </button>
          </div>
          {deliveryPersonsLoading ? (
            <LoadingSpinner />
          ) : deliveryPersonsError ? (
            <ErrorMessage
              message={`Error loading delivery persons: ${deliveryPersonsError.message}`}
            />
          ) : deliveryPersonsData?.deliveryPersons.length === 0 ? (
            <p className="text-center text-gray-400">
              No delivery persons found.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Last Updated
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {deliveryPersonsData?.deliveryPersons.map((person) => (
                    <tr
                      key={person.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {person.image ? (
                          <img
                            src={person.image}
                            alt={person.name}
                            className="h-10 w-10 rounded-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).onerror = null;
                              (
                                e.target as HTMLImageElement
                              ).src = `https://placehold.co/40x40/525252/FFF?text=NoImg`;
                            }}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-xs text-gray-300">
                            No Img
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {person.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {person.phone_number || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {person.updated_at
                          ? format(
                              new Date(person.updated_at),
                              "MMM dd,yyyy HH:mm"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditShop(person)}
                          className="text-orange-500 hover:text-orange-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteShop(person.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <Modal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
        title={selectedShop ? "Edit Shop" : "Create New Shop"}
      >
        <ShopForm
          onClose={() => setIsShopModalOpen(false)}
          onSuccess={handleShopFormSuccess}
          initialData={selectedShop || {}}
        />
      </Modal>

      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={selectedProduct ? "Edit Product" : "Create New Product"}
      >
        <ProductForm
          onClose={() => setIsProductModalOpen(false)}
          onSuccess={handleProductFormSuccess}
          initialData={selectedProduct || {}}
        />
      </Modal>

      <Modal
        isOpen={isDeliveryPersonModalOpen}
        onClose={() => setIsDeliveryPersonModalOpen(false)}
        title={
          selectedDeliveryPerson
            ? "Edit Delivery Person"
            : "Create New Delivery Person"
        }
      >
        <DeliveryPersonForm
          onClose={() => setIsDeliveryPersonModalOpen(false)}
          onSuccess={handleDeliveryPersonFormSuccess}
          initialData={selectedDeliveryPerson || {}}
        />
      </Modal>

      <Modal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        title={selectedVendor ? "Edit Vendor" : "Create New Vendor"}
      >
        <VendorForm
          onClose={() => setIsVendorModalOpen(false)}
          onSuccess={handleVendorFormSuccess}
          initialData={selectedVendor || {}}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
