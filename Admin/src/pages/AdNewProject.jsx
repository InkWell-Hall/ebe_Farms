import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import upload from "../assets/upload.jpeg";

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
  // const [image4, setImage4] = useState(false);
  const [images, setImages] = useState("");
  // const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [location, setLocation] = useState("");
  const [numberOfInvestors, setNumberOfInvestors] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRequiredFunding, setTotalRequiredFunding] = useState("");
  const [receivedFunding, setReceivedFunding] = useState("");
  const [estimatedROI, setEstimatedROI] = useState("");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const postproject = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true at start

    const formData = new FormData();

    // Append images with better validation
    if (image1 && image1 instanceof File) formData.append("images", image1);
    if (image2 && image2 instanceof File) formData.append("images", image2);
    if (image3 && image3 instanceof File) formData.append("images", image3);
    if (image4 && image4 instanceof File) formData.append("images", image4);

    // Append other fields
    formData.append("projectName", projectName);
    formData.append("description", description);
    formData.append("numberOfInvestors", numberOfInvestors);
    formData.append("location", location);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("totalRequiredFunding", totalRequiredFunding);
    formData.append("receivedFunding", receivedFunding);
    formData.append("estimatedROI", estimatedROI);
    formData.append("durationInMonths", durationInMonths);
    formData.append("isActive", isActive);

    try {
      const response = await apiClient.post("/api/V1/farmProjects", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message);

      // Fix 3: Correct the state reset
      setProjectName(""); // Instead of setName("")
      setDescription("");
      setLocation("");
      setStartDate("");
      setEndDate("");
      setTotalRequiredFunding("");
      setReceivedFunding("");
      setEstimatedROI("");
      setDurationInMonths("");
      setIsActive(false);
      setImage1(false);
      setImage2(false);
      setImage3(false);
      setImage4(false);
      navigate("/farm-projects");
      window.location.reload();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false); // Always set loading to false
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
            onSubmit={postproject}
          >
            <h1 className="text-3xl font-bold text-center text-[#0F123F] mb-4 ">
              Post New Farm Project
            </h1>

            {/* Upload Image */}
            <div className="flex justify-center items-center gap-10">
              {/* <label className="block font-semibold mb-2 text-lg">
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
              </div> */}

              <div className="flex gap-2">
                <label htmlFor="image1">
                  <img
                    src={!image1 ? upload : URL.createObjectURL(image1)}
                    alt=""
                    className="w-40 h-30 cursor-pointer"
                  />
                  <input
                    type="file"
                    name="image1"
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
                    name="image2"
                    onChange={(e) => setImage2(e.target.files[0])}
                    id="image2"
                    hidden
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
                    name="image3"
                    hidden
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
                    name="image4"
                    hidden
                  />
                </label>
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-semibold mb-1">Project Name</label>
              <input
                type="text"
                value={projectName}
                name="projectName"
                onChange={(e) => setProjectName(e.target.value)}
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
                  onChange={(e) => setLocation(e.target.value)}
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
                  value={estimatedROI}
                  onChange={(e) => setEstimatedROI(e.target.value)}
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
                  value={totalRequiredFunding}
                  name="totalRequiredFunding"
                  onChange={(e) => setTotalRequiredFunding(e.target.value)}
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
                  value={startDate}
                  name="startDate"
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Project Duration
                </label>
                <input
                  type="number"
                  // value={price}
                  name="durationInMonths"
                  onChange={(e) => setDurationInMonths(e.target.value)}
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
                  onChange={(e) => setReceivedFunding(e.target.value)}
                  placeholder="₵0.00"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Number of Investors
                </label>
                <input
                  type="number"
                  name="numberOfInvestors"
                  onChange={(e) => setNumberOfInvestors(e.target.value)}
                  placeholder="eg.3"
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
                value={isActive}
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

export default AdNewProject;
