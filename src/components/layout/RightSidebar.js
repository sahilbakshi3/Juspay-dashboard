// src/components/layout/RightSidebar.js

import React from 'react';
import { activities, contacts } from '../../data/mockData';

const RightSidebar = () => {
  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      {/* Notifications Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div className="text-sm">
              <p className="text-gray-900">You have a bug that needs...</p>
              <p className="text-gray-500 text-xs">12 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="text-sm">
              <p className="text-gray-900">New user registered</p>
              <p className="text-gray-500 text-xs">59 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="text-sm">
              <p className="text-gray-900">Andi Lane subscribed to you</p>
              <p className="text-gray-500 text-xs">Today, 11:59 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Activities</h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs">
                {activity.avatar}
              </div>
              <div className="text-sm flex-1">
                <p className="text-gray-900">{activity.user} {activity.action}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Contacts</h3>
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                {contact.avatar}
              </div>
              <span className="text-sm text-gray-900">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Sales Section */}
      {/* <div className="mt-6 bg-gray-50 p-4 rounded-lg">
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
      </div> */}
    </div>
  );
};

export default RightSidebar;