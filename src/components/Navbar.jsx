import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import {
  ChevronDown,
  DollarSign,
  Home,
  Phone,
  ShoppingBag,
  ShoppingCart,
  User,
  Menu,
  X,
  TrendingUp,
  Store,
  Mail,
  LogOut,
  Shield,
  BarChart3,
  Sprout,
  Wheat,
  Leaf,
} from "lucide-react";
import { useContext } from "react";
import { EbeContext } from "../context/EbeContext";

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileDropdownRef = useRef(null);
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const { getCartCount } = useContext(EbeContext);

  const signOut = () => {
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/farm-project", label: "Invest", icon: TrendingUp },
    { to: "/products", label: "Marketplace", icon: Store },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  const NavLinkComponent = ({ to, label, icon: Icon, mobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          mobile
            ? `w-full ${
                isActive
                  ? "bg-green-100 text-green-800 border-l-4 border-green-600"
                  : "text-gray-700 hover:bg-green-50"
              }`
            : `relative ${
                isActive
                  ? "text-green-100 bg-[#1F1E17]"
                  : "text-white hover:text-green-100 hover:bg-green-600/10"
              }`
        }`
      }
      onClick={() => mobile && setShowMobileMenu(false)}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <>
      <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <div className="flex overflow-hidden">
                  <div className=" rounded-lg">
                    {/* <Leaf className="w-6 h-6 text-green-600" /> */}
                    <img src={logo} alt="" className="w-19 h-18" />
                  </div>
                  <div className="text-white flex flex-col md:mt-5">
                    <h1 className="text-xl font-bold out">Ebe_Farms</h1>
                    <p className="text-xs text-green-100 out">
                      Your Farm Investment Platform
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <NavLinkComponent
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Shopping Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative text-white hover:text-green-100 transition-colors cursor-pointer"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>

              {token ? (
                <>
                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() =>
                        setShowProfileDropdown(!showProfileDropdown)
                      }
                      className="flex items-center gap-2 text-white hover:text-green-100 cursor-pointer transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          showProfileDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm out font-medium text-gray-900">
                            Account Menu
                          </p>
                        </div>
                        <button className="w-full text-left out px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Link to={"/user-profile"} className="flex gap-2">
                            <User size={16} />
                            My Profile
                          </Link>
                        </button>
                        <Link
                          to="/investor"
                          className="px-4 py-2 text-sm text-gray-700 out hover:bg-gray-50 flex items-center gap-2"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <TrendingUp size={16} />
                          Become an Investor
                        </Link>
                        <Link
                          to="/board"
                          className="px-4 py-2 text-sm out text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <BarChart3 size={16} />
                          Dashboard
                        </Link>
                        <button
                          onClick={signOut}
                          className="w-full out text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Get In Touch Button */}
                  <Link to="/contact">
                    <button className="bg-green-800 hover:bg-green-900 hidden lg:flex text-white px-4 py-2 rounded-lg transition-colors font-medium">
                      Get In Touch
                    </button>
                  </Link>
                </>
              ) : (
                <Link to="/login">
                  <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                    Login
                  </button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-white hover:text-green-100 transition-colors"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-green-200 shadow-lg">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <NavLinkComponent
                  key={link.to}
                  to={link.to}
                  label={link.label}
                  icon={link.icon}
                  mobile={true}
                />
              ))}

              {token && (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button className="w-full text-left flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                    <Shield size={18} />
                    Verify Account
                  </button>
                  <Link
                    to="/board"
                    className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <BarChart3 size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="w-full text-left flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
