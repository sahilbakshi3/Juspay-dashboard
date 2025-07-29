// src/components/layout/Sidebar.js
import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContextProvider';
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
  Building,
  ChartPie,
  FolderClosed,
  BookOpen,
  ContactRound,
  Users,
  MessagesSquare
} from 'lucide-react';

const CollapsibleMenuItem = ({ icon: Icon, label, subItems = [], isExpanded, onToggle, hasIcon = true, onClick, darkMode }) => {
  return (
    <div>
      <button
        onClick={onClick || onToggle}
        className={`w-full flex items-center justify-between space-x-3 p-2 rounded-lg transition-colors ${
          darkMode 
            ? 'text-gray-300 hover:bg-gray-700' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
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
              <button
                key={item.id}
                onClick={item.disabled ? undefined : item.onClick}
                disabled={item.disabled}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm text-left transition-colors ${
                  item.disabled
                    ? (darkMode ? 'text-gray-600 cursor-not-allowed italic' : 'text-gray-400 cursor-not-allowed italic')
                    : item.isActive 
                      ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700')
                      : (darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isVisible }) => {
  const history = useHistory();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);
  
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

  const handleNavigation = (path) => {
    console.log('Navigating to:', path); // Debug log
    history.push(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Define sub-items for User Profile with routing
  const userProfileSubItems = [
    { 
      id: 'overview', 
      label: 'Overview',
      onClick: () => handleNavigation('/overview'),
      isActive: isActive('/overview'),
      disabled: false
    },
    { 
      id: 'projects', 
      label: 'Projects',
      onClick: () => handleNavigation('/projects'),
      isActive: isActive('/projects'),
      disabled: false
    },
    { 
      id: 'campaigns', 
      label: 'Campaigns', 
      onClick: () => handleNavigation('/campaigns'), 
      isActive: isActive('/campaigns'),
      disabled: false
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      onClick: () => handleNavigation('/documents'), 
      isActive: isActive('/documents'),
      disabled: false
    },
    { 
      id: 'followers', 
      label: 'Followers', 
      onClick: () => handleNavigation('/followers'), 
      isActive: isActive('/followers'),
      disabled: false
    }
  ];

  // Empty sub-items for other sections (showing placeholder message)
  const blankSubItems = [
    { 
      id: 'placeholder', 
      label: 'No items available', 
      onClick: () => {}, 
      isActive: false,
      disabled: true
    }
  ];

  // Dashboard sub-items with placeholder
  const dashboardSubItems = [
    { 
      id: 'placeholder', 
      label: 'No items available', 
      onClick: () => {}, 
      isActive: false,
      disabled: true
    }
  ];

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      isVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
    } shadow-sm border-r overflow-hidden ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="w-64"> {/* Fixed width content wrapper */}
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className={`font-semibold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>ByeWind</span>
          </div>
        </div>

        <nav className="px-6 space-y-1">
          <div className={`text-xs font-medium uppercase tracking-wider mb-3 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Favorites
          </div>
          <div className="space-y-1">
            <button 
              onClick={() => handleNavigation('/overview')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors ${
                isActive('/overview') 
                  ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              }`}
            >
              
              <span>Overview/Order List</span>
            </button>
            <button 
              onClick={() => handleNavigation('/projects')}
              className={`w-full flex items-center space-x-3 p-2 rounded-lg text-left transition-colors ${
                isActive('/projects') 
                  ? (darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700')
                  : (darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100')
              }`}
            >
              
              <span>Projects</span>
            </button>
          </div>

          <div className={`text-xs font-medium uppercase tracking-wider mb-3 mt-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Dashboards
          </div>
          <div className="space-y-1">
            <CollapsibleMenuItem
              label="Default"
              icon={ChartPie}
              subItems={dashboardSubItems}
              isExpanded={expandedSections.default}
              onToggle={() => toggleSection('default')}
              onClick={() => handleNavigation('/')}
              hasIcon={ChartPie}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              label="eCommerce"
              icon={ShoppingCart}
              subItems={dashboardSubItems}
              isExpanded={expandedSections.ecommerce}
              onToggle={() => toggleSection('ecommerce')}
              hasIcon={ShoppingCart}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              label="Projects"
              icon={FolderClosed}
              subItems={dashboardSubItems}
              isExpanded={expandedSections.projects}
              onToggle={() => toggleSection('projects')}
              hasIcon={FolderClosed}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              label="Online Courses"
              icon={BookOpen}
              subItems={dashboardSubItems}
              isExpanded={expandedSections.onlineCourses}
              onToggle={() => toggleSection('onlineCourses')}
              hasIcon={BookOpen}
              darkMode={darkMode}
            />
          </div>

          <div className={`text-xs font-medium uppercase tracking-wider mb-3 mt-6 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Pages
          </div>
          <div className="space-y-1">
            <CollapsibleMenuItem
              icon={ContactRound}
              label="User Profile"
              subItems={userProfileSubItems}
              isExpanded={expandedSections.userProfile}
              onToggle={() => toggleSection('userProfile')}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              icon={CreditCard}
              label="Account"
              subItems={blankSubItems}
              isExpanded={expandedSections.account}
              onToggle={() => toggleSection('account')}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              icon={Users}
              label="Corporate"
              subItems={blankSubItems}
              isExpanded={expandedSections.corporate}
              onToggle={() => toggleSection('corporate')}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              icon={FileText}
              label="Blog"
              subItems={blankSubItems}
              isExpanded={expandedSections.blog}
              onToggle={() => toggleSection('blog')}
              darkMode={darkMode}
            />
            
            <CollapsibleMenuItem
              icon={MessagesSquare}
              label="Social"
              subItems={blankSubItems}
              isExpanded={expandedSections.social}
              onToggle={() => toggleSection('social')}
              darkMode={darkMode}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
