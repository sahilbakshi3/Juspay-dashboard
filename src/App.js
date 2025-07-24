// src/App.js

import React from 'react';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightSidebar from './components/layout/RightSidebar';

// Dashboard Components
import StatsCards from './components/dashboard/StatsCards';
import ProjectionsChart from './components/dashboard/ProjectionsChart';
import RevenueChart from './components/dashboard/RevenueChart';
import RevenueByLocation from './components/dashboard/RevenueByLocation';
import TopSellingProducts from './components/dashboard/TopSellingProducts';
import TotalSales from './components/dashboard/TotalSales';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 relative">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">eCommerce</h1>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Projections Chart - Positioned absolutely on the right */}
          <div 
            className="absolute bg-white rounded-[16px] p-[24px] shadow-sm"
            style={{
              width: '432px',
              height: '252px',
              top: '140px', // Adjust this value to align with StatsCards
              right: '24px', // 24px from the right edge
              zIndex: 10,
            }}
          >
            <ProjectionsChart />
          </div>

          {/* TotalSales Component - Positioned absolutely */}
          <div 
            className="absolute"
            style={{
              top: '416px', // Position below ProjectionsChart (140px + 252px + 24px gap)
              right: '24px', // 24px from the right edge
              zIndex: 10,
            }}
          >
            <TotalSales />
          </div>

          {/* Revenue Chart */}
          <div className="mt-8">
            <RevenueChart />
          </div>

          {/* Top Selling Products */}
          <div className="mt-8">
            <div
              className="bg-white rounded-2xl p-6 shadow-sm"
              style={{ width: '662px', minWidth: '662px', height: '336px' }}
            >
              <TopSellingProducts />
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default App;
