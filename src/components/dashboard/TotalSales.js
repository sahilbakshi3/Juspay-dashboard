import React, { useContext } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../../context/ThemeContextProvider';

// Updated colors with dark mode support
const COLORS_LIGHT = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];
const COLORS_DARK = ['#C6C7F8', '#BBF7D0', '#BAE6FD', '#A5B4FC']; // Primary brand color for dark mode

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

export default function TotalSales() {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);

  // Choose colors based on theme
  const COLORS = darkMode ? COLORS_DARK : COLORS_LIGHT;

  return (
    <div
      className={`${
        darkMode 
          ? 'bg-gray-800 shadow-gray-900/20' 
          : 'bg-white shadow-sm'
      } rounded-xl transition-colors duration-200`}
      style={{
        width: '202px',
        height: '344px',
        padding: '24px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      {/* Title with consistent styling */}
      <h3
        className={`text-[18px] font-semibold leading-[20px] mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%',
        }}
      >
        Total Sales
      </h3>

      {/* Pie Chart */}
      <div className="flex justify-center mb-4">
        <div style={{ width: 120, height: 120 }}>
          <PieChart
            series={[
              {
                data: pieData.map((item, index) => ({
                  id: item.type,
                  value: item.amount,
                  label: '',
                })),
                innerRadius: 30,
                outerRadius: 50,
                paddingAngle: 2,
                cornerRadius: 4
              }
            ]}
            width={120}
            height={120}
            colors={COLORS}
            slotProps={{
              legend: { hidden: true }
            }}
            sx={{
              '& .MuiChartsLegend-root': { display: 'none' },
              '& .MuiChartsLegend-mark': { display: 'none' }
            }}
          />
        </div>
      </div>

      {/* Data Legend */}
      <div className="flex flex-col gap-2">
        {pieData.map((item, index) => (
          <div key={item.type} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span
                className={`text-xs transition-colors duration-200 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
                style={{
                  fontFamily: 'Inter',
                }}
              >
                {item.type}
              </span>
            </div>
            <span
              className={`text-xs font-semibold transition-colors duration-200 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
              }}
            >
              ${item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
