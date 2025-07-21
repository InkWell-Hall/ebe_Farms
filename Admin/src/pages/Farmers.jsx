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
// import UserNavbar from "../components/UserNavbar";
import Sidebar from "../components/SideBar";
// import ChartBox from "../components/ChartBox";
import Table from "../components/Table";
// import Tile from "../components/Tile";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
// import AdminNavbar from "../components/AdminNavbar";

// Main Dashboard Component
const Farmers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const columns = [
    {
      header: "Farmer's Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "mail",
    },
    {
      header: "Farm Project",
      accessorKey: "project",
    },
    {
      header: "Contact",
      accessorKey: "contact",
    },
  ];

  const data = [
    {
      name: "Banku Tettey",
      mail: "bankutet@gmail.com",
      project: "Maize Farm Project at Nkawkaw",
      contact: "02443433212",
    },
    {
      name: "Ama Serwaa",
      mail: "amaserwaa@gmail.com",
      project: "Cassava Plantation at Nsawam",
      contact: "05412345678",
    },
    {
      name: "Kwame Asante",
      mail: "kwame.asante@yahoo.com",
      project: "Rice Irrigation Project at Kpong",
      contact: "02699887766",
    },
    {
      name: "Linda Mensah",
      mail: "linda.mensah@gmail.com",
      project: "Tomato Greenhouse at Akomadan",
      contact: "02033445566",
    },
    {
      name: "Yaw Ofori",
      mail: "yaw.ofori@farmghana.com",
      project: "Poultry Expansion at Dormaa",
      contact: "02778889900",
    },
    {
      name: "Akua Dapaah",
      mail: "akua.dapaah@mail.com",
      project: "Shea Butter Processing in Tamale",
      contact: "02456789012",
    },
    {
      name: "Kojo Armah",
      mail: "kojoarmah123@gmail.com",
      project: "Plantain Nursery at Obuasi",
      contact: "02011223344",
    },
    {
      name: "Efua Bentil",
      mail: "efuabentil@gmail.com",
      project: "Cocoa Rehabilitation Project in Sefwi",
      contact: "02543219876",
    },
    {
      name: "Nana Boateng",
      mail: "nana.boateng@agric.org",
      project: "Livestock Management System in Berekum",
      contact: "05000111222",
    },
    {
      name: "Josephine Owusu",
      mail: "josephineowusu@hotmail.com",
      project: "Vegetable Export Program at Dzorwulu",
      contact: "02334455667",
    },
  ];

  return (
    <div className="flex h-screen bg-green-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Navbar */}
        {/* <UserNavbar onToggleSidebar={toggleSidebar} /> */}
        {/* <AdminNavbar onToggleSidebar={toggleSidebar} /> */}
        <Navbar />

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
                  <Link to={"/board"}>Investment Dashboard/</Link>
                </span>
                Total Investments
              </h1>
            </div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-900 out">
                Details of all Farmers
              </h1>
              <p className="text-green-700 mt-2">
                Here are all Farmers in our Database
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

export default Farmers;
