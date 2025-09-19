// src/components/dashboard/StatsCards.js
import React, { useContext } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const StatCard = ({ title, value, trend, change, isMobile }) => {
  const { darkMode } = useContext(ThemeContext);

  // Determine special cards
  const isCustomers = title === 'Customers';
  const isGrowth = title === 'Growth';

  // Background: special for Customers and Growth only (always light)
  let background;
  if (isCustomers) background = 'var(--Primary-Blue, #E3F5FF)';
  else if (isGrowth) background = 'var(--Primary-Purple, #E5ECF6)';
  else background = darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff';

  // Text color:
  // - For special (Customers/Growth) cards we want dark text so they read nicely even on dark page background (per your screenshot).
  // - For other cards, follow darkMode/lightMode behavior.
  const titleColor = isCustomers || isGrowth
    ? '#111827' // dark text for the light accent cards
    : (darkMode ? '#9CA3AF' : '#6B7280');

  const valueColor = isCustomers || isGrowth
    ? '#111827'
    : (darkMode ? '#FFFFFF' : '#111827');

  const cardStyle = {
    background,
    border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    padding: 24,               // consistent 24px padding
    height: isMobile ? 100 : 112,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
  };

  return (
    <div className="w-full shadow-sm transition-colors" style={cardStyle}>
      <div className="flex-shrink-0 mb-2">
        <p
          className="font-semibold truncate"
          style={{
            fontSize: isMobile ? 14 : 16,
            color: titleColor
          }}
        >
          {title}
        </p>
      </div>

      <div className="flex-1 flex justify-end flex-col">
        <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-1">
          <div className="flex-shrink-0">
            <h3
              className="font-bold leading-none"
              style={{
                fontSize: isMobile ? 20 : 24,
                whiteSpace: 'nowrap',
                color: valueColor
              }}
            >
              {value}
            </h3>
          </div>

          {trend && change && (
            <div
              className="flex items-center gap-1 font-medium flex-shrink-0"
              style={{
                color: trend === 'up' ? '#16A34A' : '#EF4444',
                fontSize: 12
              }}
            >
              <span className="whitespace-nowrap">{change}</span>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCards = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="w-full h-full"
      // No background color set here - the parent card container will handle it
    >
      {/* gap-4 = 16px */}
      <div className={`grid grid-cols-2 gap-4 h-full`}>
        <StatCard title="Customers" value="3,781" trend="up" change="+11.01%" isMobile={isMobile} />
        <StatCard title="Orders" value="1,209" trend="down" change="-0.03%" isMobile={isMobile} />
        <StatCard title="Revenue" value="$695" trend="up" change="+15.03%" isMobile={isMobile} />
        <StatCard title="Growth" value="30.1%" trend="up" change="+6.08%" isMobile={isMobile} />
      </div>
    </div>
  );
};

export default StatCards;
