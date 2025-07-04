import type { Metadata } from "next";

import { Sidebar } from "./components";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientTransitionWrapper } from "./components/ClientTransitionWrapper";
import {
  ContrastIcon,
  ArrowLeft,
  CheckCircle,
  Factory,
  Store,
} from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="flex justify-between items-center p-4 h-16">
          <Link
            href="/"
            className="flex gap-2 items-center hover:opacity-80 transition-opacity"
          >
            <ContrastIcon className="w-8 h-8 text-orange-600" />
            <p className="text-xl font-semibold text-gray-800">MENA</p>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <ClientTransitionWrapper>{children}</ClientTransitionWrapper>
        </main>
      </div>
    </div>
  );
}
