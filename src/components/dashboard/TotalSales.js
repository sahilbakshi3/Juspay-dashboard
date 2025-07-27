import React, { useContext } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../../context/ThemeContextProvider';

const COLORS = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

export default function TotalSales() {
  const theme = useTheme();
  const { darkMode } = useContext(ThemeContext);

  return (
    <Card
      className="shadow-lg"
      sx={{
        width: 202,
        height: 344,
        borderRadius: 2,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: darkMode ? '#374151' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        boxShadow: darkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent className="p-0 flex flex-col h-full" sx={{ p: '0 !important' }}>
        <Typography 
          variant="h6" 
          sx={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: darkMode ? '#ffffff' : '#1F2937',
            mb: 2
          }}
        >
          Total Sales
        </Typography>

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
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    color: darkMode ? '#D1D5DB' : '#6B7280'
                  }}
                >
                  {item.type}
                </Typography>
              </div>
              <Typography
                component="span"
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: darkMode ? '#ffffff' : '#1F2937'
                }}
              >
                ${item.amount}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}