
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, trend, change }) => {
  return (
    <div className="min-w-[200px] w-[202px] h-[112px] p-6 rounded-[16px] bg-white shadow-sm flex flex-col justify-between">
      {/* Title */}
      <p 
        className="text-sm text-gray-500 font-medium"
        style={{ 
          fontFamily: 'Inter', 
          fontWeight: 600, 
          letterSpacing: '0%' 
        }}
      >
        {title}
      </p>
      
      {/* Value and Trend Section - Inline */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">{value}</h3>
        
        {/* Trending Arrow with Percentage - Inline on absolute right */}
        {trend && change && (
          <div className={`flex items-center text-xs ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="mr-1">{change}</span>
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCards = () => {
  return (
    <div className="w-[432px] h-[252px] flex flex-wrap gap-[28px] bg-transparent">
      <StatCard 
        title="Customers" 
        value="3,781" 
        trend="up" 
        change="+11.01%" 
      />
      <StatCard 
        title="Orders" 
        value="1,209" 
        trend="down" 
        change="-0.03%" 
      />
      <StatCard 
        title="Revenue" 
        value="$695" 
        trend="up" 
        change="+15.03%" 
      />
      <StatCard 
        title="Growth" 
        value="30.1%" 
        trend="up" 
        change="+6.08%" 
      />
    </div>
  );
};

export default StatCards;
