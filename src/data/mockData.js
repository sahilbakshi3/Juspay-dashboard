
// src/data/mockData.js
import nataliCraig from '../assets/images/profiles/natali-craig.png';
import drewCano from '../assets/images/profiles/drew-cano.png';
import orlandoDiggs from '../assets/images/profiles/orlando-diggs.png';
import andiLane from '../assets/images/profiles/andi-lane.png';
import kateMorrison from '../assets/images/profiles/kate-morrison.png';
import korayOkumus from '../assets/images/profiles/koray-okumus.png';

export const contacts = [
  { name: 'Natali Craig', avatar: nataliCraig },
  { name: 'Drew Cano', avatar: drewCano },
  { name: 'Orlando Diggs', avatar: orlandoDiggs },
  { name: 'Andi Lane', avatar: andiLane },
  { name: 'Kate Morrison', avatar: kateMorrison },
  { name: 'Koray Okumus', avatar: korayOkumus }
];

export const activities = [
  { user: 'You', action: 'have a bug that needs...', time: 'Just now', avatar: nataliCraig },
  { user: 'Released', action: 'a new version', time: '59 minutes ago', avatar: drewCano },
  { user: 'Submitted', action: 'a bug', time: '12 hours ago', avatar: orlandoDiggs },
  { user: 'Modified', action: 'a data in Page X', time: 'Today, 11:59 AM', avatar: andiLane },
  { user: 'Deleted', action: 'a page in Project X', time: 'Feb 2, 2023', avatar: kateMorrison }
];

export const topSellingProducts = [
  { name: 'ASOS Ridley High Waist', price: '$79.49', quantity: 82, amount: '$6,518.18' },
  { name: 'Marco Lightweight Shirt', price: '$128.50', quantity: 37, amount: '$4,754.50' },
  { name: 'Half Sleeve Shirt', price: '$39.99', quantity: 64, amount: '$2,559.36' },
  { name: 'Lightweight Jacket', price: '$20.00', quantity: 184, amount: '$3,680.00' },
];

export const revenueByLocation = [
  { city: 'New York', amount: 72000 },
  { city: 'San Francisco', amount: 39000 },
  { city: 'Sydney', amount: 25000 },
  { city: 'Singapore', amount: 61000 },
];

export const totalSalesData = [
  { type: 'Direct', amount: '$300.56', color: 'bg-gray-800' },
  { type: 'Affiliate', amount: '$135.18', color: 'bg-blue-500' },
  { type: 'Sponsored', amount: '$154.02', color: 'bg-green-400' },
  { type: 'E-mail', amount: '$48.96', color: 'bg-purple-400' }
];


