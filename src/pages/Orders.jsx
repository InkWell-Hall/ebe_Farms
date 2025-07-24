import React, { useContext, useEffect, useState } from "react";
import {
  Package,
  Calendar,
  MapPin,
  Eye,
  Download,
  Filter,
  Search,
  Truck,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import StatusTracker from "../components/StatusTracker";
import { EbeContext } from "../context/EbeContext";

const Orders = () => {
  const { currency, allProducts } = useContext(EbeContext);
  const [orderData, setOrderData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const token = localStorage.getItem("TOKEN");
  const userId = localStorage.getItem("Ebe_User_Id");

  // Sample order data structure (replace with your API call)
  const sampleOrders = [
    {
      id: "ORD-001",
      items: [
        {
          id: "prod1",
          name: "Fresh Tomatoes",
          image: [
            "https://images.unsplash.com/photo-1546470427-227cebe9802d?w=400",
          ],
          price: 25.5,
          quantity: 3,
          farmer: "John Doe Farm",
          location: "Greater Accra",
        },
        {
          id: "prod2",
          name: "Organic Lettuce",
          image: [
            "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400",
          ],
          price: 15.0,
          quantity: 2,
          farmer: "Green Valley Farm",
          location: "Eastern Region",
        },
      ],
      totalAmount: 106.5,
      status: "Shipped",
      orderDate: "2024-01-15T10:30:00Z",
      estimatedDelivery: "2024-01-18T16:00:00Z",
      shippingAddress: "123 Main St, Accra, Ghana",
      paymentMethod: "Mobile Money",
      orderNumber: "EBE-2024-001",
    },
    {
      id: "ORD-002",
      items: [
        {
          id: "prod3",
          name: "Sweet Corn",
          image: [
            "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400",
          ],
          price: 18.75,
          quantity: 4,
          farmer: "Sunrise Farm",
          location: "Ashanti Region",
        },
      ],
      totalAmount: 95.0,
      status: "Delivered",
      orderDate: "2024-01-10T14:20:00Z",
      estimatedDelivery: "2024-01-13T12:00:00Z",
      deliveredDate: "2024-01-13T11:30:00Z",
      shippingAddress: "456 Oak Ave, Kumasi, Ghana",
      paymentMethod: "Bank Transfer",
      orderNumber: "EBE-2024-002",
    },
    {
      id: "ORD-003",
      items: [
        {
          id: "prod4",
          name: "Fresh Spinach",
          image: [
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
          ],
          price: 12.0,
          quantity: 2,
          farmer: "Organic Gardens",
          location: "Western Region",
        },
      ],
      totalAmount: 44.0,
      status: "Order Placed",
      orderDate: "2024-01-20T09:15:00Z",
      estimatedDelivery: "2024-01-23T15:00:00Z",
      shippingAddress: "789 Cedar Rd, Takoradi, Ghana",
      paymentMethod: "Credit Card",
      orderNumber: "EBE-2024-003",
    },
  ];

  const statusOptions = [
    { value: "all", label: "All Orders", icon: Package },
    { value: "Order Placed", label: "Order Placed", icon: Clock },
    { value: "Packing", label: "Packing", icon: Package },
    { value: "Shipped", label: "Shipped", icon: Truck },
    { value: "Out for Delivery", label: "Out for Delivery", icon: Truck },
    { value: "Delivered", label: "Delivered", icon: CheckCircle },
  ];

  // Fetch orders from API
  const getMyOrders = async () => {
    if (!userId || !token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.get(`/api/V1/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.orders) {
        setOrderData(response.data.orders);
      } else {
        // Use sample data for demo
        setOrderData(sampleOrders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Use sample data on error
      setOrderData(sampleOrders);
      if (error.response?.status !== 404) {
        toast.error("Failed to load orders");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Filter orders based on search and status
  useEffect(() => {
    let filtered = orderData;

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some(
            (item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.farmer.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredOrders(filtered);
  }, [orderData, selectedStatus, searchTerm]);

  useEffect(() => {
    getMyOrders();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-blue-600 bg-blue-50";
      case "Packing":
        return "text-orange-600 bg-orange-50";
      case "Shipped":
        return "text-purple-600 bg-purple-50";
      case "Out for Delivery":
        return "text-yellow-600 bg-yellow-50";
      case "Delivered":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const calculateTotalItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const trackOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const downloadInvoice = (order) => {
    // Implement invoice download logic
    toast.info(`Downloading invoice for ${order.orderNumber}`);
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex-1 max-w-7xl mx-auto px-4 w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-green-600" />
              <Title text1={"MY"} text2={"ORDERS"} />
            </div>
            <p className="text-gray-600">
              Track and manage your farm product orders
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by order number or product name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
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

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredOrders.length} of {orderData.length} orders
              </p>
              <div className="flex gap-2">
                {statusOptions.slice(1).map((status) => {
                  const count = orderData.filter(
                    (order) => order.status === status.value
                  ).length;
                  return (
                    <span
                      key={status.value}
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        status.value
                      )}`}
                    >
                      {status.label}: {count}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No orders found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedStatus !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                {!searchTerm && selectedStatus === "all" && (
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
                    Start Shopping
                  </button>
                )}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            Order #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => trackOrder(order)}
                          className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => downloadInvoice(order)}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Invoice
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>
                                {item.farmer} • {item.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span>Quantity: {item.quantity}</span>
                              <span className="font-medium text-green-600">
                                {currency}
                                {item.price.toFixed(2)} each
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              {currency}
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Expected delivery:{" "}
                            {formatDate(order.estimatedDelivery)}
                          </p>
                          {order.deliveredDate && (
                            <p className="text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              Delivered on: {formatDate(order.deliveredDate)}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            <MapPin className="w-4 h-4 inline mr-1" />
                            {order.shippingAddress}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {calculateTotalItems(order.items)} items
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            Total: {currency}
                            {order.totalAmount.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            via {order.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Status Tracker */}
                    <div className="mt-6">
                      <StatusTracker status={order.status} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderDetails && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Details - #{selectedOrder.orderNumber}
                  </h2>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <AlertCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Order Status
                    </h3>
                    <StatusTracker status={selectedOrder.status} />
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Items Ordered
                    </h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.farmer}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">Qty: {item.quantity}</p>
                            <p className="text-sm text-gray-600">
                              {currency}
                              {item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Delivery Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p>
                        <strong>Address:</strong>{" "}
                        {selectedOrder.shippingAddress}
                      </p>
                      <p>
                        <strong>Expected:</strong>{" "}
                        {formatDate(selectedOrder.estimatedDelivery)}
                      </p>
                      {selectedOrder.deliveredDate && (
                        <p>
                          <strong>Delivered:</strong>{" "}
                          {formatDate(selectedOrder.deliveredDate)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">
                      Payment Summary
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>Total Amount:</span>
                        <span className="font-bold text-lg">
                          {currency}
                          {selectedOrder.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Paid via {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => downloadInvoice(selectedOrder)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Download Invoice
                  </button>
                  <button
                    onClick={() => setShowOrderDetails(false)}
                    className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
