import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  MapPin,
  Clock,
  Truck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Support from "../components/Support";
import Title from "../components/Title";
import { Link } from "react-router";
import Footer from "../components/Footer";
import { EbeContext } from "../context/EbeContext";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { allProducts, cartItems, setCartItems, getCartCount } =
    useContext(EbeContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const quant = 20;
  const itemId = "687fd108b3a4e5df17502cb1";
  const categories = [
    { value: "all", label: "All Products" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "herbs", label: "Herbs & Spices" },
  ];

  const locations = [
    { value: "all", label: "All Regions" },
    { value: "Greater Accra", label: "Greater Accra" },
    { value: "Ashanti Region", label: "Ashanti Region" },
    { value: "Eastern Region", label: "Eastern Region" },
    { value: "Western Region", label: "Western Region" },
    { value: "Central Region", label: "Central Region" },
  ];

  const filteredProducts = allProducts?.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "all" || product.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getFreshnessColor = (freshness) => {
    if (!freshness || typeof freshness !== "string") return "text-gray-400";
    if (freshness.includes("today")) return "text-green-600";
    if (freshness.includes("yesterday")) return "text-yellow-600";
    return "text-orange-600";
  };

  const userId = localStorage.getItem("Ebe_User_Id");

  useEffect(() => {
    window.scroll(0, 0);
    console.log("UserId:", userId);
    console.log("Products:", allProducts);
  }, []);

  useEffect(() => {
    console.log("Products state changed:", {
      length: allProducts?.length,
      products: allProducts,
      isArray: Array.isArray(allProducts),
    });

    if (allProducts !== undefined) {
      setIsLoading(false);
    }
  }, [allProducts]);

  // Monitor cart changes and count
  useEffect(() => {
    console.log("Cart items changed:", cartItems);
    console.log("Cart count:", getCartCount());
  }, [cartItems, getCartCount]);

  // FIXED: Simplified addToCart function
  const addToCart = async (itemId, quantity) => {
    if (!userId) {
      toast.error("Please log in to add items to cart");
      return;
    }

    // Create a copy of current cart items
    let cartData = structuredClone(cartItems);

    // Simple cart structure - just store quantity per item
    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    // Update local state immediately
    setCartItems(cartData);
    console.log("Updated cart data:", cartData);

    try {
      const response = await apiClient.post(
        "api/V1/cart/add",
        { itemId, quantity: quant },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      console.log("API Response:", response);
      toast.success("Product Added to Cart");
    } catch (error) {
      console.error("Add to cart error:", error);

      // Revert the cart state if API call fails
      setCartItems(cartItems);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  <Title text1={"Farm"} text2={"Products"} />
                </h1>
                <p className="text-gray-600 mt-2">
                  Connecting you directly with local farmers through EBE-FARMS
                </p>
              </div>
              {/* Display cart count for debugging */}
              <div className="text-sm text-gray-600">
                Cart Items: {getCartCount()}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Filter & Search
                </h3>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products or farmers..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Region
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {locations.map((loc) => (
                      <option key={loc.value} value={loc.value}>
                        {loc.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Results Summary */}
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Showing {filteredProducts?.length} of {allProducts?.length}{" "}
                    products
                  </p>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-lg text-gray-600">
                    Loading products...
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts?.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    >
                      <div className="relative">
                        <Link to={`/single-products/${product.id}`}>
                          <img
                            src={product.images?.[0] || product.images}
                            alt={product.name}
                            className="w-full h-48 object-cover cursor-pointer"
                          />
                        </Link>
                        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          New
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <Link to={`/single-products/${product.id}`}>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer">
                              {product.name}
                            </h3>
                          </Link>
                          <span className="text-xl font-bold text-green-600">
                            ₵{product.price?.toFixed(2)}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>
                              {product.farmer} • {product.location}
                            </span>
                          </div>

                          <div className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            <span
                              className={getFreshnessColor(product.freshness)}
                            >
                              {product.freshness || "Freshness Unknown"}
                            </span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <Truck className="w-4 h-4 mr-1" />
                            <span>{product.quantity} per basket</span>
                          </div>

                          <div className="flex items-center">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-600">
                                {product.rating} ({product.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {product.unit} in stock
                          </span>
                          {/* FIXED: Use actual product.id and remove Link wrapper */}
                          <button
                            onClick={() => addToCart(itemId, quant)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && filteredProducts?.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg">
                    No products found matching your criteria
                  </div>
                  <p className="text-gray-400 mt-2">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <Support />
      </div>
      <Footer />
    </>
  );
};

export default Products;
