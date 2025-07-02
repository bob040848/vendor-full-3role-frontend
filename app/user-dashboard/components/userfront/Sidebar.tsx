"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Home, Package, Factory, Settings } from "lucide-react";

const navItems = [
  { label: "Нүүр", href: "/user-dashboard", icon: Home },
  {
    label: "Захиалгын дэлгэрэнгүй",
    href: "/user-dashboard/orderhistory",
    icon: Package,
  },
  { label: "Үйлдвэрүүд", href: "/user-dashboard/factories", icon: Factory },
  { label: "Тооцоo", href: "/user-dashboard/calculate", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-[#040404] text-white p-4 border-r">
      <h1 className="text-2xl font-bold mb-6">User info</h1>
      <nav className="flex flex-col gap-2 relative">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-x-3 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-gray-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-highlight"
                  className="absolute inset-0 bg-[#1f1f1f] rounded-md z-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-x-2">
                <Icon className="w-5 h-5" />
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
