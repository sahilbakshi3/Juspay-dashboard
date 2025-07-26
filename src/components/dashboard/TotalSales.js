import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Typography } from '@mui/material';

const COLORS = ['#1F2937', '#BBF7D0', '#BAE6FD', '#A5B4FC'];

const pieData = [
  { type: 'Direct', amount: 300.56 },
  { type: 'Affiliate', amount: 135.18 },
  { type: 'Sponsored', amount: 154.02 },
  { type: 'E-mail', amount: 48.96 }
];

export default function TotalSales() {
  return (
    <Card
      className="shadow-lg"
      style={{
        width: 202,
        height: 344,
        borderRadius: 16,
        padding: 24,
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <Typography 
          variant="h6" 
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            color: '#1F2937',
            marginBottom: '16px'
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
                    itemStyle: { color: COLORS[index] }
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
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    color: '#6B7280'
                  }}
                >
                  {item.type}
                </span>
              </div>
              <span 
                style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#1F2937'
                }}
              >
                ${item.amount}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
