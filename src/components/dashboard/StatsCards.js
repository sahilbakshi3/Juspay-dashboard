// src/components/dashboard/StatsCards.js

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { statsData } from '../../data/mockData';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} p-6 rounded-xl shadow-sm`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`${stat.textColor} text-sm font-medium`}>{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.valueColor} mt-1`}>{stat.value}</p>
            </div>
            <div className={`flex items-center text-sm ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {stat.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;