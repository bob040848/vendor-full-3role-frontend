// frontend/app/sign-up/[[...sign-up]]/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';
import { ContrastIcon, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="flex justify-between items-center p-4 h-16">
          <Link href="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <ContrastIcon className="w-8 h-8 text-orange-600" />
            <p className="text-xl font-semibold text-gray-800">MENA</p>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="hidden md:block">
              <div className="bg-white/80 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Join MENA Today
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Vendor Management</h3>
                      <p className="text-gray-600 text-sm">Complete control over your vendor operations and inventory tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Sales Analytics</h3>
                      <p className="text-gray-600 text-sm">Advanced reporting and analytics to boost your business performance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Return Processing</h3>
                      <p className="text-gray-600 text-sm">Streamlined return management with digital signatures and tracking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800">Multi-Role Support</h3>
                      <p className="text-gray-600 text-sm">Different access levels for admins, vendors, and users</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                  <p className="text-gray-600">Get started with MENA today</p>
                </div>

                <div className="flex justify-center">
                  <SignUp 
                    appearance={{
                      elements: {
                        formButtonPrimary: 
                          "bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        socialButtonsBlockButton: 
                          "border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-600 transition-colors duration-200",
                        formFieldInput: 
                          "border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg",
                        footerActionLink: "text-orange-600 hover:text-orange-700",
                        identityPreviewText: "text-gray-600",
                        formButtonReset: "text-orange-600 hover:text-orange-700"
                      }
                    }}
                    redirectUrl="/vendor-dash"
                    signInUrl="/sign-in"
                  />
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="text-orange-600 hover:text-orange-700 font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>

              <div className="md:hidden mt-8">
                <div className="bg-white/80 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Why Choose MENA?
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-lg p-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-orange-600 mx-auto" />
                      </div>
                      <div className="font-medium text-gray-700">Vendor Control</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-lg p-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-orange-600 mx-auto" />
                      </div>
                      <div className="font-medium text-gray-700">Sales Analytics</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-lg p-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-orange-600 mx-auto" />
                      </div>
                      <div className="font-medium text-gray-700">Return Management</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-orange-100 rounded-lg p-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-orange-600 mx-auto" />
                      </div>
                      <div className="font-medium text-gray-700">Multi-Role Access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}