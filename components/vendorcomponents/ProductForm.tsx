import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import BarcodeScannerComponent from "react-barcode-scanner";
import {
  CREATE_PRODUCT,
  GET_VENDORS,
  GET_SHOPS,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "@/graphql/operations";
import { CreateProductInput, UpdateProductInput, Vendor, Shop, Product } from "@/generated/graphql";
import { createProductSchema, updateProductSchema } from "@/lib/zod-schemas";
import { cn } from "@/lib/utils";
import { z } from "zod";

type ProductFormProps = {
  setShowProductForm: (show: boolean) => void;
  scannedBarcode: string;
  setScannedBarcode: (barcode: string) => void;
  product?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  setShowProductForm,
  scannedBarcode,
  setScannedBarcode,
  product,
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
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [barcodeError, setBarcodeError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as any;
    const input = {
      title: data.title || product?.title,
      description: data.description || product?.description || "",
      stock: data.stock ? parseInt(data.stock) : product?.stock ?? 0,
      ingredient: data.ingredient || product?.ingredient || "",
      barcode: scannedBarcode ? parseInt(scannedBarcode) : product?.barcode ?? undefined,
      price: data.price ? parseInt(data.price) : product?.price ?? 0,
      expired_at: data.expired_at ? parseInt(data.expired_at) : product?.expired_at ?? undefined,
      image: data.image || product?.image || "",
      vendor_id: data.vendor_id || product?.vendor?.id,
      shop_id: data.shop_id || product?.shop?.id || "",
    };

    try {
      const schema = product ? updateProductSchema : createProductSchema;
      schema.parse(input);
      const gqlInput: CreateProductInput | UpdateProductInput = {
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
      if (product) {
        await updateProduct({ variables: { id: product.id, input: gqlInput } });
      } else {
        await createProduct({ variables: { input: gqlInput } });
      }
      setShowProductForm(false);
      setScannedBarcode("");
      setErrors({});
      setBarcodeError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Бүтээгдэхүүн хадгалахад алдаа гарлаа:", error);
        alert("Бүтээгдэхүүн хадгалахад алдаа гарлаа");
      }
    }
  };

  if (vendorsLoading || shopsLoading) {
    return <div className="text-orange-800 text-center">Уншиж байна...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-orange-800 mb-4">
        {product ? "Бүтээгдэхүүн засах" : "Бүтээгдэхүүн бүртгэх"}
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Нэр
          </label>
          <input
            type="text"
            name="title"
            defaultValue={product?.title || ""}
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
            defaultValue={product?.description || ""}
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
            defaultValue={product?.stock || ""}
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
            defaultValue={product?.price || ""}
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
            defaultValue={product?.ingredient || ""}
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
                  setBarcodeError(null);
                } else if (err) {
                  setBarcodeError("Баркод уншихад алдаа гарлаа");
                }
              }}
              width={200}
              height={200}
            /> */}
          </div>
          {(errors.barcode || barcodeError) && (
            <p className="text-red-500 text-xs mt-1">{errors.barcode || barcodeError}</p>
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
            defaultValue={product?.expired_at || ""}
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
            defaultValue={product?.image || ""}
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
            defaultValue={product?.vendor?.id || ""}
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
            defaultValue={product?.shop?.id || ""}
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
              setBarcodeError(null);
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
            {product ? "Шинэчлэх" : "Хадгалах"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;