import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  User,
  LockIcon,
  Phone,
} from "lucide-react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
import mea from "../assets/meadow.mp4";
import { Link, useNavigate } from "react-router";
// import { apiClient } from "../api/client";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { apiClient } from "../api/client";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const navigate = useNavigate();

  const signUpUser = async (data) => {
    try {
      const response = await apiClient.post("/api/V1/user/adminsignUp", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      localStorage.setItem("TOKEN", response.data.token);
      localStorage.setItem("Ebe_User_Id", response.data.user.id);
      navigate("/otp");
    } catch (error) {}
  };

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen flex items-center justify-center p-4 pt-30">
        <video
          autoPlay
          loop
          muted
          src={mea}
          className="fixed inset-0 w-full h-full object-cover -z-10"
        ></video>
        <div className="max-w-md w-full bg-black/50 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <h1 className="text-xl md:text-2xl font-bold text-green-800">
                EBE FARMS
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white out">
              Welcome
            </h2>
            <p className="text-white mt-2 text-sm md:text-base out">
              Sign up to create an account
            </p>
          </div>

          <form action={signUpUser} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type="text"
                  name="userName"
                  className="w-full pl-10 pr-4 py-2 md:py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-2 md:py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type="text"
                  name="phoneNumber"
                  className="w-full pl-10 pr-4 py-2 md:py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full pl-10 pr-12 py-2 md:py-3 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-600"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Admin Code
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type={showAdminCode ? "text" : "password"}
                  name="adminCode"
                  className="w-full pl-10 pr-12 py-2 md:py-3 text-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminCode(!showAdminCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-600"
                >
                  {showAdminCode ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/*  */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                />
                <span className="ml-2 text-white">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setCurrentPage("forgot-password")}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 cursor-pointer text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white text-sm md:text-base">
              Already have an account?{" "}
              <button
                // onClick={() => setCurrentPage("signup")}
                className="text-green-600 font-bold hover:text-green-700 cursor-pointer"
              >
                <Link to={"/"}>Login</Link>
              </button>
            </p>
          </div>

          <button className="mt-4 w-full text-white hover:text-gray-700 transition-colors text-sm md:text-base cursor-pointer">
            <Link to={"/"}>← Back to</Link>
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
};

export default SignUp;
