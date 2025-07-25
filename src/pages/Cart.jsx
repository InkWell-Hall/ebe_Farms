import React, { useContext, useEffect, useState } from "react";
// import { AdContext } from "../context/AdContext";
import Navbar from "../components/Navbar";
import { Trash, Trash2, ArrowLeft } from "lucide-react";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import empty from "../assets/emptytCart.jpg";
import { apiClient } from "../api/client";
import Title from "../components/Title";
import Card from "../components/Card";
import { EbeContext } from "../context/EbeContext";

const Cart = () => {
  const {
    currency,
    cartItems,
    updateQuantity,
    getCartAmount,
    allProducts,

    cart,
  } = useContext(EbeContext);

  const [cartData, setCartData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState();
  const navigate = useNavigate();

  const verifyOrder = () => {
    if (getCartAmount() <= 0) {
      toast.error("Add Product to Cart");
    } else {
      navigate("/place-order");
    }
  };

  useEffect(() => {
    if (allProducts?.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, allProducts]);
  console.log(cartData);
  useEffect(() => {
    getCartAmount();
    setCartId(cartData.map((item) => item.id));
  }, []);

  const deleteUserCart = async () => {
    try {
      const response = await apiClient.delete(`/delete/${cartData[0].id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response);
      window.location.reload(); // only runs after the response is logged
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("Cart Data:", cartData);
    console.log("Products Data:", productsData);
    console.log("Products cart:", cart);
  }, [cartItems, cartData, productsData]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="text-center text-lead-text font-lead-font flex flex-col justify-center items-center mt-5">
          <h1>Loading cart...</h1>
        </div>
      </div>
    );
  }

  return getCartAmount() === 0 ? (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-center text-lead-text font-lead-font flex flex-col justify-center items-center mt-5 mb-20">
        <img src={empty} alt="" className="w-80" />
        <h1 className="text-2xl mb-7">Your cart is empty</h1>

        <Link to={"/products"}>
          <button className="text-[20px] flex items-center bg-green-900 text-white py-3 px-2 rounded cursor-pointer">
            <ArrowLeft className="mr-2" />
            Go Shopping
          </button>
        </Link>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  ) : (
    <>
      <div className="flex flex-col bg-rebecca min-h-screen">
        <Navbar />
        <div className="border-t pt-14 w-[80%] mx-auto mt-4">
          <div className="text-2xl mb-3">
            <h1 className="font-lead-font text-lead-text font-light">
              <Title text1={"YOUR"} text2={"CART"} />
            </h1>
          </div>
          <div>
            {cart?.items?.length > 0 ? (
              cart.items.map((item, index) => {
                const advert = item.advert;
                return (
                  <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <img
                        src={advert.images[0]}
                        className="w-16 sm:w-20"
                        alt={advert.name}
                      />
                      <div className="flex flex-col justify-between gap-10">
                        <p className="text-xs sm:text-lg font-medium ">
                          {advert.name}
                        </p>
                        <div className="flex items-center gap-5 mt-2">
                          <p>
                            {currency}
                            {advert.price}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Trash2
                      className="w-4 mr-4 sm:w-5 cursor-pointer"
                      onClick={() => handleRemove(item._id)}
                    />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">Cart is empty.</div>
            )}
          </div>
        </div>
        <div className="flex justify-end my-20 w-[80%] mx-auto">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => verifyOrder()}
                className="bg-black cursor-pointer text-white text-sm my-8 px-8 py-3 active:bg-gray-700"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Cart;
