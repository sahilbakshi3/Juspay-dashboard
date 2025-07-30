import React, { useContext, useRef, useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../../context/ThemeContextProvider';

// Updated colors with dark mode support
const COLORS_LIGHT = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];
const COLORS_DARK = ['#C6C7F8', '#BBF7D0', '#BAE6FD', '#A5B4FC']; // Primary brand color for dark mode

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

export default function TotalSales() {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const isMobileView = offsetWidth < 480;
        
        setContainerDimensions({ width: offsetWidth, height: offsetHeight });
        setIsMobile(isMobileView);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Use ResizeObserver for more accurate container size tracking
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Choose colors based on theme
  const COLORS = darkMode ? COLORS_DARK : COLORS_LIGHT;

  // Responsive calculations
  const isTablet = containerDimensions.width >= 480 && containerDimensions.width < 768;
  const isDesktop = containerDimensions.width >= 768;
  
  // Dynamic sizing based on screen size
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return {
        width: '100%',
        minWidth: '280px',
        maxWidth: '100%',
        height: 'auto',
        minHeight: '320px',
        padding: '16px',
        chartSize: Math.min(140, containerDimensions.width - 80),
        titleSize: 'text-base',
        itemFontSize: 'text-xs',
        innerRadius: 25,
        outerRadius: Math.min(60, (containerDimensions.width - 80) / 2.5),
        itemSpacing: 'gap-3'
      };
    } else if (isTablet) {
      return {
        width: '100%',
        minWidth: '300px',
        maxWidth: '400px',
        height: 'auto',
        minHeight: '360px',
        padding: '20px',
        chartSize: 160,
        titleSize: 'text-lg',
        itemFontSize: 'text-sm',
        innerRadius: 35,
        outerRadius: 65,
        itemSpacing: 'gap-2'
      };
    } else {
      return {
        width: '202px',
        minWidth: '200px',
        maxWidth: '300px',
        height: '344px',
        minHeight: '344px',
        padding: '24px',
        chartSize: 120,
        titleSize: 'text-lg',
        itemFontSize: 'text-xs',
        innerRadius: 30,
        outerRadius: 50,
        itemSpacing: 'gap-2'
      };
    }
  };

  const dimensions = getResponsiveDimensions();

  return (
    <div
      ref={containerRef}
      className={`${
        darkMode 
          ? 'bg-gray-800 shadow-gray-900/20' 
          : 'bg-white shadow-sm'
      } rounded-xl transition-colors duration-200 w-full max-w-sm mx-auto lg:mx-0`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        minWidth: dimensions.minWidth,
        maxWidth: dimensions.maxWidth,
        minHeight: dimensions.minHeight,
        padding: dimensions.padding,
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      {/* Title with consistent styling */}
      <h3
        className={`${dimensions.titleSize} font-semibold leading-tight mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%',
        }}
      >
        Total Sales
      </h3>

      {/* Pie Chart - Responsive container */}
      <div className="flex justify-center mb-4">
        <div 
          style={{ 
            width: dimensions.chartSize, 
            height: dimensions.chartSize,
            minWidth: isMobile ? '120px' : '100px',
            minHeight: isMobile ? '120px' : '100px'
          }}
        >
          {containerDimensions.width > 0 && (
            <PieChart
              series={[
                {
                  data: pieData.map((item, index) => ({
                    id: item.type,
                    value: item.amount,
                    label: '',
                  })),
                  innerRadius: dimensions.innerRadius,
                  outerRadius: dimensions.outerRadius,
                  paddingAngle: isMobile ? 1 : 2,
                  cornerRadius: isMobile ? 2 : 4
                }
              ]}
              width={dimensions.chartSize}
              height={dimensions.chartSize}
              colors={COLORS}
              slotProps={{
                legend: { hidden: true }
              }}
              sx={{
                '& .MuiChartsLegend-root': { display: 'none' },
                '& .MuiChartsLegend-mark': { display: 'none' },
                // Responsive hover effects
                '& .MuiChartsArc-arc': {
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    filter: 'brightness(1.1)',
                    cursor: 'pointer'
                  }
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Data Legend - Responsive layout */}
      <div className={`flex flex-col ${dimensions.itemSpacing}`}>
        {pieData.map((item, index) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div 
                className={`${isMobile ? 'w-2 h-2' : 'w-2 h-2'} rounded-full flex-shrink-0`}
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span
                className={`${dimensions.itemFontSize} transition-colors duration-200 truncate ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{
                  fontFamily: 'Inter',
                }}
                title={item.type} // Tooltip for truncated text
              >
                {item.type}
              </span>
            </div>
            <span
              className={`${dimensions.itemFontSize} font-semibold transition-colors duration-200 flex-shrink-0 ml-2 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
              }}
            >
              ${item.amount}
            </span>
          </div>
        ))}
      </div>
  

      {/* Very small screen fallback */}
      {isMobile && containerDimensions.width < 240 && (
        <div className={`text-center p-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-xs">
            Rotate device for better view
          </p>
        </div>
      )}
    </div>
  );
}