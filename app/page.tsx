//frontend/app/page.tsx
"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContrastIcon } from "lucide-react";
import Link from "next/link";
import { LoadingScreen } from "@/components/LoadingScreen";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("User publicMetadata:", user?.publicMetadata);
      const userRole = user?.publicMetadata?.role as string;

      setIsNavigating(true);

      if (userRole === "ADMIN") {
        setTimeout(() => {
          router.push("/admin");
        }, 800);
      } else if (userRole === "VENDOR") {
        setTimeout(() => {
          router.push("/vendor-dash");
        }, 800);
      } else if (userRole === "USER") {
        setTimeout(() => {
          router.push("/user-dashboard");
        }, 800);
      } else {
        setTimeout(() => {
          router.replace("/unauthorized");
        }, 800);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return <LoadingScreen message="Ачаалж байна..." variant="branded" />;
  }

  if (isSignedIn && isNavigating) {
    const userRole = user?.publicMetadata?.role as string;
    let message = "Шилжүүлж байна...";

    switch (userRole) {
      case "ADMIN":
        message = "Админ хуудас руу шилжүүлж байна...";
        break;
      case "VENDOR":
        message = "Борлуулагчийн хуудас руу шилжүүлж байна...";
        break;
      case "USER":
        message = "Хэрэглэгчийн хуудас руу шилжүүлж байна...";
        break;
      default:
        message = "Эрх шалгаж байна...";
    }

    return <LoadingScreen message={message} variant="branded" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <ContrastIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-600" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
              MENA
            </h1>
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-2">
            MENA-д тавтай морилно уу - Танай бизнесийн удирдлагын шийдэл
          </p>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Бизнесийн удирдлагын систем
            </h2>

            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Энэ портал нь борлуулагч болон дэлгүүрүүдэд зориулагдсан. Эрх
              бүхий акаунтаараа нэвтэрнэ үү.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/sign-in"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-center text-sm sm:text-base"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/sign-up"
                className="w-full sm:w-auto bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-center text-sm sm:text-base"
              >
                Бүртгүүлэх
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-left">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Борлуулагчийн удирдлага
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Борлуулагчийн үйл ажиллагаа болон агуулахын удирдлагын иж бүрэн
                хэрэгслүүд.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Дэлгүүрийн удирдлага
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Дэлгүүрийн захиалга, агуулах болон борлуулалтын удирдлагын
                систем.
              </p>
            </div>

            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                Нэгдсэн платформ
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Борлуулагч болон дэлгүүр хоорондын харилцааг хялбарчилсан нэг
                платформ.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 bg-white/80 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
              Акаунтын төрлүүд
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-orange-800">
                    Борлуулагч / Үйлдвэрлэгч
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Бүтээгдэхүүн үйлдвэрлэж, түгээгч компаниудад зориулагдсан
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-lg p-4 mb-3">
                  <h4 className="font-semibold text-blue-800">
                    Дэлгүүр / Жижиглэнгийн худалдаа
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  Бүтээгдэхүүн худалдан авч, борлуулдаг дэлгүүрүүдэд
                  зориулагдсан
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
