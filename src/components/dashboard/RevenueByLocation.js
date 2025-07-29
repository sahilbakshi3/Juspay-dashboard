import React, { useContext } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

// You'll need to add these data files to your project
import countries from '../../data/world_countries.json'; // Add this file to your data folder
import mapData from '../../data/mapData.js'; // The data you provided

const RevenueByLocation = () => {
  const { darkMode } = useContext(ThemeContext);

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

  return (
    <div
      className={`${
        darkMode 
          ? 'bg-gray-800 shadow-gray-900/20' 
          : 'bg-white shadow-sm'
      } rounded-xl flex flex-col transition-colors duration-200`}
      style={{
        width: '202px',
        height: '318px',
        minWidth: '200px',
        maxWidth: '272px',
        padding: '24px',
        gap: '16px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      <h3
        className={`text-[17px] font-semibold leading-[20px] mb-2 transition-colors duration-200 ${
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

      {/* World Map */}
      <div className="mb-4" style={{ height: '120px' }}>
        <ResponsiveChoropleth
          data={mapData} // Use your provided map data
          features={countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={getColorScale()}
          domain={[0, Math.max(...mapData.map(d => d.value))]}
          unknownColor={darkMode ? '#374151' : '#F3F4F6'}
          valueFormat=".2s"
          projectionScale={50} // Reduced scale for smaller component
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          enableGraticule={false} // Disabled for cleaner look in small space
          borderWidth={0.5}
          borderColor={darkMode ? '#4B5563' : '#D1D5DB'}
          isInteractive={true}
          tooltip={({ feature }) => (
            <div
              style={{
                padding: '8px 12px',
                background: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
                borderRadius: '6px',
                fontSize: '12px',
                color: darkMode ? '#F9FAFB' : '#111827',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
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
      </div>

      {/* Location Breakdown */}
      <div className="space-y-2 overflow-y-auto flex-1">
        {revenueByLocation.map((location) => {
          const maxRevenue = Math.max(...revenueByLocation.map(loc => loc.amount));
          const percentage = (location.amount / maxRevenue) * 100;
          
          return (
            <div key={location.city} style={{ paddingRight: '40px', gap: '8px' }} className="flex flex-col">
              <div className="flex justify-between items-center text-sm">
                <span className={`transition-colors duration-200 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {location.city}
                </span>
                <span className={`font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {location.amount}
                </span>
              </div>
              
              {/* Custom Progress Bar with dark mode support */}
              <div 
                style={{
                  width: '154px',
                  height: '2px',
                  backgroundColor: darkMode ? '#374151' : '#e5e7eb',
                  borderRadius: '80px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
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
