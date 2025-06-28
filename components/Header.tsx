// frontend/components/Header.tsx
import { Menu } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

type HeaderProps ={
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
          <h1 className="ml-3 text-lg font-semibold text-gray-800 lg:hidden">
          Борлуулагчийн систем
          </h1>
        </div>
        
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8 lg:w-10 lg:h-10",
                userButtonTrigger: "focus:ring-orange-500 focus:ring-2",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;