import React, { useState } from "react";
import mea from "../assets/images/meadow.mp4";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router";
import { TrendingUp } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function Investor() {
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    const payload = { address: address, accountNumber, signature };
    try {
      const response = await apiClient.post("/api/V1/investors", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      toast.success("Congratulations You are an Investor Now");
      console.log(response);
      navigate("/");
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
      <div className="flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-2xl  text-white px-4">
        <video
          autoPlay
          loop
          muted
          src={mea}
          className="fixed inset-0 object-cover h-full w-full -z-10"
        ></video>
        <div className=" text-white rounded-xl shadow-lg w-full max-w-sm p-8 bg-black/50">
          {/* {step === 1 && ( */}
          <>
            {/* <div className="flex justify-center mb-6"></div> */}
            <h2 className="text-2xl flex items-center justify-center font-bold mb-1 text-center text-gray-200 out">
              Become An Investor <TrendingUp />
            </h2>
            <p className="text-[20px] text-white mb-4 text-center">
              Enter your address below
              <br />
              <span className="text-[14px] mt-9">
                Your Farm Investment Platform
              </span>
            </p>
          </>

          <>
            <form onSubmit={handleOtp}>
              <div className="flex flex-col">
                <label className="ml-13 mb-1 out">Address :</label>
                <input
                  type="text"
                  required
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter Address"
                  className="border border-white outline-none px-2 py-0.5 rounded flex w-[70%] mx-auto mb-7 text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="ml-13 mb-1 out">Address :</label>
                <input
                  type="number"
                  required
                  name="accountNumber"
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter Address"
                  className="border border-white outline-none px-2 py-0.5 rounded flex w-[70%] mx-auto mb-7 text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="ml-13 mb-1 out">Address :</label>
                <input
                  type="text"
                  required
                  name="signature"
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Enter Address"
                  className="border border-white outline-none px-2 py-0.5 rounded flex w-[70%] mx-auto mb-7 text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-green-700 font-bold out cursor-pointer hover:bg-green-400 text-white w-full py-2 rounded"
              >
                {loading ? "Submtting.." : " Become an Investor"}
              </button>
            </form>
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}
