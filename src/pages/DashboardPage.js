// src/pages/DashboardPage.js
import React, { useContext } from 'react';

// Dashboard Components
import StatsCards from '../components/dashboard/StatsCards';
import ProjectionsChart from '../components/dashboard/ProjectionsChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RevenueByLocation from '../components/dashboard/RevenueByLocation';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import TotalSales from '../components/dashboard/TotalSales';
import { ThemeContext } from '../context/ThemeContextProvider';

const DashboardPage = ({ refreshKey = 0, isMobile = false, isTablet = false }) => {
  const { darkMode } = useContext(ThemeContext);

  // Background colors for dashboard and cards
  const surfaceBg = darkMode ? '#000000' : '#ffffff';
  const cardBg = darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : 'var(--Primary-Light, #F7F9FB)';
  const borderColor = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.1)';
  const textColor = darkMode ? '#FFFFFF' : '#111827';

  return (
    <div 
      className="w-full max-w-none space-y-4 sm:space-y-6 lg:space-y-8" 
      key={refreshKey}
      style={{ backgroundColor: surfaceBg, minHeight: '100vh' }}
    >
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1
          className="text-lg sm:text-xl lg:text-2xl font-semibold"
          style={{ color: textColor }}
        >
          eCommerce
        </h1>
      </div>

      {/* Stats Cards and Projections Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
        <div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full order-1 min-h-[200px] sm:min-h-[252px]"
          style={{ 
            background: cardBg, 
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="w-full h-full">
            <StatsCards key={`stats-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>

        <div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full order-2 min-h-[200px] sm:min-h-[252px]"
          style={{ 
            background: cardBg, 
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="w-full h-full">
            <ProjectionsChart key={`projections-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* Revenue Chart and Revenue by Location */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
        <div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full min-w-0 order-1 min-h-[200px] sm:min-h-[318px]"
          style={{ 
            background: cardBg, 
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="w-full h-full min-w-[320px] overflow-x-auto">
            <RevenueChart key={`revenue-chart-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>

        <div className="flex justify-center xl:justify-start order-2">
          <div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors min-h-[200px] sm:min-h-[318px] w-full"
            style={{ 
              background: cardBg, 
              border: `1px solid ${borderColor}`,
              boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="w-full h-full">
              <RevenueByLocation key={`revenue-location-${refreshKey}`} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products and Total Sales */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
        <div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full min-w-0 order-1 min-h-[200px] sm:min-h-[264px]"
          style={{ 
            background: cardBg, 
            border: `1px solid ${borderColor}`,
            boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        >
          <div className="min-w-[300px] overflow-x-auto">
            <TopSellingProducts key={`top-products-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>

        <div className="flex justify-center xl:justify-start order-2">
          <div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors min-h-[200px] sm:min-h-[264px] w-full"
            style={{ 
              background: cardBg, 
              border: `1px solid ${borderColor}`,
              boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
            }}
          >
            <div className="w-full h-full">
              <TotalSales key={`total-sales-${refreshKey}`} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
