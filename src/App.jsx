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
    path: "/login",
    element: <Login />,
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
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
