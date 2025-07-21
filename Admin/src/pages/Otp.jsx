import React, { useState } from "react";
import mea from "../assets/meadow.mp4";
import { apiClient } from "../api/client";
import { useNavigate } from "react-router";

export default function OTP() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  // const handleSendOTP = () => {
  //   if (email || phone) {
  //     setStep(2);
  //   }
  // };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // const handleConfirmOTP = () => {
  //   if (otp.join("").length === 4) {
  //     setStep(3);
  //     setTimeout(() => {
  //       setStep(4);
  //     }, 1500); // Show success before final screen
  //   }
  // };
  const handleOtp = async (data) => {
    try {
      const response = await apiClient.post("/api/V1/user/verifyOtp", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      navigate("/");
    } catch (error) {}
  };

  const handleResendOtp = async () => {
    try {
      const response = await apiClient.post("/api/V1/user/resendOtp", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
    } catch (error) {}
  };

  // const handleFinalContinue = () => {
  //   setStep(1);
  //   setEmail("");
  //   setPhone("");
  //   setOtp(["", "", "", ""]);
  // };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-2xl  text-white px-4">
        <video
          autoPlay
          loop
          muted
          src={mea}
          className="absolute bg-cover bg-center w-full -z-10"
        ></video>
        <div className=" text-white rounded-xl shadow-lg w-full max-w-sm p-8 bg-black/50">
          {/* {step === 1 && ( */}
          <>
            {/* <div className="flex justify-center mb-6"></div> */}
            <h2 className="text-xl font-semibold mb-2 text-center">
              OTP Verification
            </h2>
            <p className="text-sm text-white mb-6 text-center">
              We will send you a one-time password on your email
            </p>
            {/* <form action="">
              <input
                type="email"
                placeholder="demo@gmails.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-4 text-white"
              />
              <input
                type="tel"
                placeholder="+233 ***"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded w-full p-2 mb-6 text-white"
              />
              <button
                onClick={handleSendOTP}
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded"
              >
                Continue
              </button>
            </form> */}
          </>
          {/* )} */}

          {/* {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-2 text-center text-white">
                Verification Code
              </h2>
              <p className="text-sm mb-6 text-center text-white">
                Please enter the OTP sent to your number
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-12 h-12 text-center border border-gray-300 rounded text-lg text-white"
                  />
                ))}
              </div>
              <button
                onClick={handleConfirmOTP}
                className="bg-green-500 cursor-pointer hover:bg-orange-600 text-white w-full py-2 rounded"
              >
                Confirm
              </button>
            </>
          )} */}

          {/* {step === 3 && (
            <>
              <div className="flex justify-center mb-6">
                <div className="text-5xl text-white">✔️</div>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2 text-white">
                Success!
              </h2>
              <p className="text-white text-center mb-4">
                Congratulations! Your number has been successfully verified.
              </p>
            </>
          )} */}

          {/* {step === 4 && (
            <>
              <div className="flex justify-center mb-6">
                <div className="text-5xl text-green-500">✔️</div>
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">
                Success!
              </h2>
              <p className="text-whitetext-center mb-4">
                Your number is verified. You can now continue.
              </p>
              <button
                onClick={handleFinalContinue}
                className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded"
              >
                Continue
              </button>
            </>
          )} */}
          <>
            <form action={handleOtp}>
              <h2 className="text-xl font-semibold mb-2 text-center text-white">
                Verification Code
              </h2>
              <p className="text-sm mb-6 text-center text-white">
                Please enter the OTP sent to your number
              </p>
              {/* <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength="1"
                    name="otp"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    className="w-12 h-12 text-center border border-gray-300 rounded text-lg text-white"
                  />
                ))}
              </div> */}
              <input
                type="text"
                name="otp"
                className="border border-white flex w-[70%] mx-auto mb-7"
              />
              <div className="flex justify-center items-center mb-5">
                <h1
                  className="text-blue-600 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Resend Otp
                </h1>
              </div>
              <button
                // onClick={handleConfirmOTP}
                type="submit"
                className="bg-green-500 cursor-pointer hover:bg-orange-600 text-white w-full py-2 rounded"
              >
                Verify Otp
              </button>
            </form>
          </>
        </div>
      </div>
    </>
  );
}
