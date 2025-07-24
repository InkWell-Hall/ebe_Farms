import React, { useContext, useEffect, useState } from "react";
import Table from "../components/Table";
import Sidebar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { FarmContext } from "../context/FarmContext";
import { Link } from "react-router";

const Investors = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { allInvestors } = useContext(FarmContext);
  const [investorData, setInvestorData] = useState([]);

  const columns = [
    { header: "Investor's Name", accessorKey: "name" },
    { header: "Email", accessorKey: "mail" },
    { header: "Contact", accessorKey: "contact" },
    {
      header: "Projects Invested",
      accessorKey: "project",
      cell: ({ row }) => {
        const investorId = row.original.id; // assuming you include this in your data
        const label = row.original.project;

        return (
          <Link
            to={`/investor-projects/${investorId}`}
            className="text-green-600 hover:underline"
          >
            {label}
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    console.log("allivest:", allInvestors);
    if (Array.isArray(allInvestors)) {
      const formattedData = allInvestors.map((inv) => ({
        id: inv.user?.id || inv.id, // Unique ID used for the route
        name: inv.user?.userName || "N/A",
        mail: inv.user?.email || "N/A",
        contact: inv.user?.phoneNumber || "N/A",
        project:
          Array.isArray(inv.investments) && inv.investments.length > 0
            ? `Invested in ${inv.investments.length} project(s)`
            : "No Projects",
      }));

      setInvestorData(formattedData);
    }
  }, [allInvestors]);

  return (
    <div className="flex h-screen bg-green-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-900">
                Details of all Investors
              </h1>
              <p className="text-green-700 mt-2">
                Here are all Farmers in our Database
              </p>
            </div>

            <div className="mt-9  p-6 rounded-lg shadow-sm border border-green-200">
              <Table columns={columns} data={investorData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Investors;
