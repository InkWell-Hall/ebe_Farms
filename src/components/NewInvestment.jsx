import React, { useState } from "react";
import paylogo1 from "../assets/paylogo11.png";
import Navbar from "./Navbar";
import { Link } from "react-router";
import Footer from "./Footer";
import { useContext } from "react";
import { EbeContext } from "../context/EbeContext";
import { apiClient } from "../api/client";
import { useParams, useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const NewInvestment = () => {
  const [units, setUnits] = useState(1);
  const unitCost = 1550;
  const operationalCharge = 0.05;
  const totalPayable = unitCost * units + unitCost * units * operationalCharge;
  const profitMin = totalPayable * 0.0893;
  const profitMax = totalPayable * 0.1525;
  const amount = 2000;
  const method = "mobile_money";
  //  const investmentId = "12345678987654"
  const { allFarmProject } = useContext(EbeContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // const currentFarm

  const createInvestment = async (e) => {
    e.preventDefault();

    const payload = {
      amountInvested: totalPayable,
      farmProject: `${id}`,
    };
    try {
      const response = await apiClient.post("/api/V1/investment", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
    } catch (error) {}
  };
  const initializePayment = async (e) => {
    e.preventDefault();

    const payload = {
      // amountInvested: totalPayable,
      amount,
      method,
      investmentId: `687a51189f353f2ca85cbbc5`,
    };
    try {
      const response = await apiClient.post("api/V1/init-payment", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      toast.success(response.data.message);
      window.location.href = response.data.authorization_url;
      // window.open(response.data.authorization_url, "_blank");
      navigate("/board");
    } catch (error) {}
  };

  const selectedProject = allFarmProject?.find((item) => item.id === id);

  useEffect(() => {
    if (selectedProject) {
      console.log("selected:", selectedProject);
    } else {
      console.log("selectedProject is not yet loaded or not found.");
    }
  }, [selectedProject]);
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen p-6 sm:p-10">
        <h1 className="text-5xl font-semibold mb-6 text-black out">
          New Investment
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Form */}
          <form onSubmit={initializePayment}>
            <div className="bg-white rounded-lg p-6  shadow-md border border-gray-300">
              <div className="mb-4 joseph">
                <label className="font-medium  text-m">
                  {/* {selectedProject.projectName} */}
                  Project Name
                </label>
                <input
                  type="text"
                  value={selectedProject?.projectName}
                  className="w-full mt-1 px-3 py-2 rounded border"
                  placeholder="Enter name"
                />
              </div>

              <div className="mb-4 joseph">
                <label className="font-medium text-m">
                  Project Description
                </label>
                <input
                  type="text"
                  value={selectedProject.description}
                  // readOnly
                  className="w-full mt-1 px-3 py-2 rounded border bg-gray-200"
                />
              </div>

              <div className="mb-4 joseph">
                <label className="font-medium text-m">No. of Units</label>
                <input
                  type="number"
                  className="w-full mt-1 px-3 py-2 rounded border"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  min={1}
                />
              </div>

              {/* <input type="text" placeholder="Mobile number" className="w-full mt-1 px-3 py-2 rounded border mb-2" />
               */}
              {/* <label><input type="radio" name="pay" /> Share Card</label> */}
              {/* <label><input type="radio" name="pay" /> Bank Deposit</label> */}

              <div className="mb-4 joseph">
                <label className="font-medium text-m">Extra Note</label>
                <textarea
                  placeholder="Anything we should know?"
                  className="w-full mt-1 px-3 py-2 rounded border"
                />
                <div className="mt-4 joseph">
                  <label className="font-medium text-m">Payment Method</label>
                </div>
                <div className="flex gap-3 border py-2 px-2 rounded w-45">
                  <input type="checkbox" className="mr-2" />
                  <label>
                    <img src={paylogo1} alt="" className="w-55 h-10" />
                  </label>
                </div>
              </div>

              <div className="flex items-center joseph mb-4 text-m">
                <input type="checkbox" className="mr-2" />
                <label>
                  I acknowledge the{" "}
                  <a href="#" className="text-blue-600 underline">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#1F1E17] cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700"
                >
                  Pay Now
                </button>
                <button className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded hover:bg-red-600">
                  Cancel
                </button>
              </div>
            </div>
          </form>

          {/* Right Side: Summary */}
          <div className="bg-white rounded-lg p-6 shadow-md border h-100 border-gray-300 mb-6">
            <h2 className="text-2xl font-semibold swatson mb-4">
              Investment Financial Summary
            </h2>

            <table className="w-full text-sm text-left text-gray-700">
              <tbody className="divide-y divide-gray-300">
                <tr>
                  <td className="py-2 font-medium">No of Units</td>
                  <td>{units} Unit(s)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">
                    Cost of Production per Unit
                  </td>
                  <td>₵{unitCost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Operational Charge (5%)</td>
                  <td>₵{(unitCost * units * operationalCharge).toFixed(2)}</td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2 text-lg text-black font-bold">
                    Grand Total Payable
                  </td>
                  <td className="text-[#0A6534] text-xl">
                    ₵{totalPayable.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Your Profit Margin</td>
                  <td>8.93% - 15.25%</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold text-black text-lg">
                    Potential ROI (₵)
                  </td>
                  <td className="text-[#0A6534] text-xl">
                    {profitMin.toFixed(2)} - {profitMax.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="mt-6 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600">
              Show Your Investment Calculator
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewInvestment;
