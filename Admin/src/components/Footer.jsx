import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Pin,
  Twitter,
  Youtube,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#1F1E17] text-white py-8 px-2">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg">Ebe_Farms</h4>
            <p className="mt-2 flex flex-col">
              3rd Floor Marble <br />
              Greater Accra, <br />
              Ghana
              <a href="mailto:ghanaeca@gmail.com">ebe_farms@gmail.com</a>
            </p>
            <p className="mt-2">Mon–Fri: 8:30am–4:30pm</p>
          </div>
          <div>
            <h4 className="font-semibold">About Us</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#membership" className="hover:text-blue-400">
                  Membership
                </a>
              </li>
              <li>
                <a href="#directory" className="hover:text-blue-400">
                  Business Directory
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-blue-400">
                  Events
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Categories</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400">
                  Regular Member
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Corporate Member
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Associate Corporate Member
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400">
                  Associate Member
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Get in Touch</h4>
            <p className="mt-2">Email us or call directly:</p>
            <p className="mt-1">
              <Mail size={16} className="inline mr-2" />
              ebe_farms@gmail.com
            </p>
            <p>
              <Phone size={16} className="inline mr-2" />
              +233 (0)598 551 301
            </p>
            <Link
              to={"/products"}
              className="inline-block mt-4 px-4 py-2 bg-[#EECE38] text-black font-bold rounded-lg cursor-pointer"
            >
              Fund a project
            </Link>
            <div className="flex space-x-3 mt-4">
              {/* Replace '#' with social links */}
              <a href="#">
                <Facebook />
              </a>
              <a href="#">
                <Twitter />
              </a>
              <a href="#">
                <Instagram />
              </a>
              <a href="#">
                <Linkedin />
              </a>
              <a href="#">
                <Youtube />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-6 border-white" />
        <p className="text-center text-sm">
          © 2025 Ebe_Farms. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
