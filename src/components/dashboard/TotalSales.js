// TotalSales.js with Figma SVG pie chart
import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

// Define colors to match the SVG segments
const getColors = (darkMode) => [
  '#C6C7F8', // Direct - matches first SVG path
  '#95A4FC', // Affiliate - matches second SVG path
  '#B1E3FF', // Sponsored - matches third SVG path  
  '#BAEDBD'  // E-mail - matches fourth SVG path
];

export default function TotalSales({ isMobile = false }) {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 300, height: 300 });
  const [tooltip, setTooltip] = useState({ visible: false, clientX: 0, clientY: 0, data: null });

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerDimensions({ width: offsetWidth, height: offsetHeight });
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

  const COLORS = getColors(darkMode);
  const totalAmount = pieData.reduce((s, p) => s + p.amount, 0);

  const onSegmentEnter = (e, item) => setTooltip({ 
    visible: true, 
    clientX: e.clientX, 
    clientY: e.clientY, 
    data: item 
  });
  
  const onSegmentMove = (e) => setTooltip(t => t.visible ? ({ 
    ...t, 
    clientX: e.clientX, 
    clientY: e.clientY 
  }) : t);
  
  const onSegmentLeave = () => setTooltip({ 
    visible: false, 
    clientX: 0, 
    clientY: 0, 
    data: null 
  });

  // Calculate responsive size for the SVG
  const baseWidth = containerDimensions.width || 240;
  const chartSize = Math.min(180, Math.max(140, baseWidth - 60));

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col">
      <h3 
        className={`font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}
        style={{ color: darkMode ? '#F9FAFB' : '#111827' }}
      >
        Total Sales
      </h3>

      <div className="flex justify-center mb-6 flex-1">
        <div style={{ width: chartSize, height: chartSize, position: 'relative' }}>
          {/* Figma SVG Pie Chart */}
          <svg 
            width={chartSize} 
            height={chartSize} 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: 'pointer' }}
          >
            {/* Direct segment */}
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M104.67 19.9323C100.925 15.7481 94.5122 15.406 90.347 19.1681C86.1818 22.9302 85.8411 29.372 89.5862 33.5562C95.8915 40.6008 99.7159 49.895 99.7159 60.1106C99.7159 75.22 91.3206 88.3596 78.9604 95.079C82.6329 96.7797 85.561 100.036 86.7151 104.261C87.6887 107.824 87.2269 111.443 85.6817 114.496C105.965 104.874 120 84.139 120 60.1106C120 44.6722 114.193 30.5722 104.67 19.9323Z" 
              fill="#C6C7F8"
              style={{ transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
                onSegmentEnter(e, { 
                  label: pieData[0].type, 
                  amount: pieData[0].amount 
                });
              }}
              onMouseMove={onSegmentMove}
              onMouseLeave={(e) => {
                e.target.style.filter = 'none';
                onSegmentLeave();
              }}
            />
            
            {/* Affiliate segment */}
            <path 
              d="M36.9918 27.4926C43.3945 23.0062 51.1699 20.3765 59.5871 20.3765C68.0043 20.3765 75.7798 23.0062 82.1825 27.4926C82.3342 27.5989 82.4877 27.7005 82.643 27.7973C82.3329 23.5486 83.9128 19.2063 87.3104 16.1376C89.73 13.9521 92.6913 12.756 95.7028 12.5229C95.1532 11.8765 94.5134 11.2892 93.7869 10.7801C84.0906 3.98588 72.287 0 59.5871 0C46.8872 0 35.0837 3.98588 25.3873 10.7801C20.7932 13.9992 19.6667 20.35 22.8712 24.9651C26.0757 29.5801 32.3977 30.7117 36.9918 27.4926Z" 
              fill="#95A4FC"
              style={{ transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
                onSegmentEnter(e, { 
                  label: pieData[1].type, 
                  amount: pieData[1].amount 
                });
              }}
              onMouseMove={onSegmentMove}
              onMouseLeave={(e) => {
                e.target.style.filter = 'none';
                onSegmentLeave();
              }}
            />
            
            {/* Sponsored segment */}
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M17.0121 18.3464C16.367 18.7927 15.7635 19.3216 15.2168 19.9324C10.6473 25.0377 6.93145 30.94 4.30211 37.4135C2.18604 42.6234 4.67487 48.57 9.86107 50.6957C15.0473 52.8215 20.9669 50.3213 23.083 45.1114C24.816 40.8447 27.2708 36.941 30.3004 33.5562C30.3521 33.4984 30.4031 33.4401 30.4533 33.3814C26.2306 33.1582 22.1506 31.0505 19.5441 27.2966C17.6541 24.5746 16.8402 21.4214 17.0121 18.3464Z" 
              fill="#B1E3FF"
              style={{ transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
                onSegmentEnter(e, { 
                  label: pieData[2].type, 
                  amount: pieData[2].amount 
                });
              }}
              onMouseMove={onSegmentMove}
              onMouseLeave={(e) => {
                e.target.style.filter = 'none';
                onSegmentLeave();
              }}
            />
            
            {/* E-mail segment */}
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M1.81254 47.2351C3.26614 50.4036 5.87327 53.0469 9.34258 54.4689C13.1587 56.0331 17.2585 55.8082 20.7197 54.1838C20.4333 56.1121 20.2841 58.0908 20.2841 60.1106C20.2841 72.964 26.3595 84.392 35.7831 91.6547C36.2843 91.894 36.7726 92.1779 37.2428 92.5073C43.6455 96.9937 51.4209 99.6235 59.8382 99.6235C63.4875 99.6235 67.0059 99.1297 70.3383 98.2109C75.7398 96.7216 81.3205 99.913 82.803 105.339C84.2856 110.765 81.1086 116.371 75.7071 117.861C70.6418 119.257 65.3183 120 59.8382 120C56.1352 120 52.5085 119.661 48.988 119.013C49.0629 119.102 49.1388 119.19 49.2158 119.277C21.2354 114.241 0 89.6672 0 60.1106C0 56.7798 0.270663 53.505 0.793098 50.3091C0.973374 49.2062 1.32363 48.1741 1.81254 47.2351Z" 
              fill="#BAEDBD"
              style={{ transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
                onSegmentEnter(e, { 
                  label: pieData[3].type, 
                  amount: pieData[3].amount 
                });
              }}
              onMouseMove={onSegmentMove}
              onMouseLeave={(e) => {
                e.target.style.filter = 'none';
                onSegmentLeave();
              }}
            />
          </svg>
        </div>

        {/* Tooltip */}
        {tooltip.visible && tooltip.data && createPortal(
          <div style={{
            position: 'fixed',
            left: tooltip.clientX + 12,
            top: tooltip.clientY - 35,
            pointerEvents: 'none',
            background: darkMode ? '#374151' : '#fff',
            color: darkMode ? '#fff' : '#222',
            border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            padding: '8px 12px',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 99999,
            whiteSpace: 'nowrap'
          }}>
            <div style={{ fontWeight: 600 }}>{tooltip.data.label}</div>
            <div style={{ opacity: 0.8 }}>Amount: ${tooltip.data.amount.toFixed(2)}</div>
            <div style={{ opacity: 0.8 }}>Percent: {((tooltip.data.amount / totalAmount) * 100).toFixed(1)}%</div>
          </div>,
          document.body
        )}
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {pieData.map((item, i) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: COLORS[i],
                  flexShrink: 0,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <span
                className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}
                style={{
                  color: darkMode ? '#E5E7EB' : '#374151',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.type}
              </span>
            </div>
            <span
              className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold`}
              style={{
                color: darkMode ? '#F9FAFB' : '#111827',
                flexShrink: 0,
                marginLeft: '12px'
              }}
            >
              ${item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}