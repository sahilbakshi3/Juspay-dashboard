// src/components/dashboard/ProjectionsChart.js

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const ProjectionsChart = () => {
  const { darkMode } = useContext(ThemeContext);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  // Y-axis values (adjust these based on your data range)
  const yAxisValues = ['30M', '20M', '10M', '0']; // Keep in order for display
  const maxValue = 30; // Maximum value for scaling

  // Randomized data for more realistic chart appearance
  const chartData = [
    { month: 'Jan', projection: 25, actual: 18 },
    { month: 'Feb', projection: 22, actual: 26 },
    { month: 'Mar', projection: 28, actual: 24 },
    { month: 'Apr', projection: 30, actual: 20 },
    { month: 'May', projection: 15, actual: 28 },
    { month: 'Jun', projection: 20, actual: 22 }
  ];

  return (
    <div className="h-full w-full">
      <h3 className={`text-lg font-semibold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Projections vs Actuals
      </h3>
      
      {/* Main chart container with reserved space for labels */}
      <div className="flex" style={{ height: '180px' }}>
        {/* Y-axis */}
        <div className="flex flex-col justify-between items-end pr-3 h-full py-2" style={{ height: '140px' }}>
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
        
        {/* Chart area with labels contained inside */}
        <div className="flex flex-col flex-1">
          {/* Bars section */}
          <div className="flex items-end justify-between space-x-4 border-l border-b border-gray-300 relative" 
               style={{ height: '140px' }}>
            {chartData.map((data, index) => {
              // Calculate heights as pixels with strict maximum
              const availableHeight = 120; // Available height for bars
              const projectionHeight = Math.min((data.projection / maxValue) * availableHeight, availableHeight);
              const actualHeight = Math.min((data.actual / maxValue) * availableHeight, availableHeight);
              
              return (
                <div key={data.month} className="flex items-end h-full flex-1">
                  {/* Single stacked bar container */}
                  <div className="flex flex-col w-8 mx-auto">
                    {/* Projection bar (gray) - top part */}
                    <div 
                      className={`w-full ${
                        darkMode ? 'bg-gray-600' : 'bg-slate-300'
                      }`}
                      style={{
                        height: `${Math.max(projectionHeight - actualHeight, 0)}px`
                      }}
                    ></div>
                    
                    {/* Actual bar (blue) - bottom part */}
                    <div 
                      className={`w-full ${
                        darkMode ? 'bg-blue-500' : 'bg-blue-400'
                      }`}
                      style={{
                        height: `${actualHeight}px`
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels section - contained within main container */}
          <div className="flex justify-between space-x-4 mt-2 px-4">
            {months.map((month, index) => (
              <span 
                key={month}
                className={`text-xs text-center flex-1 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsChart;
