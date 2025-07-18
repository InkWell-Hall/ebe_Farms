import { createContext, useEffect } from "react";
import { apiClient } from "../api/client";
import { useState } from "react";

export const EbeContext = createContext();
const EbeContextProvider = (props) => {
  const [allFarmProject, setAllFarmProjects] = useState([]);
  const [allInvestors, setAllInvestors] = useState([]);
  const [allInvestments, setAllInvestment] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [allPayments, setAllPayments] = useState([]);

  const getAllFarmProject = async () => {
    try {
      const response = await apiClient.get("/api/V1/farmProjects");
      console.log(response);
      setAllFarmProjects(response.data.farm);
    } catch (error) {}
  };

  const getAllUsers = async () => {
    try {
      const response = await apiClient.get("/api/V1/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          // Don't set Content-Type for FormData - let browser handle it
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllInvestors = async () => {
    try {
      const response = await apiClient.get("/api/V1/investors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllInvestors(response.data.investors);
    } catch (error) {}
  };
  const getAllInvestments = async () => {
    try {
      const response = await apiClient.get("/api/V1/investment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllInvestment(response.data.investments);
    } catch (error) {}
  };

  const getAllProfiles = async () => {
    try {
      const response = await apiClient.get("/api/V1/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProfiles(response.data.allprofile);
    } catch (error) {}
  };

  const getAllPayments = async () => {
    try {
      const response = await apiClient.get("/api/V1/payment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllPayments(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllFarmProject();
    getAllUsers();
    getAllInvestors();
    getAllInvestments();
    getAllProfiles();
    getAllPayments();
  }, []);

  const value = {
    getAllFarmProject,
    allFarmProject,
    allInvestors,
    allInvestments,
    allProfiles,
    allPayments,
  };
  return (
    <EbeContext.Provider value={value}>{props.children}</EbeContext.Provider>
  );
};

export default EbeContextProvider;
