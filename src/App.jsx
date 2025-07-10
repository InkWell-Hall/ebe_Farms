import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import NewInvestment from "./components/NewInvestment";

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
    element: <NewInvestment/>,
  },
  {
    path: "/loginsignup",
    element: <LoginSignup/>
  },
   
{
      path: "/otp",
    element: <Otp/>
},
{
      path: "/useraccount",
    element: <UserAccount/>
},
{
      path: "/forgetreset",
    element: <ForgotReset/>
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
