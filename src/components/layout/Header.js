import React, { useContext } from 'react';
import { Bell, Search, Notebook, SunMedium, Moon, RotateCcw, Star } from 'lucide-react';
import { ThemeContext } from "../../context/ThemeContextProvider";

const Header = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    } border-b px-6 py-4 transition-colors duration-200`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors`}>
              <Notebook className="w-5 h-5" />
            </button>
            <button className={`p-2 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors`}>
              <Star className="w-5 h-5" />
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
              className={`pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDarkMode 
                ? 'text-yellow-400 hover:text-yellow-300 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-orange-500 hover:bg-gray-100'
            }`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <SunMedium className="w-6 h-6" />
            ) : (
              <SunMedium className="w-6 h-6" />
            )}
          </button>
          
          <button className={`p-2 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}>
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className={`p-2 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}>
            <Bell className="w-5 h-5" />
          </button>
          <button className={`p-2 ${
            isDarkMode 
              ? 'text-gray-400 hover:text-gray-200' 
              : 'text-gray-500 hover:text-gray-700'
          } transition-colors`}>
            <Notebook className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;