// src/components/dashboard/TopSellingProducts.js

import React from 'react';
import { topSellingProducts } from '../../data/mockData';

const TopSellingProducts = () => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm"
      style={{ width: '614px', height: '264px' }}
    >
      {/* Updated header styling */}
      <div
        className="h-1.25 w-38.375 bg-white text-gray-900 font-semibold text-sm flex items-center px-2"
        style={{
          height: '20px',
          width: '153px',
          borderRadius: '8px',
          fontFamily: 'Inter',
          fontWeight: 600,
          style: 'semi-bold',

        }}
      >
        Top Selling Products
      </div>

      {/* Table content */}
      <div className="overflow-auto h-[264px] w-[614px] mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Price</th>
              <th className="pb-3 font-medium">Quantity</th>
              <th className="pb-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {topSellingProducts.map((product, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 text-gray-900">{product.name}</td>
                <td className="py-3 text-gray-600">{product.price}</td>
                <td className="py-3 text-gray-600">{product.quantity}</td>
                <td className="py-3 text-gray-900 font-medium">{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
