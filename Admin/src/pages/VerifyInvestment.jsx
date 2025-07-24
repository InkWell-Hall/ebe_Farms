import React, { useContext, useEffect, useState } from "react";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Loader,
  Download,
  Eye,
  RefreshCw,
  ArrowBigLeft,
  ArrowRightLeft,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Title from "../components/Title";
// import { EbeContext } from "../context/EbeContext";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import { FarmContext } from "../context/FarmContext";
import Sidebar from "../components/SideBar";
import { Link } from "react-router";

const VerifyInvestment = () => {
  const { currency, allInvestments, selectedInvestment } =
    useContext(FarmContext);
  const [verificationData, setVerificationData] = useState({
    investmentId: "",
    paymentReference: "",
    transactionId: "",
    paymentMethod: "",
    amountPaid: "",
    paymentDate: "",
    investorEmail: "",
    investorPhone: "",
  });

  const [verificationResults, setVerificationResults] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showVerificationForm, setShowVerificationForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const userId = localStorage.getItem("Ebe_User_Id");
  const token = localStorage.getItem("TOKEN");

  // Sample verification results for demo
  const sampleVerifications = [
    {
      id: "VER-001",
      investmentId: "INV-2024-001",
      investmentTitle: "Organic Tomato Farming Project",
      investorName: "John Doe",
      investorEmail: "john.doe@email.com",
      investorPhone: "+233 24 123 4567",
      paymentReference: "PAY-REF-001",
      transactionId: "TXN-789123456",
      paymentMethod: "Mobile Money",
      amountPaid: 5000.0,
      expectedAmount: 5000.0,
      paymentDate: "2024-01-15T14:30:00Z",
      verificationDate: "2024-01-15T15:45:00Z",
      status: "verified",
      verifiedBy: "Admin User",
      notes: "Payment verified successfully. All details match.",
    },
    {
      id: "VER-002",
      investmentId: "INV-2024-002",
      investmentTitle: "Sustainable Rice Cultivation",
      investorName: "Jane Smith",
      investorEmail: "jane.smith@email.com",
      investorPhone: "+233 20 987 6543",
      paymentReference: "PAY-REF-002",
      transactionId: "TXN-456789123",
      paymentMethod: "Bank Transfer",
      amountPaid: 2500.0,
      expectedAmount: 3000.0,
      paymentDate: "2024-01-14T10:20:00Z",
      verificationDate: "2024-01-14T16:30:00Z",
      status: "partial",
      verifiedBy: "Admin User",
      notes: "Partial payment received. Awaiting remaining ₵500.00",
    },
    {
      id: "VER-003",
      investmentId: "INV-2024-003",
      investmentTitle: "Poultry Farm Expansion",
      investorName: "Michael Johnson",
      investorEmail: "m.johnson@email.com",
      investorPhone: "+233 26 555 0123",
      paymentReference: "PAY-REF-003",
      transactionId: "TXN-321654987",
      paymentMethod: "Credit Card",
      amountPaid: 1500.0,
      expectedAmount: 1500.0,
      paymentDate: "2024-01-13T09:15:00Z",
      verificationDate: null,
      status: "pending",
      verifiedBy: null,
      notes: "Payment verification in progress.",
    },
    {
      id: "VER-004",
      investmentId: "INV-2024-004",
      investmentTitle: "Cocoa Processing Plant",
      investorName: "Sarah Wilson",
      investorEmail: "sarah.w@email.com",
      investorPhone: "+233 23 777 8899",
      paymentReference: "PAY-REF-004",
      transactionId: "TXN-999888777",
      paymentMethod: "Mobile Money",
      amountPaid: 800.0,
      expectedAmount: 2000.0,
      paymentDate: "2024-01-12T16:45:00Z",
      verificationDate: "2024-01-13T10:00:00Z",
      status: "failed",
      verifiedBy: "Admin User",
      notes: "Payment amount insufficient. Transaction flagged for review.",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Payments" },
    { value: "pending", label: "Pending Verification" },
    { value: "verified", label: "Verified" },
    { value: "partial", label: "Partial Payment" },
    { value: "failed", label: "Failed/Rejected" },
  ];

  useEffect(() => {
    setVerificationResults(sampleVerifications);
    loadPendingVerifications();
  }, []);

  const loadPendingVerifications = async () => {
    try {
      const response = await apiClient.get("/api/V1/payment-verifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.verifications) {
        setVerificationResults(response.data.verifications);
      }
    } catch (error) {
      console.error("Error loading verifications:", error);
      // Use sample data on error
      setVerificationResults(sampleVerifications);
    }
  };

  const handleInputChange = (e) => {
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value,
    });
  };

  const verifyInvestmentPayment = async (e) => {
    e.preventDefault();

    if (!verificationData.paymentReference || !verificationData.investmentId) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await apiClient.post(
        "/api/V1/verify-investment-payment",
        verificationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Payment verification completed successfully!");
        setVerificationData({
          investmentId: "",
          paymentReference: "",
          transactionId: "",
          paymentMethod: "",
          amountPaid: "",
          paymentDate: "",
          investorEmail: "",
          investorPhone: "",
        });
        setShowVerificationForm(false);
        loadPendingVerifications();
      } else {
        toast.error(response.data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(error.response?.data?.message || "Failed to verify payment");
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-green-600 bg-green-50 border-green-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "partial":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "failed":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "partial":
        return <AlertCircle className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredResults = verificationResults.filter((result) => {
    const matchesSearch =
      result.paymentReference
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      result.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.investmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || result.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          {/* Header */}
          <div className="mb-8">
            {/* <Sidebar /> */}
            <div className="mb-10 flex ">
              <Link to={"/investors"} className="flex items-center">
                <ArrowLeft className="mr-2" size={20} /> Back
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <CreditCard className="w-8 h-8 text-green-600" />
              {/* <Title text1={"INVESTMENT PAYMENT"} text2={"VERIFICATION"} /> */}
              <h1 className="text-2xl">All INVESTMENT PAYMENT VERIFICATION</h1>
            </div>
            <p className="text-gray-600">
              Verify and manage investment payment transactions
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setShowVerificationForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Verify Investment Payment
            </button>
            <button
              onClick={loadPendingVerifications}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh Data
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by payment reference, investor name, or transaction ID..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                Showing {filteredResults.length} of {verificationResults.length}{" "}
                payment verifications
              </p>
            </div>
          </div>

          {/* Verification Results */}
          <div className="space-y-4">
            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No payment verifications found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || selectedStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "No payment verifications have been processed yet"}
                </p>
              </div>
            ) : (
              filteredResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg border ${getStatusColor(
                            result.status
                          )}`}
                        >
                          {getStatusIcon(result.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {result.paymentReference}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {result.investmentTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                            result.status
                          )}`}
                        >
                          {result.status.charAt(0).toUpperCase() +
                            result.status.slice(1)}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedPayment(result);
                            setShowPaymentDetails(true);
                          }}
                          className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{result.investorName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>
                          {currency}
                          {result.amountPaid.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CreditCard className="w-4 h-4" />
                        <span>{result.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(result.paymentDate)}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Transaction ID
                          </p>
                          <p className="text-sm text-gray-600">
                            {result.transactionId}
                          </p>
                        </div>
                        {result.status === "partial" && (
                          <div className="text-right">
                            <p className="text-sm font-medium text-orange-600">
                              Outstanding: {currency}
                              {(
                                result.expectedAmount - result.amountPaid
                              ).toFixed(2)}
                            </p>
                          </div>
                        )}
                      </div>
                      {result.notes && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-gray-600">
                            {result.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Verification Form Modal */}
        {showVerificationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Verify Investment Payment
                  </h2>
                  <button
                    onClick={() => setShowVerificationForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={verifyInvestmentPayment} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment ID *
                      </label>
                      <input
                        type="text"
                        name="investmentId"
                        value={verificationData.investmentId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="INV-2024-001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Reference *
                      </label>
                      <input
                        type="text"
                        name="paymentReference"
                        value={verificationData.paymentReference}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="PAY-REF-001"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={verificationData.transactionId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="TXN-123456789"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={verificationData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select Method</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount Paid
                      </label>
                      <input
                        type="number"
                        name="amountPaid"
                        value={verificationData.amountPaid}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Date
                      </label>
                      <input
                        type="datetime-local"
                        name="paymentDate"
                        value={verificationData.paymentDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investor Email
                      </label>
                      <input
                        type="email"
                        name="investorEmail"
                        value={verificationData.investorEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="investor@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investor Phone
                      </label>
                      <input
                        type="tel"
                        name="investorPhone"
                        value={verificationData.investorPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="+233 24 123 4567"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Verify Payment
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowVerificationForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Payment Details Modal */}
        {showPaymentDetails && selectedPayment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Payment Verification Details
                  </h2>
                  <button
                    onClick={() => setShowPaymentDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Payment Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">
                            Payment Reference
                          </p>
                          <p className="font-medium">
                            {selectedPayment.paymentReference}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Transaction ID
                          </p>
                          <p className="font-medium">
                            {selectedPayment.transactionId}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Amount Paid</p>
                          <p className="font-medium text-green-600">
                            {currency}
                            {selectedPayment.amountPaid.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Payment Date</p>
                          <p className="font-medium">
                            {formatDate(selectedPayment.paymentDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Investor Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">
                            {selectedPayment.investorName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium">
                            {selectedPayment.investorEmail}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium">
                            {selectedPayment.investorPhone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                              selectedPayment.status
                            )}`}
                          >
                            {selectedPayment.status.charAt(0).toUpperCase() +
                              selectedPayment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Investment Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {selectedPayment.investmentTitle}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        ID: {selectedPayment.investmentId}
                      </p>
                    </div>
                  </div>

                  {selectedPayment.notes && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">
                        Verification Notes
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {selectedPayment.notes}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedPayment.verificationDate && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Verified on{" "}
                        {formatDate(selectedPayment.verificationDate)} by{" "}
                        {selectedPayment.verifiedBy}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => {
                      // Download verification report logic
                      toast.info(
                        `Downloading verification report for ${selectedPayment.paymentReference}`
                      );
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button
                    onClick={() => setShowPaymentDetails(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default VerifyInvestment;
