import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { statsData } from '../../data/mockData';

const StatsCards = () => {
  return (
    <div
      className="rounded-xl shadow-md p-6"
      style={{
        width: 432,
        height: 252,
        opacity: 1,
        borderRadius: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 28,
        backgroundColor: 'white', // assuming a white card background
      }}
    >
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`rounded-xl px-4 py-3 ${stat.bgColor || 'bg-gray-100'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`${stat.textColor} text-sm font-medium`}>
                {stat.title}
              </p>
              <p className={`text-2xl font-bold ${stat.valueColor} mt-1`}>
                {stat.value}
              </p>
            </div>
            <div
              className={`flex items-center text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
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
