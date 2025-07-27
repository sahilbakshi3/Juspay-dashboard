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
    <>
      {/* Page Title - Responsive to dark mode */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-xl font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          eCommerce
        </h1>
      </div>

      {/* Stats Cards and Projections Chart - Side by side */}
      <div className="flex flex-col lg:flex-row gap-7">
        <div className="flex-1 max-w-[524px]">
          <StatsCards />
        </div>
        
        {/* Projections Chart - Increased width */}
        <div className={`
          rounded-2xl p-6 shadow-sm transition-colors
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          w-full lg:w-[500px] h-[252px]
        `}>
          <ProjectionsChart />
        </div>
      </div>

      {/* Revenue Chart and Revenue by Location - Side by side */}
      <div className="mt-8 flex flex-col lg:flex-row gap-7">
        <div className="flex-1">
          <RevenueChart />
        </div>
        
        {/* Revenue by Location - No need to pass darkMode prop since component uses context */}
        <div className="w-full lg:w-auto">
          <RevenueByLocation />
        </div>
      </div>

      {/* Top Selling Products and Total Sales - Side by side */}
      <div className="mt-8 flex flex-col xl:flex-row gap-7">
        <div className={`
          rounded-2xl p-6 shadow-sm transition-colors flex-1
          ${darkMode ? 'bg-gray-800' : 'bg-white'}
          min-h-[336px]
        `}>
          <TopSellingProducts />
        </div>
        
        {/* TotalSales Component */}
        <div className="w-full xl:w-auto flex justify-center xl:justify-start">
          <TotalSales />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;