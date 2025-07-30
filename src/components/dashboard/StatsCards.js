// src/components/dashboard/StatsCards.js

import React, { useContext } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const StatCard = ({ title, value, trend, change, isMobile }) => {
  const { darkMode } = useContext(ThemeContext);

  // Custom backgrounds for Customers and Growth
  let inlineBackground = null;
  if (title === 'Customers') {
    inlineBackground = { backgroundColor: '#E3F5FF' };
  } else if (title === 'Growth') {
    inlineBackground = { backgroundColor: '#E5ECF6' };
  }

  // Identify which tiles should have black text in dark mode
  const isSpecialCard = title === 'Customers' || title === 'Growth';

  // Font color logic for headings and values
  const headingClass =
    darkMode
      ? (isSpecialCard ? 'text-black' : 'text-white')
      : 'text-black';

  return (
    <div
      className={`
        w-full p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm 
        flex flex-col justify-between transition-colors
        ${!inlineBackground ? (darkMode ? 'bg-gray-800' : 'bg-white') : ''}
        ${isMobile ? 'h-[100px]' : 'h-[112px]'}
      `}
      style={inlineBackground ?? undefined}
    >
      {/* Heading with better responsive typography */}
      <div className="flex-shrink-0 mb-2">
        <p
          className={`font-semibold ${headingClass} truncate`}
          style={{
            fontSize: 'clamp(12px, 2.5vw, 16px)'
          }}
        >
          {title}
        </p>
      </div>

      {/* Value and trend container with responsive layout */}
      <div className="flex-1 flex justify-end flex-col">
        {/* Container for value and trend - responsive wrapping */}
        <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
          {/* Value with better overflow handling */}
          <div className="flex-shrink-0">
            <h3
              className={`font-bold ${headingClass} leading-none`}
              style={{
                fontSize: 'clamp(18px, 3.5vw, 24px)',
                whiteSpace: 'nowrap'
              }}
            >
              {value}
            </h3>
          </div>
          
          {/* Trend indicator - will wrap below when needed */}
          {trend && change && (
            <div
              className={`flex items-center gap-1 font-medium flex-shrink-0 ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
              style={{
                fontSize: 'clamp(10px, 2vw, 12px)'
              }}
            >
              <span className="whitespace-nowrap">{change}</span>
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCards = ({ isMobile = false }) => (
  <div className="w-full">
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${
      isMobile ? 'gap-4' : 'gap-7'
    }`}>
      <StatCard
        title="Customers"
        value="3,781"
        trend="up"
        change="+11.01%"
        isMobile={isMobile}
      />
      <StatCard
        title="Orders"
        value="1,209"
        trend="down"
        change="-0.03%"
        isMobile={isMobile}
      />
      <StatCard
        title="Revenue"
        value="$695"
        trend="up"
        change="+15.03%"
        isMobile={isMobile}
      />
      <StatCard
        title="Growth"
        value="30.1%"
        trend="up"
        change="+6.08%"
        isMobile={isMobile}
      />
    </div>
  </div>
);

export default StatCards;