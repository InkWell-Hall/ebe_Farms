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
import { NavLink } from "react-router";

// Reusable Sidebar Component
const Sidebar = ({ isOpen, onClose, className = "" }) => {
  const menuItems = [
    { icon: Home, label: "Investment", href: "/board" },
    { icon: Users, label: "Rental", href: "/rentals" },
    // { icon: BarChart3, label: "Analytics", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
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
        <div className="flex items-center justify-between p-4 border-b border-green-600">
          <h1 className=" font-bold out text-4xl">EBE_FARMS</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className="flex items-center px-6 py-3 text-green-100 hover:bg-green-700 hover:text-white transition-colors duration-200"
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
