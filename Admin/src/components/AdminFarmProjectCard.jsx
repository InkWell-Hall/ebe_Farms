import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Trash,
  Pencil,
  PencilLine,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { apiClient } from "../api/client";
import { toast } from "react-toastify";
import Modal from "../modal/DeleteProjectModal";

const AdminFarmProjectCard = ({ project, id }) => {
  const {
    projectName,
    location,
    description,
    estimatedROI,
    durationInMonths,
    totalRequiredFunding,
    receivedFunding,
    images,
    startDate,
    endDate,
    isActive,
  } = project;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fundingPercentage = (receivedFunding / totalRequiredFunding) * 100;
  const remainingFunding = totalRequiredFunding - receivedFunding;
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const here = useLocation();
  const farmProject = here.pathname === "/farm-projects";
  console.log(isActive);
  const [loading, setLoading] = useState(false);

  const deleteProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await apiClient.delete(`/api/V1/farmProjects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      toast.success("Project Deleted Successfully");
      console.log(response);
      setTimeout(() => window.location.reload(), 2000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete Project Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Header with project image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-600 overflow-hidden">
        {images && images.length > 0 ? (
          <img
            src={images[0]}
            alt={projectName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/80 text-center">
              <Target className="w-16 h-16 mx-auto mb-2" />
              <p className="text-sm font-medium">Farm Project</p>
            </div>
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isActive
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* ROI badge */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">
              {estimatedROI}% ROI
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {projectName}
          </h3>
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
        {/* Funding progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Funding Progress
            </span>
            <span className="text-sm font-bold text-green-600">
              {fundingPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Raised: {formatCurrency(receivedFunding)}</span>
            <span>Goal: {formatCurrency(totalRequiredFunding)}</span>
          </div>
        </div>
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">
                Duration
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {durationInMonths} months
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">
                Remaining
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {formatCurrency(remainingFunding)}
            </p>
          </div>
        </div>
        {/* Timeline */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Start: {formatDate(startDate)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>End: {formatDate(endDate)}</span>
            </div>
          </div>
        </div>
        {/* Action button */}
        <div className="mt-6 flex items-center justify-between">
          <div className="">
            <Link to={`/edit-project/${id}`}>
              <button className="w-full cursor-pointer bg-gray-400 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <PencilLine className="w-4 h-4" />
                Edit Project
              </button>
            </Link>
          </div>
          <div className="">
            <button
              // disabled={!isActive}
              onClick={openModal}
              className="w-full font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 bg-red-900 text-white cursor-pointer"
            >
              <Trash className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold mb-4 font-lead-font">
          Delete Advert
        </h2>
        <p className="mb-3">
          Are you sure you want to delete this Farm Project?
        </p>
        {/* <p>Please we beg reconsider oo!!</p> */}
        <div className="flex justify-between gap-3 mt-2 ">
          <button
            className="bg-green-700 px-2 py-1 text-white cursor-pointer rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-900 px-2 py-1 text-white cursor-pointer rounded"
            onClick={deleteProject}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminFarmProjectCard;
