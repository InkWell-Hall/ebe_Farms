import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardCard from "./components/AdminDashboardCard";
import AdNewProject from "./pages/AdNewProject";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import SignUp from "./pages/SignUp";
import { ToastContainer, toast } from "react-toastify";
import FarmProjects from "./pages/FarmProjects";
import AddNewProduct from "./pages/AddNewProduct";
import EditProject from "./pages/EditProject";
import FarmProducts from "./pages/FarmProducts";
import EditProduct from "./pages/EditProduct";
import Farmers from "./pages/Farmers";
import Investors from "./pages/Investors";
import InvestorInvestmentTable from "./pages/InvestorInvestmentTable";
import UserInvestments from "./pages/UserInvestments";
import VerifyInvestment from "./pages/VerifyInvestment";

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
    path: "/add-product",
    element: <AddNewProduct />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/farm-projects",
    element: <FarmProjects />,
  },
  {
    path: "/farm-products",
    element: <FarmProducts />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "/edit-project/:id",
    element: <EditProject />,
  },
  {
    path: "/edit-product/:id",
    element: <EditProduct />,
  },
  {
    path: "/farmers",
    element: <Farmers />,
  },
  {
    path: "/investors",
    element: <Investors />,
  },
  {
    path: "/investors-2",
    element: <InvestorInvestmentTable />,
  },
  {
    path: "/investor-projects/:id",
    element: <UserInvestments />,
  },
  {
    path: "/verify/:id",
    element: <VerifyInvestment />,
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
