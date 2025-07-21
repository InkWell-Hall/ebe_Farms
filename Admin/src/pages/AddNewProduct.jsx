import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import upload from "../assets/upload.jpeg";

const AddNewProduct = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postproject = async (data) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/api/V1/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      toast.success(response.data.message);
      setName("");
      setDescription("");
      // setReFunding("");
      navigate("/farm-products");
      window.location.reload();
      // let FormData = " ";
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar on the left */}
      {/* <div className="w-[250px] min-h-screen bg-white shadow-md hidden md:flex"> */}
      <div className="min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      {/* </div> */}

      {/* Form on the right */}
      <>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="mb-9 fixed w-280">
            <Navbar onToggleSidebar={toggleSidebar} />
          </div>

          <form
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6 px-10 mt-27"
            action={postproject}
          >
            <h1 className="text-3xl font-bold text-center text-[#0F123F] mb-4 ">
              Post New Farm Product
            </h1>

            {/* Upload Image */}
            <div className="flex justify-center items-center gap-10">
              <div className="flex gap-2">
                <label htmlFor="image1">
                  <img
                    src={!image1 ? upload : URL.createObjectURL(image1)}
                    alt=""
                    className="w-40 h-30 cursor-pointer"
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage1(e.target.files[0])}
                    id="image1"
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="image2">
                  <img
                    src={!image2 ? upload : URL.createObjectURL(image2)}
                    alt=""
                    className="w-40 h-30 cursor-pointer"
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage2(e.target.files[0])}
                    id="image2"
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="image3">
                  <img
                    src={!image3 ? upload : URL.createObjectURL(image3)}
                    alt=""
                    className="w-40 h-30 cursor-pointer"
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage3(e.target.files[0])}
                    id="image3"
                    hidden
                    required
                  />
                </label>
              </div>
              <div className="flex gap-2">
                <label htmlFor="image4">
                  <img
                    src={!image4 ? upload : URL.createObjectURL(image4)}
                    alt=""
                    className="w-40 h-30 cursor-pointer"
                  />
                  <input
                    type="file"
                    onChange={(e) => setImage4(e.target.files[0])}
                    id="image4"
                    hidden
                    required
                  />
                </label>
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

            {/* Category, Subcategory, Price */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="eg.334"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

            {/*bestSeller Checkbox */}
            <div className="flex gap-30">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bestSeller"
                  name="bestSeller"
                  value={bestseller}
                  checked={bestseller}
                  onChange={() => setBestSeller(!bestseller)}
                />
                <label htmlFor="bestseller">Mark as Best Seller</label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="bg-gray-300 px-6 py-2 rounded font-semibold"
                // onClick={() => {}}
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-green-800 text-white px-6 py-2 rounded font-semibold"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default AddNewProduct;
