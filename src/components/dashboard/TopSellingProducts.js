// src/components/dashboard/TopSellingProducts.js

import React from 'react';
import { topSellingProducts } from '../../data/mockData';

const TopSellingProducts = () => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
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