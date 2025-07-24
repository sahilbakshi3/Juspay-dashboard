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

// Common Components
import NotificationBadge from './components/common/NotificationBadge';

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
        <main className="flex-1 p-6">
          {/* Page Title and Notification Badge */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">eCommerce</h1>
            <NotificationBadge />
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ProjectionsChart />
            {/* <RevenueChart /> */}
          </div>
          

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevenueByLocation />
            <TopSellingProducts />
            <TotalSales />
          </div>
        </main>
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </div>
  );
};

export default App;