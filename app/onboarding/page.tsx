// frontend/app/onboarding/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ContrastIcon, Factory, Store, Loader2 } from 'lucide-react';

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'VENDOR' | 'USER' | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const storedRole = localStorage.getItem('selectedRole') as 'VENDOR' | 'USER' | null;
    
    if (!storedRole) {
      router.push('/sign-up');
      return;
    }

    setSelectedRole(storedRole);

    if (user?.publicMetadata?.role) {
      redirectToDashboard(user.publicMetadata.role as string);
      return;
    }

    updateUserRole(storedRole);
  }, [isLoaded, user]);

  const updateUserRole = async (role: 'VENDOR' | 'USER') => {
    if (!user) return;

    setIsUpdating(true);
    setError(null);
    
    try {
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          role: role,
        }),
      });

      if (!response.ok) {
        throw new Error('Хэрэглэгчийн үүргийг шинэчлэх амжилтгүй');
      }

      const result = await response.json();
      
      if (result.success) {
        localStorage.removeItem('selectedRole');
        
        await user.reload();
        
        setTimeout(() => {
          redirectToDashboard(role);
        }, 1000);
      } else {
        throw new Error(result.error || 'Үүрэг шинэчлэх амжилтгүй');
      }
    } catch (error) {
      console.error('Хэрэглэгчийн үүрэг шинэчлэхэд алдаа:', error);
      setError(error instanceof Error ? error.message : 'Хэрэглэгчийн үүргийг шинэчлэх амжилтгүй');
      setIsUpdating(false);
    }
  };

  const redirectToDashboard = (role: string) => {
    if (role === 'VENDOR') {
      router.push('/vendor-dash');
    } else {
      router.push('/user-dashboard');
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Данс тохируулж байна...</h1>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Профайлыг тохируулж байгаа тул түр хүлээнэ үү</span>
          </div>
          
          {selectedRole && (
            <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-center gap-3">
                {selectedRole === 'VENDOR' ? (
                  <Factory className="w-5 h-5 text-orange-600" />
                ) : (
                  <Store className="w-5 h-5 text-blue-600" />
                )}
                <span className="font-medium text-gray-800">
                  {selectedRole === 'VENDOR' ? 'Худалдагчийн' : 'Дэлгүүрийн'} данс тохируулж байна
                </span>
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Тохиргооны алдаа</h1>
          <p className="text-red-600 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Дахин оролдох
            </button>
            <button
              onClick={() => router.push('/sign-up')}
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Ямар нэг алдаа гарлаа</h1>
        <p className="text-gray-600 mb-6">Дахин бүртгүүлэх гэж оролдоно уу.</p>
        <button
          onClick={() => router.push('/sign-up')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Бүртгэл рүү буцах
        </button>
      </div>
    </div>
  );
}