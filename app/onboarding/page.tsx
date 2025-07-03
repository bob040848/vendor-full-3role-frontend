// frontend/app/onboarding/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContrastIcon, Factory, Store, Loader2 } from "lucide-react";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"VENDOR" | "USER" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const existingRole = user.publicMetadata?.role as string;
    if (existingRole) {
      console.log("User already has role:", existingRole);
      redirectToDashboard(existingRole);
      return;
    }

    const storedRole = localStorage.getItem("selectedRole") as
      | "VENDOR"
      | "USER"
      | null;
    const sessionRole = sessionStorage.getItem("pendingRole") as
      | "VENDOR"
      | "USER"
      | null;
    const roleToUse = storedRole || sessionRole;

    console.log("Role from storage:", storedRole);
    console.log("Role from session:", sessionRole);
    console.log("Role to use:", roleToUse);

    if (!roleToUse) {
      console.log("No role found, redirecting to sign-up");
      router.push("/sign-up");
      return;
    }

    setSelectedRole(roleToUse);
    updateUserRole(roleToUse);
  }, [isLoaded, user, router]);

  const updateUserRole = async (role: "VENDOR" | "USER") => {
    if (!user) return;

    console.log("Updating user role to:", role);
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch("/api/user/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          role: role,
        }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.error || "Хэрэглэгчийн үүргийг шинэчлэх амжилтгүй"
        );
      }

      const result = await response.json();
      console.log("API Result:", result);

      if (result.success) {
        localStorage.removeItem("selectedRole");
        sessionStorage.removeItem("pendingRole");

        await user.reload();

        setTimeout(() => {
          console.log("User metadata after update:", user.publicMetadata);
          redirectToDashboard(role);
        }, 1500);
      } else {
        throw new Error(result.error || "Үүрэг шинэчлэх амжилтгүй");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Хэрэглэгчийн үүргийг шинэчлэх амжилтгүй"
      );
      setIsUpdating(false);
    }
  };

  const redirectToDashboard = (role: string) => {
    console.log("Redirecting with role:", role);

    if (role === "VENDOR") {
      router.push("/vendor-dash");
    } else if (role === "USER") {
      router.push("/user-dashboard");
    } else {
      router.push("/unauthorized");
    }
  };

  const handleRetry = () => {
    if (selectedRole) {
      updateUserRole(selectedRole);
    }
  };

  if (!isLoaded || isUpdating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <ContrastIcon className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Данс тохируулж байна...
          </h1>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Профайлыг тохируулж байгаа тул түр хүлээнэ үү</span>
          </div>

          {selectedRole && (
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-3">
                {selectedRole === "VENDOR" ? (
                  <Factory className="w-5 h-5 text-orange-600" />
                ) : (
                  <Store className="w-5 h-5 text-blue-600" />
                )}
                <span className="font-medium text-gray-800">
                  {selectedRole === "VENDOR" ? "Худалдагчийн" : "Дэлгүүрийн"}{" "}
                  данс тохируулж байна
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Үүрэг: {selectedRole}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
          <div className="flex justify-center mb-6">
            <ContrastIcon className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Тохиргооны алдаа
          </h1>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="text-sm text-gray-600 mb-6">
            Сонгосон үүрэг: {selectedRole}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Дахин оролдох
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Бүртгэл рүү буцах
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Ямар нэг алдаа гарлаа
        </h1>
        <p className="text-gray-600 mb-6">Дахин бүртгүүлэх гэж оролдоно уу.</p>
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Бүртгэл рүү буцах
        </button>
      </div>
    </div>
  );
}
