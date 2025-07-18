import React, { useState } from "react";
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
import { Link, NavLink } from "react-router";

// Reusable Sidebar Component
const Sidebar = ({ isOpen, onClose, className = "" }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admindashboard" },
    { icon: Users, label: "Farmers", href: "/Farmers" },
    { icon: Users, label: "Farm Projects", href: "/farm-projects" },
    { icon: Users, label: "Add Farm Projects", href: "/adproject" },
    { icon: BarChart3, label: "Investors", href: "/investor" },
    { icon: Settings, label: "Settings", href: "/" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-64 bg-green-800 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        ${className}
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white">
          <h1 className="text-4xl font-bold out">Ebe_Farms</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className="flex items-center px-6 py-3 text-green-100 hover:bg-green-700 mr-7 mb-4 hover:text-white transition-colors duration-200"
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};
export default Sidebar;
