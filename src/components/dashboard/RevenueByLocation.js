// src/components/dashboard/RevenueByLocation.js

import React from 'react';
import { revenueByLocation } from '../../data/mockData';

const RevenueByLocation = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Location</h3>
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#1F2937"
            strokeWidth="3"
            strokeDasharray="60, 100"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">38.6%</span>
        </div>
      </div>
      <div className="space-y-3">
        {revenueByLocation.map((location, index) => (
          <div key={location.city} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{location.city}</span>
            <span className="text-sm font-medium">{location.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByLocation;