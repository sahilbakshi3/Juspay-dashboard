// src/components/dashboard/RevenueChart.js

import React from 'react';

const RevenueChart = () => {
  return (
    <div
      className="bg-white shadow-sm"
      style={{
        width: '662px',
        height: '318px',
        minWidth: '662px',
        padding: '24px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      <div className="flex justify-between items-center mb-4" style={{ gap: '16px' }}>
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
      <div className="relative w-full h-[218px]">
      <svg className="w-full h-full" viewBox="0 0 662 218">
        
        <path
          d="M 0 130 Q 165.5 100 331 140 T 662 90"
          stroke="#60A5FA"      /* blue */
          strokeWidth="3"
          fill="none"
          className="opacity-100"  /* make it fully visible */
        />
        
        {/* Black Line: Solid portion */}
        <path
          d="M 0 170 Q 165.5 160 331 120 Q 365.5 118 400 125"
          stroke="#1F2937"
          strokeWidth="3"
          fill="none"
        />
        {/* Black Line: Dashed portion */}
        <path
          d="M 400 125 Q 531 132 662 140"
          stroke="#1F2937"
          strokeWidth="3"
          fill="none"
          strokeDasharray="12 6"
        />
      </svg>
    </div>

    </div>
  );
};

export default RevenueChart;
