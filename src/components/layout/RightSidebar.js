// src/components/layout/RightSidebar.js

import React, { useContext } from 'react';
import { activities, contacts } from '../../data/mockData';
import { Bug, User, Radio, X } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContextProvider';

const RightSidebar = ({ isVisible, isMobile = false, onClose }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      isVisible ? 'w-80 opacity-100' : 'w-0 opacity-0'
    } border-l p-0 overflow-hidden h-full ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    } ${isMobile ? 'shadow-2xl' : 'shadow-sm'}`}>
      <div className={`w-80 ${isMobile ? 'p-4' : 'p-6'} h-full flex flex-col ${isVisible ? 'block' : 'hidden'}`}>
        
        {/* Header with close button for mobile */}
        {isMobile && onClose && (
          <div className="flex items-center justify-between mb-4">
            <h2 className={`font-semibold text-lg ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Activity
            </h2>
            <button
              onClick={onClose}
              className={`p-1 rounded-lg transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Notifications Section */}
          <div>
            <h3 className={`text-sm font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Bug className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className={`text-sm min-w-0 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} break-words`}>You have a bug that needs...</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <User className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className={`text-sm min-w-0 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} break-words`}>New user registered</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>59 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Bug className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className={`text-sm min-w-0 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} break-words`}>You have a bug that needs...</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>12 hours ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Radio className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <div className={`text-sm min-w-0 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  <p className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} break-words`}>Andi Lane subscribed to you</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Today, 11:59 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Section */}
          <div>
            <h3 className={`text-sm font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Activities</h3>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {activity.avatar}
                  </div>
                  <div className={`text-sm flex-1 min-w-0 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <p className={`${darkMode ? 'text-gray-200' : 'text-gray-900'} break-words`}>
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
          <div>
            <h3 className={`text-sm font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Contacts</h3>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                    darkMode 
                      ? 'bg-blue-900 text-blue-300' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {contact.avatar}
                  </div>
                  <span className={`text-sm flex-1 min-w-0 truncate ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  } ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;