import React, { useState } from "react";
import {
  ChevronLeft,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Menu,
} from "lucide-react";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";

const InvestorInvestmentTable = () => {
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default

  // Sample data - replace with your actual data
  const investorsData = [
    {
      id: 1,
      name: "Sequoia Capital",
      totalInvestments: 15,
      investments: [
        {
          company: "Tech Startup A",
          amount: "$2M",
          date: "2024-01-15",
          stage: "Series A",
          sector: "SaaS",
        },
        {
          company: "FinTech Pro",
          amount: "$5M",
          date: "2024-02-20",
          stage: "Series B",
          sector: "Finance",
        },
        {
          company: "AI Solutions",
          amount: "$3M",
          date: "2024-03-10",
          stage: "Seed",
          sector: "AI/ML",
        },
        {
          company: "E-commerce Plus",
          amount: "$4M",
          date: "2024-04-05",
          stage: "Series A",
          sector: "E-commerce",
        },
        {
          company: "Health Tech",
          amount: "$6M",
          date: "2024-05-12",
          stage: "Series B",
          sector: "Healthcare",
        },
        {
          company: "Green Energy Co",
          amount: "$8M",
          date: "2024-06-18",
          stage: "Series C",
          sector: "CleanTech",
        },
        {
          company: "EdTech Innovation",
          amount: "$2.5M",
          date: "2024-07-02",
          stage: "Seed",
          sector: "Education",
        },
        {
          company: "Mobility App",
          amount: "$3.5M",
          date: "2024-07-15",
          stage: "Series A",
          sector: "Transportation",
        },
        {
          company: "Cloud Infrastructure",
          amount: "$10M",
          date: "2024-08-01",
          stage: "Series B",
          sector: "Infrastructure",
        },
        {
          company: "Social Platform",
          amount: "$4.5M",
          date: "2024-08-20",
          stage: "Series A",
          sector: "Social Media",
        },
        {
          company: "IoT Systems",
          amount: "$3M",
          date: "2024-09-05",
          stage: "Seed",
          sector: "IoT",
        },
        {
          company: "Cybersecurity Firm",
          amount: "$7M",
          date: "2024-09-25",
          stage: "Series B",
          sector: "Security",
        },
        {
          company: "Food Delivery",
          amount: "$5.5M",
          date: "2024-10-10",
          stage: "Series A",
          sector: "Food & Beverage",
        },
        {
          company: "PropTech Solutions",
          amount: "$4M",
          date: "2024-11-01",
          stage: "Series A",
          sector: "Real Estate",
        },
        {
          company: "Blockchain Startup",
          amount: "$6M",
          date: "2024-11-20",
          stage: "Series B",
          sector: "Blockchain",
        },
      ],
    },
    {
      id: 2,
      name: "Andreessen Horowitz",
      totalInvestments: 12,
      investments: [
        {
          company: "Web3 Platform",
          amount: "$8M",
          date: "2024-01-25",
          stage: "Series B",
          sector: "Blockchain",
        },
        {
          company: "Creator Economy",
          amount: "$3M",
          date: "2024-02-15",
          stage: "Seed",
          sector: "Media",
        },
        {
          company: "Dev Tools Pro",
          amount: "$5M",
          date: "2024-03-08",
          stage: "Series A",
          sector: "Developer Tools",
        },
        {
          company: "Gaming Studio",
          amount: "$4M",
          date: "2024-04-12",
          stage: "Series A",
          sector: "Gaming",
        },
        {
          company: "Voice AI",
          amount: "$6M",
          date: "2024-05-20",
          stage: "Series B",
          sector: "AI/ML",
        },
        {
          company: "Robotics Inc",
          amount: "$10M",
          date: "2024-06-30",
          stage: "Series C",
          sector: "Robotics",
        },
        {
          company: "AR/VR Tech",
          amount: "$7M",
          date: "2024-07-18",
          stage: "Series B",
          sector: "AR/VR",
        },
        {
          company: "Quantum Computing",
          amount: "$12M",
          date: "2024-08-15",
          stage: "Series C",
          sector: "Deep Tech",
        },
        {
          company: "Space Tech",
          amount: "$15M",
          date: "2024-09-12",
          stage: "Series C",
          sector: "Aerospace",
        },
        {
          company: "BioTech Labs",
          amount: "$9M",
          date: "2024-10-05",
          stage: "Series B",
          sector: "Biotechnology",
        },
        {
          company: "Renewable Energy",
          amount: "$11M",
          date: "2024-11-08",
          stage: "Series C",
          sector: "CleanTech",
        },
        {
          company: "Mental Health App",
          amount: "$3.5M",
          date: "2024-12-01",
          stage: "Series A",
          sector: "Healthcare",
        },
      ],
    },
    {
      id: 3,
      name: "Accel Partners",
      totalInvestments: 8,
      investments: [
        {
          company: "HR Tech Solutions",
          amount: "$2.8M",
          date: "2024-02-10",
          stage: "Seed",
          sector: "HR Tech",
        },
        {
          company: "Supply Chain AI",
          amount: "$4.5M",
          date: "2024-03-22",
          stage: "Series A",
          sector: "Logistics",
        },
        {
          company: "Customer Success",
          amount: "$3.2M",
          date: "2024-04-28",
          stage: "Seed",
          sector: "SaaS",
        },
        {
          company: "Marketing Automation",
          amount: "$5.8M",
          date: "2024-06-15",
          stage: "Series B",
          sector: "MarTech",
        },
        {
          company: "Data Analytics Pro",
          amount: "$6.5M",
          date: "2024-07-30",
          stage: "Series B",
          sector: "Analytics",
        },
        {
          company: "Mobile Commerce",
          amount: "$4M",
          date: "2024-09-18",
          stage: "Series A",
          sector: "E-commerce",
        },
        {
          company: "Video Streaming",
          amount: "$7.2M",
          date: "2024-10-22",
          stage: "Series B",
          sector: "Media",
        },
        {
          company: "Legal Tech",
          amount: "$3.8M",
          date: "2024-11-25",
          stage: "Series A",
          sector: "LegalTech",
        },
      ],
    },
    {
      id: 4,
      name: "Kleiner Perkins",
      totalInvestments: 6,
      investments: [
        {
          company: "Clean Water Tech",
          amount: "$5M",
          date: "2024-01-30",
          stage: "Series A",
          sector: "CleanTech",
        },
        {
          company: "Agriculture AI",
          amount: "$3.5M",
          date: "2024-04-18",
          stage: "Seed",
          sector: "AgTech",
        },
        {
          company: "Telehealth Platform",
          amount: "$6.8M",
          date: "2024-06-25",
          stage: "Series B",
          sector: "Healthcare",
        },
        {
          company: "Smart Manufacturing",
          amount: "$8M",
          date: "2024-08-12",
          stage: "Series B",
          sector: "Industrial",
        },
        {
          company: "Climate Monitoring",
          amount: "$4.2M",
          date: "2024-10-15",
          stage: "Series A",
          sector: "CleanTech",
        },
        {
          company: "Wellness App",
          amount: "$2.9M",
          date: "2024-12-05",
          stage: "Seed",
          sector: "Health & Fitness",
        },
      ],
    },
    {
      id: 5,
      name: "Index Ventures",
      totalInvestments: 10,
      investments: [
        {
          company: "Fashion E-commerce",
          amount: "$4.5M",
          date: "2024-01-12",
          stage: "Series A",
          sector: "Fashion",
        },
        {
          company: "Travel Tech",
          amount: "$6M",
          date: "2024-02-28",
          stage: "Series B",
          sector: "Travel",
        },
        {
          company: "Music Streaming",
          amount: "$3.8M",
          date: "2024-04-08",
          stage: "Series A",
          sector: "Entertainment",
        },
        {
          company: "Pet Care App",
          amount: "$2.5M",
          date: "2024-05-25",
          stage: "Seed",
          sector: "Pet Care",
        },
        {
          company: "Language Learning",
          amount: "$5.2M",
          date: "2024-07-10",
          stage: "Series A",
          sector: "Education",
        },
        {
          company: "Real Estate AI",
          amount: "$7.5M",
          date: "2024-08-22",
          stage: "Series B",
          sector: "PropTech",
        },
        {
          company: "Sports Analytics",
          amount: "$3.9M",
          date: "2024-09-30",
          stage: "Series A",
          sector: "Sports Tech",
        },
        {
          company: "Event Management",
          amount: "$4.8M",
          date: "2024-10-28",
          stage: "Series A",
          sector: "Events",
        },
        {
          company: "Personal Finance",
          amount: "$6.3M",
          date: "2024-11-18",
          stage: "Series B",
          sector: "FinTech",
        },
        {
          company: "Smart Home Tech",
          amount: "$5.7M",
          date: "2024-12-10",
          stage: "Series A",
          sector: "IoT",
        },
      ],
    },
  ];

  const handleInvestmentClick = (investor) => {
    setSelectedInvestor(investor);
  };

  const handleBackClick = () => {
    setSelectedInvestor(null);
  };

  const getStageColor = (stage) => {
    const colors = {
      Seed: "bg-green-100 text-green-800",
      "Series A": "bg-blue-100 text-blue-800",
      "Series B": "bg-purple-100 text-purple-800",
      "Series C": "bg-orange-100 text-orange-800",
    };
    return colors[stage] || "bg-gray-100 text-gray-800";
  };

  if (selectedInvestor) {
    return (
      <>
        <div className="h-screen flex">
          <div
            className={`${
              sidebarOpen ? "w-64" : "w-0"
            } bg-white shadow-md transition-all duration-300 overflow-hidden`}
          >
            {sidebarOpen && (
              <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            )}
          </div>
          <div className="flex-1 overflow-y-auto  bg-gray-100">
            <Navbar />
            <button
              className="mb-4 flex items-center gap-2 text-green-700 font-semibold"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              <Menu className="w-5 h-5 cursor-pointer" />
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </button>

            <div className="mb-6 px-4">
              <button
                onClick={handleBackClick}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to Investors
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="text-gray-600" size={24} />
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedInvestor.name}
                </h1>
              </div>
              <p className="text-gray-600 text-lg">
                {selectedInvestor.totalInvestments} Total Investments
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto px-2">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Company
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Stage
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Sector
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedInvestor.investments.map((investment, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {investment.company.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {investment.company}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-green-600" />
                            <span className="font-semibold text-green-700">
                              {investment.amount}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            <span className="text-gray-600">
                              {investment.date}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(
                              investment.stage
                            )}`}
                          >
                            {investment.stage}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-700 bg-gray-100 px-3 py-1 rounded-lg text-sm">
                            {investment.sector}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen flex">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white shadow-md transition-all duration-300 overflow-hidden`}
      >
        {sidebarOpen && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100">
        <Navbar />
        {/* Sidebar toggle button */}
        <button
          className="mb-4 flex items-center gap-2 text-green-700 font-semibold"
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Menu className="w-5 h-5 cursor-pointer" />
          {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
        </button>
        <div className="mb-8 px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investor Portfolio Overview
          </h1>
          <p className="text-gray-600">
            Click on the number of investments to view detailed investment
            information
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden px-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Investor Name
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                    Number of Investments
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {investorsData.map((investor) => (
                  <tr
                    key={investor.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Building2 className="text-white" size={20} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-lg">
                            {investor.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleInvestmentClick(investor)}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm hover:shadow-md transform hover:scale-105"
                      >
                        <TrendingUp size={18} />
                        <span className="text-xl">
                          {investor.totalInvestments}
                        </span>
                        <span className="text-sm opacity-90">investments</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Total Investors: {investorsData.length} • Total Investments:{" "}
          {investorsData.reduce((sum, inv) => sum + inv.totalInvestments, 0)}
        </div>
      </div>
    </div>
  );
};

export default InvestorInvestmentTable;
