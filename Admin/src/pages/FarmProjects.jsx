import React, { useContext, useState } from "react";
import Sidebar from "../components/SideBar";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import AdminFarmProjectCard from "../components/AdminFarmProjectCard";
import { FarmContext } from "../context/FarmContext";

const FarmProjects = () => {
  const { allFarmProject } = useContext(FarmContext);
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
  const [location, setLocation] = useState("Men");
  const [reFunding, setReFunding] = useState("topwear");
  const [isActive, setIsActive] = useState(false);
  const [size, setSize] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const postproject = async (data) => {
    try {
      const response = await apiClient.post("/api/V1/farmProjects", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      toast.success(response.data.message);
      setName("");
      setDescription("");
      setReFunding("");
      // let FormData = " ";
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const sampleProject = {
    projectName: "Joi villa",
    location: "Kumasi, Ghana",
    description:
      "A sustainable maize farming project targeting export-quality grain production.",
    estimatedROI: 25,
    durationInMonths: 12,
    totalRequiredFunding: 80000,
    receivedFunding: 65580,
    images: [], // Empty array for demo
    startDate: "2025-08-01T00:00:00.000Z",
    endDate: "2026-08-01T00:00:00.000Z",
    isActive: true,
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
        <div className="flex overflow-y-auto no-scrollbar">
          <div className="mb-9 fixed w-280">
            <Navbar onToggleSidebar={toggleSidebar} />
          </div>
          <div className="flex-1 mt-[90px] overflow-x-hidden px-6 pb-6 no-scrollbar">
            <h1 className="mb-7 out text-3xl">ALL FARM PROJECTS</h1>
            {allFarmProject.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFarmProject.map((project, n) => {
                  return (
                    <AdminFarmProjectCard project={project} id={project.id} />
                  );
                })}
              </div>
            ) : (
              <div className="translate-x-90 translate-y-36 w-190">
                <h1 className="">FAILED TO LOAD FARM PROJECTS ):</h1>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default FarmProjects;
