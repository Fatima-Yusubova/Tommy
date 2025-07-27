import React from 'react'
import { Package, Grid3X3, LogOut, Home, Settings, User } from "lucide-react";
const Sidebar = () => {
    const menuItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "categories", label: "Categories", icon: Grid3X3 },
      { id: "products", label: "Products", icon: Package },
      { id: "users", label: "Users", icon: User },
      { id: "settings", label: "Settings", icon: Settings },
    ];
    const [activeItem, setActiveItem] = React.useState("dashboard")
  return (
    <div className="h-screen w-64 bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-purple-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">L</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">LOGO</h1>
            <p className="text-purple-300 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 shadow-lg"
                    : "hover:bg-purple-700/50 hover:translate-x-1"
                }`}
              >
                <IconComponent
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-cyan-300"
                      : "text-purple-300 group-hover:text-white"
                  }`}
                />
                <span
                  className={`font-medium ${
                    isActive
                      ? "text-white"
                      : "text-purple-200 group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-purple-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-purple-800/50 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-medium">Admin User</p>
            <p className="text-purple-300 text-sm">admin@example.com</p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 hover:text-white hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-200 group">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-32 left-4 w-16 h-16 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-lg"></div>
    </div>
  );
}

export default Sidebar