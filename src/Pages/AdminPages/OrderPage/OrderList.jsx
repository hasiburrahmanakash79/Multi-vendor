// import React from 'react';

import { TrendingDown, TrendingUp } from "lucide-react";

const OrderList = () => {
  const stats = [
    {
      title: "Total earning",
      value: "2,420",
      change: "40%",
      changeType: "increase",
      comparison: "vs last month",
    },
    {
      title: "Total orders",
      value: "316",
      change: "40%",
      changeType: "decrease",
      comparison: "vs last month",
    },
    {
      title: "Total reviews",
      value: "420",
      comparison: "From last month",
    },
  ];
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {stat.title}
            </h3>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.value}
            </div>
            {stat.change && (
              <div className="flex items-center text-sm">
                {stat.changeType === "increase" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500 ml-1">{stat.comparison}</span>
              </div>
            )}
            {!stat.change && (
              <div className="text-sm text-gray-500">{stat.comparison}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
