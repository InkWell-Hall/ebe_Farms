import React from "react";
import logo1 from "../assets/images/logo1.png";
function OTPVerification() {
    const navigate = useNavigate();



    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
        >
            <img src="./assets/agric-bg.png" alt="EBE FARMS" class="w-full rounded-lg shadow-md"></img>
            <div className="bg-white bg-opacity-80 rounded-lg shadow-lg flex w-full max-w-5xl overflow-hidden">
                <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
                    <img
                        src="assets/images/logo1.png"
                        alt="EBE FARMS"
                        className="h-14 mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2">Check your Mailbox</h2>
                    <p className="mb-6 text-sm text-gray-600">
                        Please enter the OTP to proceed
                    </p>

                    <input
                        type="text"
                        placeholder="OTP"
                        className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2e26]"
                    />

                    <button className="w-full py-2 bg-black text-white rounded-md font-semibold hover:bg-[#3a2e26] transition">
                        VERIFY
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 text-sm text-[#3a2e26] hover:underline"
                    >
                        BACK
                    </button>
                </div>

                <div className="w-1/2 bg-black text-white p-10 flex flex-col justify-center items-center rounded-r-lg">
                    <img
                        src="/images/ebefarms-logo1.png"
                        alt="EBE FARMS"
                        className="h-20 mb-6"
                    />
                    <h1 className="text-3xl font-bold mb-2">EBE FARMS</h1>
                    <p className="text-sm tracking-wide uppercase mb-8">Farms</p>
                    <p className="text-center text-base">
                        "Nurturing the land, growing with you."
                    </p>
                </div>
            </div>
        </div>
    );
}
