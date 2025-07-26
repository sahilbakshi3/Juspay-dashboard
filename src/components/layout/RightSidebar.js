// src/components/layout/RightSidebar.js

import React, { useContext } from 'react';
import { activities, contacts } from '../../data/mockData';
import { Bug, User, Radio } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RightSidebar = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`w-80 border-l p-6 transition-colors ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Notifications Section */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Notifications</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Bug className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <div className="text-sm">
              <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>You have a bug that needs...</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <User className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <div className="text-sm">
              <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>New user registered</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>59 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Bug className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <div className="text-sm">
              <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>You have a bug that needs...</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Radio className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <div className="text-sm">
              <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>Andi Lane subscribed to you</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today, 11:59 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Activities</h3>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {activity.avatar}
              </div>
              <div className="text-sm flex-1">
                <p className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
                  {activity.user} {activity.action}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Contacts</h3>
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                darkMode 
                  ? 'bg-blue-900 text-blue-300' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {contact.avatar}
              </div>
              <span className={`text-sm ${
                darkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total Sales Section */}
      {/* <div className={`mt-6 p-4 rounded-lg ${
        darkMode ? 'bg-gray-700' : 'bg-gray-50'
      }`}>
        <h4 className={`text-sm font-medium mb-3 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>Total Sales</h4>
        <div className="space-y-2">
          {totalSalesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>{item.type}</span>
              </div>
              <span className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{item.amount}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default RightSidebar;