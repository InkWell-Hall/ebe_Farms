import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate, useParams } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import { FarmContext } from "../context/FarmContext";

const EditProject = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const { allFarmProject } = useContext(FarmContext);
  let selectedProject = allFarmProject?.find((item) => String(item.id) === id);
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
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  //   const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [totalRequiredFunding, setTotalRequiredFunding] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedROI, setEstimatedROI] = useState("");
  const [durationInMonths, setDurationInMonths] = useState("");
  const [receivedFunding, setReceivedFunding] = useState("");
  const [images, setImages] = useState([null, null, null, null]);

  const [isActive, setIsActive] = useState(false);
  //   const [size, setSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //   const data = new FormData();
  // Inside the component
  //   useEffect(() => {
  //     if (selectedProject) {
  //       setProjectName(selectedProject.projectName || "");
  //       setDescription(selectedProject.description || "");
  //       setReceivedFunding(selectedProject.receivedFunding || "");
  //       setLocation(selectedProject.location || "");
  //       setStartDate(selectedProject.startDate?.slice(0, 10) || "");
  //       setEndDate(selectedProject.endDate?.slice(0, 10) || "");
  //       setRoi(selectedProject.estimatedROI || "");
  //       setIsActive(selectedProject.isActive || false);
  //       setReFunding(selectedProject.totalRequiredFunding || "");
  //       setDuration(selectedProject.durationInMonths || "");
  //       // etc...
  //     }
  //   }, []);
  useEffect(() => {
    if (id) {
      apiClient
        .get(`/api/V1/farmProjects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        })
        .then((response) => {
          console.log(response);
          setProjectName(selectedProject.projectName || "");
          setDescription(selectedProject.description || "");
          setReceivedFunding(selectedProject.receivedFunding || "");
          setLocation(selectedProject.location || "");
          setStartDate(selectedProject.startDate?.slice(0, 10) || "");
          setEndDate(selectedProject.endDate?.slice(0, 10) || "");
          setEstimatedROI(selectedProject.estimatedROI || "");
          setIsActive(selectedProject.isActive || false);
          setTotalRequiredFunding(selectedProject.totalRequiredFunding || "");
          setDurationInMonths(selectedProject.durationInMonths || "");
        })
        .catch((error) => error);
    }
  }, []);
  const editProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("projectName", projectName);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("totalRequiredFunding", totalRequiredFunding);
      formData.append("receivedFunding", receivedFunding);
      formData.append("estimatedROI", estimatedROI);
      formData.append("durationInMonths", durationInMonths);
      formData.append("isActive", isActive);

      // Properly append images if they exist
      images.forEach((image, index) => {
        if (image) {
          formData.append(`images`, image);
        }
      });

      // Debug: Log what's being sent
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await apiClient.put(
        `/api/V1/farmProjects/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update response:", response);
      toast.success(response.data?.message || "Project updated successfully");
      navigate("/farm-projects");
      window.location.reload();
    } catch (error) {
      console.error("Error updating project:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update project";
      toast.error(errorMessage);
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
            onSubmit={editProject}
          >
            <h1 className="text-3xl font-bold text-center text-[#0F123F] mb-4 ">
              Edit Farm Project
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
                  value={location}
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
                  value={estimatedROI}
                  onChange={(e) => setEstimatedROI(e.target.value)}
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
                  value={totalRequiredFunding}
                  name="totalRequiredFunding"
                  onChange={(e) => setReceivedFunding(e.target.value)}
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
                  onChange={(e) => setStartDate(e.target.value)}
                  name="startDate"
                  className="w-full border border-gray-300 rounded px-4 py-2 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
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
                  value={durationInMonths}
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
                  value={receivedFunding}
                  name="receivedFunding"
                  onChange={(e) => setReceivedFunding(e.target.value)}
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
                className="bg-[#0F123F] text-white px-6 py-2 rounded font-semibold"
                disabled={loading}
              >
                {loading ? "Editting..." : "Edit"}
              </button>
            </div>
          </form>
        </div>
      </>
    </div>
  );
};

export default EditProject;
