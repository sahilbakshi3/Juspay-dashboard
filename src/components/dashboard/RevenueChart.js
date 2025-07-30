import React, { useContext, useRef, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

// Smooth path generator (catmull-rom spline to cubic bezier)
function smoothPath(dataArr, chartWidth = 100, chartHeight = 100, yMax = 80, yMin = 0) {
  const n = dataArr.length;
  const step = chartWidth / (n - 1);
  const pts = dataArr.map((v, i) => [
    i * step,
    chartHeight - ((v - yMin) / (yMax - yMin)) * chartHeight
  ]);
  if (pts.length < 3) {
    return `M ${pts[0][0]},${pts[0][1]} L ${pts[1][0]},${pts[1][1]}`;
  }
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i === 0 ? i : i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2 === pts.length ? pts.length - 1 : i + 2];
    const control1X = p1[0] + (p2[0] - p0[0]) / 6;
    const control1Y = p1[1] + (p2[1] - p0[1]) / 6;
    const control2X = p2[0] - (p3[0] - p1[0]) / 6;
    const control2Y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${control1X},${control1Y} ${control2X},${control2Y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const RevenueChart = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const previousWeek = [51, 50, 57, 68, 60, 54, 34];
  const currentWeek = [44, 55, 62, 37, 66, 58, 58];

  const [tooltip, setTooltip] = useState({
    visible: false,
    clientX: 0,
    clientY: 0,
    data: null,
  });

  const CHART_W = 100, CHART_H = 100, Y_MAX = 80, Y_MIN = 0;

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CHART_W;
    const n = labels.length - 1;
    let idx = Math.floor((x / CHART_W) * n);
    idx = Math.max(0, Math.min(n - 1, idx));
    const leftX = (idx / n) * CHART_W;
    const rightX = ((idx + 1) / n) * CHART_W;
    const t = rightX !== leftX ? (x - leftX) / (rightX - leftX) : 0;
    const prevVal = lerp(previousWeek[idx], previousWeek[idx + 1], t).toFixed(1);
    const currVal = lerp(currentWeek[idx], currentWeek[idx + 1], t).toFixed(1);
    const pct = prevVal !== "0.0"
      ? (((currVal - prevVal) / prevVal) * 100).toFixed(1)
      : 'N/A';
    const displayLabel = t < 0.5 ? labels[idx] : labels[idx + 1];
    setTooltip({
      visible: true,
      clientX: e.clientX,
      clientY: e.clientY,
      data: { label: displayLabel, previous: prevVal, current: currVal, pct },
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, clientX: 0, clientY: 0, data: null });
  };

  const renderTooltip = () => {
    if (!(tooltip.visible && tooltip.data)) return null;
    const { previous, current, pct, label } = tooltip.data;
    return createPortal(
      <div
        style={{
          position: 'fixed',
          left: tooltip.clientX + 12,
          top: tooltip.clientY - 35,
          pointerEvents: 'none',
          background: darkMode ? '#24293f' : '#fff',
          color: darkMode ? '#fff' : '#222',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '7px 13px',
          fontSize: '0.95em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          zIndex: 99999,
          minWidth: 120,
        }}
      >
        <div>{label}</div>
        <div>Previous week: {previous}M</div>
        <div>Current week: {current}M</div>
        <div>Diff: {pct}%</div>
      </div>,
      document.body
    );
  };

  return (
    <div
      className="w-full h-full"
      style={{ minWidth: isMobile ? '300px' : '600px', position: 'relative' }}
      ref={chartRef}
    >
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} mb-2 ${isMobile ? 'space-y-2' : 'space-x-8'}`}>
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} ${isMobile ? 'text-base' : 'text-lg'}`}>Revenue</h3>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-6'} ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-400'}`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Current Week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-800'}`}></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Previous Week</span>
          </div>
        </div>
      </div>
      <div className={`flex mt-auto ${isMobile ? 'h-[200px]' : 'h-[240px]'}`}>
        <div className={`flex flex-col justify-between items-end h-full py-2 ${isMobile ? 'pr-2' : 'pr-3'}`}>
          {['80M', '60M', '40M', '20M', '0'].map((value) => (
            <span key={value} className={`${isMobile ? 'text-xs' : 'text-xs'} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {value}
            </span>
          ))}
        </div>
        <div className="relative flex-1 border-l border-b border-gray-300 min-w-0">
          {/* Grid lines */}
          {['20%', '40%', '60%', '80%'].map((top, idx) => (
            <div
              key={idx}
              className="absolute left-0 w-full h-px"
              style={{
                top,
                backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'
              }}
            />
          ))}
          {/* Chart lines */}
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ touchAction: 'none' }}
          >
            <path
              d={smoothPath(currentWeek, 100, 100, 80, 0)}
              fill="none"
              stroke={darkMode ? '#3B82F6' : '#60A5FA'}
              strokeWidth={isMobile ? "2" : "2.5"}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={smoothPath(previousWeek, 100, 100, 80, 0)}
              fill="none"
              stroke={darkMode ? '#9CA3AF' : '#1F2937'}
              strokeWidth={isMobile ? "2" : "2.5"}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* X-axis labels */}
          <div className={`absolute left-0 right-0 flex justify-between ${isMobile ? '-bottom-5 px-1' : '-bottom-6 px-2'}`}>
            {labels.map((label) => (
              <span key={label} className={`${isMobile ? 'text-xs' : 'text-xs'} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {label}
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
