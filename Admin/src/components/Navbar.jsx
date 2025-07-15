import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  BarChart3,
  Bell,
  Search,
  User,
} from "lucide-react";

const Navbar = ({ onToggleSidebar, className = "" }) => {
  return (
    <nav
      className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </button>

          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900 relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Swatson_Jnr
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
