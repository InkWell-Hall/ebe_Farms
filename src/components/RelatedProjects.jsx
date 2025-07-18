import { Link } from "react-router";
import React, { useState } from "react";
import { MapPin, ChevronLeft, ChevronRight, Sprout } from "lucide-react";

const RelatedProjects = ({
  projects,
  currentProjectId,
  title = "Related Projects",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const relatedProjects = projects.filter((p) => p.id !== currentProjectId);
  const projectsPerSlide = 3;
  const totalSlides = Math.ceil(relatedProjects.length / projectsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getVisibleProjects = () => {
    const start = currentSlide * projectsPerSlide;
    return relatedProjects.slice(start, start + projectsPerSlide);
  };

  if (relatedProjects.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={totalSlides <= 1}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            disabled={totalSlides <= 1}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getVisibleProjects().map((project) => {
          const fundingPercentage =
            (project.receivedFunding / project.totalRequiredFunding) * 100;

          return (
            <div
              key={project.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {project.projectName}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <MapPin size={12} />
                      {project.location}
                    </div>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {project.estimatedROI}% ROI
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Funding Progress</span>
                  <span>{fundingPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-600">
                  <span className="font-medium">
                    {formatCurrency(project.totalRequiredFunding)}
                  </span>{" "}
                  goal
                </div>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                  <Link to={`/single/${project.id}`}>View Details</Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {totalSlides > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSlide ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedProjects;
