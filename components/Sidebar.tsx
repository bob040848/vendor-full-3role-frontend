import {
  Package,
  ShoppingCart,
  DollarSign,
  Store,
  Truck,
  RotateCcw,
  Factory,
  X,
} from "lucide-react";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const menuItems = [
  { id: "products", label: "Бүтээгдэхүүний мэдээлэл", icon: Package },
  { id: "sales", label: "Борлуулсан бүтээгдэхүүн", icon: ShoppingCart },
  { id: "revenue", label: "Өдрийн орлого", icon: DollarSign },
  { id: "shops", label: "Дэлгүүрийн мэдээлэл", icon: Store },
  { id: "delivery", label: "Түгээлт", icon: Truck },
  { id: "returns", label: "Буцаалт", icon: RotateCcw },
  { id: "todayProducts", label: "Өнөөдрийн үйлдвэрлэсэн бүтээгдэхүүн", icon: Factory },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-800 text-white transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-orange-700">
        <h1 className="text-xl font-bold">Борлуулагчийн систем</h1>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left hover:bg-orange-700 transition-colors ${
                activeTab === item.id
                  ? "bg-orange-700 border-r-4 border-orange-400"
                  : ""
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;