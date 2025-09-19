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
        top: tooltip.clientY - 35,
        pointerEvents: 'none',
        background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#fff',
        color: darkMode ? '#fff' : '#222',
        border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.08)',
        borderRadius: 6,
        padding: '7px 12px',
        fontSize: '0.95em',
        boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
        zIndex: 99999,
        whiteSpace: 'nowrap'
      }}>
        <div style={{ fontWeight: 600 }}>{label}</div>
        <div>Previous week: {previous}M</div>
        <div>Current week: {current}M</div>
        <div>Diff: {pct}%</div>
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
    <div className="w-full h-full" style={{ minWidth: isMobile ? '300px' : '600px', position: 'relative' }} ref={chartRef}>
      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} mb-2 ${isMobile ? 'space-y-2' : 'space-x-8'}`}>
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} ${isMobile ? 'text-base' : 'text-lg'}`}>Revenue</h3>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'items-center gap-6'} ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <div className="flex items-center gap-2">
            <div style={{ width: 12, height: 12, borderRadius: 6, background: darkMode ? '#3B82F6' : '#60a5fa' }} />
            <span style={{ color: darkMode ? '#cfcfcf' : '#374151' }}>Current Week</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: 12, height: 12, borderRadius: 6, background: darkMode ? '#111827' : '#111827' }} />
            <span style={{ color: darkMode ? '#cfcfcf' : '#374151' }}>Previous Week</span>
          </div>
        </div>
      </div>

      <div className={`flex mt-auto ${isMobile ? 'h-[200px]' : 'h-[240px]'}`}>
        <div className={`flex flex-col justify-between items-end h-full py-2`} style={{ paddingRight: isMobile ? 8 : 12 }}>
          {['80M', '60M', '40M', '20M', '0'].map(v => (
            <span key={v} className={`text-xs`} style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{v}</span>
          ))}
        </div>

        <div className="relative flex-1 border-l border-b min-w-0" style={{ borderLeft: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}`, borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}` }}>
          {['20%', '40%', '60%', '80%'].map((top, idx) => (
            <div key={idx} style={{ position: 'absolute', left: 0, right: 0, top, height: 1, backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)' }} />
          ))}

          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ touchAction: 'none' }}>
            <path d={currentPath} fill="none" stroke={darkMode ? '#3B82F6' : '#60A5FA'} strokeWidth={isMobile ? 2 : 2.5} vectorEffect="non-scaling-stroke" />
            {prevSolidPath && <path d={prevSolidPath} fill="none" stroke={darkMode ? '#C6C7F8' : '#111827'} strokeWidth={isMobile ? 2 : 2.5} vectorEffect="non-scaling-stroke" />}
            {prevDottedPath && <path d={prevDottedPath} fill="none" stroke={darkMode ? '#C6C7F8' : '#111827'} strokeWidth={isMobile ? 2 : 2.5} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />}
          </svg>

          <div className={`absolute left-0 right-0 flex justify-between ${isMobile ? '-bottom-5 px-1' : '-bottom-6 px-2'}`}>
            {labels.map(l => <span key={l} className="text-xs" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{l}</span>)}
          </div>

          {renderTooltip()}
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
