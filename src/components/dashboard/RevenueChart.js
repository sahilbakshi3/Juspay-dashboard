// src/components/dashboard/RevenueChart.js

import React from 'react';

const RevenueChart = () => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
            <span>Current Week $58,211</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-800 rounded-full mr-2"></div>
            <span>Previous Week $68,768</span>
          </div>
        </div>
      </div>
      <div className="h-48 relative">
        <svg className="w-full h-full" viewBox="0 0 400 150">
          <path
            d="M 0 100 Q 100 80 200 90 T 400 70"
            stroke="#60A5FA"
            strokeWidth="3"
            fill="none"
            className="opacity-60"
          />
          <path
            d="M 0 120 Q 100 110 200 100 T 400 90"
            stroke="#1F2937"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};

export default RevenueChart;