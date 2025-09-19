// Fixed TotalSales.js - Consistent styling with other cards
import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

const COLORS_LIGHT = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];
const COLORS_DARK = ['#C6C7F8', '#BBF7D0', '#BAE6FD', '#A5B4FC'];

function createArcPath(startAngle, endAngle, radius, center) {
  const rad = Math.PI / 180;
  const startX = center + radius * Math.cos(rad * (startAngle - 90));
  const startY = center + radius * Math.sin(rad * (startAngle - 90));
  const endX = center + radius * Math.cos(rad * (endAngle - 90));
  const endY = center + radius * Math.sin(rad * (endAngle - 90));
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M${center},${center} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
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

  const COLORS = darkMode ? COLORS_DARK : COLORS_LIGHT;
  const baseWidth = containerDimensions.width || 240;
  const chartSize = Math.min(160, Math.max(120, baseWidth - 80));
  const center = chartSize / 2;
  const outerRadius = Math.max(48, Math.min(65, chartSize / 2 - 10));
  const innerRadius = Math.max(24, Math.min(32, outerRadius - 16));
  const totalAmount = pieData.reduce((s, p) => s + p.amount, 0);

  let acc = 0;
  const angles = pieData.map(p => {
    const s = acc;
    const e = acc + (p.amount / totalAmount) * 360;
    acc = e;
    return [s, e];
  });

  const onSliceEnter = (e, item) => setTooltip({ 
    visible: true, 
    clientX: e.clientX, 
    clientY: e.clientY, 
    data: item 
  });
  
  const onSliceMove = (e) => setTooltip(t => t.visible ? ({ 
    ...t, 
    clientX: e.clientX, 
    clientY: e.clientY 
  }) : t);
  
  const onSliceLeave = () => setTooltip({ 
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
            {angles.map(([start, end], i) => (
              <path
                key={i}
                d={createArcPath(start, end, outerRadius, center)}
                fill={COLORS[i % COLORS.length]}
                stroke={darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff'}
                strokeWidth={1}
              />
            ))}
            <circle 
              cx={center} 
              cy={center} 
              r={innerRadius} 
              fill={darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff'} 
              stroke={darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} 
              strokeWidth={1} 
            />
          </svg>

          <svg 
            width={chartSize} 
            height={chartSize} 
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}
          >
            {angles.map(([start, end], i) => (
              <path
                key={`hit-${i}`}
                d={createArcPath(start, end, outerRadius, center)}
                fill="transparent"
                stroke="transparent"
                strokeWidth={10}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => onSliceEnter(e, { label: pieData[i].type, amount: pieData[i].amount })}
                onMouseMove={onSliceMove}
                onMouseLeave={onSliceLeave}
              />
            ))}
          </svg>
        </div>

        {tooltip.visible && tooltip.data && createPortal(
          <div style={{
            position: 'fixed',
            left: tooltip.clientX + 12,
            top: tooltip.clientY - 35,
            pointerEvents: 'none',
            background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#fff',
            color: darkMode ? '#fff' : '#222',
            border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.08)',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.24)',
            zIndex: 99999,
            whiteSpace: 'nowrap'
          }}>
            <div style={{ fontWeight: 700 }}>{tooltip.data.label}</div>
            <div>Amount: ${tooltip.data.amount.toFixed(2)}</div>
            <div>Percent: {((tooltip.data.amount / totalAmount) * 100).toFixed(1)}%</div>
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
                  flexShrink: 0
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