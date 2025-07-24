import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Card = ({ title, price, oldPrice, discount, image, id }) => {
  return (
    <div>
      <div className=" w-65 bg-white p-5">
        <Link to={`/ad/${id}`}>
          {" "}
          <div>
            <img src={image} alt="" />
          </div>
          <div>
            <h1 className="text-xs">{title}</h1>
            <h3 className="text-red-500 font-bold">
              ${price}.56{" "}
              <span className="line-through text-black text-xs">
                {" "}
                ${oldPrice}
              </span>
            </h3>
            <p className="text-xs">
              Up to {discount} percent off dinner wears!
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
