import React, { useContext, useRef, useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom';

const COLORS_LIGHT = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];
const COLORS_DARK = ['#C6C7F8', '#BBF7D0', '#BAE6FD', '#A5B4FC'];

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

export default function TotalSales() {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Tooltip state
  const [tooltip, setTooltip] = useState({
    visible: false,
    clientX: 0,
    clientY: 0,
    data: null
  });

  // Responsive sizing and updates
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const isMobileView = offsetWidth < 480;
        setContainerDimensions({ width: offsetWidth, height: offsetHeight });
        setIsMobile(isMobileView);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const COLORS = darkMode ? COLORS_DARK : COLORS_LIGHT;

  // Responsive layout logic (unchanged)
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return {
        width: '100%',
        minWidth: '280px',
        maxWidth: '100%',
        height: 'auto',
        minHeight: '320px',
        padding: '16px',
        chartSize: Math.min(140, containerDimensions.width - 80),
        titleSize: 'text-base',
        itemFontSize: 'text-xs',
        innerRadius: 25,
        outerRadius: Math.min(60, (containerDimensions.width - 80) / 2.5),
        itemSpacing: 'gap-3'
      };
    } else if (containerDimensions.width >= 480 && containerDimensions.width < 768) {
      return {
        width: '100%',
        minWidth: '300px',
        maxWidth: '400px',
        height: 'auto',
        minHeight: '360px',
        padding: '20px',
        chartSize: 160,
        titleSize: 'text-lg',
        itemFontSize: 'text-sm',
        innerRadius: 35,
        outerRadius: 65,
        itemSpacing: 'gap-2'
      };
    } else {
      return {
        width: '202px',
        minWidth: '200px',
        maxWidth: '300px',
        height: '344px',
        minHeight: '344px',
        padding: '24px',
        chartSize: 120,
        titleSize: 'text-lg',
        itemFontSize: 'text-xs',
        innerRadius: 30,
        outerRadius: 50,
        itemSpacing: 'gap-2'
      };
    }
  };

  const dimensions = getResponsiveDimensions();
  const chartSize = dimensions.chartSize;
  const center = chartSize / 2;
  const radius = dimensions.outerRadius - 2;
  const totalAmount = pieData.reduce((sum, item) => sum + item.amount, 0);

  // Compute start/end angles for each slice in degrees (full circle 360deg)
  const angles = [];
  let acc = 0;
  for (let i = 0; i < pieData.length; i++) {
    const slice = pieData[i];
    const start = acc;
    const end = acc + (slice.amount / totalAmount) * 360;
    angles.push([start, end]);
    acc = end;
  }

  // Function to generate the SVG arc path for each slice
  function createArcPath(startAngle, endAngle, radius, center) {
    const rad = Math.PI / 180;
    const startX = center + radius * Math.cos(rad * (startAngle - 90));
    const startY = center + radius * Math.sin(rad * (startAngle - 90));
    const endX = center + radius * Math.cos(rad * (endAngle - 90));
    const endY = center + radius * Math.sin(rad * (endAngle - 90));
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    return `M${center},${center} L${startX},${startY} A${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`;
  }

  return (
    <div
      ref={containerRef}
      className={`${
        darkMode
          ? 'bg-gray-800 shadow-gray-900/20'
          : 'bg-white shadow-sm'
      } rounded-xl transition-colors duration-200 w-full max-w-sm mx-auto lg:mx-0`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        minWidth: dimensions.minWidth,
        maxWidth: dimensions.maxWidth,
        minHeight: dimensions.minHeight,
        padding: dimensions.padding,
        borderRadius: 16,
        opacity: 1,
        position: 'relative'
      }}
    >
      {/* Title */}
      <h3
        className={`${dimensions.titleSize} font-semibold leading-tight mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%'
        }}
      >
        Total Sales
      </h3>

      {/* Chart wrapper is relative; events layer is absolute */}
      <div className="flex justify-center mb-4" style={{ position: 'relative' }}>
        <div
          style={{
            width: chartSize,
            height: chartSize,
            minWidth: isMobile ? '120px' : '100px',
            minHeight: isMobile ? '120px' : '100px',
            position: 'relative',
          }}
        >
          {containerDimensions.width > 0 && (
            <>
              <PieChart
                series={[
                  {
                    data: pieData.map((item) => ({
                      id: item.type,
                      value: item.amount,
                      label: ''
                    })),
                    innerRadius: dimensions.innerRadius,
                    outerRadius: dimensions.outerRadius,
                    paddingAngle: isMobile ? 1 : 2,
                    cornerRadius: isMobile ? 2 : 4
                  }
                ]}
                width={chartSize}
                height={chartSize}
                colors={COLORS}
                slotProps={{
                  legend: { hidden: true }
                }}
                sx={{
                  '& .MuiChartsLegend-root': { display: 'none' },
                  '& .MuiChartsLegend-mark': { display: 'none' },
                  '& .MuiChartsArc-arc': {
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      filter: 'brightness(1.1)',
                      cursor: 'pointer'
                    }
                  }
                }}
              />

              {/* Transparent event layer for tooltip capture */}
              <svg 
                width={chartSize} 
                height={chartSize} 
                style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'auto' }} 
                aria-hidden="true"
              >
                {pieData.map((slice, i) => {
                  const [startAngle, endAngle] = angles[i];
                  const d = createArcPath(startAngle, endAngle, radius, center);
                  return (
                    <path
                      key={slice.type}
                      d={d}
                      fill="transparent"
                      stroke="transparent"
                      strokeWidth={1}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={e => {
                        setTooltip({
                          visible: true,
                          clientX: e.clientX,
                          clientY: e.clientY,
                          data: {
                            label: slice.type,
                            amount: slice.amount.toFixed(2),
                            pct: ((slice.amount / totalAmount) * 100).toFixed(1)
                          }
                        });
                      }}
                      onMouseMove={e => {
                        setTooltip(t => ({
                          ...t,
                          clientX: e.clientX,
                          clientY: e.clientY
                        }));
                      }}
                      onMouseLeave={() => setTooltip({
                        visible: false,
                        clientX: 0,
                        clientY: 0,
                        data: null
                      })}
                    />
                  );
                })}
              </svg>
            </>
          )}
        </div>

        {/* Tooltip portal */}
        {tooltip.visible && tooltip.data && createPortal(
          <div
            style={{
              position: 'fixed',
              left: tooltip.clientX + 12,
              top: tooltip.clientY - 35,
              pointerEvents: 'none',
              background: darkMode ? '#24293f' : '#fff',
              color: darkMode ? '#fff' : '#222',
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '7px 13px',
              fontSize: '0.96em',
              minWidth: 100,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              zIndex: 99999,
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'nowrap',
              userSelect: 'none'
            }}
          >
            <div style={{ fontWeight: 600 }}>{tooltip.data.label}</div>
            <div>Amount: ${tooltip.data.amount}</div>
            <div>Percent: {tooltip.data.pct}%</div>
          </div>,
          document.body
        )}
      </div>

      {/* Data Legend */}
      <div className={`flex flex-col ${dimensions.itemSpacing}`}>
        {pieData.map((item, index) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div
                className={`${isMobile ? 'w-2 h-2' : 'w-2 h-2'} rounded-full flex-shrink-0`}
                style={{ backgroundColor: COLORS[index] }}
                aria-hidden="true"
              ></div>
              <span
                className={`${dimensions.itemFontSize} transition-colors duration-200 truncate ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{ fontFamily: 'Inter' }}
                title={item.type}
              >
                {item.type}
              </span>
            </div>
            <span
              className={`${dimensions.itemFontSize} font-semibold transition-colors duration-200 flex-shrink-0 ml-2 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              ${item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Very small screen fallback */}
      {isMobile && containerDimensions.width < 240 && (
        <div className={`text-center p-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <p className="text-xs">
            Rotate device for better view
          </p>
        </div>
      )}
    </div>
  );
}
