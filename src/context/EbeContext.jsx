import { createContext, useEffect } from "react";
import { apiClient } from "../api/client";
import { useState } from "react";

export const EbeContext = createContext();
const EbeContextProvider = (props) => {
  const [allFarmProject, setAllFarmProjects] = useState([]);
  const [allInvestors, setAllInvestors] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [allInvestments, setAllInvestment] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState([]);

  const [allProfiles, setAllProfiles] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [amountInvested, setAmountedInvested] = useState("");

  const addToCart = async (itemId, userId, quantity) => {
    // if (!size) {
    //   toast.error("Select Product Size");
    //   return;
    // }
    // const storedUserId = localStorage.getItem("USER_ID");

    // let cartData = structuredClone(cartItems);

    // if (cartData[itemId]) {
    //   if (cartData[itemId][size]) {
    //     cartData[itemId][size] += 1;
    //   } else {
    //     cartData[itemId][size] = 1;
    //   }
    // } else {
    //   cartData[itemId] = {};
    //   cartData[itemId][size] = 1;
    // }

    // setCartItems(cartData);

    try {
      await apiClient.post(
        "api/V1/cart/add",
        { itemId, userId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
          },
        }
      );
      toast.success("Product Added to Cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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

  const verifyInvestmentPayment = async () => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/V1/verify-payment", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getAllProducts = async () => {
    try {
      const response = await apiClient.get("/api/V1/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProducts(response.data.products);
    } catch (error) {}
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = allProducts.find((ad) => ad.id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getSingleInvestment = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/investment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setSelectedInvestment(response.data.investment);
    } catch (error) {}
  };

  useEffect(() => {
    getAllFarmProject();
    getAllUsers();
    getAllInvestors();
    getAllInvestments();
    getAllProfiles();
    getAllPayments();
    getAllProducts();
    console.log(getCartAmount());

    // addToCart()
  }, []);

  const value = {
    getAllFarmProject,
    allFarmProject,
    allInvestors,
    allInvestments,
    allProfiles,
    allPayments,
    allProducts,
    cartItems,
    amountInvested,
    selectedInvestment,
    setAmountedInvested,
    getCartCount,
    getAllProducts,
    getCartAmount,
    setCartItems,
    addToCart,
    verifyInvestmentPayment,
    getSingleInvestment,
  };
  return (
    <EbeContext.Provider value={value}>{props.children}</EbeContext.Provider>
  );
};

export default EbeContextProvider;
