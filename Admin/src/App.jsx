import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardCard from "./components/AdminDashboardCard";
import AdNewProject from "./pages/AdNewProject";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admindashboardcard",
    element: <AdminDashboardCard />,
  },
  {
    path: "/adproject",
    element: <AdNewProject />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  // {
  //   path: "login",
  //   element: <Login/>,
  // },
  {
    path: "sign-up",
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
