import React from 'react';
import { revenueByLocation } from '../../data/mockData';

const RevenueByLocation = () => {
  const percentage = 38.6; // Static percentage for now

  return (
    <div
      className="bg-white rounded-xl shadow-sm flex flex-col justify-between"
      style={{
        width: '202px',
        height: '318px',
        minWidth: '200px',
        maxWidth: '272px',
        padding: '24px',
        gap: '16px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Revenue by Location
      </h3>

      {/* Circular Progress */}
      <div className="relative w-28 h-28 mx-auto mb-4">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 36 36"
        >
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke="#6366F1"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Location Breakdown */}
      <div className="space-y-2 overflow-y-auto">
        {revenueByLocation.map((location) => (
          <div
            key={location.city}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-600">{location.city}</span>
            <span className="font-medium text-gray-900">
              {location.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueByLocation;
