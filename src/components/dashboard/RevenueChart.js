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
      className={`shadow-sm transition-colors ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{
        width: '825px',
        height: '318px',
        minWidth: '800px',
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

        {/* Chart area */}
        <div className="relative flex-1 border-l border-b border-gray-300">
          <svg className="w-full h-full" viewBox="0 0 800 218">
            {/* Grid lines for better visualization */}
            <defs>
              <pattern 
                id="grid" 
                width="80" 
                height="40" 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d="M 80 0 L 0 0 0 40" 
                  fill="none" 
                  stroke={darkMode ? '#374151' : '#f3f4f6'} 
                  strokeWidth="1"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Blue Line (Current Week) */}
            <path
              d="M 0 130 Q 200 100 400 140 T 800 90"
              stroke={darkMode ? '#3B82F6' : '#60A5FA'}
              strokeWidth="3"
              fill="none"
              className="opacity-100"
            />
            
            {/* Gray/Dark Line: Solid portion (Previous Week) */}
            <path
              d="M 0 170 Q 200 160 400 120 Q 450 118 500 125"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth="3"
              fill="none"
            />
            
            {/* Gray/Dark Line: Dashed portion */}
            <path
              d="M 500 125 Q 650 132 800 140"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth="3"
              fill="none"
              strokeDasharray="12 6"
            />
            
            {/* Data points */}
            <circle cx="0" cy="130" r="4" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="400" cy="140" r="4" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            <circle cx="800" cy="90" r="4" fill={darkMode ? '#3B82F6' : '#60A5FA'} />
            
            <circle cx="0" cy="170" r="4" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="400" cy="120" r="4" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
            <circle cx="500" cy="125" r="4" fill={darkMode ? '#9CA3AF' : '#1F2937'} />
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
