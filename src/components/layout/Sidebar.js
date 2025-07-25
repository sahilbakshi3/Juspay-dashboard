// src/components/layout/Sidebar.js
import React, { useState } from 'react';
import { 
  BarChart3, 
  FolderOpen, 
  User, 
  CreditCard, 
  Globe, 
  FileText, 
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  GraduationCap,
  Building
} from 'lucide-react';

const CollapsibleMenuItem = ({ icon: Icon, label, subItems = [], isExpanded, onToggle, hasIcon = true }) => {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
      >
        <div className="flex items-center space-x-3">
          {hasIcon && Icon && <Icon className="w-5 h-5" />}
          <span>{label}</span>
        </div>
        {subItems.length > 0 && (
          isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )
        )}
      </button>
      
      {subItems.length > 0 && (
        <div className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="ml-8 mt-1 space-y-1">
            {subItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className="flex items-center space-x-3 text-gray-600 p-2 rounded-lg hover:bg-gray-50 text-sm"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [expandedSections, setExpandedSections] = useState({
    userProfile: false,
    default: false,
    ecommerce: false,
    projects: false,
    onlineCourses: false,
    account: false,
    corporate: false,
    blog: false,
    social: false
  });

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Define sub-items for each section (currently blank as requested)
  const userProfileSubItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'documents', label: 'Documents' },
    { id: 'followers', label: 'Followers' }
  ];

  // Empty sub-items arrays for other sections (blank when opened)
  const blankSubItems = []; // Keep empty for now

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
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
          <CollapsibleMenuItem
            label="Default"
            subItems={blankSubItems}
            isExpanded={expandedSections.default}
            onToggle={() => toggleSection('default')}
            hasIcon={false}
          />
          
          <CollapsibleMenuItem
            label="eCommerce"
            subItems={blankSubItems}
            isExpanded={expandedSections.ecommerce}
            onToggle={() => toggleSection('ecommerce')}
            hasIcon={false}
          />
          
          <CollapsibleMenuItem
            label="Projects"
            subItems={blankSubItems}
            isExpanded={expandedSections.projects}
            onToggle={() => toggleSection('projects')}
            hasIcon={false}
          />
          
          <CollapsibleMenuItem
            label="Online Courses"
            subItems={blankSubItems}
            isExpanded={expandedSections.onlineCourses}
            onToggle={() => toggleSection('onlineCourses')}
            hasIcon={false}
          />
        </div>

        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 mt-6">
          Pages
        </div>
        <div className="space-y-1">
          <CollapsibleMenuItem
            icon={User}
            label="User Profile"
            subItems={userProfileSubItems}
            isExpanded={expandedSections.userProfile}
            onToggle={() => toggleSection('userProfile')}
          />
          
          <CollapsibleMenuItem
            icon={CreditCard}
            label="Account"
            subItems={blankSubItems}
            isExpanded={expandedSections.account}
            onToggle={() => toggleSection('account')}
          />
          
          <CollapsibleMenuItem
            icon={Globe}
            label="Corporate"
            subItems={blankSubItems}
            isExpanded={expandedSections.corporate}
            onToggle={() => toggleSection('corporate')}
          />
          
          <CollapsibleMenuItem
            icon={FileText}
            label="Blog"
            subItems={blankSubItems}
            isExpanded={expandedSections.blog}
            onToggle={() => toggleSection('blog')}
          />
          
          <CollapsibleMenuItem
            icon={MessageSquare}
            label="Social"
            subItems={blankSubItems}
            isExpanded={expandedSections.social}
            onToggle={() => toggleSection('social')}
          />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
