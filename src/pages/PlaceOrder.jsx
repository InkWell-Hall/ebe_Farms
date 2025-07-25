import React, { useContext, useState } from "react";
// import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { toast } from "react-toastify";
// import { AdContext } from "../context/AdContext";
import { apiClient } from "../api/client";
import stripe from "../assets/stripe_logo.png";
import razorpay from "../assets/razorpay_logo.png";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const userId = localStorage.getItem("USER_ID");
  const [loading, setLoading] = useState(false);
  const cart = "6882e7b23e15aa27d7916fe1";
  const navigate = useNavigate();

  // console.log(cartItems);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };
  const paymentMethod = "mobile_money";
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    paymentMethod,
  });

  // "cartId": "68813857f2bcc0afe2ee5300",
  // "address": "123 Kumasi Road",
  // "firstname": "John",
  // "lastname": "Doe",
  // "city": "Accra",
  // "country": "Ghana",
  // "zipcode": "00233",
  // "street": "123 Kumasi Road",
  // "phone": "+233500000000",
  // "state": "Greater Accra",
  // "paymentMethod": "mobile_money"
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    let orderData = {
      ...formData,
      cart,
      paymentMethod,
    };

    try {
      const response = await apiClient.post("/api/V1/order", orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
      console.log(response);
      toast.success("Order Placed Successfully");
      navigate("/user-profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />

      <form onSubmit={handlePlaceOrder}>
        <div>
          <div className="bg-[#F5FBF2]  px-4 py-8">
            <div className="max-w-6xl mx-auto">
              <Link to="/cart">
                <button className="flex items-center text-black transition-all font-mono hover:bg-[#EADAC8] hover:rounded-full hover:px-3 cursor-pointer mb-2">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  backt to cart
                </button>
              </Link>
              <h1 className="text-4xl font-bold text-black out">Place Order</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] w-[80%] mx-auto">
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px] shadow-2xl p-12 rounded">
            <div className="text-7xl sm:text-2xl my-3 ">
              {/* <Title text1={"Delivery"} text2={"INFORMATION"} /> */}
              <h1 className="text-4xl">Delivery Information</h1>
            </div>
            <div className="flex gap-3 ">
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="First name"
                onChange={onChangeHandler}
                name="firstname"
                value={formData.firstname}
              />
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Last name"
                onChange={onChangeHandler}
                name="lastname"
                value={formData.lastname}
              />
            </div>
            <input
              type="text"
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="address"
              onChange={onChangeHandler}
              name="address"
              value={formData.address}
            />
            {/* <input
              type="text"
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Street"
              onChange={onChangeHandler}
              name="street"
              value={formData.street}
            /> */}
            <div className="flex gap-3">
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="City"
                onChange={onChangeHandler}
                name="city"
                value={formData.city}
              />
              <input
                type="text"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="State"
                onChange={onChangeHandler}
                name="state"
                value={formData.state}
              />
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                required
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Zipcode"
                onChange={onChangeHandler}
                name="zipcode"
                value={formData.zipcode}
              />
              <input
                type="text"
                className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
                placeholder="Country"
                onChange={onChangeHandler}
                name="country"
                value={formData.country}
              />
            </div>
            <input
              type="number"
              required
              className="outline-none border border-gray-300 rounded py-1.5 px-3.5 w-full"
              placeholder="Phone"
              onChange={onChangeHandler}
              name="phone"
              value={formData.phone}
            />
          </div>

          {/* ..............right side....... */}
          <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>

            <div className="mt-12">
              {/* <Title text1={"PAYMENT"} text2={"METHOD"} /> */}
              <h1 className="text-2xl mb-4">Payment Method</h1>
              <div className="flex gap-3 flex-col lg:flex-row">
                {/* <div
                onClick={() => setMethod("Stripe")}
                className="flex items-center gap-1 border p-2 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "Stripe" ? "bg-green-500" : " "
                  }`}
                ></p>
                <img src={stripe} className="h-5 mx-0" alt="" />
              </div>
              <div
                onClick={() => setMethod("Razorpay")}
                className="flex items-center gap-1 border p-2 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "Razorpay" ? "bg-green-500" : " "
                  }`}
                ></p>
                <img src={razorpay} className="h-5 mx-0" alt="" />
              </div> */}
                <div
                  onClick={() => setMethod("COD")}
                  className="flex items-center gap-1 border p-2 cursor-pointer rounded"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === "COD" ? "bg-green-500" : " "
                    }`}
                  ></p>
                  <p className="text-gray-500 text-sm font-medium mx-0">
                    PAYSTACK
                  </p>
                </div>
              </div>

              <div className="w-full text-end mt-8">
                <button
                  type="submit"
                  className="text-white bg-green-800 rounded px-16 py-3 text-sm cursor-pointer"
                >
                  {/* <Link to={"/user-profile"}> */}
                  PLACE ORDER
                  {/* </Link> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
};

export default PlaceOrder;
