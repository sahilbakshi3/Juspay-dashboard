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

const DashboardPage = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="w-full max-w-none">
      {/* Page Title - Responsive to dark mode */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          eCommerce
        </h1>
      </div>

      {/* Stats Cards and Projections Chart - Responsive Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-7 mb-8">
        {/* Stats Cards Container */}
        <div className="w-full">
          <StatsCards />
        </div>
        
        {/* Projections Chart Container */}
        <div className={`
          rounded-2xl p-6 shadow-sm transition-colors w-full
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[252px]
        `}>
          <ProjectionsChart />
        </div>
      </div>

      {/* Revenue Chart and Revenue by Location - Responsive Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_auto] gap-7 mb-8">
        {/* Revenue Chart Container */}
        <div className="w-full min-w-0">
          <RevenueChart />
        </div>
        
        {/* Revenue by Location Container */}
        <div className="flex justify-center 2xl:justify-start">
          <RevenueByLocation />
        </div>
      </div>

      {/* Top Selling Products and Total Sales - Responsive Grid */}
      <div className="grid grid-cols-1 2xl:grid-cols-[1fr_auto] gap-7">
        {/* Top Selling Products Container */}
        <div className={`
          rounded-2xl p-6 shadow-sm transition-colors w-full min-w-0
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[264px]
        `}>
          <TopSellingProducts />
        </div>
        
        {/* TotalSales Container */}
        <div className="flex justify-center 2xl:justify-start">
          <TotalSales />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;