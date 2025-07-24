// src/components/layout/Sidebar.js

import React from 'react';
import { 
  BarChart3, 
  FolderOpen, 
  User, 
  CreditCard, 
  Globe, 
  FileText, 
  MessageSquare 
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="font-semibold text-gray-900">ByeWind</span>
        </div>
      </div>

      <nav className="px-6 space-y-1">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
          Favorites
        </div>
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <BarChart3 className="w-5 h-5" />
            <span>Overview</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <FolderOpen className="w-5 h-5" />
            <span>Projects</span>
          </a>
        </div>

        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-6">
          Dashboards
        </div>
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 text-gray-900 p-2 rounded-lg bg-blue-50 border-r-2 border-blue-600">
            <span>Default</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-blue-600 p-2 rounded-lg hover:bg-gray-100">
            <span>eCommerce</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <span>Projects</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <span>Online Courses</span>
          </a>
        </div>

        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-6">
          Pages
        </div>
        <div className="space-y-1">
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <User className="w-5 h-5" />
            <span>User Profile</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <CreditCard className="w-5 h-5" />
            <span>Account</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <Globe className="w-5 h-5" />
            <span>Corporate</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <FileText className="w-5 h-5" />
            <span>Blog</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100">
            <MessageSquare className="w-5 h-5" />
            <span>Social</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;