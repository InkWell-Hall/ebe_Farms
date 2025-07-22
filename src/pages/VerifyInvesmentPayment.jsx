import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const VerifyInvesmentPayment = () => {
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
