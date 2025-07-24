import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Sign = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const role = "recruiter";
  const companyEmail = "hfufuf";
  const navigate = useNavigate();
  const signUp = async (data) => {
    try {
      const response = await axios.post(
        "https://job-simulation-backend-3e6w.onrender.com/api/auth/signup",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      setRole(response.data.user.role);
      toast.success("User Registered Successfully");
      // role === "student" ? navigate("/") : ;
      if (!role) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-20">
      <form action={signUp}>
        <div className="flex flex-col mb-4">
          <label htmlFor="firstName">First</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            className="border"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="lastName">last</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="userName">user</label>
          <input
            type="text"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password">pass</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">companyName</label>
          <input
            type="text"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">companycode</label>
          <input
            type="text"
            name="companyCode"
            value={companyCode}
            onChange={(e) => setCompanyCode(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">website</label>
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email">logo</label>
          <input
            type="file"
            name="logo"
            // value={logo}
            onChange={(e) => setLogo(e.target.files[0])}
            className="border"
          />
        </div>
        <button type="submit" className="bg-black text-white">
          submit
        </button>
      </form>
    </div>
  );
};

export default Sign;
