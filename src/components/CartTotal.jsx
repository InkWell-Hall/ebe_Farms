import React, { useContext } from "react";
import { AdContext } from "../context/AdContext";

const CartTotal = () => {
  const { currency, getCartAmount, delivery_fee } = useContext(AdContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <h1 className="font-lead-font text-lead-text">
          Cart <span className="font-bold">Total</span>
        </h1>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
