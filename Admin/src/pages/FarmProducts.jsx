import React, { useContext, useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Eye,
  MapPin,
  Award,
  Clock,
  Package,
} from "lucide-react";
import Sidebar from "../components/SideBar";
import AdminNavbar from "../components/AdminNavbar";
import Navbar from "../components/Navbar";
import { FarmContext } from "../context/FarmContext";
import { Link, Navigate } from "react-router";
import { apiClient } from "../api/client";
import Modal from "../modal/DeleteProjectModal";
import { toast } from "react-toastify";

const FarmProductCard = ({ product, onAddToCart, onViewDetails, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {
    name,
    price,
    unit,
    description,
    images,
    farmer,
    location,
    rating,
    reviews,
    freshness,
    quantity,
    category,
  } = product;

  const deleteProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.delete(`/api/V1/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });

      console.log(response);
      toast.success("Product Deleted Successfully");
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 max-w-sm mx-auto">
        {/* Image Section */}
        <div className="relative h-64 bg-gray-200">
          {images ? (
            <img
              src={images[0]}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <p>No Image Available</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-lg">
              {category}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full transition-colors ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-white bg-opacity-80 text-gray-600 hover:bg-opacity-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>

            <button
              onClick={() => onViewDetails && onViewDetails(product)}
              className="p-2 bg-white bg-opacity-80 text-gray-600 rounded-full hover:bg-opacity-100 transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {name}
          </h3>

          {/* Farmer and Location */}
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 font-medium">{farmer}</p>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {rating || 0}
            </span>
            <span className="text-xs text-gray-500">
              ({reviews || 0} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Freshness and Quantity */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs text-gray-600">
              <Clock className="w-3 h-3 mr-2 text-green-500" />
              {freshness}
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Package className="w-3 h-3 mr-2 text-blue-500" />
              {quantity}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">
                ₵{price?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500">{unit}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => onAddToCart && onAddToCart(product)}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors flex items-center cursor-pointer justify-center font-medium"
            >
              <Link to={`/edit-product/${product.id}`}>Edit</Link>
            </button>

            <button
              onClick={openModal}
              className="bg-red-800 flex flex-1 items-center justify-center text-white py-2 px-4 rounded-lg hover:bg-red-900 cursor-pointer transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 font-lead-font">
          Delete Product
        </h2>
        <p className="mb-3">
          Are you sure you want to delete this Farm Product?
        </p>
        <div className="flex justify-between gap-3 mt-2">
          <button
            className="bg-green-700 px-2 py-1 text-white cursor-pointer rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-900 px-2 py-1 text-white cursor-pointer rounded"
            onClick={deleteProduct}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </>
  );
};

// Container component to display multiple product cards
const FarmProductGrid = ({ products = [], isLoading = false }) => {
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement cart logic here
  };

  const handleViewDetails = (product) => {
    console.log("Viewing details:", product);
    // Implement navigation to product details page
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <span className="text-6xl">⏳</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Loading Products...
        </h3>
        <p className="text-gray-500">
          Please wait while we fetch the products.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <span className="text-6xl">🌾</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Products Available
        </h3>
        <p className="text-gray-500">Check back soon for new farm products!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {products.map((product, index) => (
        <FarmProductCard
          key={product.id || index}
          product={product}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          id={product.id}
        />
      ))}
    </div>
  );
};

// Demo component with sample data and debugging
const FarmProducts = () => {
  const { allProducts } = useContext(FarmContext);

  // Add debugging logs
  useEffect(() => {
    console.log("=== FarmProducts Debug Info ===");
    console.log("allProducts:", allProducts);
    console.log("allProducts type:", typeof allProducts);
    console.log("allProducts length:", allProducts?.length);
    // console.log("loading:", loading);
    // console.log("error:", error);
    console.log("===============================");
  }, [allProducts]);

  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <div className="">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Navbar />
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Farm Products
            </h1>
          </div>

          <FarmProductGrid products={allProducts} />
        </div>
      </div>
    </>
  );
};

export default FarmProducts;
