import React from "react";
import { Mail, Leaf, LockIcon } from "lucide-react";
import { apiClient } from "../api/client";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const NewPassword = () => {
  const newPassword = async (data) => {
    try {
      const response = await apiClient.post("/api/V1/user/newPassword", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 mt-40 md:mt-20">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">EBE FARMS</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Password
            </h2>
            {/* <p className="text-gray-600 mt-2">
              Enter your email to receive a reset link
            </p> */}
          </div>

          <form action={newPassword} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="newPassword"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  className="w-full pl-10 pr-4 py-3 rounded-lg outline-none border border-gray-300"
                  placeholder="confirm new password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Create
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <Link to={"/login"}>
                <button className="text-green-600 hover:text-green-700 font-medium cursor-pointer">
                  Login
                </button>
              </Link>
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("home")}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
