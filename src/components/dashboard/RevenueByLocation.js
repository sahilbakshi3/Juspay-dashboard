// Fixed RevenueByLocation.js - Consistent card styling
import React, { useContext, useRef, useEffect, useState } from 'react';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RevenueByLocation = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [mapAssets, setMapAssets] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      setContainerDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
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

  useEffect(() => {
    let cancelled = false;
    if (mapAssets !== null || mapLoading) return;

    setMapLoading(true);
    (async () => {
      try {
        const [{ default: countries }, { default: mapData }, nivoModule] = await Promise.all([
          import('../../data/world_countries.json').catch(() => ({ default: null })),
          import('../../data/mapData.js').catch(() => ({ default: null })),
          import('@nivo/geo').catch(() => null),
        ]);

        if (!countries || !mapData || !nivoModule) {
          if (!cancelled) setMapAssets(null);
          return;
        }

        const { ResponsiveChoropleth } = nivoModule;
        if (!cancelled) setMapAssets({ countries, mapData, ResponsiveChoropleth });
      } catch (err) {
        if (!cancelled) setMapAssets(null);
      } finally {
        if (!cancelled) setMapLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatShort = (val) => {
    if (val == null) return '-';
    if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}K`;
    return `${val}`;
  };

  const maxRevenue = Math.max(...revenueByLocation.map((l) => l.amount), 1);

  // Updated color scale with darker cyan colors
  const getColorScale = () =>
    scaleQuantize()
      .domain([0, maxRevenue])
      .range(darkMode 
        ? ['#374151', '#7A98B3', '#5F8AA8', '#4A7B9D'] // Darker cyan variations for dark mode
        : ['#F3F4F6', '#8FA8BD', '#7A98B3', '#5F8AA8'] // Darker cyan variations for light mode
      );

  const canRenderMap = !!mapAssets && containerDimensions.width > 0;

  // Helper function to get a darker shade of the background color
  const getDarkerBackground = () => {
    if (darkMode) {
      // For dark mode, make the background slightly lighter than pure black
      return 'rgba(255, 255, 255, 0.08)'; // Slightly lighter than the card background
    } else {
      // For light mode, use a darker shade of the light background
      return 'rgba(0, 0, 0, 0.08)'; // Slightly darker than white
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full flex flex-col"
      style={{
        minHeight: '300px', // Consistent minimum height
      }}
    >
      <h3
        className={`font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}
        style={{
          color: darkMode ? '#F9FAFB' : '#111827',
        }}
      >
        Revenue by Location
      </h3>

      {/* Map area - consistent height */}
      <div className="mb-6" style={{ height: isMobile ? '140px' : '160px', width: '100%' }}>
        {canRenderMap ? (
          (() => {
            const Choropleth = mapAssets.ResponsiveChoropleth;
            const domainMax = Math.max(...mapAssets.mapData.map((d) => d.value), 1);
            return (
              <Choropleth
                data={mapAssets.mapData}
                features={mapAssets.countries.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors={getColorScale()}
                domain={[0, domainMax]}
                unknownColor={darkMode ? '#374151' : '#F3F4F6'}
                valueFormat=".2s"
                projectionScale={containerDimensions.width < 280 ? 30 : containerDimensions.width < 420 ? 40 : 55}
                projectionTranslation={[0.5, 0.55]}
                projectionRotation={[0, 0, 0]}
                enableGraticule={false}
                borderWidth={0.5}
                borderColor={darkMode ? '#4B5563' : '#D1D5DB'}
                isInteractive={false}
              />
            );
          })()
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkMode ? '#9CA3AF' : '#6B7280',
              fontSize: '13px',
              border: darkMode ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(0,0,0,0.02)',
            }}
          >
            {mapLoading ? 'Loading map...' : 'Map not available'}
          </div>
        )}
      </div>

      {/* List - consistent spacing */}
      <div className="flex-1 space-y-4">
        {revenueByLocation.map((location) => {
          const percentage = Math.max(0, Math.min(100, (location.amount / maxRevenue) * 100));
          const displayAmount = formatShort(location.amount);
          return (
            <div key={location.city} className="space-y-2">
              <div className="flex items-center justify-between">
                <div 
                  className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{ 
                    color: darkMode ? '#E5E7EB' : '#374151',
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {location.city}
                </div>
                <div 
                  className={`font-semibold ${isMobile ? 'text-sm' : 'text-base'}`}
                  style={{ color: darkMode ? '#F9FAFB' : '#0F172A' }}
                >
                  {displayAmount}
                </div>
              </div>

              <div 
                className="w-full bg-gray-200 rounded-full overflow-hidden"
                style={{ 
                  height: '6px',
                  background: getDarkerBackground()
                }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    background: 'var(--Secondary-Cyan, #A8C5DA)'
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
