import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate, useParams } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import { FarmContext } from "../context/FarmContext";

const EditProduct = () => {
  const { allProducts } = useContext(FarmContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fixed image state management
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  let selectedProject = allProducts?.find((item) => String(item.id) === id);
  // Fixed useEffect to use API response data instead of context data
  useEffect(() => {
    if (id) {
      apiClient
        .get(`/api/V1/single-product/${id}`, {
          headers: {
            Authorization: `  Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          console.log(response);
          setName(selectedProject.name || "");
          setDescription(selectedProject.description || "");
          setBestSeller(selectedProject.bestSeller || "");
          setPrice(selectedProject.price || "");
        })
        .catch((error) => error);
    }
  }, []);

  // Fixed image handling function
  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  // Fixed editProduct function
  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("bestSeller", bestSeller);

    // Properly append images if they exist
    images.forEach((image, index) => {
      if (image) {
        formData.append(`images`, image); // or use `image${index + 1}` if your backend expects numbered fields
      }
    });

    // Debug: Log what's being sent
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      // Fixed API endpoint to match the GET endpoint pattern
      const response = await apiClient.patch(`/api/V1/single/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Update response:", response);
      toast.success(response.data.message);

      // Clear form data
      setName("");
      setDescription("");
      setPrice("");
      setBestSeller(false);
      setImages([null, null, null, null]);

      navigate("/farm-products");
      // window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  // Clear form function
  const clearForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setBestSeller(false);
    setImages([null, null, null, null]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      <div className="min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>

      {/* Form on the right */}
      <>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="mb-9 fixed w-280">
            <Navbar onToggleSidebar={toggleSidebar} />
          </div>

          <form
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6 px-10 mt-27"
            onSubmit={editProduct}
          >
            <h1 className="text-3xl font-bold text-center text-[#0F123F] mb-4 ">
              Edit Farm Product
            </h1>

            {/* Fixed Upload Image Section */}
            <div>
              <label className="block font-semibold mb-2 text-lg">
                Upload Images
              </label>
              <div className="flex flex-wrap gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <label
                    key={index}
                    htmlFor={`image${index}`}
                    className="w-24 h-24 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  >
                    {images[index] ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      "+"
                    )}
                    <input
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                      type="file"
                      id={`image${index}`}
                      accept="image/*"
                      hidden
                    />
                  </label>
                ))}
              </div>
              {/* Show selected file names */}
              <div className="mt-2">
                {images.map(
                  (image, index) =>
                    image && (
                      <div key={index} className="text-sm text-gray-600">
                        Image {index + 1}: {image.name}
                      </div>
                    )
                )}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Product Description */}
            <div>
              <label className="block font-semibold mb-1">
                Project Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                name="description"
                className="w-full border border-gray-300 rounded px-4 py-2 resize-none outline-none"
                placeholder="Enter description"
                required
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="eg.334"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                  required
                />
              </div>
            </div>

            {/* Best Seller Checkbox - Fixed */}
            <div className="flex gap-30">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bestSeller"
                  name="bestSeller"
                  checked={bestSeller}
                  onChange={() => setBestSeller(!bestSeller)}
                />
                <label htmlFor="bestSeller">Mark as Best Seller</label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="bg-gray-300 px-6 py-2 rounded font-semibold hover:bg-gray-400 transition-colors"
                onClick={clearForm}
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded font-semibold cursor-pointer hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default EditProduct;
