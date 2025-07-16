import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  BarChart3,
  Bell,
  Search,
  User,
  Wallet,
  BanknoteArrowUp,
  ChartSpline,
} from "lucide-react";
import UserNavbar from "../components/UserNavbar";
import Sidebar from "../components/SIdebar";
import ChartBox from "../components/ChartBox";
import Table from "../components/Table";
import Tile from "../components/Tile";
import { Link } from "react-router";

// Main Dashboard Component
const TotalRentals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const columns = [
    {
      header: "Investment",
      accessorKey: "activity",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Data",
      accessorKey: "date",
    },
  ];

  const data = [
    { activity: "Withdrawal", amount: "$90,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
    { activity: "Withdrawal", amount: "$40,000", date: "28-23-2025" },
    { activity: "Withdrawal", amount: "$40,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
    { activity: "Deposit", amount: "$40,000", date: "28-23-2025" },
  ];
  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Navbar */}
        <UserNavbar onToggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="mb-4">
              <h1 className="font-bold out">
                {" "}
                <span className="font-light text-gray-700">
                  <Link to={"/"}>Home/</Link>
                </span>{" "}
                <span className="font-light text-gray-700">
                  <Link to={"/rentals"}>Rental Dashboard/</Link>
                </span>
                Total Rentals
              </h1>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-900 out">
                Total Rentals
              </h1>
              <p className="text-green-700 mt-2">
                Here are all your total investments
              </p>
            </div>

            {/* Stats Cards */}

            <div className="mt-9  p-6 rounded-lg shadow-sm border border-green-200">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TotalRentals;
