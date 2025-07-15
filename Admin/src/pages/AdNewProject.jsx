import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";

const AdNewProject = () => {
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
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("topwear");
  const [isActive, setIsActive] = useState(false);
  const [size, setSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const postproject = async (data) => {
  //   try {
  //     const response = await apiclient.post("/api/V1/farmProjects", data, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,

  //       }
  //     });

      
    // } catch (error) {
      
    // }
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
            // onSubmit={postAd}
          >
            <h1 className="text-3xl font-bold text-center text-[#0F123F] mb-4 ">
              Post New Farm Project
            </h1>

            {/* Upload Image */}
            <div>
              <label className="block font-semibold mb-2 text-lg">
                Upload Images
              </label>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <label
                    key={num}
                    htmlFor={`image${num}`}
                    className="w-24 h-24 bg-gray-100 border border-dashed border-gray-400 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200"
                  >
                    +
                    <input
                      onChange={(e) =>
                        eval(`setImage${num}(e.target.files[0])`)
                      }
                      type="file"
                      name="images"
                      id={`image${num}`}
                      hidden
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-semibold mb-1">Project Name</label>
              <input
                type="text"
                value={name}
                name="projectName"
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
                <label className="block font-semibold mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="eg.Kumasi"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Estimated ROI
                </label>
                <input
                  type="number"
                  name="estimatedROI"
                  placeholder="₵0.00"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Total Required Funding (₵)
                </label>
                <input
                  type="number"
                  value={price}
                  name="totalRequiredFunding"
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                  placeholder="₵0.00"
                  required
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Project Duration
                </label>
                <input
                  type="number"
                  value={price}
                  name="durationInMonths"
                  // onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                  placeholder="Duration In Months"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <div>
              <label className="block font-semibold mb-1">
                Total Funding Required (₵)
              </label>
              <input
                type="number"
                placeholder="₵0.00"
                name="totalRequiredFunding"
                className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
              />
            </div> */}

              <div>
                <label className="block font-semibold mb-1">
                  Total Funding Received (₵)
                </label>
                <input
                  type="number"
                  name="receivedFunding"
                  placeholder="₵0.00"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>
            </div>

            {/* isActive Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <label htmlFor="bestseller">Mark as Active</label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="bg-gray-300 px-6 py-2 rounded font-semibold"
                onClick={() => {
                  // Optionally clear all fields here
                }}
              >
                Clear
              </button>
              <button
                type="submit"
                className="bg-[#0F123F] text-white px-6 py-2 rounded font-semibold"
                disabled={loading}
              >
                {loading ? "ADDING..." : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default AdNewProject;
