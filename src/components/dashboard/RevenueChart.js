// src/components/dashboard/RevenueChart.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RevenueChart = () => {
  const { darkMode } = useContext(ThemeContext);

  // Axis data
  const xAxisLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const yAxisValues = ['80K', '60K', '40K', '20K', '0'];

  return (
    <div
      className={`w-full shadow-sm transition-colors ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{
        height: '318px',
        minWidth: '600px',
        padding: '24px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      <div className="flex justify-between items-center mb-4" style={{ gap: '16px' }}>
        <h3 className={`text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Revenue
        </h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              darkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Current Week $58,211
            </span>
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              darkMode ? 'bg-gray-400' : 'bg-gray-800'
            }`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
              Previous Week $68,768
            </span>
          </div>
        </div>
      </div>
      
      {/* Chart container with axes */}
      <div className="flex h-[218px]">
        {/* Y-axis */}
        <div className="flex flex-col justify-between items-end pr-3 h-full py-2">
          {yAxisValues.map((value, index) => (
            <span 
              key={value} 
              className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart area - Now responsive */}
        <div className="relative flex-1 border-l border-b border-gray-300">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines for better visualization */}
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
                  strokeWidth="0.2"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Blue Line (Current Week) - Responsive */}
            <path
              d="M 0 60 Q 25 45 50 65 T 100 40"
              stroke={darkMode ? '#3B82F6' : '#60A5FA'}
              strokeWidth="0.5"
              fill="none"
              className="opacity-100"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Gray/Dark Line: Solid portion (Previous Week) */}
            <path
              d="M 0 78 Q 25 73 50 55 Q 57 54 62 57"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth="0.5"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Gray/Dark Line: Dashed portion */}
            <path
              d="M 62 57 Q 81 60 100 64"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 1"
              vectorEffect="non-scaling-stroke"
            />
            
            {/* Data points - Responsive */}
            <circle cx="0" cy="60" r="0.8" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="50" cy="65" r="0.8" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="100" cy="40" r="0.8" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            
            <circle cx="0" cy="78" r="0.8" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="50" cy="55" r="0.8" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="62" cy="57" r="0.8" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
          </svg>

          {/* X-axis labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-2">
            {xAxisLabels.map((label, index) => (
              <span 
                key={label} 
                className={`text-xs ${
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