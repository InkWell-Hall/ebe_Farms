import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient } from "../api/client";

const VerifyInvesmentPayment = () => {
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState(false);
 const VerifyInvesmentPayment =async (event) => {
    event.preventDefault();
        setLoading(true);
        data = { email, password };
        try {
          const response = await apiClient.post("/api/V1/verify-order-payment", data, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          localStorage.setItem("TOKEN", response.data.token);
          localStorage.setItem("Ebe_User_Id", response.data.user.id);
          toast.success("Login Successfull");
          navigate("/");
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <form action="" className="flex justify-center items-center flex-col">
          <div className="flex flex-col">
            <label htmlFor="reference">Investment Reference</label>
            <input type="text" name="reference" className="border" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="reference">Investment</label>
            <input type="text" name="investmentId" className="border" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default VerifyInvesmentPayment;
