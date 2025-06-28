//frontend/app/page.tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContrastIcon } from 'lucide-react';
import Link from 'next/link';
import { LoadingScreen } from '@/components/LoadingScreen';

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const userRole = user?.publicMetadata?.role as string;
      
      setIsNavigating(true);
      
      if (userRole === 'VENDOR' || userRole === 'ADMIN') {
        setTimeout(() => {
          router.push('/vendor-dash');
        }, 800);
      } else {
        setTimeout(() => {
          router.replace('/unauthorized');
        }, 800);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  if (!isLoaded) {
    return <LoadingScreen message="Ачаалж байна..." variant="branded" />;
  }

  if (isSignedIn && isNavigating) {
    const userRole = user?.publicMetadata?.role as string;
    const message = userRole === 'VENDOR' || userRole === 'ADMIN' 
      ? "Борлуулагчийн хуудас руу шилжүүлж байна..." 
      : "Шилжүүлж байна...";
    return <LoadingScreen message={message} variant="branded" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <ContrastIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-600" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">MENA</h1>
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 leading-relaxed px-2">
            MENA-д тавтай морилно уу - Танай борлуулагчийн удирдлагын шийдэл
          </p>
          
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
              Борлуулагчийн удирдлагын систем
            </h2>
            
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Энэ портал нь зөвхөн борлуулагчдад зориулагдсан. 
              Эрх бүхий акаунтаараа нэвтэрнэ үү.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link 
                href="/sign-in"
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors duration-200 text-center text-sm sm:text-base"
              >
                Нэвтрэх
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-left">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Борлуулагчийн удирдлага</h3>
              <p className="text-gray-600 text-sm sm:text-base">Борлуулагчийн үйл ажиллагаа болон агуулахын удирдлагын иж бүрэн хэрэгслүүд.</p>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Борлуулалтын хяналт</h3>
              <p className="text-gray-600 text-sm sm:text-base">Нарийвчилсан шинжилгээ болон тайлангийн тусламжтайгаар борлуулалтын гүйцэтгэлээ хянаарай.</p>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Буцаалтын удирдлага</h3>
              <p className="text-gray-600 text-sm sm:text-base">Буцаалтыг үр дүнтэй шийдэж, хэрэглэгчдийн сэтгэл ханамжийг хангаарай.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;