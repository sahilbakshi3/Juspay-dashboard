// Fixed Modern Donut Chart TotalSales.js - Proper rounded segments
import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

// Define colors with consistent Direct color for both modes
const getColors = (darkMode) => [
  darkMode ? '#C6C7F8' : '#1F2937', // Direct - brand color in dark mode, dark gray in light mode
  '#BBF7D0', // Affiliate - light green
  '#BAE6FD', // Sponsored - light blue
  '#A5B4FC'  // E-mail - light purple
];

// Get center circle color to match card background
const getCenterColor = (darkMode) => {
  return darkMode ? '#1F2937' : '#FFFFFF'; // Match card background colors
};

// Create proper donut segment path with rounded ends
function createRoundedDonutPath(startAngle, endAngle, outerRadius, innerRadius, center) {
  const rad = Math.PI / 180;
  
  // Calculate arc points
  const startOuterX = center + outerRadius * Math.cos(rad * (startAngle - 90));
  const startOuterY = center + outerRadius * Math.sin(rad * (startAngle - 90));
  const endOuterX = center + outerRadius * Math.cos(rad * (endAngle - 90));
  const endOuterY = center + outerRadius * Math.sin(rad * (endAngle - 90));
  
  const startInnerX = center + innerRadius * Math.cos(rad * (startAngle - 90));
  const startInnerY = center + innerRadius * Math.sin(rad * (startAngle - 90));
  const endInnerX = center + innerRadius * Math.cos(rad * (endAngle - 90));
  const endInnerY = center + innerRadius * Math.sin(rad * (endAngle - 90));
  
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  // Create path with rounded ends
  return `
    M ${startInnerX} ${startInnerY}
    L ${startOuterX} ${startOuterY}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
    L ${endInnerX} ${endInnerY}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}
    Z
  `;
}

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
  const centerColor = getCenterColor(darkMode);
  const baseWidth = containerDimensions.width || 240;
  const chartSize = Math.min(180, Math.max(140, baseWidth - 60));
  const center = chartSize / 2;
  const outerRadius = Math.max(55, Math.min(75, chartSize / 2 - 15));
  const innerRadius = Math.max(35, Math.min(45, outerRadius - 20));
  const totalAmount = pieData.reduce((s, p) => s + p.amount, 0);

  // Add small gaps between segments (3 degrees each)
  const gapDegrees = 3;
  const totalGaps = pieData.length * gapDegrees;
  const availableDegrees = 360 - totalGaps;

  let currentAngle = 0;
  const segments = pieData.map((item, index) => {
    const segmentDegrees = (item.amount / totalAmount) * availableDegrees;
    const startAngle = currentAngle;
    const endAngle = currentAngle + segmentDegrees;
    
    const path = createRoundedDonutPath(startAngle, endAngle, outerRadius, innerRadius, center);
    
    currentAngle = endAngle + gapDegrees; // Add gap after each segment
    
    return {
      ...item,
      path,
      startAngle,
      endAngle,
      color: COLORS[index]
    };
  });

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
          <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
            {/* Donut segments with rounded corners */}
            {segments.map((segment, i) => (
              <path
                key={i}
                d={segment.path}
                fill={segment.color}
                style={{
                  cursor: 'pointer',
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.transformOrigin = `${center}px ${center}px`;
                  onSegmentEnter(e, { 
                    label: segment.type, 
                    amount: segment.amount 
                  });
                }}
                onMouseMove={onSegmentMove}
                onMouseLeave={(e) => {
                  e.target.style.filter = 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))';
                  e.target.style.transform = 'scale(1)';
                  onSegmentLeave();
                }}
              />
            ))}
            
            {/* Center circle to match background */}
            <circle 
              cx={center} 
              cy={center} 
              r={innerRadius + 2}
              fill={centerColor}
              stroke="none"
            />
          </svg>
        </div>

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