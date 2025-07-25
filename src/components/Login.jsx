import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, Leaf } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import mea from "../assets/images/meadow.mp4";
import { Link, useLocation, useNavigate } from "react-router";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
// import { apiClient } from "../../Admin/src/api/client";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  // const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };
    try {
      const response = await apiClient.post("/api/V1/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      localStorage.setItem("TOKEN", response.data.token);
      localStorage.setItem("Ebe_User_Id", response.data.user.id);
      localStorage.setItem("Ebe_User_name", response.data.user.userName);
      toast.success("Login Successfull");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center p-4 pt-30">
        <video
          autoPlay
          loop
          muted
          src={mea}
          className="fixed inset-0 w-full h-full object-cover -z-10"
        ></video>
        <div className="max-w-md w-full bg-black/70 rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              <h1 className="text-xl md:text-2xl font-bold text-white swatson italic">
                EBE_FARMS
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="text-white mt-2 text-sm md:text-base">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={loginUser} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 border text-white border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-sm md:text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

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
                className="text-white underline hover:text-green-700 font-bold"
              >
                <Link to={"/forgetreset"}>Forgot password?</Link>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 cursor-pointer text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              {loading ? "  Signing In...." : "  Sign In"}
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white text-sm md:text-base">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/sign-up")}
                className="text-white hover:text-green-700 font-medium cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>

          <button
            onClick={() => setCurrentPage("home")}
            className="mt-4 w-full text-gray-500 hover:text-gray-700 transition-colors text-sm md:text-base cursor-pointer"
          >
            <Link to={"/"} className="text-white">
              ← Back to Home
            </Link>
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
