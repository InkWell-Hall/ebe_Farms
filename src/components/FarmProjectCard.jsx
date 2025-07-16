import React from "react";
import {
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";

const FarmProjectCard = ({ project }) => {
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

  const fundingPercentage = (receivedFunding / totalRequiredFunding) * 100;
  const remainingFunding = totalRequiredFunding - receivedFunding;

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
        <div className="mt-6">
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
            <DollarSign className="w-4 h-4" />
            Invest Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo component with sample data
const Demo = () => {
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

  const sampleProject2 = {
    projectName: "Green Valley Rice Farm",
    location: "Tamale, Ghana",
    description:
      "Organic rice cultivation with modern irrigation systems for sustainable food production.",
    estimatedROI: 18,
    durationInMonths: 8,
    totalRequiredFunding: 45000,
    receivedFunding: 22500,
    images: [],
    startDate: "2025-09-01T00:00:00.000Z",
    endDate: "2026-05-01T00:00:00.000Z",
    isActive: true,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Farm Investment Projects
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FarmProjectCard project={sampleProject} />
          <FarmProjectCard project={sampleProject2} />
        </div>
      </div>
    </div>
  );
};

export default Demo;
