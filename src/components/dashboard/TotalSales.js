
import { totalSalesData } from '../../data/mockData';

const TotalSales = () => {
  return (
    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Sales</h3>
      <div className="h-48 flex items-end justify-between space-x-2">
        {/* Render your total sales data here */}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Total Sales</h4>
        <div className="space-y-2">
          {totalSalesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-600">{item.type}</span>
              </div>
              <span className="text-sm font-medium">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-600">30M</span>
      </div>
    </div>
  );
};

export default TotalSales;
