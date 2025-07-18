import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const BarChart = () => {
  const [timeframe, setTimeframe] = useState("Weekly");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const weeklyData = [
    { day: "Monday", value: 0 },
    { day: "Tuesday", value: 15 },
    { day: "Wednesday", value: 30 },
    { day: "Thursday", value: 45 },
    { day: "Friday", value: 25 },
    { day: "Saturday", value: 35 },
    { day: "Sunday", value: 50 },
  ];

  const monthlyData = [
    { day: "Week 1", value: 20 },
    { day: "Week 2", value: 35 },
    { day: "Week 3", value: 45 },
    { day: "Week 4", value: 30 },
    { day: "Week 5", value: 55 },
    { day: "Week 6", value: 40 },
    { day: "Week 7", value: 60 },
  ];

  const yearlyData = [
    { day: "Jan", value: 10 },
    { day: "Mar", value: 25 },
    { day: "May", value: 40 },
    { day: "Jul", value: 35 },
    { day: "Sep", value: 50 },
    { day: "Nov", value: 45 },
    { day: "Dec", value: 65 },
  ];

  const timeframeOptions = ["Weekly", "Monthly", "Yearly"];

  const getCurrentData = () => {
    switch (timeframe) {
      case "Monthly":
        return monthlyData;
      case "Yearly":
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const handleTimeframeChange = (option) => {
    setTimeframe(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="md:w-[80%] max-w-4xl  bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Investment Overview
        </h2>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium text-gray-700 transition-colors"
          >
            <span>{timeframe}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              {timeframeOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleTimeframeChange(option)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                    timeframe === option
                      ? "bg-gray-50 text-blue-600"
                      : "text-gray-700"
                  } ${option === timeframeOptions[0] ? "rounded-t-md" : ""} ${
                    option === timeframeOptions[timeframeOptions.length - 1]
                      ? "rounded-b-md"
                      : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={getCurrentData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 70]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
