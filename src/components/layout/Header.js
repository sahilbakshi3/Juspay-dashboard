import React from 'react';
import { Bell, Search, Notebook, SunMedium, RotateCcw, Star } from 'lucide-react';
import { ThemeContext } from "../../context/ThemeContextProvider";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Notebook className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700">
              <Star className="w-5 h-5" />
            </button>
            <span className="text-gray-500">Dashboards</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Default</span>
          </div>
        </div>
        
        <div className="h-1.75 w-19.75 flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <SunMedium  className="w-6 h-6" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Notebook className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

