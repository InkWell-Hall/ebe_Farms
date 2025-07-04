import React from "react";
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.jpeg";
import cart from "../assets/images/Bag.svg.svg";
import { Link } from "react-router";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
const Navbar = () => {
  return (
    <>
      <nav className=" bg-[#EECE38]">
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
            <User className="border rounded-full cursor-pointer" />
            {/* <img src={cart} alt="" className="cursor-pointer" /> */}
            <ShoppingBag className=" cursor-pointer" />
          </div>

          <div>
            <button className="bg-[#1F1E17] text-white px-2 py-3 rounded cursor-pointer">
              Get In Touch
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
