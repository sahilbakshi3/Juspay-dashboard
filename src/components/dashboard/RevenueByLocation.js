import React, { useContext, useRef, useEffect, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

// You'll need to add these data files to your project
import countries from '../../data/world_countries.json'; // Add this file to your data folder
import mapData from '../../data/mapData.js'; // The data you provided

const RevenueByLocation = () => {
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

  // Transform your revenueByLocation data to match the map data format
  const transformDataForMap = () => {
    // Map your cities to country codes if needed
    const cityToCountryMap = {
      'New York': 'USA',
      'San Francisco': 'USA', 
      'Sydney': 'AUS',
      'Singapore': 'SGP',
      // Add more mappings as needed
    };

    return revenueByLocation.map(location => ({
      id: cityToCountryMap[location.city] || location.city,
      value: location.amount
    }));
  };

  // Color scale for the map based on theme
  const getColorScale = () => {
    return scaleQuantize()
      .domain([0, Math.max(...revenueByLocation.map(loc => loc.amount))])
      .range(darkMode 
        ? ['#374151', '#60A5FA', '#3B82F6', '#1D4ED8'] 
        : ['#F3F4F6', '#93C5FD', '#60A5FA', '#3B82F6']
      );
  };

  // Responsive calculations
  const isTablet = containerDimensions.width >= 480 && containerDimensions.width < 768;
  const isDesktop = containerDimensions.width >= 768;
  
  // Dynamic sizing based on screen size
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return {
        mapHeight: '140px',
        titleSize: 'text-base',
        itemSpacing: 'space-y-3'
      };
    } else if (isTablet) {
      return {
        mapHeight: '160px',
        titleSize: 'text-lg',
        itemSpacing: 'space-y-2'
      };
    } else {
      return {
        mapHeight: '120px',
        titleSize: 'text-lg',
        itemSpacing: 'space-y-2'
      };
    }
  };

  const dimensions = getResponsiveDimensions();

  // Responsive projection scale
  const getProjectionScale = () => {
    if (isMobile) return 40;
    if (isTablet) return 55;
    return 50;
  };

  return (
    <div
      ref={containerRef}
      className="h-full w-full flex flex-col"
      style={{ gap: '16px' }}
    >
      <h3
        className={`${dimensions.titleSize} font-semibold leading-tight mb-2 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%',
        }}
      >
        Revenue by Location
      </h3>

      {/* World Map - Responsive container */}
      <div 
        className="mb-4 w-full" 
        style={{ 
          height: dimensions.mapHeight,
          minHeight: isMobile ? '120px' : '100px'
        }}
      >
        {containerDimensions.width > 0 && (
          <ResponsiveChoropleth
            data={mapData} // Use your provided map data
            features={countries.features}
            margin={{ 
              top: 0, 
              right: 0, 
              bottom: 0, 
              left: 0 
            }}
            colors={getColorScale()}
            domain={[0, Math.max(...mapData.map(d => d.value))]}
            unknownColor={darkMode ? '#374151' : '#F3F4F6'}
            valueFormat=".2s"
            projectionScale={getProjectionScale()}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={isMobile ? 0.3 : 0.5}
            borderColor={darkMode ? '#4B5563' : '#D1D5DB'}
            isInteractive={true}
            tooltip={({ feature }) => (
              <div
                style={{
                  padding: isMobile ? '6px 10px' : '8px 12px',
                  background: darkMode ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '6px',
                  fontSize: isMobile ? '11px' : '12px',
                  color: darkMode ? '#F9FAFB' : '#111827',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  maxWidth: isMobile ? '200px' : '240px',
                  wordWrap: 'break-word'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {feature.properties.name}
                </div>
                <div>
                  Revenue: {feature.value ? feature.value.toLocaleString() : 'No data'}
                </div>
              </div>
            )}
          />
        )}
      </div>

      {/* Location Breakdown - Responsive layout */}
      <div className={`${dimensions.itemSpacing} overflow-y-auto flex-1`}>
        {revenueByLocation.map((location) => {
          const maxRevenue = Math.max(...revenueByLocation.map(loc => loc.amount));
          const percentage = (location.amount / maxRevenue) * 100;
          
          return (
            <div 
              key={location.city} 
              className="flex flex-col"
              style={{ 
                gap: '8px'
              }}
            >
              <div className="flex justify-between items-center">
                <span className={`${isMobile ? 'text-sm' : 'text-sm'} transition-colors duration-200 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                } truncate pr-2`}>
                  {location.city}
                </span>
                <span className={`${isMobile ? 'text-sm' : 'text-sm'} font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                } flex-shrink-0`}>
                  {location.amount}
                </span>
              </div>
              
              {/* Custom Progress Bar with responsive width */}
              <div 
                className="w-full"
                style={{
                  height: '2px',
                  backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                  borderRadius: '80px',
                  opacity: 1
                }}
              >
                <div 
                  style={{
                    width: `${percentage}%`,
                    height: '2px',
                    backgroundColor: darkMode ? '#60a5fa' : '#3b82f6',
                    borderRadius: '80px',
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueByLocation;