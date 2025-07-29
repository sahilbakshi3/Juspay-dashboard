// src/components/dashboard/ProjectionsChart.js

import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const ProjectionsChart = () => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  
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

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const { offsetWidth } = chartRef.current;
        // Calculate responsive height based on width
        const height = Math.max(180, Math.min(280, offsetWidth * 0.4));
        setChartDimensions({ width: offsetWidth, height });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for more accurate container size tracking
    const resizeObserver = new ResizeObserver(handleResize);
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Responsive calculations
  const isMobile = chartDimensions.width < 480;
  const isTablet = chartDimensions.width >= 480 && chartDimensions.width < 768;
  const chartHeight = Math.max(160, chartDimensions.height - 40); // Reserve less space for labels
  const barWidth = isMobile ? 'w-6' : isTablet ? 'w-7' : 'w-8';
  const barSpacing = isMobile ? 'space-x-2' : isTablet ? 'space-x-3' : 'space-x-4';

  return (
    <div className="h-full w-full flex flex-col" ref={chartRef}>
      <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Projections vs Actuals
      </h3>
      
      {/* Main chart container with reserved space for labels */}
      <div 
        className="flex w-full mt-auto"
        style={{ 
          height: `${Math.max(200, chartDimensions.height || 200)}px`,
          minHeight: '180px'
        }}
      >
        {/* Y-axis - Responsive padding and text size */}
        <div 
          className={`flex flex-col justify-between items-end py-2 ${
            isMobile ? 'pr-2' : 'pr-3'
          }`}
          style={{ 
            height: `${chartHeight}px`,
            minWidth: isMobile ? '35px' : '45px'
          }}
        >
          {yAxisValues.map((value, index) => (
            <span 
              key={value} 
              className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {value}
            </span>
          ))}
        </div>
        
        {/* Chart area with labels contained inside */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Bars section */}
          <div 
            className={`flex items-end justify-between ${barSpacing} border-l border-b border-gray-300 relative overflow-hidden`}
            style={{ height: `${chartHeight}px` }}
          >
            {chartData.map((data, index) => {
              // Calculate heights as pixels with strict maximum
              const availableHeight = chartHeight - 20; // Reserve space for padding
              const projectionHeight = Math.min((data.projection / maxValue) * availableHeight, availableHeight);
              const actualHeight = Math.min((data.actual / maxValue) * availableHeight, availableHeight);
              
              return (
                <div key={data.month} className="flex items-end h-full flex-1 min-w-0">
                  {/* Single stacked bar container - Responsive width */}
                  <div className={`flex flex-col mx-auto ${barWidth} min-w-[16px] max-w-[40px]`}>
                    {/* Projection bar (gray) - top part */}
                    <div 
                      className={`w-full transition-colors ${
                        darkMode ? 'bg-gray-600' : 'bg-slate-300'
                      }`}
                      style={{
                        height: `${Math.max(projectionHeight - actualHeight, 0)}px`,
                        minHeight: Math.max(projectionHeight - actualHeight, 0) > 0 ? '2px' : '0px'
                      }}
                    ></div>
                    
                    {/* Actual bar (blue) - bottom part */}
                    <div 
                      className={`w-full transition-colors ${
                        darkMode ? 'bg-blue-500' : 'bg-blue-400'
                      }`}
                      style={{
                        height: `${actualHeight}px`,
                        minHeight: actualHeight > 0 ? '2px' : '0px'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* X-axis labels section - Responsive spacing and font size */}
          <div className={`flex justify-between ${barSpacing} mt-2 px-1 overflow-hidden`}>
            {months.map((month, index) => (
              <span 
                key={month}
                className={`${
                  isMobile ? 'text-xs' : 'text-xs sm:text-sm'
                } text-center flex-1 min-w-0 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                style={{
                  // Ensure text doesn't overflow on very small screens
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {isMobile && month.length > 3 ? month.slice(0, 3) : month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsChart;