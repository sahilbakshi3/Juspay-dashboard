// src/components/dashboard/TopSellingProducts.js

import React, { useContext } from 'react';
import { topSellingProducts } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

const TopSellingProducts = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="w-full h-full">
      {/* Header - Responsive */}
      <h3
        className={`font-semibold mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        } ${isMobile ? 'text-base' : 'text-lg'}`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
          fontSize: isMobile ? '16px' : '19px',
        }}
      >
        Top Selling Products
      </h3>

      {/* Table content with dark mode support - Responsive */}
      <div className="w-full overflow-x-auto">
        <table className={`w-full table-auto ${isMobile ? 'min-w-[480px]' : 'min-w-[500px]'}`}>
          <thead>
            <tr className={`text-left border-b transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-400 border-gray-600' 
                : 'text-gray-500 border-gray-200'
            } ${isMobile ? 'text-xs' : 'text-sm'}`}>
              <th className={`pb-3 font-medium ${isMobile ? 'pr-2' : 'pr-4'}`}>Name</th>
              <th className={`pb-3 font-medium ${isMobile ? 'pr-2' : 'pr-4'}`}>Price</th>
              <th className={`pb-3 font-medium ${isMobile ? 'pr-2' : 'pr-4'}`}>Quantity</th>
              <th className="pb-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className={isMobile ? 'text-xs' : 'text-sm'}>
            {topSellingProducts.map((product, index) => (
              <tr 
                key={index} 
                className={`border-b transition-colors duration-200 ${
                  darkMode 
                    ? 'border-gray-700 hover:bg-gray-700/50' 
                    : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <td className={`transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                } ${isMobile ? 'py-2 pr-2' : 'py-3 pr-4'}`}>
                  <div className={`${isMobile ? 'max-w-[120px]' : 'max-w-none'} truncate`}>
                    {product.name}
                  </div>
                </td>
                <td className={`transition-colors duration-200 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } ${isMobile ? 'py-2 pr-2' : 'py-3 pr-4'}`}>
                  {product.price}
                </td>
                <td className={`transition-colors duration-200 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                } ${isMobile ? 'py-2 pr-2' : 'py-3 pr-4'}`}>
                  {product.quantity}
                </td>
                <td className={`font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                } ${isMobile ? 'py-2' : 'py-3'}`}>
                  {product.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;