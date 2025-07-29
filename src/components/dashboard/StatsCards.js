// src/components/dashboard/StatsCards.js

import React, { useContext } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const StatCard = ({ title, value, trend, change }) => {
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
  // Light mode: all black
  // Dark mode: Customers/Growth black, Orders/Revenue white
  const headingClass =
    darkMode
      ? (isSpecialCard ? 'text-black' : 'text-white')
      : 'text-black';

  return (
    <div
      className={`
        w-full h-[112px] p-6 rounded-2xl shadow-sm 
        flex flex-col justify-between transition-colors
        ${!inlineBackground ? (darkMode ? 'bg-gray-800' : 'bg-white') : ''}
      `}
      style={inlineBackground ?? undefined}
    >
      {/* Heading with requested typography */}
      <p
        className={`text-base font-medium ${headingClass}`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '17px',
          lineHeight: '20px',
          letterSpacing: '0%',
        }}
      >
        {title}
      </p>

      <div className="flex justify-between items-center">
        <h3 className={`text-xl font-semibold ${headingClass}`}>
          {value}
        </h3>
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

const StatCards = () => (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
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
  </div>
);

export default StatCards;
