import React, { useContext, useRef, useEffect, useState } from 'react';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

// NOTE: This file expects you to have world map data at ../../data/world_countries.json and mapData at ../../data/mapData.js
// If not present, the map rendering portion is gated by container width; this component will still render the list.

const RevenueByLocation = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      setContainerDimensions({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => {
      window.removeEventListener('resize', handleResize);
      ro.disconnect();
    };
  }, []);

  const formatShort = (val) => {
    if (val == null) return '-';
    if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}K`;
    return `${val}`;
  };

  const maxRevenue = Math.max(...revenueByLocation.map(l => l.amount), 1);

  const dims = (() => {
    if (isMobile) return { padding: 16, mapHeight: 140, titleSize: 'text-base', itemFontSizeClass: 'text-xs' };
    if (containerDimensions.width >= 480 && containerDimensions.width < 768) return { padding: 20, mapHeight: 160, titleSize: 'text-lg', itemFontSizeClass: 'text-sm' };
    return { padding: 24, mapHeight: 120, titleSize: 'text-lg', itemFontSizeClass: 'text-xs' };
  })();

  const getColorScale = () => scaleQuantize().domain([0, maxRevenue]).range(darkMode ? ['#374151', '#60A5FA', '#3B82F6', '#1D4ED8'] : ['#F3F4F6', '#93C5FD', '#60A5FA', '#3B82F6']);

  const containerStyle = {
    padding: dims.padding,
    minWidth: 200,
    maxWidth: 340,
    borderRadius: 16,
    background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff',
    border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)',
    boxSizing: 'border-box'
  };

  return (
    <div ref={containerRef} className="rounded-xl transition-colors duration-200 w-full max-w-sm mx-auto lg:mx-0 flex flex-col" style={containerStyle}>
      <h3 className={`${dims.titleSize} font-semibold leading-tight mb-4`} style={{ color: darkMode ? '#F9FAFB' : '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title="Revenue by Location">
        Revenue by Location
      </h3>

      <div className="mb-4 w-full" style={{ height: dims.mapHeight }}>
        {/* If you have map rendering (nivo) include here. For simpler fallback we show nothing if data isn't available */}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {revenueByLocation.map(location => {
          const percentage = Math.max(0, Math.min(100, (location.amount / maxRevenue) * 100));
          const displayAmount = formatShort(location.amount);
          return (
            <div key={location.city} className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className={`${dims.itemFontSizeClass} font-medium truncate`} style={{ color: darkMode ? '#E5E7EB' : '#374151', maxWidth: '70%' }} title={location.city}>
                  {location.city}
                </div>
                <div className={`${dims.itemFontSizeClass} font-medium`} style={{ color: darkMode ? '#F9FAFB' : '#0F172A', flexShrink: 0 }}>
                  {displayAmount}
                </div>
              </div>

              <div className="relative w-full" aria-hidden="true" style={{ height: 6, borderRadius: 999, background: darkMode ? '#111827' : '#EEF2F7', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', borderRadius: 999, background: darkMode ? '#60A5FA' : '#3B82F6', transition: 'width 300ms ease' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevenueByLocation;
