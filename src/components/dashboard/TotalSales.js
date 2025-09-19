import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

// small in-component pie renderer (keeps dependency count low)
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

export default function TotalSales() {
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 300, height: 300 });
  const [isMobile, setIsMobile] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, clientX: 0, clientY: 0, data: null });

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { offsetWidth } = containerRef.current;
      setContainerDimensions({ width: offsetWidth, height: offsetWidth });
      setIsMobile(offsetWidth < 480);
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
  const chartSize = Math.min(160, baseWidth - 80);
  const center = chartSize / 2;
  const outerRadius = Math.max(24, Math.min(60, chartSize / 2));
  const innerRadius = Math.max(10, Math.min(36, outerRadius - 12));
  const totalAmount = pieData.reduce((s, p) => s + p.amount, 0);

  // compute angles
  let acc = 0;
  const angles = pieData.map(p => {
    const s = acc;
    const e = acc + (p.amount / totalAmount) * 360;
    acc = e;
    return [s, e];
  });

  const onSliceEnter = (e, item) => setTooltip({ visible: true, clientX: e.clientX, clientY: e.clientY, data: item });
  const onSliceMove = (e) => setTooltip(t => t.visible ? ({ ...t, clientX: e.clientX, clientY: e.clientY }) : t);
  const onSliceLeave = () => setTooltip({ visible: false, clientX: 0, clientY: 0, data: null });

  return (
    <div ref={containerRef} className="rounded-xl transition-colors duration-200" style={{
      width: '100%',
      height: '100%',
      minWidth: '200px',
      minHeight: isMobile ? '320px' : '344px',
      padding: 24,
      borderRadius: 16,
      background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff',
      border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, marginBottom: 12, color: darkMode ? '#F3F4F6' : '#111827' }}>
        Total Sales
      </h3>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        <div style={{ width: chartSize, height: chartSize, position: 'relative' }}>
          <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`} style={{ display: 'block' }}>
            {angles.map(([start, end], i) => (
              <path
                key={i}
                d={createArcPath(start, end, outerRadius, center)}
                fill={COLORS[i % COLORS.length]}
                stroke={darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff'}
                strokeWidth={1}
              />
            ))}
            {/* center */}
            <circle cx={center} cy={center} r={innerRadius} fill={darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff'} stroke={darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} strokeWidth={1} />
          </svg>

          {/* invisible interactive arcs for pointer events */}
          <svg width={chartSize} height={chartSize} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }}>
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
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: 13,
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

      <div className="flex flex-col gap-2">
        {pieData.map((item, i) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  backgroundColor: (darkMode ? COLORS_DARK : COLORS_LIGHT)[i],
                }}
              />
              <span
                style={{
                  fontSize: '12px', // ✅ smaller font size
                  color: darkMode ? '#cfcfcf' : '#374151',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.type}
              </span>
            </div>
            <span
              style={{
                fontSize: '12px', // ✅ smaller for value as well
                fontWeight: 600,
                color: darkMode ? '#F3F4F6' : '#111827',
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
