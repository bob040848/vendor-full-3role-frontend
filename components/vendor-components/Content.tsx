import { useQuery, useMutation } from "@apollo/client";
import { Plus, Edit, Trash2, RotateCcw } from "lucide-react";
import {
  GET_PRODUCTS,
  GET_SHOPS,
  GET_PRODUCT_DELIVERED_HISTORY,
  GET_PRODUCT_RETURN_HISTORY,
  DELETE_PRODUCT,
} from "@/graphql/operations";
import {
  Product,
  Shop,
  ProductDeliveredHistory,
  ProductReturnHistory,
} from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { useState } from "react";
import ProductForm from "./ProductForm";

type ContentProps = {
  activeTab: string;
  setShowProductForm: (show: boolean) => void;
  setShowSalesForm: (show: boolean) => void;
  setShowReturnForm: (show: boolean) => void;
};

const Content: React.FC<ContentProps> = ({
  activeTab,
  setShowProductForm,
  setShowSalesForm,
  setShowReturnForm,
}) => {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery<{ products: Product[] }>(GET_PRODUCTS);
  const {
    data: shopsData,
    loading: shopsLoading,
    error: shopsError,
  } = useQuery<{ shops: Shop[] }>(GET_SHOPS);
  const {
    data: salesData,
    loading: salesLoading,
    error: salesError,
  } = useQuery<{ productDeliveredHistory: ProductDeliveredHistory[] }>(
    GET_PRODUCT_DELIVERED_HISTORY
  );
  const {
    data: returnsData,
    loading: returnsLoading,
    error: returnsError,
  } = useQuery<{ productReturnHistory: ProductReturnHistory[] }>(
    GET_PRODUCT_RETURN_HISTORY
  );
  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [scannedBarcode, setScannedBarcode] = useState("");

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?")) return;
    try {
      await deleteProduct({ variables: { id } });
    } catch (error) {
      console.error("Бүтээгдэхүүн устгахад алдаа гарлаа:", error);
      alert("Бүтээгдэхүүн устгахад алдаа гарлаа");
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setScannedBarcode(product.barcode?.toString() || "");
    setShowProductForm(true);
  };

  const renderContent = () => {
    if (productsLoading || shopsLoading || salesLoading || returnsLoading) {
      return <div className="text-orange-800 text-center">Уншиж байна...</div>;
    }

    if (productsError || shopsError || salesError || returnsError) {
      return (
        <div className="text-red-600 text-center">
          Алдаа: Мэдээлэл татахад алдаа гарлаа
        </div>
      );
    }

    const products = productsData?.products || [];
    const shops = shopsData?.shops || [];
    const sales = salesData?.productDeliveredHistory || [];
    const returns = returnsData?.productReturnHistory || [];

    const validSales = sales.filter((sale) => sale.product && sale.shop);
    const validReturns = returns.filter(
      (returnItem) => returnItem.product && returnItem.shop
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayProducts = products.filter((product) => {
      const createdDate = new Date(product.created_at);
      createdDate.setHours(0, 0, 0, 0);
      return createdDate.getTime() === today.getTime();
    });

    const EmptyState = ({ message }: { message: string }) => (
      <div className="text-center py-10">
        <p className="text-orange-700">{message}</p>
      </div>
    );

    switch (activeTab) {
      case "products":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800">
                Бүтээгдэхүүний мэдээлэл
              </h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setScannedBarcode("");
                  setShowProductForm(true);
                }}
                className={cn(
                  "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                )}
              >
                <Plus size={20} />
                Шинэ бүтээгдэхүүн
              </button>
            </div>
            {products.length === 0 ? (
              <EmptyState message="Бүтээгдэхүүн байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Нэр
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Төрөл
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Тоо ширхэг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Түгээгдэх огноо
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Үйлдэл
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(product.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "sales":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800">
                Борлуулсан бүтээгдэхүүн
              </h2>
              <button
                onClick={() => setShowSalesForm(true)}
                className={cn(
                  "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                )}
              >
                <Plus size={20} />
                Борлуулалт бүртгэх
              </button>
            </div>
            {validSales.length === 0 ? (
              <EmptyState message="Борлуулалт байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Бүтээгдэхүүн
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Тоо ширхэг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Үнэ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Огноо
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Дэлгүүр
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {validSales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sale.product!.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sale.pieces ?? "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sale.total_price.toLocaleString()}₮
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(sale.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sale.shop!.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "revenue":
        const totalRevenue = validSales.reduce(
          (sum, sale) => sum + sale.total_price,
          0
        );
        const totalQuantity = validSales.reduce(
          (sum, sale) => sum + (sale.pieces ?? 0),
          0
        );
        return (
          <div>
            <h2 className="text-2xl font-bold text-orange-800 mb-6">
              Өдрийн орлого
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-orange-700">
                  Өнөөдрийн орлого
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {totalRevenue.toLocaleString()}₮
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-orange-700">
                  Борлуулсан ширхэг
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {totalQuantity}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-orange-700">
                  Гүйлгээний тоо
                </h3>
                <p className="text-3xl font-bold text-orange-600">
                  {validSales.length}
                </p>
              </div>
            </div>
            {validSales.length === 0 ? (
              <EmptyState message="Борлуулалтын мэдээлэл байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-orange-700 mb-4">
                  Борлуулалтын дэлгэрэнгүй
                </h3>
                <div className="space-y-4">
                  {validSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex justify-between items-center p-4 border border-orange-100 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{sale.product!.title}</p>
                        <p className="text-sm text-orange-600">
                          {sale.shop!.name} -{" "}
                          {new Date(sale.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {sale.total_price.toLocaleString()}₮
                        </p>
                        <p className="text-sm text-orange-600">
                          {sale.pieces ?? "N/A"} ширхэг
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "shops":
        return (
          <div>
            <h2 className="text-2xl font-bold text-orange-800 mb-6">
              Дэлгүүрийн мэдээлэл
            </h2>
            {shops.length === 0 ? (
              <EmptyState message="Дэлгүүр байхгүй байна" />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shops.map((shop) => (
                  <div key={shop.id} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold text-orange-800 mb-2">
                      {shop.name}
                    </h3>
                    <p className="text-orange-600 mb-2">
                      {shop.address || "N/A"}
                    </p>
                    <p className="text-orange-600 mb-4">
                      {shop.phone_number || "N/A"}
                    </p>
                    <button
                      className={cn(
                        "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                      )}
                    >
                      Дэлгэрэнгүй
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "delivery":
        return (
          <div>
            <h2 className="text-2xl font-bold text-orange-800 mb-6">
              Түгээгдэж буй бараа
            </h2>
            {products.length === 0 ? (
              <EmptyState message="Түгээгдэж буй бараа байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Нэр
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Төрөл
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Тоо ширхэг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Түгээгдэх огноо
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(product.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "returns":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-800">Буцаалт</h2>
              <button
                onClick={() => setShowReturnForm(true)}
                className={cn(
                  "px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center gap-2"
                )}
              >
                <RotateCcw size={20} />
                Буцаалт хийх
              </button>
            </div>
            {validReturns.length === 0 ? (
              <EmptyState message="Буцаалт байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Бүтээгдэхүүн
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Тоо ширхэг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Огноо
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Дэлгүүр
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {validReturns.map((returnItem) => (
                      <tr key={returnItem.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {returnItem.product!.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {returnItem.pieces}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(returnItem.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {returnItem.shop!.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case "todayProducts":
        return (
          <div>
            <h2 className="text-2xl font-bold text-orange-800 mb-6">
              Өнөөдрийн үйлдвэрлэсэн бүтээгдэхүүн
            </h2>
            {todayProducts.length === 0 ? (
              <EmptyState message="Өнөөдөр үйлдвэрлэсэн бүтээгдэхүүн байхгүй байна" />
            ) : (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead className="bg-orange-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Нэр
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Төрөл
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Тоо ширхэг
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase">
                        Борлуулагч
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100">
                    {todayProducts.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.description || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.vendor?.name || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-orange-800 text-center">Сонгогдсон хэсэг</div>
        );
    }
  };

  return (
    <>
      {renderContent()}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
            <ProductForm
              setShowProductForm={() => {
                setShowProductForm(false);
                setSelectedProduct(null);
                setScannedBarcode("");
              }}
              scannedBarcode={scannedBarcode}
              setScannedBarcode={setScannedBarcode}
              product={selectedProduct}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
