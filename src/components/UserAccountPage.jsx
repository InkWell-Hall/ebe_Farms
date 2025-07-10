import React from "react";
import logo1 from "../assets/images/logo1.png";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// ... existing components (ForgotPassword, OTPVerification, Login, SignUp)

function UserAccount() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-10"
      style={{ backgroundImage: "url('/images/agriculture-bg.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col items-center text-center">
          <img
            src="/images/user-avatar.png"
            alt="User Avatar"
            className="w-32 h-32 rounded-full mb-4 border-4 border-green-700"
          />
          <h2 className="text-2xl font-bold text-green-800 mb-1">EBE FARMS</h2>
          <p className="text-sm text-gray-600">ebefarms@gmail.com</p>
          <p className="text-sm text-gray-600 mb-4">Agricultural Analyst</p>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-green-800 mb-4">Account Details</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue="Sandra Sarkodie"
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              defaultValue="Agricultural Analyst"
              className="w-full px-4 py-2 border rounded-md mt-1"
            />
          </div>
          <button className="mt-4 w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-700 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
    </Router>
  );
}
