import React, { useContext, useRef, useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContextProvider';
import { createPortal } from 'react-dom'; // <= NEW

const ProjectionsChart = () => {
  const { darkMode } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });

  // Tooltip state with clientX/Y
  const [tooltip, setTooltip] = useState({
    visible: false,
    clientX: 0,
    clientY: 0,
    data: null
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const yAxisValues = ['30M', '20M', '10M', '0'];
  const maxValue = 30;

  const chartData = [
    { month: 'Jan', projection: 25, actual: 18 },
    { month: 'Feb', projection: 22, actual: 26 },
    { month: 'Mar', projection: 28, actual: 24 },
    { month: 'Apr', projection: 30, actual: 20 },
    { month: 'May', projection: 15, actual: 28 },
    { month: 'Jun', projection: 20, actual: 22 }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const { offsetWidth } = chartRef.current;
        const height = Math.max(180, Math.min(280, offsetWidth * 0.4));
        setChartDimensions({ width: offsetWidth, height });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  const isMobile = chartDimensions.width < 480;
  const isTablet = chartDimensions.width >= 480 && chartDimensions.width < 768;
  const chartHeight = Math.max(160, chartDimensions.height - 40);
  const barWidth = isMobile ? 'w-6' : isTablet ? 'w-7' : 'w-8';
  const barSpacing = isMobile ? 'space-x-2' : isTablet ? 'space-x-3' : 'space-x-4';

  // Tooltip rendering using portal
  const renderTooltip = () => {
    if (!(tooltip.visible && tooltip.data)) return null;

    const { projection, actual } = tooltip.data;
    const diff = projection !== 0
      ? (((projection - actual) / projection) * 100).toFixed(1)
      : 'N/A';

    return createPortal(
      <div
        style={{
          position: 'fixed',
          left: tooltip.clientX + 10,
          top: tooltip.clientY - 30,
          pointerEvents: 'none',
          background: darkMode ? '#24293f' : '#fff',
          color: darkMode ? '#fff' : '#222',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '7px 13px',
          fontSize: '0.95em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          zIndex: 99999,
          transition: 'opacity 0.18s',
          minWidth: 108,
        }}
      >
        <div>Projected: {projection}M</div>
        <div>Actual: {actual}M</div>
        <div>Diff: {diff}%</div>
      </div>,
      document.body
    );
  };

  return (
    <div className="h-full w-full flex flex-col" ref={chartRef} style={{ position: 'relative' }}>
      <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 transition-colors ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Projections vs Actuals
      </h3>
      <div
        className="flex w-full mt-auto"
        style={{
          height: `${Math.max(200, chartDimensions.height || 200)}px`,
          minHeight: '180px'
        }}
      >
        {/* Y-axis */}
        <div
          className={`flex flex-col justify-between items-end py-2 ${
            isMobile ? 'pr-2' : 'pr-3'
          }`}
          style={{
            height: `${chartHeight}px`,
            minWidth: isMobile ? '35px' : '45px'
          }}
        >
          {yAxisValues.map((value) => (
            <span
              key={value}
              className={`${isMobile ? 'text-xs' : 'text-xs sm:text-sm'} transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              {value}
            </span>
          ))}
        </div>
        {/* Chart area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Bars */}
          <div
            className={`flex items-end justify-between ${barSpacing} border-l border-b border-gray-300 relative overflow-visible`}
            style={{ height: `${chartHeight}px` }}
          >
            {chartData.map((data) => {
              const availableHeight = chartHeight - 20;
              const projectionHeight = Math.min((data.projection / maxValue) * availableHeight, availableHeight);
              const actualHeight = Math.min((data.actual / maxValue) * availableHeight, availableHeight);

              // Mouse events with screen coordinates
              return (
                <div
                  key={data.month}
                  className="flex items-end h-full flex-1 min-w-0"
                  onMouseEnter={e => {
                    setTooltip({
                      visible: true,
                      clientX: e.clientX,
                      clientY: e.clientY,
                      data
                    });
                  }}
                  onMouseMove={e => {
                    setTooltip(tooltip => ({
                      ...tooltip,
                      clientX: e.clientX,
                      clientY: e.clientY
                    }));
                  }}
                  onMouseLeave={() =>
                    setTooltip({ visible: false, clientX: 0, clientY: 0, data: null })
                  }
                  style={{ zIndex: 10, position: 'relative' }}
                >
                  {/* Bar */}
                  <div className={`flex flex-col mx-auto ${barWidth} min-w-[16px] max-w-[40px]`}>
                    <div
                      className={`w-full transition-colors ${
                        darkMode ? 'bg-gray-600' : 'bg-slate-300'
                      }`}
                      style={{
                        height: `${Math.max(projectionHeight - actualHeight, 0)}px`,
                        minHeight: Math.max(projectionHeight - actualHeight, 0) > 0 ? '2px' : '0px'
                      }}
                    ></div>
                    <div
                      className={`w-full transition-colors ${
                        darkMode ? 'bg-blue-500' : 'bg-blue-400'
                      }`}
                      style={{
                        height: `${actualHeight}px`,
                        minHeight: actualHeight > 0 ? '2px' : '0px'
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
            {/* Tooltip portal (always at document.body) */}
            {renderTooltip()}
          </div>
          {/* X-axis labels */}
          <div className={`flex justify-between ${barSpacing} mt-2 px-1 overflow-hidden`}>
            {months.map((month) => (
              <span
                key={month}
                className={`${
                  isMobile ? 'text-xs' : 'text-xs sm:text-sm'
                } text-center flex-1 min-w-0 transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {isMobile && month.length > 3 ? month.slice(0, 3) : month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionsChart;
