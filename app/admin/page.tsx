// frontend/app/vendor-dash/page.tsx
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Content from "@/components/Content";
import ProductForm from "@/components/ProductForm";
import SalesForm from "@/components/SalesForm";
import ReturnForm from "@/components/ReturnForm";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@clerk/nextjs";

const VendorDashboard = () => {
  const { isLoaded } = useAuth();
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [signatureData, setSignatureData] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenForm = (formType: "product" | "sales" | "return") => {
    setIsFormLoading(true);

    setTimeout(() => {
      switch (formType) {
        case "product":
          setShowProductForm(true);
          break;
        case "sales":
          setShowSalesForm(true);
          break;
        case "return":
          setShowReturnForm(true);
          break;
      }
      setIsFormLoading(false);
    }, 800);
  };

  const handleCloseForm = (formType: "product" | "sales" | "return") => {
    switch (formType) {
      case "product":
        setShowProductForm(false);
        break;
      case "sales":
        setShowSalesForm(false);
        break;
      case "return":
        setShowReturnForm(false);
        break;
    }
    setScannedBarcode("");
    setSignatureData("");
  };

  if (!isLoaded) {
    return (
      <LoadingScreen
        message="Эрхийн мэдээлэл шалгаж байна..."
        variant="branded"
      />
    );
  }

  if (isPageLoading) {
    return (
      <LoadingScreen
        message="Vendor dashboard ачаалж байна..."
        variant="branded"
      />
    );
  }

  return (
    <ProtectedRoute allowedRoles={["VENDOR", "ADMIN"]}>
      <div className="flex h-screen bg-orange-50 overflow-hidden relative">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-orange-50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              <Content
                activeTab={activeTab}
                setShowProductForm={() => handleOpenForm("product")}
                setShowSalesForm={() => handleOpenForm("sales")}
                setShowReturnForm={() => handleOpenForm("return")}
              />
            </div>
          </main>
        </div>

        {isFormLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <LoadingScreen
                fullScreen={false}
                variant="minimal"
                message="Форм бэлтгэж байна..."
              />
            </div>
          </div>
        )}

        {showProductForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
              <ProductForm
                setShowProductForm={() => handleCloseForm("product")}
                scannedBarcode={scannedBarcode}
                setScannedBarcode={setScannedBarcode}
              />
            </div>
          </div>
        )}

        {showSalesForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
              <SalesForm setShowSalesForm={() => handleCloseForm("sales")} />
            </div>
          </div>
        )}

        {showReturnForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-xl">
              <ReturnForm
                setShowReturnForm={() => handleCloseForm("return")}
                signatureData={signatureData}
                setSignatureData={setSignatureData}
              />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default VendorDashboard;
