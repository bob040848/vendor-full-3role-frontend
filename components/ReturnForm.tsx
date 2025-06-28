// frontend/components/ReturnForm.tsx
import { useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import SignatureCanvas from "react-signature-canvas";
import {
  GET_PRODUCTS,
  GET_SHOPS,
  GET_DELIVERY_PERSONS,
  GET_PRODUCT_RETURN_HISTORY,
  RETURN_PRODUCT,
} from "@/graphql/operations";

import { Product, Shop, DeliveryPerson } from "@/generated/graphql";
import { returnProductSchema } from "@/lib/zod-schemas";
import { cn } from "@/lib/utils";
import { z } from "zod";

type ReturnFormProps ={
  setShowReturnForm: (show: boolean) => void;
  signatureData: string;
  setSignatureData: (data: string) => void;
}

const ReturnForm: React.FC<ReturnFormProps> = ({
  setShowReturnForm,
  signatureData,
  setSignatureData,
}) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { data: productsData, loading: productsLoading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS);
  const { data: shopsData, loading: shopsLoading } = useQuery<{
    shops: Shop[];
  }>(GET_SHOPS);
  const { data: deliveryPersonsData, loading: deliveryLoading } = useQuery<{
    deliveryPersons: DeliveryPerson[];
  }>(GET_DELIVERY_PERSONS);
  const [returnProduct] = useMutation(RETURN_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCT_RETURN_HISTORY }],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setSignatureData("");
  };

  const saveSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      setSignatureData(
        sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const input = {
      productId: data.product_id,
      shopId: data.shop_id,
      deliveryPersonId: data.delivery_person_id,
      pieces: data.pieces ? parseInt(data.pieces as string) : 0,
      signature: signatureData || "",
    };

    try {
      returnProductSchema.parse(input);
      await returnProduct({
        variables: {
          productId: input.productId,
          shopId: input.shopId,
          deliveryPersonId: input.deliveryPersonId,
          pieces: input.pieces,
          signature: input.signature || null,
        },
      });
      setShowReturnForm(false);
      setSignatureData("");
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error returning product:", error);
        alert("Буцаалт хийхэд алдаа гарлаа");
      }
    }
  };

  if (productsLoading || shopsLoading || deliveryLoading) {
    return <div className="text-orange-800 text-center">Уншиж байна...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-orange-800 mb-4">Буцаалт</h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Бүтээгдэхүүн
            </label>
            <select
              name="product_id"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.productId && "border-red-500"
              )}
            >
              <option value="">Сонгох</option>
              {productsData?.products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="text-red-500 text-xs mt-1">{errors.productId}</p>
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
                errors.shopId && "border-red-500"
              )}
            >
              <option value="">Сонгох</option>
              {shopsData?.shops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
              ))}
            </select>
            {errors.shopId && (
              <p className="text-red-500 text-xs mt-1">{errors.shopId}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Хүргэгч
            </label>
            <select
              name="delivery_person_id"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.deliveryPersonId && "border-red-500"
              )}
            >
              <option value="">Сонгох</option>
              {deliveryPersonsData?.deliveryPersons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            {errors.deliveryPersonId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deliveryPersonId}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Тоо ширхэг
            </label>
            <input
              type="number"
              name="pieces"
              min="1"
              className={cn(
                "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
                errors.pieces && "border-red-500"
              )}
            />
            {errors.pieces && (
              <p className="text-red-500 text-xs mt-1">{errors.pieces}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-1">
              Байгууллагийн гарын үсэг
            </label>
            <div
              className={cn(
                "border-2 border-dashed border-orange-300 rounded-md p-4 text-center",
                errors.signature && "border-red-500"
              )}
            >
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  className: "w-full h-32 bg-orange-50 rounded border mb-2",
                }}
                onEnd={saveSignature}
              />
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={clearSignature}
                  className={cn(
                    "px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm"
                  )}
                >
                  Цэвэрлэх
                </button>
                <button
                  type="button"
                  onClick={saveSignature}
                  className={cn(
                    "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 text-sm"
                  )}
                >
                  Хадгалах
                </button>
              </div>
            </div>
            {errors.signature && (
              <p className="text-red-500 text-xs mt-1">{errors.signature}</p>
            )}
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowReturnForm(false);
                setSignatureData("");
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
              Буцаах
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnForm;
