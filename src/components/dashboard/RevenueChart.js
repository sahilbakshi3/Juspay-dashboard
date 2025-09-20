// src/components/dashboard/RevenueChart.js
import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

function lerp(a, b, t) { return a + (b - a) * t; }

const RevenueChart = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const previousWeek = [51, 50, 57, 68, 60, 54, 34];
  const currentWeek = [44, 55, 62, 37, 66, 58, 58];
  const [tooltip, setTooltip] = useState({ visible: false, clientX: 0, clientY: 0, data: null });
  
  // Calculate totals for legend
  const currentWeekTotal = currentWeek.reduce((sum, val) => sum + val, 0) * 1000; // Convert to actual values
  const previousWeekTotal = previousWeek.reduce((sum, val) => sum + val, 0) * 1000; // Convert to actual values
  
  // Format numbers with commas
  const formatCurrency = (num) => {
    return `$${num.toLocaleString()}`;
  };
  
  // Consistent theme colors
  const theme = {
    text: darkMode ? '#ffffff' : '#1f2937',
    textSecondary: darkMode ? '#9ca3af' : '#6b7280',
    border: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    gridLine: darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)', // Darker grid lines
    currentWeekColor: darkMode ? 'var(--Primary-Brand, #C6C7F8)' : '#1F2937', // Primary Brand in dark mode, dark in light mode
    previousWeekColor: '#A8C5DA', // Cyan color works in both modes
    tooltipBg: darkMode ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)',
    tooltipBorder: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
    partition: 'var(--black-20, #1C1C1C33)' // Partition line color
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width);
    const n = labels.length - 1;
    let idx = Math.floor(x * n);
    idx = Math.max(0, Math.min(n - 1, idx));
    const leftX = idx / n;
    const rightX = (idx + 1) / n;
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
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-3' : 'space-x-4'} mb-6`}>
        <h3 
          className={`font-semibold ${isMobile ? 'text-lg self-start' : 'text-xl'}`}
          style={{ color: theme.text, margin: 0 }}
        >
          Revenue
        </h3>
        
        {/* Partition Line - Only show on desktop */}
        {!isMobile && (
          <div 
            style={{ 
              width: '1px', 
              height: '20px', 
              backgroundColor: theme.partition,
              flexShrink: 0
            }} 
          />
        )}
        
        {/* Legends - Left aligned and inline */}
        <div className={`flex items-center ${isMobile ? 'self-start space-x-6' : 'space-x-6'}`}>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: theme.currentWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className="text-sm"
              style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: 400 }}
            >
              Current Week <span style={{ fontWeight: 700 }}>{formatCurrency(currentWeekTotal)}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              style={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                background: theme.previousWeekColor,
                flexShrink: 0
              }} 
            />
            <span 
              className="text-sm"
              style={{ color: darkMode ? '#ffffff' : '#000000', fontWeight: 400 }}
            >
              Previous Week <span style={{ fontWeight: 700 }}>{formatCurrency(previousWeekTotal)}</span>
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

          {/* SVG Chart with Custom Frame */}
          <div 
            className="w-full h-full relative" 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave} 
            style={{ touchAction: 'none' }}
          >
            {/* Custom SVG Frame */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 542 111" 
              preserveAspectRatio="none"
            >
              <defs>
                <radialGradient id="paint0_radial_47926_1015" cx="0" cy="0" r="1" gradientTransform="matrix(3.03302 57.8733 -238.989 13.1178 246.747 15.4025)" gradientUnits="userSpaceOnUse">
                  <stop/>
                  <stop offset="1" stopColor="#D9D9D9" stopOpacity="0"/>
                </radialGradient>
              </defs>
              
              <mask id="mask0_47926_1015" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="2" y="2" width="538" height="109">
                <rect x="2.08508" y="2.46936" width="537.851" height="107.603" fill="url(#paint0_radial_47926_1015)"/>
              </mask>
              
              <g mask="url(#mask0_47926_1015)">
                <path 
                  opacity="0.2" 
                  d="M189.277 91.4418C96.5415 100.122 44.6724 83.6347 2.23401 62.653V202.674H539.787V22.6416C358.507 8.97914 297.207 81.3396 189.277 91.4418Z" 
                  fill={theme.currentWeekColor}
                />
                <path 
                  opacity="0.4" 
                  d="M215.556 52.0526C105.781 13.6573 24.9031 74.0627 2.23401 94.778V202.674H539.787V2.46936C424.293 47.4027 413.116 121.152 215.556 52.0526Z" 
                  fill={theme.previousWeekColor}
                />
              </g>
              
              {/* Main current week line */}
              <path 
                d="M2.23401 62.653C44.6724 83.6346 96.5415 100.122 189.277 91.4417C243.142 86.4 285.393 65.8511 336.74 48.2278" 
                stroke={theme.currentWeekColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  filter: darkMode 
                    ? 'drop-shadow(0 0 4px rgba(198, 199, 248, 0.8)) drop-shadow(0 0 12px rgba(198, 199, 248, 0.6)) drop-shadow(0 0 20px rgba(198, 199, 248, 0.4)) drop-shadow(0 0 32px rgba(198, 199, 248, 0.2))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
              
              {/* Dashed continuation line */}
              <path 
                d="M539.787 22.6415C449.568 15.842 389.066 30.3489 337.744 47.8841" 
                stroke={theme.currentWeekColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeDasharray="3 10"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  filter: darkMode 
                    ? 'drop-shadow(0 0 4px rgba(198, 199, 248, 0.8)) drop-shadow(0 0 12px rgba(198, 199, 248, 0.6)) drop-shadow(0 0 20px rgba(198, 199, 248, 0.4)) drop-shadow(0 0 32px rgba(198, 199, 248, 0.2))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
              
              {/* Previous week line */}
              <path 
                d="M2.23401 94.778C24.9031 74.0627 105.781 13.6573 215.556 52.0526C413.116 121.152 424.293 47.4027 539.787 2.46936" 
                stroke={theme.previousWeekColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  filter: darkMode 
                    ? 'drop-shadow(0 0 4px rgba(168, 197, 218, 0.8)) drop-shadow(0 0 12px rgba(168, 197, 218, 0.6)) drop-shadow(0 0 20px rgba(168, 197, 218, 0.4)) drop-shadow(0 0 32px rgba(168, 197, 218, 0.2))'
                    : 'none'
                }}
              />
              
              {/* Additional current week segment */}
              <path 
                d="M189.277 91.2978C242.228 86.3417 283.955 66.4007 334.132 48.9841" 
                stroke={theme.currentWeekColor} 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ 
                  filter: darkMode 
                    ? 'drop-shadow(0 0 4px rgba(198, 199, 248, 0.8)) drop-shadow(0 0 12px rgba(198, 199, 248, 0.6)) drop-shadow(0 0 20px rgba(198, 199, 248, 0.4)) drop-shadow(0 0 32px rgba(198, 199, 248, 0.2))'
                    : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
              />
            </svg>
          </div>

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