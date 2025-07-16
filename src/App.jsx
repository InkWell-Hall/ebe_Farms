import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import NewInvestment from "./components/NewInvestment";
import Login from "./components/Login";
import Otp from "./components/Otp";
import UserAccountPage from "./components/UserAccountPage";
import ForgotReset from "./components/ForgotReset";
import ContactPage from "./components/Contact";
import Dash from "./pages/Dash";
import UserDashboard from "./pages/UserDashboard";
import SignUp from "./components/SignUp";
import TotalInvestment from "./pages/TotalInvesment";
import Rentals from "./pages/investment/Rentals";
import TotalRentals from "./pages/TotalRentals";
import FarmProjectCard from "./components/FarmProjectCard";
import NewPassword from "./pages/NewPassword";
import EbeContextProvider from "./context/EbeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/newinvestment",
    element: <NewInvestment />,
  },
  {
    path: "/total-investment",
    element: <TotalInvestment />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Sign-up",
    element: <SignUp />,
  },

  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/useraccount",
    element: <UserAccountPage />,
  },
  {
    path: "/forgetreset",
    element: <ForgotReset />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/go",
    element: <Dash />,
  },
  {
    path: "/board",
    element: <UserDashboard />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/rentals",
    element: <Rentals />,
  },
  {
    path: "/total-rentals",
    element: <TotalRentals />,
  },
  {
    path: "/card",
    element: <FarmProjectCard />,
  },
]);

const App = () => {
  return (
    <>
      <EbeContextProvider>
        <RouterProvider router={router} />
      </EbeContextProvider>
    </>
  );
};

export default App;
