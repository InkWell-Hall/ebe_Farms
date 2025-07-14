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
const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const columns = [
    {
      header: "Activity",
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
                <span className="font-light">
                  <Link to={"/"}>Home/</Link>
                </span>{" "}
                Investment Dashboard
              </h1>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-900 out">
                Your Investment Dashboard
              </h1>
              <p className="text-green-700 mt-2">
                Welcome back! Here's what's happening with your Invesment today.
              </p>
            </div>

            {/* Stats Cards */}
            <div>
              <div className="mb-7">
                <Tile showEye={true} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Tile
                  title={"Total Withdrawals"}
                  icon={<Wallet />}
                  amount={"$23,000"}
                />
                <Tile
                  title={"Total Deposits"}
                  icon={<BanknoteArrowUp />}
                  amount={"$13,000"}
                />
                <Link to={"/total-investment"}>
                  <Tile
                    title={"Total Investment"}
                    icon={<ChartSpline />}
                    amount={"$34,900"}
                  />
                </Link>
                <Tile
                  title={"Current Investment"}
                  icon={<Wallet color="text-green-500" />}
                  amount={"$10,000"}
                />
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Area */}
              <div className="lg:col-span-2  p-6 rounded-lg shadow-sm border border-green-200">
                <ChartBox />
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
                <h2 className="text-lg font-semibold text-green-900 mb-4">
                  Recent Farm Activity
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      user: "Farm Manager",
                      action: "Updated crop schedule",
                      time: "2 hours ago",
                    },
                    {
                      user: "Field Worker",
                      action: "Completed irrigation",
                      time: "4 hours ago",
                    },
                    {
                      user: "Harvest Team",
                      action: "Collected wheat batch",
                      time: "6 hours ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                        <User size={14} className="text-green-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">
                          {activity.user}
                        </p>
                        <p className="text-xs text-green-600">
                          {activity.action}
                        </p>
                        <p className="text-xs text-green-500 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-9  p-6 rounded-lg shadow-sm border border-green-200">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
