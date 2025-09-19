// Fixed StatsCards.js - Consistent spacing and styling
import React, { useContext } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const StatCard = ({ title, value, trend, change, isMobile }) => {
  const { darkMode } = useContext(ThemeContext);

  // Consistent card styling - remove special background colors
  const cardStyle = {
    background: darkMode ? 'var(--Primary-Light, #FFFFFF0D)' : '#ffffff',
    border: darkMode ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)',
    borderRadius: '16px',
    padding: isMobile ? '16px' : '24px',
    height: isMobile ? '100px' : '112px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const textColor = darkMode ? '#FFFFFF' : '#111827';

  return (
    <div className="w-full shadow-sm transition-colors" style={cardStyle}>
      <div className="flex-shrink-0 mb-2">
        <p 
          className="font-semibold truncate" 
          style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            color: darkMode ? '#9CA3AF' : '#6B7280'
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
                fontSize: isMobile ? '20px' : '24px', 
                whiteSpace: 'nowrap', 
                color: textColor 
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
                fontSize: '12px' 
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

const StatCards = ({ isMobile = false }) => (
  <div className="w-full h-full">
    <div className={`grid grid-cols-2 ${isMobile ? 'gap-4' : 'gap-6'} h-full`}>
      <StatCard title="Customers" value="3,781" trend="up" change="+11.01%" isMobile={isMobile} />
      <StatCard title="Orders" value="1,209" trend="down" change="-0.03%" isMobile={isMobile} />
      <StatCard title="Revenue" value="$695" trend="up" change="+15.03%" isMobile={isMobile} />
      <StatCard title="Growth" value="30.1%" trend="up" change="+6.08%" isMobile={isMobile} />
    </div>
  </div>
);

export default StatCards;