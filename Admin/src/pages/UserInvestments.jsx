import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { FarmContext } from "../context/FarmContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const UserInvestments = () => {
  const { id: userId } = useParams(); // get user ID from URL
  const { allInvestments, allInvestors, getMyInvestments } =
    useContext(FarmContext);
  const [userInvestment, setUserInvestment] = useState(null);
  const [investmentDetails, setInvestmentDetails] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(allInvestors)) {
      const investment = allInvestors?.find(
        (inv) => String(inv.user?.id) === userId
      );
      setUserInvestment(investment);
    }
    console.log(allInvestments);
  }, [allInvestments, userId]);

  useEffect(() => {
    const fetchAllInvestmentDetails = async () => {
      if (!userInvestment?.investments?.length) return;

      const promises = userInvestment.investments.map((invId) =>
        getMyInvestments(invId)
      );

      try {
        const results = await Promise.all(promises);
        setInvestmentDetails(results.filter(Boolean)); // Remove any nulls
      } catch (err) {
        console.error("Failed to fetch investment details", err);
      }
    };

    fetchAllInvestmentDetails();
  }, [userInvestment]);

  console.log("allinin:", allInvestments, userId);
  if (!userInvestment) {
    return (
      <div className="p-6">Loading or no investments found for this user.</div>
    );
  }

  const { user, address, createdAt, updatedAt, investments } = userInvestment;
  const getInvestmentNameById = (id) => {
    const investment = allInvestments?.investor?.find((inv) => inv.id === id);
    return investment?.farmProject?.projectName || "Unnamed Project";
    console.log(investment);
  };

  // useEffect(() => {
  //   console.log(allInvestments);
  // }, []);
  return (
    <>
      <div className="flex h-screen bg-green-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <Navbar />

          <div className="relative p-8 mx-auto w-full mt-1 mb-10 no-scrollbar flex-1 overflow-y-auto">
            {/* Animated gradient background with glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-teal-500/20 to-cyan-600/20 rounded-2xl backdrop-blur-xl"></div>
            <div className="absolute inset-0 bg-white/70 rounded-2xl shadow-2xl border border-white/40"></div>

            {/* Floating orbs for visual interest */}
            <div className="absolute top-4 right-6 w-20 h-20 bg-gradient-to-br from-emerald-300/30 to-teal-400/30 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-8 left-6 w-160 h-16 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>

            {/* Content container */}
            <div className="relative z-10">
              {/* Header with gradient text and icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br mb-9 from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 bg-clip-text text-transparent">
                  Investor Profile
                </h1>
              </div>

              {/* Personal Information Card */}
              <div className="mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  Personal Details
                </h2>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-200/50">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Name
                      </span>
                      <p className="text-gray-900 font-semibold">
                        {user.userName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-200/50">
                    <svg
                      className="w-5 h-5 text-teal-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Email
                      </span>
                      <p className="text-gray-900 font-semibold">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-200/50">
                    <svg
                      className="w-5 h-5 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Phone
                      </span>
                      <p className="text-gray-900 font-semibold">
                        {user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information Card */}
              <div className="mb-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  Account Information
                </h2>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/80 to-white/80 border border-gray-200/50">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <span className="text-sm text-gray-600 font-medium">
                        Address
                      </span>
                      <p className="text-gray-900 font-semibold">{address}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-emerald-50/80 to-teal-50/80 border border-emerald-200/50">
                      <svg
                        className="w-4 h-4 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3a4 4 0 118 0v4m-4 8l-2-2m0 0l-2-2m2 2l2-2m-2 2v4"
                        />
                      </svg>
                      <div>
                        <span className="text-xs text-gray-600 font-medium">
                          Joined
                        </span>
                        <p className="text-sm text-gray-900 font-semibold">
                          {new Date(createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-teal-50/80 to-cyan-50/80 border border-teal-200/50">
                      <svg
                        className="w-4 h-4 text-teal-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <div>
                        <span className="text-xs text-gray-600 font-medium">
                          Updated
                        </span>
                        <p className="text-sm text-gray-900 font-semibold">
                          {new Date(updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investments Section */}
              <div className="p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/60">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg shadow-md">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                    Investment Portfolio
                  </h2>
                </div>

                {Array.isArray(investments) && investments.length > 0 ? (
                  <div className="space-y-3">
                    {investments.map((invId, index) => (
                      <div
                        key={index}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-white/60 to-gray-50/60 border border-gray-200/50 hover:border-emerald-300/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-sm group-hover:shadow-md transition-shadow"></div>
                        {/* <span className="text-gray-800 font-medium group-hover:text-emerald-700 transition-colors">
                          {investmentDetails.length > 0 ? (
                            <div className="space-y-3">
                              {investmentDetails.map((inv, index) => (
                                <div
                                  key={index}
                                  className="group flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-white/60 to-gray-50/60 border border-gray-200/50 hover:border-emerald-300/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                                >
                                  <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-sm group-hover:shadow-md transition-shadow"></div>
                                  <span className="text-gray-800 font-medium group-hover:text-emerald-700 transition-colors">
                                    {inv?.farmProject?.projectName ||
                                      "Unnamed Project"}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              Loading or no investments
                            </div>
                          )}
                        </span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg
                            className="w-4 h-4 text-emerald-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div> */}
                        {invId}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.21 0-4.21-.895-5.657-2.343"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium">
                      No investments yet
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Start exploring investment opportunities
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default UserInvestments;
