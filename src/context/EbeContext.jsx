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
  //  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [allProfiles, setAllProfiles] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [amountInvested, setAmountedInvested] = useState("");
  const userId = localStorage.getItem("Ebe_User_Id");
  const currency = "₵";
  const delivery_fee = 20;

  // const getAllProducts = async () => {
  //   setIsLoadingProducts(true);
  //   try {
  //     console.log("Fetching products...");
  //     const response = await apiClient.get("/api/V1/list", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
  //       },
  //     });

  //     console.log("Products API response:", response);

  //     if (response.data && response.data.products) {
  //       setAllProducts(response.data.products);
  //       console.log("Products set successfully:", response.data.products.length);
  //     } else {
  //       console.warn("No products in response:", response.data);
  //       setAllProducts([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     // Don't reset products on error, keep existing state
  //     if (error.response) {
  //       console.error("API Error Response:", error.response.data);
  //     }
  //   } finally {
  //     setIsLoadingProducts(false);
  //   }
  // };
  const addToCart = async (itemId, size) => {
    // if (!size) {
    //   toast.error("Select Product Size");
    //   return;
    // }
    // const storedUserId = localStorage.getItem("USER_ID");

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

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

    // Simple cart structure: { itemId: quantity, itemId2: quantity }
    for (const itemId in cartItems) {
      try {
        if (cartItems[itemId] > 0) {
          totalCount += cartItems[itemId];
        }
      } catch (error) {
        console.error("Error calculating cart count for item:", itemId, error);
      }
    }

    console.log("Cart count calculated:", totalCount, "from cart:", cartItems);
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

    for (const itemId in cartItems) {
      try {
        const itemInfo = allProducts.find((product) => product.id === itemId);
        if (itemInfo && cartItems[itemId] > 0) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      } catch (error) {
        console.error("Error calculating cart amount for item:", itemId, error);
      }
    }

    console.log("Cart amount calculated:", totalAmount);
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
  const getSingleInvestor = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/investors/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      // setSelectedInvestment(response.data.investment);
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
      setAllProducts(response.data.products);
    } catch (error) {}
  };

  const getSingleProfile = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProducts(response.data.products);
    } catch (error) {}
  };

  const getSingleCart = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProducts(response.data.products);
    } catch (error) {}
  };

  const getAllOrders = async () => {
    try {
      const response = await apiClient.get(`/api/V1/order/list/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      setAllProducts(response.data.products);
    } catch (error) {}
  };

  const getMyOrder = async (id) => {
    try {
      const response = await apiClient.get(`/api/V1/order-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  useEffect(() => {
    getAllFarmProject();
    getAllUsers();
    getAllInvestors();
    getAllInvestments();
    getAllProfiles();
    getAllPayments();
    getAllProducts();
    getMyOrder();
    console.log(getCartAmount());
    getSingleProfile("687be6a216d71c2e07ed9aeb");
    getAllOrders();
    getSingleInvestment("687be6a216d71c2e07ed9aeb");
    getSingleInvestor("68811a4e99d2292e4bce9134");
    // getSingleCart("687be6a216d71c2e07ed9aeb");
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
    delivery_fee,
    currency,
    amountInvested,
    selectedInvestment,
    setAmountedInvested,
    getCartCount,
    getMyInvestments,
    getAllProducts,
    getCartAmount,
    setCartItems,
    addToCart,
    verifyInvestmentPayment,
    getSingleInvestment,
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);
  return (
    <EbeContext.Provider value={value}>{props.children}</EbeContext.Provider>
  );
};

export default EbeContextProvider;
