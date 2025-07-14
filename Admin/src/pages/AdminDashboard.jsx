import React, { useState } from "react";
import { Tractor, Users, PackageCheck, Activity } from "lucide-react";
import AdminDashboardCard from "../components/AdminDashboardCard";
import BarChart from "../components/BarChart";
import Sidebar from "../components/SideBar";



const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const closeSidebar = () => {
    setSidebarOpen(false)
};
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
  


  return (
    <>

    <div className="min-h-screen flex bg-gray-50 p-6">
      <div>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      </div>
      <div className="flex flex-col p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Admin Dashboard</h1>
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
      <div className="mb-6">
        <BarChart />
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Project Activities</h2>
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
    </>
  );
};

export default AdminDashboard;
