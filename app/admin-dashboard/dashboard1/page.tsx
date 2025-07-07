// frontend/app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role as string;

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "VENDOR", "USER"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.firstName || "User"}!
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {userRole || "No Role"}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRole === "ADMIN" && (
            <>
              <DashboardCard
                title="Manage Shops"
                description="View and manage all shops"
                href="/shops"
                bgColor="bg-blue-500"
              />
              <DashboardCard
                title="Manage Vendors"
                description="View and manage all vendors"
                href="/vendors"
                bgColor="bg-green-500"
              />
              <DashboardCard
                title="Delivery Persons"
                description="Manage delivery personnel"
                href="/delivery-persons"
                bgColor="bg-purple-500"
              />
            </>
          )}

          {userRole === "VENDOR" && (
            <>
              <DashboardCard
                title="My Products"
                description="Manage your products"
                href="/products"
                bgColor="bg-green-500"
              />
              <DashboardCard
                title="Deliveries"
                description="Track product deliveries"
                href="/deliveries"
                bgColor="bg-blue-500"
              />
              <DashboardCard
                title="Returns"
                description="Handle product returns"
                href="/returns"
                bgColor="bg-red-500"
              />
            </>
          )}

          {userRole === "USER" && (
            <>
              <DashboardCard
                title="Shop Inventory"
                description="View your shop inventory"
                href="/inventory"
                bgColor="bg-indigo-500"
              />
              <DashboardCard
                title="Order History"
                description="View delivery history"
                href="/history"
                bgColor="bg-yellow-500"
              />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  href: string;
  bgColor: string;
}

function DashboardCard({
  title,
  description,
  href,
  bgColor,
}: DashboardCardProps) {
  return (
    <a
      href={href}
      className={`${bgColor} hover:opacity-90 transition-opacity p-6 rounded-lg text-white block`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </a>
  );
}
