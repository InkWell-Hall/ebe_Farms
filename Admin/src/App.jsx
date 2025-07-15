import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDashboardCard from "./components/AdminDashboardCard";
import AdNewProject from "./pages/AdNewProject";
import Login from "./pages/Login";
import Otp from "./pages/Otp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
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
    element: <AdNewProject/>,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "signup",
    element: <Signup />,
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
