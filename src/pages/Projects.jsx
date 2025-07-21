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
import Title from "../components/Title";
import { Link, useParams } from "react-router";
import Footer from "../components/Footer";
import maize from "../assets/maize.jpg";
import plantain from "../assets/plantain.jpg";
import plant2 from "../assets/plant2.jpg";
import cassava from "../assets/cassava.jpg";
import maize2 from "../assets/maize2.jpg";
import { useContext } from "react";
import { EbeContext } from "../context/EbeContext";
import FarmProjectCard from "../components/FarmProjectCard";
// import maize from "../assets/maize.jpg"
// import maize from "../assets/maize.jpg"

const Projects = () => {
  const { allFarmProject } = useContext(EbeContext);
  const id = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [cartItems, setCartItems] = useState([]);
  const [fundProject, setFundProject] = useState(null);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "vegetables", label: "Vegetables" },
    { value: "fruits", label: "Fruits" },
    { value: "grains", label: "Grains & Cereals" },
    { value: "herbs", label: "Herbs & Spices" },
  ];

  const uniqueLocations = Array.from(
    new Set(allFarmProject.map((item) => item.location))
  );

  const locations = [
    { value: "all", label: "All Regions" },
    ...uniqueLocations.map((loc) => ({
      value: loc,
      label: loc,
    })),
  ];

  const filteredProjects = allFarmProject.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      project.category?.toLowerCase() === selectedCategory;

    const matchesLocation =
      selectedLocation === "all" ||
      project.location?.toLowerCase() === selectedLocation.toLowerCase();

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.startDate) - new Date(a.startDate);
    } else if (sortBy === "price-low") {
      return a.totalRequiredFunding - b.totalRequiredFunding;
    } else if (sortBy === "price-high") {
      return b.totalRequiredFunding - a.totalRequiredFunding;
    } else if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0); // fallback if no rating
    }
    return 0;
  });

  const getFreshnessColor = (freshness) => {
    if (freshness.includes("today")) return "text-green-600";
    if (freshness.includes("yesterday")) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <>
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
                  <Title text1={"Farm"} text2={"Projects"} />
                </h1>
                <p className="text-gray-600 mt-2">
                  Connecting you directly with local farmers through EBE-FARMS
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="max-w-8xl mx-auto px-2 py-6">
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
                    Showing {filteredProjects.length} of {sortedProjects.length}{" "}
                    products
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              <div className="flex-1 mt-10 overflow-x-hidden px-3 pb-6 no-scrollbar">
                <h1 className="mb-7 out text-3xl">ALL FARM PROJECTS</h1>
                {allFarmProject.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedProjects.map((project, n) => {
                      return (
                        <div>
                          <Link to={`/single/${project.id}`} key={n}>
                            <FarmProjectCard
                              project={project}
                              id={project.id}
                            />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-90 bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Projects is either Loading... <br /> or Not Found
                      </h2>
                      <a
                        href="/farm-project"
                        className="text-green-600 hover:text-green-700 font-medium"
                      >
                        Refresh to Load Projects
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {filteredProjects.length === 0 && (
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

export default Projects;
