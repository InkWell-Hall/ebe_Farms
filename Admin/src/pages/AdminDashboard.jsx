import React, { useContext, useEffect, useState } from "react";
import {
  Tractor,
  Users,
  PackageCheck,
  Activity,
  Menu,
  User,
} from "lucide-react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import BarChart from "../components/BarChart";
import Sidebar from "../components/SideBar";
import { FarmContext } from "../context/FarmContext";
import Navbar from "../components/Navbar";
import { apiClient } from "../api/client";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar is open by default
  const { allFarmProjects, getAllUserInvestment } = useContext(FarmContext);
  const data = localStorage.getItem("Ebe_User_Id");
  const [userID, setUserID] = useState("");

  // const getAllUserInvestment = async (id) => {

  //   try {
  //     const response = await apiClient.post(`/api/V1/user-investment/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
  //       },
  //     });
  //     console.log(response);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const stats = [
    {
      title: "Total Farm Projects",
      count: 24,
      icon: <Tractor className="w-6 h-6" />,
    },
    {
      title: "Registered Farmers",
      count: 58,
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Products in Stock",
      count: 137,
      icon: <PackageCheck className="w-6 h-6" />,
    },
    {
      title: "Activities Tracked",
      count: 46,
      icon: <Activity className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    getAllUserInvestment(data);
  }, []);
  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar wrapper with transition */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white shadow-md transition-all duration-300 overflow-hidden`}
      >
        {sidebarOpen && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}
      </div>

      {/* Main content */}
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
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6">
            Admin Dashboard
          </h1>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <AdminDashboardCard
                key={index}
                title={stat.title}
                count={stat.count}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Chart */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <BarChart />
            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200 md:w-[30%]">
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
          {/* 
          <div>
            <form onSubmit={getAllUserInvestment}>
              <input
                type="text"
                name="userID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                className="border bg-gray-200"
              />
              <button type="submit">submit</button>
            </form>
          </div> */}

          {/* Recent Activities */}
          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Project Activities
            </h2>
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Project Name</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Farmer</th>
                  <th className="py-2">Date Posted</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">Organic Maize Field</td>
                  <td className="py-2 text-green-600 font-medium">Active</td>
                  <td className="py-2">Kwame Boadu</td>
                  <td className="py-2">July 10, 2025</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">Cassava Expansion</td>
                  <td className="py-2 text-yellow-500 font-medium">Pending</td>
                  <td className="py-2">Ama Serwaa</td>
                  <td className="py-2">July 5, 2025</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-2">Tomato Irrigation</td>
                  <td className="py-2 text-red-500 font-medium">Paused</td>
                  <td className="py-2">Yaw Mensah</td>
                  <td className="py-2">June 28, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
