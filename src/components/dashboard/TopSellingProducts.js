import React, { useContext } from 'react';
import { topSellingProducts } from '../../data/mockData';
import { ThemeContext } from '../../context/ThemeContextProvider';

const TopSellingProducts = ({ isMobile = false }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="w-full h-full">
      <h3 className="font-semibold mb-4 transition-colors duration-200" style={{ color: darkMode ? '#F3F4F6' : '#111827', fontFamily: 'Inter', fontWeight: 600, fontSize: isMobile ? 16 : 19 }}>
        Top Selling Products
      </h3>

      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto" style={{ minWidth: isMobile ? 480 : 500 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'}` }}>
              <th className="pb-3 font-medium" style={{ color: darkMode ? '#9ca3af' : '#6b7280', paddingRight: isMobile ? 8 : 16 }}>Name</th>
              <th className="pb-3 font-medium" style={{ color: darkMode ? '#9ca3af' : '#6b7280', paddingRight: isMobile ? 8 : 16 }}>Price</th>
              <th className="pb-3 font-medium" style={{ color: darkMode ? '#9ca3af' : '#6b7280', paddingRight: isMobile ? 8 : 16 }}>Quantity</th>
              <th className="pb-3 font-medium" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProducts.map((product, index) => (
              <tr key={index} style={{ borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.02)' : '#f3f4f6'}`, transition: 'background .15s' }} className={darkMode ? 'hover:bg-black/20' : 'hover:bg-gray-50'}>
                <td style={{ padding: isMobile ? '8px 8px' : '12px 16px', color: darkMode ? '#F9FAFB' : '#111827' }}>
                  <div className={`${isMobile ? 'max-w-[120px]' : 'max-w-none'} truncate`}>{product.name}</div>
                </td>
                <td style={{ padding: isMobile ? '8px 8px' : '12px 16px', color: darkMode ? '#cfcfcf' : '#6b7280' }}>{product.price}</td>
                <td style={{ padding: isMobile ? '8px 8px' : '12px 16px', color: darkMode ? '#cfcfcf' : '#6b7280' }}>{product.quantity}</td>
                <td style={{ padding: isMobile ? '8px' : '12px', color: darkMode ? '#F9FAFB' : '#111827', fontWeight: 600 }}>{product.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSellingProducts;
