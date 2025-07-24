// src/components/dashboard/ProjectionsChart.js

import React from 'react';

const ProjectionsChart = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Projections vs Actuals</h3>
      <div className="h-48 flex items-end justify-between space-x-6">
        {months.map((month, index) => (
          <div key={month} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-slate-300 rounded-t" 
              style={{height: `${20 + index * 15}px`}}
            ></div>
            <div 
              className="w-full bg-blue-400" 
              style={{height: `${20 + index * 10}px`}}
            ></div>
            <span className="text-xs text-gray-500 mt-2">{month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectionsChart;
