import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { EbeContext } from "../context/EbeContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import pay from "../assets/paylogo.png";

const InitializePayment = () => {
  const {
    allFarmProject,
    allInvestments,
    amountedInvested,
    selectedInvestment,
    getSingleInvestment,
  } = useContext(EbeContext);
  const [method, setMethod] = useState("");
  const [units, setUnits] = useState(1);
  const [investment, setInvestment] = useState();

  const amount = selectedInvestment?.amountInvested;
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedProject = allFarmProject?.find(
    (item) => String(item.id) === id
  );
  // const selectedInvestment = allInvestments?.find(
  //   (item) => String(item._id) === String(id)
  // );

  const operationalCharge = 0.05;
  const unitCost = selectedProject?.unitPrice;
  const totalPayable = unitCost * units + unitCost * units * operationalCharge;
  const profitMin = totalPayable * selectedProject?.estimatedROI;
  const profitMax = totalPayable * selectedProject?.estimatedROI;

  const initializePayment = async (e) => {
    e.preventDefault();

    // Validation for payment method
    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    const payload = {
      // amount,
      method,
      investmentId: id,
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
      navigate("/board");
    } catch (error) {
      console.error(error);
      toast.error("Payment initialization failed");
    }
  };

  useEffect(() => {
    console.log("selectedInvestment:", selectedInvestment);
    console.log("Investment ID:", id);
    console.log("All Farm Projects:", allFarmProject);
  }, [id, selectedInvestment, allFarmProject]);

  useEffect(() => {
    getSingleInvestment(id);
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="w-[80%] mx-auto text-5xl md:mt-10 out">
        <h1>Initialize Payment</h1>
        <div className="mx-auto w-[80%] my-20">
          {/* Payment Summary Card */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-300 mb-6">
            <h2 className="text-2xl font-semibold swatson mb-6">
              Investment Payment Summary
            </h2>

            {/* Investment Details Section */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Investment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">
                    Investment ID:
                  </span>
                  <div className="mt-1 p-2 bg-white rounded border font-mono text-blue-600 font-bold">
                    {id || "Loading..."}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Project Name:
                  </span>
                  <div className="mt-1 p-2 bg-white rounded border">
                    {selectedProject?.name ||
                      selectedInvestment?.farmProject?.projectName ||
                      "N/A"}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Investment Amount:
                  </span>
                  <div className="mt-1 p-2 bg-white rounded border font-semibold text-green-600">
                    ₵{selectedInvestment?.amountInvested?.toFixed(2) || "0.00"}
                    {/* {setAmount} */}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-600">
                    Selected Payment Method:
                  </span>
                  <div className="mt-1 p-2 bg-white rounded border">
                    {method ? (
                      <span className="text-green-600 font-medium capitalize">
                        {method.replace("_", " ")}
                      </span>
                    ) : (
                      <span className="text-red-500">Not Selected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={initializePayment}>
              {/* Financial Summary Table */}

              {/* Payment Method Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Select Payment Method <span className="text-red-500">*</span>
                </h3>
                <div className="space-y-3">
                  {/* Mobile Money Option */}
                  <div
                    onClick={() => setMethod("mobile_money")}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      method === "mobile_money"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                        method === "mobile_money"
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {method === "mobile_money" && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={pay} alt="Paystack Logo" className="w-8 h-8" />
                      <span className="font-medium text-gray-700">
                        Paystack
                      </span>
                    </div>
                    {method === "mobile_money" && (
                      <span className="ml-auto text-green-600 font-medium text-sm">
                        Selected
                      </span>
                    )}
                  </div>

                  {/* Add more payment options here if needed */}
                  {/* <div
                    onClick={() => setMethod("card")}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      method === "card" 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                        method === "card" ? "border-green-500" : "border-gray-300"
                      }`}
                    >
                      {method === "card" && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-700">Debit/Credit Card</span>
                    {method === "card" && (
                      <span className="ml-auto text-green-600 font-medium text-sm">Selected</span>
                    )}
                  </div> */}
                </div>

                {/* Error message for payment method */}
                {!method && (
                  <p className="mt-2 text-red-500 text-sm">
                    Please select a payment method to continue
                  </p>
                )}
              </div>

              {/* Payment Summary Before Submit */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Payment Summary
                </h4>
                <div className="text-sm text-blue-700">
                  <p>
                    <strong>Investment ID:</strong> {id}
                  </p>
                  <p>
                    <strong>Amount to Pay:</strong> ₵{amount?.toFixed(2)}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {method
                      ? method.replace("_", " ").toUpperCase()
                      : "Not selected"}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!method}
                  className={`text-xl px-8 py-3 rounded-lg font-semibold transition-all ${
                    method
                      ? "bg-green-800 hover:bg-green-700 text-white cursor-pointer shadow-md hover:shadow-lg"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {method ? "Proceed to Payment" : "Select Payment Method"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InitializePayment;
