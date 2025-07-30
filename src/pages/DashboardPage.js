// src/pages/DashboardPage.js

import React, { useContext } from 'react';

// Dashboard Components - Import all your existing dashboard components
import StatsCards from '../components/dashboard/StatsCards';
import ProjectionsChart from '../components/dashboard/ProjectionsChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RevenueByLocation from '../components/dashboard/RevenueByLocation';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import TotalSales from '../components/dashboard/TotalSales';
import { ThemeContext } from '../context/ThemeContextProvider';

const DashboardPage = ({ refreshKey = 0, isMobile = false, isTablet = false }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="w-full max-w-none space-y-4 sm:space-y-6 lg:space-y-8" key={refreshKey}>
      {/* Page Title - Responsive */}
      <div className="flex justify-between items-center">
        <h1 className={`text-lg sm:text-xl lg:text-2xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          eCommerce
        </h1>
      </div>

      {/* Stats Cards and Projections Chart - Responsive Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-7">
        {/* Stats Cards Container */}
        <div className={`
          rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full order-1
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[200px] sm:min-h-[252px]
        `}>
          <div className="w-full h-full">
            <StatsCards key={`stats-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>
        
        {/* Projections Chart Container */}
        <div className={`
          rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full order-2
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[200px] sm:min-h-[252px]
        `}>
          <div className="w-full h-full">
            <ProjectionsChart key={`projections-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>
      </div>

      {/* Revenue Chart and Revenue by Location - Responsive Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
        {/* Revenue Chart Container */}
        <div className={`
          rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full min-w-0 order-1
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[200px] sm:min-h-[318px]
        `}>
          <div className="w-full h-full min-w-[320px] overflow-x-auto">
            <RevenueChart key={`revenue-chart-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>
        
        {/* Revenue by Location Container - Stack on small screens */}
        <div className="flex justify-center xl:justify-start order-2">
          <div className={`
            rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors
            ${darkMode ? 'bg-gray-800' : 'bg-white'}
            min-h-[200px] sm:min-h-[318px]
            w-full
          `}>
            <div className="w-full h-full">
              <RevenueByLocation key={`revenue-location-${refreshKey}`} isMobile={isMobile} />
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Products and Total Sales - Responsive Grid - FIXED */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-7">
        {/* Top Selling Products Container */}
        <div className={`
          rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors w-full min-w-0 order-1
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[200px] sm:min-h-[264px]
        `}>
          <div className="min-w-[300px] overflow-x-auto">
            <TopSellingProducts key={`top-products-${refreshKey}`} isMobile={isMobile} />
          </div>
        </div>
        
        {/* TotalSales Container - FIXED: Same structure as RevenueByLocation */}
        <div className="flex justify-center xl:justify-start order-2">
          <div className={`
            rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm transition-colors
            ${darkMode ? 'bg-gray-800' : 'bg-white'}
            min-h-[200px] sm:min-h-[264px]
            w-full
          `}>
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