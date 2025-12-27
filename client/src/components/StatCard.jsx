import React from "react";

const StatCard = ({ title, value, icon, color = "indigo" }) => {
  const colorMap = {
    indigo: "bg-indigo-100 text-indigo-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Text */}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            colorMap[color] || colorMap.indigo
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
