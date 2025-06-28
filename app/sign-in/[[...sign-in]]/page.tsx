// frontend/app/sign-in/[[...sign-in]]/page.tsx
'use client';

import { SignIn } from '@clerk/nextjs';
import { ContrastIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setIsNavigating(true);
      
      const timer = setTimeout(() => {
        router.push('/vendor-dash');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, router]);

 
  if (!isLoaded) {
    return <LoadingScreen message="Систем ачаалж байна..." variant="branded" />;
  }

  
  if (isNavigating) {
    return <LoadingScreen message="Амжилттай нэвтэрлээ. Борлуулагчийн хуудас руу шилжүүлж байна..." variant="branded" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="flex justify-between items-center p-3 sm:p-4 h-14 sm:h-16">
          <Link href="/" className="flex gap-2 items-center hover:opacity-80 transition-opacity">
            <ContrastIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            <p className="text-lg sm:text-xl font-semibold text-gray-800">MENA</p>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Нүүр хуудас руу буцах</span>
            <span className="sm:hidden">Буцах</span>
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] p-3 sm:p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Тавтай морилно уу</h1>
              <p className="text-gray-600 text-sm sm:text-base">MENA акаунт руугаа нэвтэрнэ үү</p>
            </div>

            <div className="flex justify-center">
              <SignIn 
                appearance={{
                  elements: {
                    formButtonPrimary: 
                      "bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200",
                    card: "shadow-none border-0 bg-transparent w-full",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: 
                      "border-2 border-gray-300 hover:border-orange-300 text-gray-700 hover:text-orange-600 transition-colors duration-200 w-full",
                    formFieldInput: 
                      "border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-lg w-full",
                    footerActionLink: "text-orange-600 hover:text-orange-700",
                    identityPreviewText: "text-gray-600",
                    formButtonReset: "text-orange-600 hover:text-orange-700",
                    main: "w-full",
                    rootBox: "w-full"
                  }
                }}
                redirectUrl="/vendor-dash"
                signUpUrl="/sign-up"
              />
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                Акаунт байхгүй байна уу?{' '}
                <Link href="/sign-up" className="text-orange-600 hover:text-orange-700 font-medium">
                  Энд бүртгүүлнэ үү
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs text-gray-500">
              <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                <div className="font-medium text-gray-700 text-xs sm:text-sm">Борлуулагчид</div>
                <div className="text-xs">Агуулахын удирдлага</div>
              </div>
              <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                <div className="font-medium text-gray-700 text-xs sm:text-sm">Борлуулалт</div>
                <div className="text-xs">Гүйцэтгэлийн хяналт</div>
              </div>
              <div className="bg-white/50 rounded-lg p-2 sm:p-3">
                <div className="font-medium text-gray-700 text-xs sm:text-sm">Буцаалт</div>
                <div className="text-xs">Үр дүнтэй шийдвэр</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}