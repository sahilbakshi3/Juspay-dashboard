// src/components/dashboard/TopSellingProducts.js

import React, { useContext } from 'react';
import { topSellingProducts } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

const TopSellingProducts = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 rounded-xl shadow-sm transition-colors duration-200 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{ width: '614px', height: '264px' }}
    >
      {/* Cleaned up header styling */}
      <h3
        className={`font-semibold text-base mb-4 transition-colors duration-200 ${
          darkMode ? 'text-gray-100' : 'text-gray-900'
        }`}
        style={{
          fontFamily: 'Inter',
          fontWeight: 600,
        }}
      >
        Top Selling Products
      </h3>

      {/* Table content with dark mode support */}
      <div className="overflow-auto mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr className={`text-left text-sm border-b transition-colors duration-200 ${
              darkMode 
                ? 'text-gray-400 border-gray-600' 
                : 'text-gray-500 border-gray-200'
            }`}>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Quantity</th>
              <th className="pb-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {topSellingProducts.map((product, index) => (
              <tr 
                key={index} 
                className={`border-b transition-colors duration-200 ${
                  darkMode 
                    ? 'border-gray-700 hover:bg-gray-700/50' 
                    : 'border-gray-100 hover:bg-gray-50'
                }`}
              >
                <td className={`py-3 transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
                  {product.name}
                </td>
                <td className={`py-3 transition-colors duration-200 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.price}
                </td>
                <td className={`py-3 transition-colors duration-200 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.quantity}
                </td>
                <td className={`py-3 font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>
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
