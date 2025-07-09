import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
// import BarcodeScannerComponent from "react-barcode-scanner";
import {
  GET_PRODUCTS,
  GET_SHOPS,
  GET_DELIVERY_PERSONS,
  GET_PRODUCT_DELIVERED_HISTORY,
  CONFIRM_DELIVERY,
} from "@/graphql/operations";
import {
  Product,
  Shop,
  DeliveryPerson,
  TransactionType,
} from "@/generated/graphql";
import { confirmDeliverySchema } from "@/lib/zod-schemas";
import { cn } from "@/lib/utils";
import { z } from "zod";

type SalesFormProps = {
  setShowSalesForm: (show: boolean) => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ setShowSalesForm }) => {
  const { data: productsData, loading: productsLoading } = useQuery<{
    products: Product[];
  }>(GET_PRODUCTS);
  const { data: shopsData, loading: shopsLoading } = useQuery<{
    shops: Shop[];
  }>(GET_SHOPS);
  const { data: deliveryPersonsData, loading: deliveryLoading } = useQuery<{
    deliveryPersons: DeliveryPerson[];
  }>(GET_DELIVERY_PERSONS);
  const [confirmDelivery] = useMutation(CONFIRM_DELIVERY, {
    refetchQueries: [{ query: GET_PRODUCT_DELIVERED_HISTORY }],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pieces, setPieces] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const input = {
      productId: data.product_id,
      shopId: data.shop_id,
      deliveryPersonId: data.delivery_person_id,
      pieces: pieces ? parseInt(pieces) : 0,
      totalPrice: data.total_price ? parseInt(data.total_price as string) : 0,
      transactionType: data.transaction_type,
      signature: null,
    };

    try {
      confirmDeliverySchema.parse(input);
      await confirmDelivery({
        variables: {
          productId: input.productId,
          shopId: input.shopId,
          deliveryPersonId: input.deliveryPersonId,
          pieces: input.pieces,
          totalPrice: input.totalPrice,
          transactionType: input.transactionType as TransactionType,
          signature: input.signature,
        },
      });
      setShowSalesForm(false);
      setErrors({});
      setPieces("");
      setScannedBarcode("");
      setBarcodeError(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Борлуулалт бүртгэхэд алдаа гарлаа:", error);
        alert("Борлуулалт бүртгэхэд алдаа гарлаа");
      }
    }
  };

  const handleBarcodeScan = (result: any) => {
    if (result) {
      const barcode = result.getText();
      const product = productsData?.products.find(
        (p) => p.barcode?.toString() === barcode
      );
      if (product) {
        setScannedBarcode(barcode);
        (document.getElementsByName("product_id")[0] as HTMLSelectElement).value =
          product.id;
        setBarcodeError(null);
      } else {
        setBarcodeError("Бүтээгдэхүүн олдсонгүй");
      }
    }
  };

  if (productsLoading || shopsLoading || deliveryLoading) {
    return <div className="text-orange-800 text-center">Уншиж байна...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-orange-800 mb-4">
        Борлуулалт бүртгэх
      </h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Бүтээгдэхүүн
          </label>
          <div className="flex gap-2">
            <select
              name="product_id"
              className={cn(
                "flex-1 border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
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
            {/* <BarcodeScannerComponent
              onUpdate={(err, result) => {
                if (result) {
                  handleBarcodeScan(result);
                } else if (err) {
                  setBarcodeError("Баркод уншихад алдаа гарлаа");
                }
              }}
              width={200}
              height={200}
            /> */}
          </div>
          {(errors.productId || barcodeError) && (
            <p className="text-red-500 text-xs mt-1">{errors.productId || barcodeError}</p>
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
            <p className="text-red-500 text-xs mt-1">{errors.deliveryPersonId}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Тоо ширхэг
          </label>
          <input
            type="number"
            name="pieces"
            value={pieces}
            onChange={(e) => setPieces(e.target.value)}
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
            Нийт үнэ
          </label>
          <input
            type="number"
            name="total_price"
            min="0"
            className={cn(
              "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
              errors.totalPrice && "border-red-500"
            )}
          />
          {errors.totalPrice && (
            <p className="text-red-500 text-xs mt-1">{errors.totalPrice}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-1">
            Гүйлгээний төрөл
          </label>
          <select
            name="transaction_type"
            className={cn(
              "w-full border border-orange-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500",
              errors.transactionType && "border-red-500"
            )}
          >
            <option value="">Сонгох</option>
            <option value="CASH">Бэлэн</option>
            <option value="TRANSFER">Шилжүүлэг</option>
            <option value="NEXTPAYMENT">Дараагийн төлбөр</option>
          </select>
          {errors.transactionType && (
            <p className="text-red-500 text-xs mt-1">{errors.transactionType}</p>
          )}
        </div>
        <div className="flex gap-2 pt-4">
          <button
            type="button"
            onClick={() => {
              setShowSalesForm(false);
              setErrors({});
              setPieces("");
              setScannedBarcode("");
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
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalesForm;