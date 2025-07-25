import React from 'react';
import { revenueByLocation } from '../../data/mockData';

const RevenueByLocation = () => {

  return (
    <div
      className="bg-white rounded-xl shadow-sm flex flex-col justify-between"
      style={{
        width: '202px',
        height: '318px',
        minWidth: '200px',
        maxWidth: '272px',
        padding: '24px',
        gap: '16px',
        borderRadius: '16px',
        opacity: 1,
      }}
    >
      <h3
        className="text-[14px] font-semibold leading-[20px] text-gray-900 mb-4"
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontStyle: 'normal',
          letterSpacing: '0%',
        }}
      >
        Revenue by Location
      </h3>

      
      

      {/* Location Breakdown */}
      <div className="space-y-2 overflow-y-auto">
        {revenueByLocation.map((location) => {
          const maxRevenue = Math.max(...revenueByLocation.map(loc => loc.amount));
          const percentage = (location.amount / maxRevenue) * 100;
          
          return (
            <div key={location.city} style={{ paddingRight: '40px', gap: '8px' }} className="flex flex-col">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{location.city}</span>
                <span className="font-medium text-gray-900">
                  {location.amount}
                </span>
              </div>
              
              {/* Custom Progress Bar with your specifications */}
              <div 
                style={{
                  width: '154px',
                  height: '2px',
                  backgroundColor: '#e5e7eb', // Gray background
                  borderRadius: '80px',
                  opacity: 1,
                  transform: 'rotate(0deg)'
                }}
              >
                <div 
                  style={{
                    width: `${percentage}%`,
                    height: '2px',
                    backgroundColor: '#3b82f6', // Blue progress fill
                    borderRadius: '80px',
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default RevenueByLocation;
