import { createContext, useEffect, useState } from "react";
import { apiClient } from "../api/client";

export const FarmContext = createContext();
const FarmContextProvider = (props) => {
  const [allFarmProject, setAllFarmProjects] = useState([]);
  const [allInvestors, setAllInvestors] = useState([]);
  const [allInvestments, setAllInvestment] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const userId = localStorage.getItem("Ebe_User_Id");

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
      setAllInvestment(response.data.investment);
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
  const getAllProducts = async () => {
    try {
      const response = await apiClient.get("/api/V1/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProducts(response?.data?.products);
    } catch (error) {}
  };
  const getMyInvestments = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/investment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      return response.data;
      setAllProducts(response.data.products);
    } catch (error) {}
  };
  const verifyInvestmentPayment = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/verify-payment/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      // return response.data;
      // setAllProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllUserInvestment = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/user-investment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      // return response.data;
      // setAllProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFarmProject();
    getAllUsers();
    getAllInvestors();
    getAllInvestments();
    getAllProfiles();
    getAllPayments();
    getAllProducts();
    getMyInvestments("686fd229f8675b911da11a13");
    getAllUserInvestment("687be6a216d71c2e07ed9aeb");
  }, []);

  const value = {
    getAllFarmProject,
    allFarmProject,
    allInvestors,
    allInvestments,
    allProfiles,
    allPayments,
    allProducts,
    getMyInvestments,
    getAllUserInvestment,
    verifyInvestmentPayment,
  };
  return (
    <FarmContext.Provider value={value}>{props.children}</FarmContext.Provider>
  );
};

export default FarmContextProvider;
