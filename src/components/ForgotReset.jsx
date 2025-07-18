import { useState } from "react";
import { Mail, Leaf } from "lucide-react";
import { apiClient } from "../api/client";
import { Link } from "react-router";
import Navbar from "./Navbar";

const ForgotReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const passwordReset = async (event, data) => {
    event.preventDefault();
    setLoading(true);
    data = { email };
    try {
      const response = await apiClient.post(
        "/api/V1/user/reset-Password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );

      console.log(response);
      setEmail("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">EBE FARMS</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Forgot Password
            </h2>
            <p className="text-gray-600 mt-2">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={passwordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
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

export default ForgotReset;
