// frontend/app/vendors/page.tsx
"use client";

import React, { useState } from "react";
import {
  useGetVendorsQuery,
  useDeleteVendorMutation,
} from "@/generated/graphql";
import Modal from "@/components/ui/Modal";
import VendorForm from "@/components/forms/VendorForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useUser } from "@clerk/nextjs";
// import { format } from "date-fns";

const VendorsPage: React.FC = () => {
  const { data, loading, error, refetch } = useGetVendorsQuery();
  const [deleteVendor] = useDeleteVendorMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { isLoaded, isSignedIn, user } = useUser();
  const userRole = user?.publicMetadata?.role as
    | "ADMIN"
    | "VENDOR"
    | "USER"
    | undefined;

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      try {
        await deleteVendor({ variables: { id } });
        refetch();
      } catch (err: any) {
        alert(`Error deleting vendor: ${err.message}`);
      }
    }
  };

  const handleEdit = (vendor: any) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setSelectedVendor(null);
    refetch();
  };

  if (loading || !isLoaded) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const vendors = data?.vendors || [];

  const canManageVendors = userRole === "ADMIN";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8 drop-shadow-lg">
          Vendor Management
        </h1>

        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">All Vendors</h2>
            {canManageVendors && (
              <button
                onClick={() => {
                  setSelectedVendor(null);
                  setIsModalOpen(true);
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Add New Vendor
              </button>
            )}
          </div>

          {vendors.length === 0 ? (
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
                      Last Updated
                    </th>
                    {canManageVendors && (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vendors.map((vendor) => (
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
                          onClick={() => handleEdit(vendor)}
                          className="text-orange-500 hover:text-orange-700 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(vendor.id)}
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
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedVendor ? "Edit Vendor" : "Create New Vendor"}
      >
        <VendorForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleFormSuccess}
          initialData={selectedVendor || {}}
        />
      </Modal>
    </div>
  );
};

export default VendorsPage;
