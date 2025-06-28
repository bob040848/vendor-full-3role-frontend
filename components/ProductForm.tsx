// frontend/components/ProductForm.tsx
import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import BarcodeScannerComponent from "react-barcode-scanner";
import {
  CREATE_PRODUCT,
  GET_VENDORS,
  GET_SHOPS,
  GET_PRODUCTS,
} from "@/graphql/operations";
import { CreateProductInput, Vendor, Shop } from "@/generated/graphql";
import { createProductSchema } from "@/lib/zod-schemas";
import { cn } from "@/lib/utils";
import { z } from "zod";

type ProductFormProps ={
  setShowProductForm: (show: boolean) => void;
  scannedBarcode: string;
  setScannedBarcode: (barcode: string) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  setShowProductForm,
  scannedBarcode,
  setScannedBarcode,
}) => {
  const { data: vendorsData, loading: vendorsLoading } = useQuery<{
    vendors: Vendor[];
  }>(GET_VENDORS);
  const { data: shopsData, loading: shopsLoading } = useQuery<{
    shops: Shop[];
  }>(GET_SHOPS);
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as any;
    const input = {
      title: data.title,
      description: data.description || "",
      stock: data.stock ? parseInt(data.stock) : 0,
      ingredient: data.ingredient || "",
      barcode: scannedBarcode ? parseInt(scannedBarcode) : undefined,
      price: data.price ? parseInt(data.price) : 0,
      expired_at: data.expired_at ? parseInt(data.expired_at) : undefined,
      image: data.image || "",
      vendor_id: data.vendor_id,
      shop_id: data.shop_id || "",
    };

    try {
      createProductSchema.parse(input);
      const gqlInput: CreateProductInput = {
        title: input.title,
        description: input.description || null,
        stock: input.stock,
        ingredient: input.ingredient || null,
        barcode: input.barcode || null,
        price: input.price,
        expired_at: input.expired_at || null,
        image: input.image || null,
        vendor_id: input.vendor_id,
        shop_id: input.shop_id || null,
      };
      await createProduct({ variables: { input: gqlInput } });
      setShowProductForm(false);
      setScannedBarcode("");
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error saving product:", error);
        alert("Бүтээгдэхүүн хадгалахад алдаа гарлаа");
      }
    }
  };

  if (vendorsLoading || shopsLoading) {
    return <div className="text-orange-800 text-center">Уншиж байна...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">
          Бүтээгдэхүүн бүртгэх
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Нэр
            </label>
            <input
              type="text"
              name="title"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.title && "border-red-500"
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Төрөл
            </label>
            <input
              type="text"
              name="description"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.description && "border-red-500"
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Тоо ширхэг
            </label>
            <input
              type="number"
              name="stock"
              min="0"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.stock && "border-red-500"
              )}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Үнэ
            </label>
            <input
              type="number"
              name="price"
              min="0"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.price && "border-red-500"
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Найрлага
            </label>
            <input
              type="text"
              name="ingredient"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.ingredient && "border-red-500"
              )}
            />
            {errors.ingredient && (
              <p className="text-red-500 text-xs mt-1">{errors.ingredient}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Баркод
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={scannedBarcode}
                readOnly
                className={cn(
                  "flex-1 border border-orange-300 rounded-md px-3 py-2 bg-orange-50",
                  errors.barcode && "border-red-500"
                )}
              />
              {/* <BarcodeScannerComponent
                onUpdate={(err, result) => {
                  if (result) {
                    setScannedBarcode(result.getText());
                  }
                }} */}
              {/* width={200}
                height={200}
              /> */}
            </div>
            {errors.barcode && (
              <p className="text-red-500 text-xs mt-1">{errors.barcode}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Хугацаа
            </label>
            <input
              type="number"
              name="expired_at"
              min="0"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.expired_at && "border-red-500"
              )}
            />
            {errors.expired_at && (
              <p className="text-red-500 text-xs mt-1">{errors.expired_at}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Зураг
            </label>
            <input
              type="text"
              name="image"
              placeholder="Зургийн URL"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.image && "border-red-500"
              )}
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Борлуулагч
            </label>
            <select
              name="vendor_id"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.vendor_id && "border-red-500"
              )}
            >
              <option value="">Сонгох</option>
              {vendorsData?.vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </option>
              ))}
            </select>
            {errors.vendor_id && (
              <p className="text-red-500 text-xs mt-1">{errors.vendor_id}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Дэлгүүр
            </label>
            <select
              name="shop_id"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.shop_id && "border-red-500"
              )}
            >
              <option value="">Сонгох</option>
              {shopsData?.shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
            {errors.shop_id && (
              <p className="text-red-500 text-xs mt-1">{errors.shop_id}</p>
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowProductForm(false);
                setScannedBarcode("");
                setErrors({});
              }}
              className={cn(
                "flex-1 px-4 py-2 border border-orange-300 rounded-md hover:bg-orange-50 text-orange-700"
              )}
            >
              Цуцлах
            </button>
            <button
              type="submit"
              className={cn(
                "flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              )}
            >
              Хадгалах
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
