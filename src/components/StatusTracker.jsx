// components/StatusTracker.jsx
import React from "react";

const StatusTracker = ({ status }) => {
  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex items-center justify-between w-full mt-4">
      {steps.map((step, i) => {
        const isCompleted = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Circle */}
            <div
              className={`h-5 w-5 rounded-full z-10 border-2 ${
                isCompleted
                  ? "bg-green-500 border-green-500"
                  : isActive
                  ? "bg-yellow-400 border-yellow-400"
                  : "bg-gray-300 border-gray-300"
              }`}
            />
            {/* Line */}
            {i < steps.length - 1 && (
              <div
                className={`absolute top-2 left-1/2 w-full h-0.5 ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-yellow-400"
                    : "bg-gray-300"
                }`}
              ></div>
            )}
            {/* Label */}
            <span
              className={`mt-2 text-xs text-center ${
                isCompleted || isActive
                  ? "text-gray-800 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StatusTracker;
