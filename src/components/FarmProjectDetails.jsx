import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
  Target,
  Users,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Share2,
  Heart,
  CheckCircle,
  AlertCircle,
  Sprout,
  Wheat,
  Leaf,
  BarChart3,
  BadgeCent,
} from "lucide-react";
import RelatedProjects from "./RelatedProjects";

const FarmProjectDetails = ({ project, relatedProjects = [] }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

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
      month: "long",
      day: "numeric",
    });
  };

  const fundingPercentage =
    (project?.receivedFunding / project?.totalRequiredFunding) * 100;
  const remainingFunding =
    project?.totalRequiredFunding - project?.receivedFunding;

  const tabs = [
    { id: "overview", label: "Overview", icon: Target },
    { id: "financials", label: "Financials", icon: BadgeCent },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "risks", label: "Risks & Returns", icon: BarChart3 },
  ];

  const risks = [
    {
      type: "Weather Risk",
      level: "Medium",
      description: "Potential impact from adverse weather conditions",
    },
    {
      type: "Market Risk",
      level: "Low",
      description: "Stable demand for export-quality grain",
    },
    {
      type: "Operational Risk",
      level: "Low",
      description: "Experienced farming team with proven track record",
    },
  ];

  const milestones = [
    { date: "2025-08-01", title: "Project Launch", status: "upcoming" },
    { date: "2025-09-15", title: "Land Preparation", status: "upcoming" },
    { date: "2025-10-01", title: "Planting Season", status: "upcoming" },
    { date: "2026-02-01", title: "Mid-Season Review", status: "upcoming" },
    { date: "2026-06-01", title: "Harvest Season", status: "upcoming" },
    { date: "2026-08-01", title: "Project Completion", status: "upcoming" },
  ];
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg font-semibold">
        Project not found or still loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {project.projectName}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span>{project.location}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg border transition-colors ${
                  isLiked
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
              </button>
              <button className="p-2 rounded-lg border bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors">
                <Share2 size={20} />
              </button>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {project.isActive ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Hero */}
            <div className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl p-8 text-white mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wheat className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-bold">
                      {project.estimatedROI}% ROI
                    </span>
                  </div>
                  <p className="text-green-100">Expected Annual Return</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{project.description}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-green-600 border-b-2 border-green-600 bg-green-50"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Project Overview
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {project.description} This sustainable farming
                        initiative focuses on producing high-quality maize for
                        export markets, utilizing modern agricultural techniques
                        and sustainable practices to maximize yield while
                        maintaining environmental responsibility.
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Farming Method
                        </h4>
                        <p className="text-sm text-gray-600">
                          Sustainable, organic-certified farming practices
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Target Market
                        </h4>
                        <p className="text-sm text-gray-600">
                          Export-quality grain for international markets
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "financials" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">
                          Total Investment
                        </h4>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(project.totalRequiredFunding)}
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">
                          Expected Returns
                        </h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {project.estimatedROI}% annually
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">
                        Cost Breakdown
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">
                            Land Preparation
                          </span>
                          <span className="font-medium">
                            {formatCurrency(project.totalRequiredFunding * 0.3)}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">
                            Seeds & Materials
                          </span>
                          <span className="font-medium">
                            {formatCurrency(
                              project.totalRequiredFunding * 0.25
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">
                            Equipment & Tools
                          </span>
                          <span className="font-medium">
                            {formatCurrency(project.totalRequiredFunding * 0.2)}
                          </span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                          <span className="text-gray-600">
                            Labor & Operations
                          </span>
                          <span className="font-medium">
                            {formatCurrency(
                              project.totalRequiredFunding * 0.15
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">
                            Marketing & Distribution
                          </span>
                          <span className="font-medium">
                            {formatCurrency(project.totalRequiredFunding * 0.1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "timeline" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Start Date
                        </h4>
                        <p className="text-lg text-gray-700">
                          {formatDate(project.startDate)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          End Date
                        </h4>
                        <p className="text-lg text-gray-700">
                          {formatDate(project.endDate)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Project Milestones
                      </h4>
                      <div className="space-y-4">
                        {milestones.map((milestone, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium text-gray-900">
                                  {milestone.title}
                                </h5>
                                <span className="text-sm text-gray-500">
                                  {formatDate(milestone.date)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "risks" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">
                        Risk Assessment
                      </h4>
                      <div className="space-y-4">
                        {risks.map((risk, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900">
                                {risk.type}
                              </h5>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  risk.level === "Low"
                                    ? "bg-green-100 text-green-800"
                                    : risk.level === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {risk.level}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {risk.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-2">
                        Risk Mitigation
                      </h4>
                      <p className="text-sm text-green-700">
                        Our experienced team employs proven farming techniques
                        and maintains comprehensive insurance coverage to
                        minimize risks and protect your investment.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Investment Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Investment Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Funding Progress</span>
                  <span className="font-bold text-green-600">
                    {fundingPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Raised</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(project.receivedFunding)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Goal</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(project.totalRequiredFunding)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(remainingFunding)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Invest Now
                </button>
                <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-4 rounded-lg transition-colors">
                  Request More Info
                </button>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Duration</span>
                  </div>
                  <span className="font-medium">
                    {project.durationInMonths} months
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Expected ROI</span>
                  </div>
                  <span className="font-medium">{project.estimatedROI}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Investors</span>
                  </div>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Risk Level</span>
                  </div>
                  <span className="font-medium text-green-600">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <RelatedProjects
          projects={relatedProjects}
          currentProjectId={project.id}
          title="Similar Farm Projects"
        />
      </div>
    </div>
  );
};

export default FarmProjectDetails;
