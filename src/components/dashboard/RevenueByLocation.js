import React, { useContext } from 'react';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RevenueByLocation = () => {
  // You can either use context or props - using context here for consistency
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`${
        darkMode 
          ? 'bg-gray-800 shadow-gray-900/20' 
          : 'bg-white shadow-sm'
      } rounded-xl flex flex-col justify-between transition-colors duration-200`}
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
      <h3
        className={`text-[14px] font-semibold leading-[20px] mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%',
        }}
      >
        Revenue by Location
      </h3>

      {/* Location Breakdown */}
      <div className="space-y-2 overflow-y-auto">
        {revenueByLocation.map((location) => {
          const maxRevenue = Math.max(...revenueByLocation.map(loc => loc.amount));
          const percentage = (location.amount / maxRevenue) * 100;
          
          return (
            <div key={location.city} style={{ paddingRight: '40px', gap: '8px' }} className="flex flex-col">
              <div className="flex justify-between items-center text-sm">
                <span className={`transition-colors duration-200 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {location.city}
                </span>
                <span className={`font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {location.amount}
                </span>
              </div>
              
              {/* Custom Progress Bar with dark mode support */}
              <div 
                style={{
                  width: '154px',
                  height: '2px',
                  backgroundColor: darkMode ? '#374151' : '#e5e7eb', // Dark gray for dark mode, light gray for light mode
                  borderRadius: '80px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              >
                <div 
                  style={{
                    width: `${percentage}%`,
                    height: '2px',
                    backgroundColor: darkMode ? '#60a5fa' : '#3b82f6', // Lighter blue for dark mode, standard blue for light mode
                    borderRadius: '80px',
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RevenueByLocation;