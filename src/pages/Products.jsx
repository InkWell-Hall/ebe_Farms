import React, { useState } from "react";
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

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [cartItems, setCartItems] = useState([]);
  const [fundProject, setFundProject] = useState(null);

  // Sample products data
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "vegetables",
      price: 45.0,
      unit: "per basket",
      image:
        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop",
      farmer: "Kofi Farms",
      location: "Ashanti Region",
      rating: 4.8,
      reviews: 24,
      freshness: "Harvested today",
      quantity: "50 baskets available",
      description:
        "Locally grown organic tomatoes, perfect for cooking and salads",
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation =
      selectedLocation === "all" || product.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getFreshnessColor = (freshness) => {
    if (freshness.includes("today")) return "text-green-600";
    if (freshness.includes("yesterday")) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Farm Products
              </h1>
              <p className="text-gray-600 mt-2">
                Connecting you directly with local farmers through EBE-FARMS
              </p>
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
                  Showing {filteredProducts.length} of {products.length}{" "}
                  products
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Available
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-green-600">
                        ₵{product.price.toFixed(2)}
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
                        <span className={getFreshnessColor(product.freshness)}>
                          {product.freshness}
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="w-4 h-4 mr-1" />
                        <span>{product.quantity}</span>
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
                        {product.unit}
                      </span>
                      <button
                        onClick={() => fundProject(product)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <span>Fund Project</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
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
  );
};

export default Products;
