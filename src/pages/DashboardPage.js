// src/pages/DashboardPage.js

import React from 'react';

// Dashboard Components - Import all your existing dashboard components
import StatsCards from '../components/dashboard/StatsCards';
import ProjectionsChart from '../components/dashboard/ProjectionsChart';
import RevenueChart from '../components/dashboard/RevenueChart';
import RevenueByLocation from '../components/dashboard/RevenueByLocation';
import TopSellingProducts from '../components/dashboard/TopSellingProducts';
import TotalSales from '../components/dashboard/TotalSales';

const DashboardPage = () => {
  return (
    <>
      {/* Page Title - Exactly as you had in App.js */}
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-[14px] font-semibold leading-[20px] text-gray-900"
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontStyle: 'normal',
            letterSpacing: '0%',
          }}
        >
          eCommerce
        </h1>
      </div>

      {/* Stats Cards and Projections Chart - Side by side */}
      <div className="flex gap-7">
        <div className="flex-1">
          <StatsCards />
        </div>
        
        {/* Projections Chart - 28px gap from StatsCards */}
        <div 
          className="bg-white rounded-[16px] p-[24px] shadow-sm"
          style={{
            width: '432px',
            height: '252px',
          }}
        >
          <ProjectionsChart />
        </div>
      </div>

      {/* Revenue Chart and Revenue by Location - Side by side */}
      <div className="mt-8 flex gap-7">
        <div className="flex-1">
          <RevenueChart />
        </div>
        
        {/* Revenue by Location - 28px gap from RevenueChart */}
        <div>
          <RevenueByLocation />
        </div>
      </div>

      {/* Top Selling Products - Positioned in normal flow */}
      <div className="mt-8 flex gap-7">
        <div
          className="bg-white rounded-2xl p-6 shadow-sm"
          style={{ width: '662px', minWidth: '662px', height: '336px' }}
        >
          <TopSellingProducts />
        </div>
        
        {/* TotalSales Component - 28px gap from TopSellingProducts */}
        <div>
          <TotalSales />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;