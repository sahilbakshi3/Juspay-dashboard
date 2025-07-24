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
    <div className="absolute bottom-4 right-4">
      <Card
        className="shadow-lg"
        style={{
          width: 154,
          height: 124,
          borderRadius: 16,
          padding: 12,
          opacity: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
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
              color: '#1F2937'
            }}
          >
            Total Sales
          </Typography>

          <div className="flex items-center justify-between">
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
        </CardContent>
      </Card>
    </div>
  );
}
