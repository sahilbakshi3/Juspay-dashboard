// src/data/mockData.js

export const topSellingProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
];

export const revenueByLocation = [
  { city: 'New York', amount: '72K' },
  { city: 'San Francisco', amount: '39K' },
  { city: 'Sydney', amount: '25K' },
  { city: 'Singapore', amount: '61K' }
];

export const totalSalesData = [
  { type: 'Direct', amount: '$300.56', color: 'bg-gray-800' },
  { type: 'Affiliate', amount: '$135.18', color: 'bg-blue-500' },
  { type: 'Sponsored', amount: '$154.02', color: 'bg-green-400' },
  { type: 'E-mail', amount: '$48.96', color: 'bg-purple-400' }
];

export const activities = [
  { user: 'You', action: 'have a bug that needs...', time: 'Just now', avatar: '🐛' },
  { user: 'Released a new version', action: '', time: '59 minutes ago', avatar: '🚀' },
  { user: 'Submitted a bug', action: '', time: '12 hours ago', avatar: '🐛' },
  { user: 'Modified a data in Page X', action: '', time: 'Today, 11:59 AM', avatar: '📝' },
  { user: 'Deleted a page in Project X', action: '', time: 'Feb 2, 2023', avatar: '🗑️' }
];

export const contacts = [
  { name: 'Natali Craig', avatar: 'NC' },
  { name: 'Drew Cano', avatar: 'DC' },
  { name: 'Orlando Diggs', avatar: 'OD' },
  { name: 'Andi Lane', avatar: 'AL' },
  { name: 'Kate Morrison', avatar: 'KM' },
  { name: 'Koray Okumus', avatar: 'KO' }
];

export const statsData = [
  {
    title: 'Customers',
    value: '3,781',
    change: '+11.01%',
    trend: 'up',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    valueColor: 'text-blue-900'
  },
  {
    title: 'Orders',
    value: '1,219',
    change: '-0.03%',
    trend: 'down',
    bgColor: 'bg-white',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  {
    title: 'Revenue',
    value: '$695',
    change: '+15.03%',
    trend: 'up',
    bgColor: 'bg-white',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  },
  {
    title: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    trend: 'up',
    bgColor: 'bg-white',
    textColor: 'text-gray-600',
    valueColor: 'text-gray-900'
  }
];