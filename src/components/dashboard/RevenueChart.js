// src/components/dashboard/RevenueChart.js
import React, { useContext, useRef, useState, useMemo } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

// helper fns (same as in your original)
function smoothPathFromPoints(pts) {
  if (!pts || pts.length === 0) return '';
  if (pts.length === 1) return `M ${pts[0][0]},${pts[0][1]}`;
  if (pts.length === 2) return `M ${pts[0][0]},${pts[0][1]} L ${pts[1][0]},${pts[1][1]}`;
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];
    const control1X = p1[0] + (p2[0] - p0[0]) / 6;
    const control1Y = p1[1] + (p2[1] - p0[1]) / 6;
    const control2X = p2[0] - (p3[0] - p1[0]) / 6;
    const control2Y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${control1X},${control1Y} ${control2X},${control2Y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function buildPoints(dataArr, chartWidth = 100, chartHeight = 100, yMax = 80, yMin = 0) {
  const n = dataArr.length;
  const step = chartWidth / (n - 1);
  return dataArr.map((v, i) => [i * step, chartHeight - ((v - yMin) / (yMax - yMin)) * chartHeight]);
}

function segmentPath(pts, startIdx, endIdx) {
  startIdx = Math.max(0, startIdx);
  endIdx = Math.min(pts.length - 1, endIdx);
  if (startIdx >= endIdx) return '';
  let d = `M ${pts[startIdx][0]},${pts[startIdx][1]}`;
  for (let i = startIdx; i < endIdx; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 >= pts.length ? pts.length - 1 : i + 2];
    const control1X = p1[0] + (p2[0] - p0[0]) / 6;
    const control1Y = p1[1] + (p2[1] - p0[1]) / 6;
    const control2X = p2[0] - (p3[0] - p1[0]) / 6;
    const control2Y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${control1X},${control1Y} ${control2X},${control2Y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function lerp(a, b, t) { return a + (b - a) * t; }

const RevenueChart = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const previousWeek = [51, 50, 57, 68, 60, 54, 34];
  const currentWeek = [44, 55, 62, 37, 66, 58, 58];
  const [tooltip, setTooltip] = useState({ visible: false, clientX: 0, clientY: 0, data: null });

  const CHART_W = 100, CHART_H = 100, Y_MAX = 80, Y_MIN = 0;
  
  // Consistent theme colors
  const theme = {
    text: darkMode ? '#ffffff' : '#1f2937',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    border: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    gridLine: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    currentWeekColor: darkMode ? '#3b82f6' : '#2563eb',
    previousWeekColor: darkMode ? '#6b7280' : '#374151',
    tooltipBg: darkMode ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)',
    tooltipBorder: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CHART_W;
    const n = labels.length - 1;
    let idx = Math.floor((x / CHART_W) * n);
    idx = Math.max(0, Math.min(n - 1, idx));
    const leftX = (idx / n) * CHART_W;
    const rightX = ((idx + 1) / n) * CHART_W;
    const t = rightX !== leftX ? (x - leftX) / (rightX - leftX) : 0;
    const prevVal = lerp(previousWeek[idx], previousWeek[idx + 1], t).toFixed(1);
    const currVal = lerp(currentWeek[idx], currentWeek[idx + 1], t).toFixed(1);
    const pct = prevVal !== "0.0" ? (((currVal - prevVal) / prevVal) * 100).toFixed(1) : 'N/A';
    const displayLabel = t < 0.5 ? labels[idx] : labels[idx + 1];
    setTooltip({ visible: true, clientX: e.clientX, clientY: e.clientY, data: { label: displayLabel, previous: prevVal, current: currVal, pct } });
  };

  const handleMouseLeave = () => setTooltip({ visible: false, clientX: 0, clientY: 0, data: null });

  const renderTooltip = () => {
    if (!(tooltip.visible && tooltip.data)) return null;
    const { previous, current, pct, label } = tooltip.data;
    return createPortal(
      <div style={{
        position: 'fixed',
        left: tooltip.clientX + 12,
        top: tooltip.clientY - 45,
        pointerEvents: 'none',
        background: theme.tooltipBg,
        color: theme.text,
        border: `1px solid ${theme.tooltipBorder}`,
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: isMobile ? '12px' : '13px',
        boxShadow: darkMode 
          ? '0 8px 24px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.2)' 
          : '0 8px 24px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1)',
        zIndex: 99999,
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(8px)',
        lineHeight: 1.4
      }}>
        <div style={{ fontWeight: 600, marginBottom: '2px' }}>{label}</div>
        <div style={{ color: theme.textSecondary }}>Previous: {previous}M</div>
        <div style={{ color: theme.textSecondary }}>Current: {current}M</div>
        <div style={{ color: theme.textSecondary }}>Change: {pct}%</div>
      </div>,
      document.body
    );
  };

  const prevPts = useMemo(() => buildPoints(previousWeek, CHART_W, CHART_H, Y_MAX, Y_MIN), []);
  const currPts = useMemo(() => buildPoints(currentWeek, CHART_W, CHART_H, Y_MAX, Y_MIN), []);
  const splitIndex = 4;
  const currentPath = useMemo(() => smoothPathFromPoints(currPts), [currPts]);
  const prevSolidPath = useMemo(() => {
    const lastIdx = prevPts.length - 1;
    if (splitIndex <= 0) return '';
    if (splitIndex >= lastIdx) return smoothPathFromPoints(prevPts);
    return segmentPath(prevPts, 0, splitIndex);
  }, [prevPts]);
  const prevDottedPath = useMemo(() => {
    const lastIdx = prevPts.length - 1;
    if (splitIndex < 0 || splitIndex >= lastIdx) return '';
    return segmentPath(prevPts, splitIndex, lastIdx);
  }, [prevPts]);

  return (
    <div 
      className="w-full h-full" 
      style={{ 
        minWidth: isMobile ? '300px' : '600px', 
        position: 'relative',
        padding: isMobile ? '16px' : '20px',
        background: 'var(--Primary-Light, #FFFFFF0D)',
        borderRadius: '8px'
      }} 
      ref={chartRef}
    >
      {/* Header Section */}
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-between'} mb-6`}>
        <h3 
          className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}
          style={{ color: theme.text, margin: 0 }}
        >
          Revenue
        </h3>
        <div className={`flex ${isMobile ? 'flex-row justify-start space-x-6' : 'items-center space-x-6'}`}>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 12, 
                height: 12, 
                borderRadius: 6, 
                background: theme.currentWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className={isMobile ? 'text-sm' : 'text-sm'}
              style={{ color: theme.textSecondary }}
            >
              Current Week
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 12, 
                height: 12, 
                borderRadius: 6, 
                background: theme.previousWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className={isMobile ? 'text-sm' : 'text-sm'}
              style={{ color: theme.textSecondary }}
            >
              Previous Week
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className={`flex ${isMobile ? 'h-[220px]' : 'h-[280px]'}`}>
        {/* Y-axis labels */}
        <div 
          className="flex flex-col justify-between items-end h-full"
          style={{ 
            paddingRight: isMobile ? 12 : 16,
            paddingTop: isMobile ? 8 : 12,
            paddingBottom: isMobile ? 24 : 32
          }}
        >
          {['80M', '60M', '40M', '20M', '0'].map(v => (
            <span 
              key={v} 
              className="text-xs"
              style={{ color: theme.textSecondary, fontWeight: 500 }}
            >
              {v}
            </span>
          ))}
        </div>

        {/* Chart container */}
        <div
          className="relative flex-1 min-w-0"
          style={{
            borderLeft: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
            paddingTop: isMobile ? 8 : 12,
            paddingBottom: isMobile ? 24 : 32,
            paddingLeft: 1,
            boxSizing: 'border-box'
          }}
        >
          {/* Grid lines */}
          {['20%', '40%', '60%', '80%'].map((top, idx) => (
            <div 
              key={idx} 
              style={{ 
                position: 'absolute', 
                left: 0, 
                right: 0, 
                top, 
                height: 1, 
                backgroundColor: theme.gridLine 
              }} 
            />
          ))}

          {/* SVG Chart */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave} 
            style={{ touchAction: 'none' }}
          >
            {/* Current week line */}
            <path 
              d={currentPath} 
              fill="none" 
              stroke={theme.currentWeekColor} 
              strokeWidth="2.5" 
              vectorEffect="non-scaling-stroke"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
            />
            {/* Previous week solid line */}
            {prevSolidPath && (
              <path 
                d={prevSolidPath} 
                fill="none" 
                stroke={theme.previousWeekColor} 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke" 
              />
            )}
            {/* Previous week dotted line */}
            {prevDottedPath && (
              <path 
                d={prevDottedPath} 
                fill="none" 
                stroke={theme.previousWeekColor} 
                strokeWidth="2.5" 
                strokeDasharray="4 4" 
                vectorEffect="non-scaling-stroke" 
              />
            )}
          </svg>

          {/* X-axis labels */}
          <div 
            className={`absolute left-0 right-0 flex justify-between ${isMobile ? '-bottom-6' : '-bottom-8'}`}
            style={{ paddingLeft: 2, paddingRight: 2 }}
          >
            {labels.map(l => (
              <span 
                key={l} 
                className="text-xs"
                style={{ color: theme.textSecondary, fontWeight: 500 }}
              >
                {l}
              </span>
            ))}
          </div>

          {renderTooltip()}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
