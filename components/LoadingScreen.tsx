import React from 'react';
import { Contrast } from 'lucide-react';

type LoadingScreenProps ={
  message?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'minimal' | 'branded';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Ачаалж байна...", 
  fullScreen = true,
  variant = 'default'
}) => {
  const containerClass = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100"
    : "flex items-center justify-center p-8";

  if (variant === 'minimal') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className={containerClass}>
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-pulse">
              <Contrast className="w-16 h-16 sm:w-20 sm:h-20 text-orange-500 mx-auto mb-4" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">MENA</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">{message}</p>
          
        
          <div className="w-64 bg-gray-200 rounded-full h-1 mx-auto mb-4">
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

 
  return (
    <div className={containerClass}>
      <div className="text-center">
        
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-orange-200 mx-auto"></div>
          <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-4 border-orange-500 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
        </div>
        
       
        <p className="text-gray-600 text-sm sm:text-base mb-4 animate-pulse">{message}</p>
        
      
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
};

const useNavigationLoading = () => {
  const [isNavigating, setIsNavigating] = React.useState(false);

  const startNavigation = (callback: () => void) => {
    setIsNavigating(true);
    setTimeout(() => {
      callback();
      setTimeout(() => setIsNavigating(false), 300);
    }, 100);
  };

  return { isNavigating, startNavigation };
};

const NavigationExample: React.FC = () => {
  const { isNavigating, startNavigation } = useNavigationLoading();
  const [currentPage, setCurrentPage] = React.useState('home');

  const navigateTo = (page: string) => {
    startNavigation(() => {
      setCurrentPage(page);
    });
  };

  if (isNavigating) {
    return <LoadingScreen message="Шилжүүлж байна..." variant="branded" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Contrast className="w-12 h-12 text-orange-600" />
            <h1 className="text-4xl font-bold text-gray-800">MENA</h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            Loading Screen Examples - Current Page: <span className="font-semibold text-orange-600">{currentPage}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {['home', 'vendor-dash', 'sign-in', 'profile'].map((page) => (
            <button
              key={page}
              onClick={() => navigateTo(page)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentPage === page
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50'
              }`}
            >
              {page === 'vendor-dash' ? 'Vendor Dashboard' : 
               page === 'sign-in' ? 'Sign In' : 
               page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Default Loading Screen</h3>
            <div className="bg-gray-50 rounded-lg">
              <LoadingScreen fullScreen={false} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Minimal Loading Screen</h3>
            <div className="bg-gray-50 rounded-lg">
              <LoadingScreen fullScreen={false} variant="minimal" message="Хүлээнэ үү..." />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Branded Loading Screen</h3>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
              <LoadingScreen fullScreen={false} variant="branded" message="Системд холбогдож байна..." />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Хэрхэн ашиглах вэ?</h3>
          <div className="text-blue-700 space-y-2 text-sm">
            <p>• <code className="bg-blue-100 px-2 py-1 rounded">LoadingScreen</code> компонентыг хуудас солигдох үед ашиглана уу</p>
            <p>• <code className="bg-blue-100 px-2 py-1 rounded">useNavigationLoading</code> hook-ийг navigation loading state удирдахад ашиглана уу</p>
            <p>• <code className="bg-blue-100 px-2 py-1 rounded">variant</code> prop-оор өөр өөр загвар сонгоно уу: default, minimal, branded</p>
            <p>• <code className="bg-blue-100 px-2 py-1 rounded">fullScreen</code> prop-оор бүрэн дэлгэц эсвэл хэсэгчилсэн loading тодорхойлно уу</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationExample;
export { LoadingScreen, useNavigationLoading };