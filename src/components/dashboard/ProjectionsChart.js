// src/components/dashboard/ProjectionsChart.js

import React from 'react';

const ProjectionsChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Projections vs Actuals</h3>
      <div className="h-48 flex items-end justify-between space-x-2">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-200 rounded-t" 
              style={{height: `${60 + index * 15}px`}}
            ></div>
            <div 
              className="w-full bg-blue-400 rounded-b" 
              style={{height: `${40 + index * 10}px`}}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{month}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-600">30M</span>
      </div>
    </div>
  );
};

export default ProjectionsChart;