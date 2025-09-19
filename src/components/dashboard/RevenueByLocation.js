// src/components/dashboard/RevenueByLocation.js
import React, { useContext, useRef, useEffect, useState } from 'react';
import { scaleQuantize } from 'd3-scale';
import { revenueByLocation } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

/**
 * RevenueByLocation
 *
 * - Dynamically imports world_countries.json, mapData.js and @nivo/geo
 * - Renders a ResponsiveChoropleth when available
 * - Falls back to a placeholder if any dependency is missing
 *
 * To enable the map:
 *  - add data/world_countries.json (GeoJSON)
 *  - add data/mapData.js (export default [...{ id: '<ISO_A3>', value: number }])
 *  - install @nivo/geo + peer deps: npm i @nivo/geo d3-geo topojson-client
 */

const RevenueByLocation = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });

  // map runtime state: null = not loaded or failed, object = loaded
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

  // Try to dynamically import the map data + nivo once
  useEffect(() => {
    let cancelled = false;
    if (mapAssets !== null || mapLoading) return;

    setMapLoading(true);
    (async () => {
      try {
        // dynamic imports; catch to return null if not present
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
        // swallow and fallback gracefully
        if (!cancelled) setMapAssets(null);
      } finally {
        if (!cancelled) setMapLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatShort = (val) => {
    if (val == null) return '-';
    if (Math.abs(val) >= 1000) return `${Math.round(val / 1000)}K`;
    return `${val}`;
  };

  const maxRevenue = Math.max(...revenueByLocation.map((l) => l.amount), 1);

  // Keep the card spacing and sizing consistent (24px padding requested)
  const dims = (() => {
    if (isMobile) return { padding: 16, mapHeight: 140, titleSize: 'text-base', itemFontSizeClass: 'text-xs' };
    if (containerDimensions.width >= 480 && containerDimensions.width < 768)
      return { padding: 20, mapHeight: 160, titleSize: 'text-lg', itemFontSizeClass: 'text-sm' };
    return { padding: 24, mapHeight: 120, titleSize: 'text-lg', itemFontSizeClass: 'text-xs' };
  })();

  const getColorScale = () =>
    scaleQuantize()
      .domain([0, maxRevenue])
      .range(darkMode ? ['#374151', '#60A5FA', '#3B82F6', '#1D4ED8'] : ['#F3F4F6', '#93C5FD', '#60A5FA', '#3B82F6']);

  // Container style uses requested radius 16px, padding 24px (or dims.padding), border visible in light mode
  const containerStyle = {
    padding: dims.padding,
    minWidth: 200,
    maxWidth: 340,
    borderRadius: 16,
    background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff',
    border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 16, // requested gap
  };

  const canRenderMap = !!mapAssets && containerDimensions.width > 0;

  return (
    <div ref={containerRef} className="transition-colors duration-200 w-full max-w-sm mx-auto lg:mx-0" style={containerStyle}>
      <h3
        className={`${dims.titleSize} font-semibold leading-tight`}
        style={{
          color: darkMode ? '#F9FAFB' : '#111827',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title="Revenue by Location"
      >
        Revenue by Location
      </h3>

      {/* Map area */}
      <div style={{ height: dims.mapHeight, width: '100%' }}>
        {canRenderMap ? (
          // Render the nivo choropleth dynamically (mapAssets.ResponsiveChoropleth is the component)
          // Note: ResponsiveChoropleth is stored in mapAssets, so JSX must reference it as a variable
          (() => {
            const Choropleth = mapAssets.ResponsiveChoropleth;
            // domain based on provided mapData
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
          // placeholder / graceful fallback
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: darkMode ? 'rgba(255,255,255,0.02)' : '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: darkMode ? '#cfcfcf' : '#9ca3af',
              fontSize: 13,
              border: darkMode ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(0,0,0,0.02)',
            }}
          >
            {mapLoading ? 'Loading map...' : 'Map not available'}
          </div>
        )}
      </div>

      {/* List below the map: bars and labels */}
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {revenueByLocation.map((location) => {
          const percentage = Math.max(0, Math.min(100, (location.amount / maxRevenue) * 100));
          const displayAmount = formatShort(location.amount);
          return (
            <div key={location.city} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ color: darkMode ? '#E5E7EB' : '#374151', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                  {location.city}
                </div>
                <div style={{ color: darkMode ? '#F9FAFB' : '#0F172A', fontWeight: 500, flexShrink: 0 }}>
                  {displayAmount}
                </div>
              </div>

              <div aria-hidden="true" style={{ height: 6, borderRadius: 999, background: darkMode ? '#111827' : '#EEF2F7', overflow: 'hidden' }}>
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
