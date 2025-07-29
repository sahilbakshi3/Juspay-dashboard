// src/components/dashboard/RevenueChart.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RevenueChart = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);

  // Axis data
  const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const yAxisValues = ['80M', '60M', '40M', '20M', '0'];

  return (
    <div className="w-full h-full" style={{ minWidth: isMobile ? '300px' : '600px' }}>
      {/* Header with title and legend - Responsive */}
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} mb-2 ${
        isMobile ? 'space-y-2' : 'space-x-8'
      }`}>
        <h3 className={`font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        } ${isMobile ? 'text-base' : 'text-lg'}`}>
          Revenue
        </h3>
        
        {/* Legend items - Responsive layout */}
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-6'} ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              darkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Current Week $58,211
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              darkMode ? 'bg-gray-400' : 'bg-gray-800'
            }`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Previous Week $68,768
            </span>
          </div>
        </div>
      </div>
      
      {/* Chart container with axes - Responsive height */}
      <div className={`flex mt-auto ${isMobile ? 'h-[200px]' : 'h-[240px]'}`}>
        {/* Y-axis */}
        <div className={`flex flex-col justify-between items-end h-full py-2 ${
          isMobile ? 'pr-2' : 'pr-3'
        }`}>
          {yAxisValues.map((value, index) => (
            <span 
              key={value} 
              className={`${isMobile ? 'text-xs' : 'text-xs'} ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart area - Responsive */}
        <div className="relative flex-1 border-l border-b border-gray-300 min-w-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines for better visualization - Responsive */}
            <defs>
              <pattern 
                id="grid" 
                width="14.28" 
                height="20" 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d="M 14.28 0 L 0 0 0 20" 
                  fill="none" 
                  stroke={darkMode ? '#374151' : '#f3f4f6'} 
                  strokeWidth={isMobile ? "2" : "2.5"}
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Blue Line (Current Week) - Responsive stroke width */}
            <path
              d="M 0 60 Q 25 45 50 65 T 100 40"
              stroke={darkMode ? '#3B82F6' : '#60A5FA'}
              strokeWidth={isMobile ? "2" : "2.5"}
              fill="none"
              className="opacity-100"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Gray/Dark Line: Solid portion (Previous Week) */}
            <path
              d="M 0 78 Q 25 60 50 55 Q 57 50 62 57"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth={isMobile ? "2" : "2.5"}
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Gray/Dark Line: Dashed portion */}
            <path
              d="M 62 57 Q 81 65 100 64"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth={isMobile ? "2" : "2.5"}
              fill="none"
              strokeDasharray={isMobile ? "4 4" : "6 6"}
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Data points - Responsive size */}
            <circle cx="0" cy="60" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="50" cy="65" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="100" cy="40" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            
            <circle cx="0" cy="78" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="50" cy="55" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="62" cy="57" r={isMobile ? "0.6" : "0.8"} fill={darkMode ? '#9CA3AF' : '#1F2937'} />
          </svg>

          {/* X-axis labels - Responsive positioning */}
          <div className={`absolute left-0 right-0 flex justify-between ${
            isMobile ? '-bottom-5 px-1' : '-bottom-6 px-2'
          }`}>
            {xAxisLabels.map((label, index) => (
              <span 
                key={label} 
                className={`${isMobile ? 'text-xs' : 'text-xs'} ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;