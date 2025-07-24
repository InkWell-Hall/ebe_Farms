import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Truck,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Plus,
  Minus,
  Shield,
  Award,
  Leaf,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Link, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Footer from "../components/Footer";
import { useContext } from "react";
import { EbeContext } from "../context/EbeContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);
  const { allProducts } = useContext(EbeContext);

  // Sample products data (you can move this to a context or fetch from API)
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: 45.0,
      unit: "per basket",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1546470427-227e0b22cd5b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop",
      ],
      farmer: "Kofi Farms",
      location: "Ashanti Region",
      rating: 4.8,
      reviews: 24,
      freshness: "Harvested today",
      quantity: "50 baskets available",
      description:
        "Locally grown organic tomatoes, perfect for cooking and salads",
      detailedDescription:
        "Our organic tomatoes are grown using sustainable farming practices without the use of synthetic pesticides or fertilizers. These vine-ripened tomatoes are harvested at peak freshness to ensure maximum flavor and nutritional value. Perfect for cooking, salads, sauces, and fresh eating.",
      specifications: {
        weight: "5kg per basket",
        variety: "Roma Tomatoes",
        organic: "Yes",
        harvest: "Daily",
        shelfLife: "7-10 days",
      },
      farmerInfo: {
        name: "Kofi Mensah",
        experience: "15 years",
        phone: "+233 24 123 4567",
        farmSize: "20 acres",
        practices: "Organic, Sustainable",
      },
      nutrition: {
        calories: "18 per 100g",
        vitamin_c: "28mg",
        lycopene: "High",
        fiber: "1.2g",
      },
    },
    {
      id: 2,
      name: "Corn",
      category: "vegetables",
      price: 25.0,
      unit: "per dozen",
      image:
        "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop",
      farmer: "Ama's Garden",
      location: "Greater Accra",
      rating: 4.9,
      reviews: 31,
      freshness: "Harvested yesterday",
      quantity: "120 dozens available",
      description:
        "Sweet and tender corn, freshly picked from our sustainable farm",
    },
    {
      id: 3,
      name: "Organic Lettuce",
      category: "vegetables",
      price: 15.0,
      unit: "per head",
      image:
        "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop",
      farmer: "Green Valley Farm",
      location: "Eastern Region",
      rating: 4.7,
      reviews: 18,
      freshness: "Harvested today",
      quantity: "80 heads available",
      description: "Crisp and fresh lettuce, grown without pesticides",
    },
    {
      id: 4,
      name: "Ripe Bananas",
      category: "fruits",
      price: 35.0,
      unit: "per bunch",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
      farmer: "Tropical Farms",
      location: "Western Region",
      rating: 4.6,
      reviews: 42,
      freshness: "Picked 2 days ago",
      quantity: "200 bunches available",
      description: "Sweet and ripe bananas, perfect for eating or smoothies",
    },
    {
      id: 5,
      name: "Pineapples",
      category: "fruits",
      price: 20.0,
      unit: "per piece",
      image:
        "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=400&h=300&fit=crop",
      farmer: "Sunshine Plantation",
      location: "Central Region",
      rating: 4.9,
      reviews: 56,
      freshness: "Harvested 3 days ago",
      quantity: "150 pieces available",
      description: "Juicy and sweet pineapples, grown in rich volcanic soil",
    },
    {
      id: 6,
      name: "Cocoa Beans",
      category: "grains",
      price: 180.0,
      unit: "per 50kg bag",
      image:
        "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop",
      farmer: "Heritage Cocoa Farm",
      location: "Ashanti Region",
      rating: 4.8,
      reviews: 12,
      freshness: "Dried and ready",
      quantity: "25 bags available",
      description:
        "Premium quality cocoa beans, perfect for chocolate production",
    },
  ];

  const product = allProducts.find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h2>
          <Link
            to="/products"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Get related products (same category, different products)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const getFreshnessColor = (freshness) => {
    if (!freshness || typeof freshness !== "string") return "text-gray-400"; // fallback color
    if (freshness.includes("today")) return "text-green-600";
    if (freshness.includes("yesterday")) return "text-yellow-600";
    return "text-orange-600";
  };

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity(quantity + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const images = product.images || [product.image];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-green-600">
              Home
            </Link>
            <span>•</span>
            <Link to="/products" className="hover:text-green-600">
              Products
            </Link>
            <span>•</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Back Button */}
          <Link
            to="/products"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex space-x-2">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? "border-green-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-lg font-medium text-gray-900">
                        {product.rating}
                      </span>
                      <span className="ml-2 text-gray-600">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="text-green-600 font-medium">In Stock</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-3xl font-bold text-green-600">
                      ₵{product.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600">{product.unit}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>
                      {product.farmer} • {product.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className={getFreshnessColor(product.freshness)}>
                      {product.freshness}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Truck className="w-5 h-5 mr-2" />
                    <span>{product.quantity}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{product.description}</p>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange("decrease")}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange("increase")}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      // to="/newinvestment"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Link>
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={`px-4 py-3 rounded-lg border transition-colors ${
                        isFavorite
                          ? "bg-red-50 border-red-200 text-red-600"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button className="px-4 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-green-600">
                    <Shield className="w-5 h-5 mr-2" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Award className="w-5 h-5 mr-2" />
                    <span className="text-sm">Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Leaf className="w-5 h-5 mr-2" />
                    <span className="text-sm">Fresh & Organic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex space-x-8 px-6">
                {["details", "farmer", "nutrition", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="px-6 py-6">
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      {product.detailedDescription || product.description}
                    </p>
                    {product.specifications && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="font-medium text-gray-700 capitalize">
                                {key.replace("_", " ")}:
                              </span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "farmer" && (
                  <div className="space-y-4">
                    {product.farmerInfo ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Farmer Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">
                                {product.farmerInfo.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Experience:</span>
                              <span className="font-medium">
                                {product.farmerInfo.experience}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Farm Size:</span>
                              <span className="font-medium">
                                {product.farmerInfo.farmSize}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Practices:</span>
                              <span className="font-medium">
                                {product.farmerInfo.practices}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Contact Farmer
                          </h3>
                          <div className="space-y-2">
                            <button className="flex items-center text-green-600 hover:text-green-700">
                              <Phone className="w-4 h-4 mr-2" />
                              {product.farmerInfo.phone}
                            </button>
                            <button className="flex items-center text-green-600 hover:text-green-700">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Send Message
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Farmer: {product.farmer} from {product.location}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "nutrition" && (
                  <div className="space-y-4">
                    {product.nutrition ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.nutrition).map(
                          ([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="font-medium text-gray-700 capitalize">
                                {key.replace("_", " ")}:
                              </span>
                              <span className="text-gray-600">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Nutritional information not available for this product.
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl font-bold text-gray-900">
                        {product.rating}
                      </div>
                      <div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          Based on {product.reviews} reviews
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-600">
                      Customer reviews will be displayed here.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                  >
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-green-600 mb-2">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">
                          ₵{relatedProduct.price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Support />
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;
