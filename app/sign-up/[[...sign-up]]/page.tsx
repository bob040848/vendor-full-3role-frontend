// frontend/app/sign-up/[[...sign-up]]/page.tsx
'use client';

import { SignUp } from '@clerk/nextjs';
import { ContrastIcon, ArrowLeft, CheckCircle, Factory, Store } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<'VENDOR' | 'USER' | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('selectedRole') as 'VENDOR' | 'USER' | null;
    if (storedRole) {
      setSelectedRole(storedRole);
    }
  }, []);

  const handleRoleSelection = (role: 'VENDOR' | 'USER') => {
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    localStorage.removeItem('selectedRole');
  };

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
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </header>

      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="w-full max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {!selectedRole ? (
                <div className="bg-white/90 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Үүргээ сонгоно уу
                  </h2>
                  <p className="text-gray-600 mb-6 text-center">
                    MENA-д эхлэхийн тулд данс төрлөө сонгоно уу
                  </p>
                  
                  <div className="grid gap-4">
                    <button
                      onClick={() => handleRoleSelection('VENDOR')}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                          <Factory className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Худалдагч / Үйлдвэрлэгч
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Бүтээгдэхүүн үйлдвэрлэдэг, нийлүүлдэг үйлдвэр, дистрибьютеруудад зориулсан
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Бүтээгдэхүүний нөөц удирдах</li>
                            <li>• Борлуулалт, түгээлт хянах</li>
                            <li>• Буцаалт, солилцоо зохицуулах</li>
                          </ul>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleRoleSelection('USER')}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Store className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Дэлгүүр / Жижиглэнгийн худалдаа
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            Бүтээгдэхүүн худалдан авч, худалдаалаг дэлгүүр, жижиглэнгийн худалдаачдад зориулсан
                          </p>
                          <ul className="text-xs text-gray-500 space-y-1">
                            <li>• Бүтээгдэхүүн үзэж, захиалах</li>
                            <li>• Захиалга, хүргэлт хянах</li>
                            <li>• Дэлгүүрийн нөөц удирдах</li>
                          </ul>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/90 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <button
                      onClick={handleBackToRoleSelection}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {selectedRole === 'VENDOR' ? 'Худалдагчийн бүртгэл' : 'Дэлгүүрийн бүртгэл'}
                    </h2>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                      {selectedRole === 'VENDOR' ? (
                        <Factory className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Store className="w-5 h-5 text-blue-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">
                          {selectedRole === 'VENDOR' ? 'Худалдагчийн данс' : 'Дэлгүүрийн данс'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedRole === 'VENDOR' 
                            ? 'Худалдагчийн удирдлагын хэрэгслүүд болон нөөц хянах эрх'
                            : 'Бүтээгдэхүүн захиалах болон дэлгүүр удирдах хэрэгслүүдийн эрх'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">
                      {selectedRole === 'VENDOR' ? 'Худалдагчийн давуу тал:' : 'Дэлгүүрийн давуу тал:'}
                    </h3>
                    {selectedRole === 'VENDOR' ? (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Нөөцийн удирдлага</h4>
                            <p className="text-gray-600 text-sm">Бүтээгдэхүүний нөөц болон агуулахын түвшинг бүрэн хянах</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Борлуулалтын аналитик</h4>
                            <p className="text-gray-600 text-sm">Бизнесийн гүйцэтгэлийг нэмэгдүүлэх дэвшилтэт тайлан болон аналитик</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Түгээлтийн сүлжээ</h4>
                            <p className="text-gray-600 text-sm">Түгээлтийн суваг болон жижиглэнгийн худалдаачидтай харилцах харилцааг удирдах</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Бүтээгдэхүүний каталог</h4>
                            <p className="text-gray-600 text-sm">Олон төрлийн худалдагчийн бүтээгдэхүүнээс үзэж, захиалах</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Захиалгын удирдлага</h4>
                            <p className="text-gray-600 text-sm">Захиалгаа хянаж, хүргэлтийг үр ашигтайгаар удирдах</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Дэлгүүрийн аналитик</h4>
                            <p className="text-gray-600 text-sm">Дэлгүүрийн гүйцэтгэл болон борлуулалтын чиг хандлагыг хянах</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Данс үүсгэх</h1>
                  <p className="text-gray-600">
                    {selectedRole ? `${selectedRole === 'VENDOR' ? 'Худалдагчаар' : 'Дэлгүүрээр'} бүртгүүлэх` : 'Өнөөдөр MENA-д эхлээрэй'}
                  </p>
                </div>

                {selectedRole ? (
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
                      redirectUrl="/onboarding"
                      signInUrl="/sign-in"
                    />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">Үргэлжлүүлэхийн тулд үүргээ сонгоно уу</p>
                    <div className="text-sm text-gray-400">
                      Дээрээс Худалдагч эсвэл Дэлгүүрийн данс сонгоно уу
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Аль хэдийн данстай юу?{' '}
                    <Link href="/sign-in" className="text-orange-600 hover:text-orange-700 font-medium">
                      Энд нэвтрэх
                    </Link>
                  </p>
                </div>
              </div>

              {selectedRole && (
                <div className="mt-6 bg-white/80 rounded-xl p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Бүртгэлийн дараа та профайлаа бөглөж дуусгана
                    </p>
                    <div className="bg-orange-100 rounded-lg p-3">
                      <p className="font-medium text-orange-800">
                        {selectedRole === 'VENDOR' ? 'Худалдагчийн танилцуулга' : 'Дэлгүүрийн танилцуулга'}
                      </p>
                      <p className="text-xs text-orange-600">
                        Профайлаа бөглөж, эхлээрэй
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}