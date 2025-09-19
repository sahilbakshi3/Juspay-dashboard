// src/components/analytics/RevenueByLocation.js
import React, { useContext, useRef, useEffect, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

// Add these files to your data folder (or update import paths)
import countries from '../../data/world_countries.json';
import mapData from '../../data/mapData.js';

const RevenueByLocation = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const formatShort = (val) => {
    if (val == null) return '-';
    if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}K`;
    return `${val}`;
  };

  const maxRevenue = Math.max(...revenueByLocation.map((l) => l.amount), 1);

  const getResponsiveDimensions = () => {
    if (isMobile) {
      return { padding: '16px', mapHeight: 140, titleSize: 'text-base', itemFontSizeClass: 'text-xs' };
    }
    if (containerDimensions.width >= 480 && containerDimensions.width < 768) {
      return { padding: '20px', mapHeight: 160, titleSize: 'text-lg', itemFontSizeClass: 'text-sm' };
    }
    return { padding: '24px', mapHeight: 120, titleSize: 'text-lg', itemFontSizeClass: 'text-xs' };
  };

  const dims = getResponsiveDimensions();

  const getProjectionScale = () => {
    if (isMobile) return 40;
    if (containerDimensions.width >= 480 && containerDimensions.width < 768) return 55;
    return 50;
  };

  const getColorScale = () =>
    scaleQuantize()
      .domain([0, maxRevenue])
      .range(darkMode ? ['#374151', '#60A5FA', '#3B82F6', '#1D4ED8'] : ['#F3F4F6', '#93C5FD', '#60A5FA', '#3B82F6']);

  return (
    <div
      ref={containerRef}
      className={`${
        darkMode ? 'bg-gray-800 shadow-gray-900/20' : 'bg-white shadow-sm'
      } rounded-xl transition-colors duration-200 w-full max-w-sm mx-auto lg:mx-0 flex flex-col`}
      style={{
        padding: dims.padding,
        minWidth: 200,
        maxWidth: 320,
        borderRadius: 16,
      }}
    >
      {/* Title: single-line, no wrap */}
      <h3
        className={`${dims.titleSize} font-semibold leading-tight mb-4 transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis`}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0%',
          color: darkMode ? '#F9FAFB' : '#111827',
        }}
        title="Revenue by Location"
      >
        Revenue by Location
      </h3>

      {/* Map */}
      <div className="mb-4 w-full" style={{ height: dims.mapHeight }}>
        {containerDimensions.width > 0 && (
          <ResponsiveChoropleth
            data={mapData}
            features={countries.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors={getColorScale()}
            domain={[0, Math.max(...mapData.map((d) => d.value))]}
            unknownColor={darkMode ? '#374151' : '#F3F4F6'}
            valueFormat=".2s"
            projectionScale={getProjectionScale()}
            projectionTranslation={[0.5, 0.5]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={0.5}
            borderColor={darkMode ? '#4B5563' : '#D1D5DB'}
            isInteractive={false}
          />
        )}
      </div>

      {/* Locations list */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {revenueByLocation.map((location) => {
          const percentage = Math.max(0, Math.min(100, (location.amount / maxRevenue) * 100));
          const displayAmount = formatShort(location.amount);

          return (
            <div key={location.city} className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`${dims.itemFontSizeClass} font-medium transition-colors duration-200 truncate`}
                  style={{ color: darkMode ? '#E5E7EB' : '#374151', maxWidth: '70%' }}
                  title={location.city}
                >
                  {location.city}
                </div>
                <div
                  className={`${dims.itemFontSizeClass} font-medium transition-colors duration-200`}
                  style={{ color: darkMode ? '#F9FAFB' : '#0F172A', flexShrink: 0 }}
                >
                  {displayAmount}
                </div>
              </div>

              {/* Thin progress bar (no circle) */}
              <div
                className="relative w-full"
                aria-hidden="true"
                style={{
                  height: 6,
                  borderRadius: 999,
                  background: darkMode ? '#1F2937' : '#EEF2F7',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: darkMode ? '#60A5FA' : '#3B82F6',
                    transition: 'width 300ms ease',
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
