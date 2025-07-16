import React, { useEffect, useRef, useState } from "react";
import logo1 from "../assets/logo1.png";
// import logo2 from "../assets/logo2.jpeg";
// import cart from "../assets/images/Bag.svg.svg";
// import profit from "../assets/profit.png";
import money from "../assets/save-money.png";
import contact from "../assets/customer-service.png";
import { Link, NavLink, useNavigate } from "react-router";
import {
  ChevronDown,
  DollarSign,
  Home,
  Phone,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react";
const AdminNavbar = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null); // reference to the profile dropdown
  const token = localStorage.getItem("TOKEN");
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className=" bg-[#EECE38] fixed w-full z-10 top-0">
        <div className="flex w-[90%] mx-auto justify-between items-center  text-white font-bold">
          <div>
            <img src={logo1} alt="" className="w-30 h-25" />
          </div>

          <div>
            <ul className=" gap-5 hidden md:flex">
              <li className="flex">
                <NavLink to={"/"} className="flex gap-2">
                  <Home color="black" />
                  <h1 className="mb-2"> Home</h1>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/products"} className="flex gap-2">
                  <img src={money} alt="" className="w-7" />
                  Invest
                </NavLink>
              </li>
              <li>
                <Link to={"/products"} className="flex gap-2">
                  <ShoppingCart color="black" />
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to={"/contact"} className="flex gap-2">
                  <img src={contact} alt="" className="w-7" />
                  Contact{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-10 items-center">
            <div className="flex gap-7 ">
              <div className="relative" ref={dropdownRef}>
                <User
                  className="border rounded-full cursor-pointer"
                  onClick={() => setShow(!show)}
                />
                {show ? (
                  <div className="w-30 h-27 bg-gray-300 absolute -right-14 rounded mt-2 z-90">
                    <ul className="flex flex-col justify-center  gap-3 p-1 text-sm">
                      <li className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full">
                        Verify Account
                      </li>
                      <li className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full">
                        <Link to={"/board"}>Dashboard</Link>
                      </li>
                      <li
                        onClick={signOut}
                        className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full"
                      >
                        SignOut
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
              {/* <img src={cart} alt="" className="cursor-pointer" /> */}
              <ShoppingBag className=" cursor-pointer" />
            </div>
            {token ? (
              <button className="bg-[#1F1E17] text-white px-2 py-3 rounded cursor-pointer">
                Get In Touch
              </button>
            ) : (
              <div>
                <button className="bg-[#1F1E17] text-white px-3 py-1 rounded cursor-pointer">
                  <Link to={"/login"}>Login</Link>
                </button>
              </div>
            )}
          </div>
        </div>
        {/* navlinks for mobile screens */}
        <div className="bg-black/40 bg-opacity-10 backdrop-blur-md border border-white/20 p-6 md:hidden">
          <ul className="gap-3 text-white text-sm flex justify-center items-center">
            <li className="flex">
              <NavLink to={"/"} className="flex gap-2">
                <Home color="black" />
                <h1 className="mb-2"> Home</h1>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/products"} className="flex gap-2">
                <img src={money} alt="" className="w-7" />
                Invest
              </NavLink>
            </li>
            <li>
              <Link to={"/products"} className="flex gap-2">
                <ShoppingCart color="black" />
                Marketplace
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="flex gap-2">
                <img src={contact} alt="" className="w-7" />
                Contact{" "}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
