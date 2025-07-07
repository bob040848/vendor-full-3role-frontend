// frontend/app/delivery/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useGetProductDeliveredHistoryQuery } from "@/generated/graphql";
import Modal from "@/components/ui/Modal";
import DeliveryConfirmForm from "@/components/forms/DeliveryConfirmForm";
import { ProductReturnForm } from "@/components/forms/ProductReturnForm";
import LoadingSpinner from "@/components//LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { useGetDeliveryPersonsQuery } from "@/generated/graphql";

const DeliveryPage: React.FC = () => {
  const { userId } = useAuth();
  const {
    data: deliveryPersonsData,
    loading: deliveryPersonsLoading,
    error: deliveryPersonsError,
  } = useGetDeliveryPersonsQuery();

  const [deliveryPersonId, setDeliveryPersonId] = useState<string | null>(null);

  useEffect(() => {
    if (userId && deliveryPersonsData) {
      if (deliveryPersonsData.deliveryPersons.length > 0) {
        setDeliveryPersonId(deliveryPersonsData.deliveryPersons[0].id);
      }
    }
  }, [userId, deliveryPersonsData]);

  const { data, loading, error, refetch } = useGetProductDeliveredHistoryQuery({
    variables: { shopId: undefined },
    skip: !deliveryPersonId,
  });

  const [isConfirmDeliveryModalOpen, setIsConfirmDeliveryModalOpen] =
    useState(false);
  const [isReturnProductModalOpen, setIsReturnProductModalOpen] =
    useState(false);
  const [selectedDeliveryItem, setSelectedDeliveryItem] = useState<any>(null);

  const handleConfirmDeliverySuccess = () => {
    setIsConfirmDeliveryModalOpen(false);
    refetch();
  };

  const handleReturnProductSuccess = () => {
    setIsReturnProductModalOpen(false);
    refetch();
  };

  const openReturnModal = (item: any) => {
    setSelectedDeliveryItem(item);
    setIsReturnProductModalOpen(true);
  };

  if (deliveryPersonsLoading || !deliveryPersonId) return <LoadingSpinner />;
  if (deliveryPersonsError)
    return <ErrorMessage message="Failed to load delivery person data." />;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const deliveredHistory = data?.productDeliveredHistory || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8 drop-shadow-lg">
          Salesperson Dashboard
        </h1>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">
              Product Deliveries History
            </h2>
            <button
              onClick={() => setIsConfirmDeliveryModalOpen(true)}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
            >
              Confirm New Delivery
            </button>
          </div>

          {deliveredHistory.length === 0 ? (
            <p className="text-center text-gray-400">
              No product delivery history found.
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
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Shop Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Delivery Person
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Transaction Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Delivered At
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
                  {deliveredHistory.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.product?.title || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.shop?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.delivery_person?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${item.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.transaction_type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {item.created_at
                          ? format(
                              new Date(item.created_at),
                              "MMM dd,yyyy HH:mm"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openReturnModal(item)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        >
                          Return Product
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isConfirmDeliveryModalOpen}
        onClose={() => setIsConfirmDeliveryModalOpen(false)}
        title="Confirm Product Delivery"
      >
        <DeliveryConfirmForm
          onClose={() => setIsConfirmDeliveryModalOpen(false)}
          onSuccess={handleConfirmDeliverySuccess}
          initialData={{ deliveryPersonId: deliveryPersonId || "" }}
        />
      </Modal>

      <Modal
        isOpen={isReturnProductModalOpen}
        onClose={() => setIsReturnProductModalOpen(false)}
        title="Return Product"
      >
        <ProductReturnForm
          onClose={() => setIsReturnProductModalOpen(false)}
          onSuccess={handleReturnProductSuccess}
          initialData={{
            productId: selectedDeliveryItem?.product?.id,
            shopId: selectedDeliveryItem?.shop?.id,
            deliveryPersonId: selectedDeliveryItem?.delivery_person?.id,
          }}
        />
      </Modal>
    </div>
  );
};

export default DeliveryPage;
