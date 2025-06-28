// frontend/components/forms/VendorForm.tsx
"use client";

import React, { useState } from "react";
import {
  useCreateVendorMutation,
  useUpdateVendorMutation,
} from "@/generated/graphql";
import { z } from "zod";
import { createVendorSchema, updateVendorSchema } from "@/lib/zod-schemas";
// import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from "../ui/ErrorMessage";

type VendorFormProps = {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    id?: string;
    name?: string;
    email?: string;
    phone_number?: string | null;
    address?: string | null;
    image?: string | null;
    is_active?: boolean;
  };
};

const VendorForm: React.FC<VendorFormProps> = ({
  onClose,
  onSuccess,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialData?.phone_number || ""
  );
  const [address, setAddress] = useState(initialData?.address || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [createVendor, { loading: createLoading }] = useCreateVendorMutation();
  const [updateVendor, { loading: updateLoading }] = useUpdateVendorMutation();

  const isEditing = !!initialData?.id;
  const loading = createLoading || updateLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitError(null);

    let validationResult;
    let input: any;

    if (isEditing) {
      input = {
        name: name || undefined,
        email: email || undefined,
        phone_number: phoneNumber === "" ? undefined : phoneNumber,
        address: address === "" ? undefined : address,
        image: image === "" ? undefined : image,
        is_active: isActive,
      };
      validationResult = updateVendorSchema.safeParse(input);
    } else {
      input = {
        name,
        email,
        phone_number: phoneNumber || undefined,
        address: address || undefined,
        image: image || undefined,
      };
      validationResult = createVendorSchema.safeParse(input);
    }

    if (!validationResult.success) {
      setErrors(validationResult.error.issues);
      return;
    }

    try {
      if (isEditing) {
        await updateVendor({
          variables: { id: initialData!.id!, input: input },
        });
      } else {
        await createVendor({
          variables: { input: input },
        });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Vendor Form Error:", err);
      setSubmitError(err.message || "An unexpected error occurred.");
    }
  };

  const getErrorMessage = (field: string) =>
    errors.find((err) => err.path[0] === field)?.message;

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 text-white">
      {submitError && <ErrorMessage message={submitError} />}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Vendor Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter vendor name"
        />
        {getErrorMessage("name") && (
          <p className="text-red-400 text-xs mt-1">{getErrorMessage("name")}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter vendor email"
        />
        {getErrorMessage("email") && (
          <p className="text-red-400 text-xs mt-1">
            {getErrorMessage("email")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Phone Number (Optional)
        </label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter phone number"
        />
        {getErrorMessage("phone_number") && (
          <p className="text-red-400 text-xs mt-1">
            {getErrorMessage("phone_number")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Address (Optional)
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter address"
        />
        {getErrorMessage("address") && (
          <p className="text-red-400 text-xs mt-1">
            {getErrorMessage("address")}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Image URL (Optional)
        </label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          placeholder="Enter image URL"
        />
        {getErrorMessage("image") && (
          <p className="text-red-400 text-xs mt-1">
            {getErrorMessage("image")}
          </p>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded"
          />
          <label
            htmlFor="isActive"
            className="ml-2 block text-sm text-gray-300"
          >
            Is Active
          </label>
        </div>
      )}

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
          {loading
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
            ? "Update Vendor"
            : "Create Vendor"}
        </button>
      </div>
    </form>
  );
};

export default VendorForm;
