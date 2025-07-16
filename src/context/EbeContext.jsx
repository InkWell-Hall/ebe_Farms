import { createContext, useEffect } from "react";
import { apiClient } from "../api/client";

export const FarmContext = createContext();
const EbeContextProvider = (props) => {
  const getAllFarmProject = async () => {
    try {
      const response = await apiClient.get("/api/V1/farmProjects");
      console.log(response);
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

  useEffect(() => {
    getAllFarmProject();
    getAllUsers();
  }, []);

  const value = {
    getAllFarmProject,
  };
  return (
    <FarmContext.Provider value={value}>{props.children}</FarmContext.Provider>
  );
};

export default EbeContextProvider;
