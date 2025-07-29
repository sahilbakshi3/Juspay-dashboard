import React, { useContext, useState } from 'react';
import { Bell, Search, Notebook, SunMedium, History, Star } from 'lucide-react';
import { ThemeContext } from "../../context/ThemeContextProvider";
import { useToast } from '../../context/ToastContext';

const Header = ({ 
  leftSidebarVisible, 
  rightSidebarVisible, 
  toggleLeftSidebar, 
  toggleRightSidebar,
  onRefreshDashboard
}) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { showRefreshToast, showFavoriteAddedToast, showFavoriteRemovedToast } = useToast();
  
  // State for star/favorite toggle
  const [isFavorite, setIsFavorite] = useState(false);

  const handleRefresh = () => {
    if (onRefreshDashboard) {
      // Add rotation animation to refresh icon
      const refreshIcon = document.querySelector('.refresh-icon');
      if (refreshIcon) {
        refreshIcon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
          refreshIcon.style.transform = 'rotate(0deg)';
        }, 300);
      }
      
      onRefreshDashboard();
      showRefreshToast(); // Show MUI toast notification at top center
    }
  };

  // Handle star/favorite toggle with toast notification
  const handleFavoriteToggle = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Show appropriate toast notification
    if (newFavoriteState) {
      showFavoriteAddedToast();
    } else {
      showFavoriteRemovedToast();
    }
  };

  return (
    <header className={`${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    } border-b px-6 py-4 transition-colors duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* Left Sidebar Toggle */}
            <button 
              onClick={toggleLeftSidebar}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                leftSidebarVisible
                  ? (isDarkMode 
                      ? 'text-blue-400 bg-gray-700 hover:text-blue-300' 
                      : 'text-blue-600 bg-blue-50 hover:text-blue-700')
                  : (isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
              }`}
            >
              <Notebook className="w-5 h-5" />
              
              {/* Bottom Tooltip */}
              <div className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                px-2 py-1 text-xs font-medium rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-50
                ${isDarkMode 
                  ? 'bg-gray-900 text-white border border-gray-700' 
                  : 'bg-gray-800 text-white'
                }
              `}>
                {leftSidebarVisible ? 'Hide' : 'Show'} left sidebar
                <div className={`
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
                `}></div>
              </div>
            </button>

            {/* Star/Favorite Button with Toggle */}
            <button 
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-lg transition-all duration-200 relative group ${
                isFavorite
                  ? 'text-yellow-500 hover:text-yellow-400'
                  : (isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
              }`}
            >
              <Star 
                className={`w-5 h-5 transition-all duration-200 ${
                  isFavorite ? 'fill-yellow-500' : 'fill-none'
                }`} 
              />
              
              {/* Bottom Tooltip */}
              <div className={`
                absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                px-2 py-1 text-xs font-medium rounded-md
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                pointer-events-none whitespace-nowrap z-50
                ${isDarkMode 
                  ? 'bg-gray-900 text-white border border-gray-700' 
                  : 'bg-gray-800 text-white'
                }
              `}>
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                <div className={`
                  absolute bottom-full left-1/2 transform -translate-x-1/2
                  border-4 border-transparent
                  ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
                `}></div>
              </div>
            </button>

            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Dashboards
            </span>
            <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>
              /
            </span>
            <span className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Default
            </span>
          </div>
        </div>
        
        <div className="h-1.75 w-19.75 flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
            <input 
              type="text" 
              placeholder="Search" 
              className={`pl-9 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            {/* Command shortcut indicator */}
            <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-0.5 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <span className="text-xs font-medium">⌘</span>
              <span className="text-xs">/</span>
            </div>
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              isDarkMode 
                ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-100'
            }`}
          >
            <SunMedium className="w-6 h-6" />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              Switch to {isDarkMode ? 'light' : 'dark'} mode
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
          
          {/* History/Refresh Button with Animation */}
          <button 
            onClick={handleRefresh}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <History 
              className="w-5 h-5 refresh-icon transition-transform duration-300" 
              style={{ transformOrigin: 'center' }}
            />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              Refresh Dashboard
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
          
          {/* Notification Bell Button */}
          <button className={`p-2 transition-colors relative group ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          }`}>
            <Bell className="w-5 h-5" />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              Notifications
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>

          {/* Right Sidebar Toggle */}
          <button 
            onClick={toggleRightSidebar}
            className={`p-2 rounded-lg transition-all duration-200 relative group ${
              rightSidebarVisible
                ? (isDarkMode 
                    ? 'text-blue-400 bg-gray-700 hover:text-blue-300' 
                    : 'text-blue-600 bg-blue-50 hover:text-blue-700')
                : (isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100')
            }`}
          >
            <Notebook className="w-5 h-5" />
            
            {/* Bottom Tooltip */}
            <div className={`
              absolute top-full left-1/2 transform -translate-x-1/2 mt-2
              px-2 py-1 text-xs font-medium rounded-md
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none whitespace-nowrap z-50
              ${isDarkMode 
                ? 'bg-gray-900 text-white border border-gray-700' 
                : 'bg-gray-800 text-white'
              }
            `}>
              {rightSidebarVisible ? 'Hide' : 'Show'} right sidebar
              <div className={`
                absolute bottom-full left-1/2 transform -translate-x-1/2
                border-4 border-transparent
                ${isDarkMode ? 'border-b-gray-900' : 'border-b-gray-800'}
              `}></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
