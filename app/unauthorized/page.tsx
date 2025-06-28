'use client';

import { SignInButton, SignUpButton, SignOutButton, useAuth, useUser } from '@clerk/nextjs';
import { ContrastIcon, AlertTriangle, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useState } from 'react';

export default function UnauthorizedPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  
  if (!isLoaded) {
    return <LoadingScreen message="Эрхийн мэдээлэл шалгаж байна..." variant="branded" />;
  }

  if (isNavigating) {
    return <LoadingScreen message="Шилжүүлж байна..." variant="branded" />;
  }
 
  const userRole = user?.publicMetadata?.role as string;
  const isUserRole = userRole === 'USER';

  const handleNavigation = (callback: () => void, loadingMessage?: string) => {
    setIsNavigating(true);
    
    
    setTimeout(() => {
      callback();
      setTimeout(() => setIsNavigating(false), 500);
    }, 800);
  };

  const handleSignOut = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 1000);
  };

  return (
    <div className="min-h-screen bg-orange-50">
     
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="flex justify-between items-center p-3 sm:p-4 h-14 sm:h-16">
          <div className="flex gap-2 items-center">
            <ContrastIcon className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            <p className="text-lg sm:text-xl font-semibold text-gray-800">MENA</p>
          </div>
          
          <div className="flex gap-2 items-center">
            {isSignedIn && !isUserRole && (
              <button 
                onClick={() => handleNavigation(() => router.push('/'))} 
                className="flex items-center gap-2 px-2 sm:px-3 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors"
              >
                Нүүр хуудас
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-orange-50 p-3 sm:p-4 lg:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 text-center">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-red-100 p-3 sm:p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 sm:w-12 sm:h-12 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-3 sm:mb-4">
              403 - Зөвшөөрөлгүй хандалт
            </h1>
            
            {isUserRole ? (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Энэ портал нь зөвхөн борлуулагчид болон администраторуудад зориулагдсан. 
                  Таны акаунт энгийн хэрэглэгчээр бүртгэгдсэн бөгөөд энэ системд хандах эрхгүй.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 text-left">
                  <p className="text-xs sm:text-sm text-blue-800">
                    <strong>Хэрэглэгчийн портал хайж байна уу?</strong><br />
                    Энэ нь борлуулагч/админ удирдлагын систем юм. Хэрэв та хэрэглэгч бол 
                    өөр програм хайж байгаа байж магадгүй.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer">
                    <SignOutButton>
                      <div 
                        className="flex items-center justify-center gap-2"
                        onClick={handleSignOut}
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm sm:text-base">Гарах</span>
                      </div>
                    </SignOutButton>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Танд энэ эх үүсвэрт хандахад шаардлагатай эрх байхгүй байна. 
                  Администратортойгоо холбогдох эсвэл эрх бүхий акаунтаар нэвтэрнэ үү.
                </p>

                <div className="space-y-4">
                  {isSignedIn ? (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        Таны одоогийн акаунтад шаардлагатай эрхийн зөвшөөрөл байхгүй байна.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button 
                          onClick={() => handleNavigation(() => router.push('/'))}
                          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
                        >
                          Дахин оролдох
                        </button>
                        
                        <div className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer">
                          <SignOutButton>
                            <div 
                              className="flex items-center justify-center gap-2"
                              onClick={handleSignOut}
                            >
                              <LogOut className="w-4 h-4" />
                              <span className="text-sm sm:text-base">Гарах</span>
                            </div>
                          </SignOutButton>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        Үргэлжлүүлэхийн тулд эрх бүхий акаунтаар нэвтэрнэ үү.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <div className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer">
                          <SignInButton mode="modal">
                            <span className="text-sm sm:text-base">Нэвтрэх</span>
                          </SignInButton>
                        </div>
                        
                        <div className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 cursor-pointer">
                          <SignUpButton mode="modal">
                            <span className="text-sm sm:text-base">Эрх хүсэх</span>
                          </SignUpButton>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <p className="text-xs sm:text-sm text-gray-500">
                {isUserRole 
                  ? "Хэрэв энэ нь алдаа гэж үзэж байгаа бол системийн администратортойгоо холбогдоно уу."
                  : "Тусламж хэрэгтэй юу? Системийн администратортойгоо холбогдох эсвэл акаунтын эрхээ шалгаарай."
                }
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}