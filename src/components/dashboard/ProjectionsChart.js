// src/components/dashboard/ProjectionsChart.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const ProjectionsChart = () => {
  const { darkMode } = useContext(ThemeContext);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Y-axis values (adjust these based on your data range)
  const yAxisValues = ['0', '10M', '20M', '30M'];
  const maxValue = 30; // Maximum value for scaling

  return (
    <div className="h-full w-full">
      <h3 className={`text-lg font-semibold mb-6 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Projections vs Actuals
      </h3>
      
      <div className="flex h-40">
        {/* Y-axis */}
        <div className="flex flex-col justify-between items-end pr-3 h-full">
          {yAxisValues.reverse().map((value, index) => (
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
        <div className="flex items-end justify-between space-x-4 h-full flex-1 border-l border-b border-gray-300 relative">
          {months.map((month, index) => {
            // Calculate heights as percentages of the chart area
            const projectionHeight = ((20 + index * 15) / maxValue) * 100;
            const actualHeight = ((20 + index * 10) / maxValue) * 100;
            
            return (
              <div key={month} className="flex flex-col items-center flex-1 relative">
                {/* Bar container - positioned at bottom */}
                <div className="absolute bottom-0 flex flex-col items-center">
                  {/* Projection bar (gray) - stacked on top */}
                  <div 
                    className={`w-8 rounded-t-md ${
                      darkMode ? 'bg-gray-600' : 'bg-slate-300'
                    }`}
                    style={{height: `${(projectionHeight / 100) * 30}px`}} // 120px = chart height minus space for labels
                  ></div>
                  
                  {/* Actual bar (blue) - at bottom */}
                  <div 
                    className={`w-8 rounded-b-md ${
                      darkMode ? 'bg-blue-500' : 'bg-blue-400'
                    }`}
                    style={{height: `${(actualHeight / 100) * 30}px`}}
                  ></div>
                </div>
                
                {/* Month label - positioned below chart area */}
                <span className={`absolute -bottom-8 text-xs ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add bottom margin to accommodate month labels */}
      <div className="mt-8">
        {/* Legend */}
        {/* <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded ${
              darkMode ? 'bg-gray-600' : 'bg-slate-300'
            }`}></div>
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Projections
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded ${
              darkMode ? 'bg-blue-500' : 'bg-blue-400'
            }`}></div>
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Actuals
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectionsChart;
