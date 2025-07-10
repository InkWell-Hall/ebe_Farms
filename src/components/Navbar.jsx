import React, { useEffect, useRef, useState } from "react";
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.jpeg";
import cart from "../assets/images/Bag.svg.svg";
import { Link } from "react-router";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null); // reference to the profile dropdown
  const token = localStorage.getItem("TOKEN");

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
            <ul className="flex gap-2">
              <li>
                <Link to={"/"} className="flex">
                  Home <ChevronDown color="yellow" size={20} className="mt-1" />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="flex">
                  Pages{" "}
                  <ChevronDown color="yellow" size={20} className="mt-1" />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="flex">
                  Shop <ChevronDown color="yellow" size={20} className="mt-1" />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="flex">
                  Contact{" "}
                  <ChevronDown color="yellow" size={20} className="mt-1" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-5 ">
            <div className="relative" ref={dropdownRef}>
              <User
                className="border rounded-full cursor-pointer"
                onClick={() => setShow(!show)}
              />
              {show ? (
                <div className="w-30 h-27 bg-gray-300 absolute -right-14 rounded mt-2">
                  <ul className="flex flex-col justify-center  gap-3 p-1 text-sm">
                    <li className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full">
                      Verify Account
                    </li>
                    <li className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full">
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="hover:bg-black cursor-pointer px-2 whitespace-nowrap w-full">
                      SignOut
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            {/* <img src={cart} alt="" className="cursor-pointer" /> */}
            <ShoppingBag className=" cursor-pointer" />
          </div>

          <div>
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
      </nav>
    </>
  );
};

export default Navbar;
