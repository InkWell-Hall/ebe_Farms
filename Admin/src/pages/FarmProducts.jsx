import React, { useContext, useState } from "react";
import { Star, ShoppingCart, Heart, Eye, MapPin, Award } from "lucide-react";
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { name, price, description, bestSeller, images = [] } = product;

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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

      // Navigate("/farm-products");
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
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImageIndex]}
                alt={name}
                className="w-full h-full object-cover"
              />

              {/* Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    →
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageChange(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
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

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {bestSeller && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                <Award className="w-3 h-3 mr-1" />
                Best Seller
              </span>
            )}
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

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600">
                ₵{price?.toLocaleString()}
              </span>
            </div>

            {/* Rating (placeholder - can be added to schema later) */}
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <Star className="w-4 h-4 text-gray-300" />
              <span className="text-xs text-gray-500 ml-1">(4.0)</span>
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
              className="bg-red-800 flex flex-1 items-center justify-center text-white py-2 px-4 rounded-lg hover:bg-gray-400 cursor-pointer transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 font-lead-font">
          Delete Advert
        </h2>
        <p className="mb-3">
          Are you sure you want to delete this Farm Product?
        </p>
        {/* <p>Please we beg reconsider oo!!</p> */}
        <div className="flex justify-between gap-3 mt-2 ">
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
const FarmProductGrid = ({ products = [] }) => {
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    // Implement cart logic here
  };

  const handleViewDetails = (product) => {
    console.log("Viewing details:", product);
    // Implement navigation to product details page
  };

  if (products.length === 0) {
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

// Demo component with sample data
const FarmProducts = () => {
  //   const sampleProducts = [
  //     {
  //       id: "1",
  //       name: "Joi Villa",
  //       price: 10000,
  //       description:
  //         "A sustainable maize farming project targeting export-quality grain production.",
  //       bestSeller: true,
  //       images: [
  //         "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
  //         "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
  //       ],
  //     },
  //     {
  //       id: "2",
  //       name: "Green Valley Organic",
  //       price: 7500,
  //       description:
  //         "Premium organic vegetables grown with sustainable farming practices.",
  //       bestSeller: false,
  //       images: [
  //         "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  //       ],
  //     },
  //     {
  //       id: "3",
  //       name: "Golden Harvest Rice",
  //       price: 12000,
  //       description:
  //         "High-quality rice production with modern irrigation systems.",
  //       bestSeller: true,
  //       images: [
  //         "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop",
  //         "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop",
  //       ],
  //     },
  //   ];
  const { allProducts } = useContext(FarmContext);

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
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of sustainable farm products and
            investment opportunities.
          </p> */}
          </div>

          <FarmProductGrid products={allProducts} />
        </div>
      </div>
    </>
  );
};

export default FarmProducts;
