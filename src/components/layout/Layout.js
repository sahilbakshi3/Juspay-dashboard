// src/components/layout/Layout.js
import React, { useState, useEffect, useContext } from 'react';
import { X, Menu } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { ThemeContext } from '../../context/ThemeContextProvider';

const Layout = ({ children }) => {
  const { darkMode } = useContext(ThemeContext);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [leftSidebarOverlay, setLeftSidebarOverlay] = useState(false);
  const [rightSidebarOverlay, setRightSidebarOverlay] = useState(false);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {  
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      // Auto-hide sidebars on mobile and tablet
      if (mobile) {
        setLeftSidebarVisible(false);
        setRightSidebarVisible(false);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      } else if (tablet) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(false);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      } else {
        // Desktop - restore default state
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
        setLeftSidebarOverlay(false);
        setRightSidebarOverlay(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sidebar toggles with responsive behavior
  const toggleLeftSidebar = () => {
    if (isMobile || isTablet) {
      // On mobile/tablet, use overlay
      setLeftSidebarOverlay(!leftSidebarOverlay);
    } else {
      // On desktop, use normal toggle
      setLeftSidebarVisible(!leftSidebarVisible);
    }
  };

  const toggleRightSidebar = () => {
    if (isMobile || isTablet) {
      // On mobile/tablet, use overlay
      setRightSidebarOverlay(!rightSidebarOverlay);
    } else {
      // On desktop, use normal toggle
      setRightSidebarVisible(!rightSidebarVisible);
    }
  };

  // Close overlays when clicking outside
  const closeOverlays = () => {
    setLeftSidebarOverlay(false);
    setRightSidebarOverlay(false);
  };

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (leftSidebarOverlay || rightSidebarOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [leftSidebarOverlay, rightSidebarOverlay]);

  return (
    <div className={`flex h-screen ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-200 overflow-hidden`}>
      
      {/* Mobile/Tablet Overlay Backdrop */}
      {(leftSidebarOverlay || rightSidebarOverlay) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeOverlays}
        />
      )}

      {/* Left Sidebar */}
      <div className={`
        ${isMobile || isTablet 
          ? leftSidebarOverlay 
            ? 'fixed left-0 top-0 h-full z-50 transform translate-x-0 transition-transform duration-300 ease-in-out'
            : 'fixed left-0 top-0 h-full z-50 transform -translate-x-full transition-transform duration-300 ease-in-out'
          : leftSidebarVisible 
            ? 'relative'
            : 'relative'
        }
      `}>
        <Sidebar 
          isVisible={isMobile || isTablet ? leftSidebarOverlay : leftSidebarVisible} 
          isMobile={isMobile}
          isTablet={isTablet}
          onClose={() => setLeftSidebarOverlay(false)}
        />
      </div>
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col overflow-hidden min-w-0 ${
        isMobile ? 'w-full' : ''
      }`}>
        {/* Header */}
        <Header 
          leftSidebarVisible={isMobile || isTablet ? leftSidebarOverlay : leftSidebarVisible}
          rightSidebarVisible={isMobile || isTablet ? rightSidebarOverlay : rightSidebarVisible}
          toggleLeftSidebar={toggleLeftSidebar}
          toggleRightSidebar={toggleRightSidebar}
          isMobile={isMobile}
          isTablet={isTablet}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className={`${
            isMobile 
              ? 'px-4 py-4' 
              : isTablet 
                ? 'px-6 py-6' 
                : 'px-6 py-8'
          } w-full max-w-full`}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Right Sidebar */}
      <div className={`
        ${isMobile || isTablet 
          ? rightSidebarOverlay 
            ? 'fixed right-0 top-0 h-full z-50 transform translate-x-0 transition-transform duration-300 ease-in-out'
            : 'fixed right-0 top-0 h-full z-50 transform translate-x-full transition-transform duration-300 ease-in-out'
          : rightSidebarVisible 
            ? 'relative'
            : 'relative'
        }
      `}>
        <RightSidebar 
          isVisible={isMobile || isTablet ? rightSidebarOverlay : rightSidebarVisible}
          isMobile={isMobile}
          isTablet={isTablet}
          onClose={() => setRightSidebarOverlay(false)}
        />
      </div>

      {/* Mobile Navigation Helper - Shows when both sidebars are hidden */}
      {isMobile && !leftSidebarOverlay && !rightSidebarOverlay && (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 ${
          darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'
        } border rounded-full px-4 py-2 shadow-lg flex items-center space-x-4`}>
          
          {/* Left Sidebar Toggle */}
          <button
            onClick={toggleLeftSidebar}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Divider */}
          <div className={`w-px h-6 ${
            darkMode ? 'bg-gray-600' : 'bg-gray-300'
          }`} />

          {/* Right Sidebar Toggle */}
          <button
            onClick={toggleRightSidebar}
            className={`p-2 rounded-full transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            aria-label="Open activity panel"
          >
            <div className={`w-5 h-5 rounded border-2 ${
              darkMode ? 'border-gray-400' : 'border-gray-500'
            }`}>
              <div className={`w-full h-1 ${
                darkMode ? 'bg-gray-400' : 'bg-gray-500'
              } mt-1`} />
              <div className={`w-2/3 h-1 ${
                darkMode ? 'bg-gray-400' : 'bg-gray-500'
              } mt-0.5`} />
            </div>
          </button>
        </div>
      )}

      {/* Keyboard Navigation Helper */}
      <div className="sr-only">
        <button
          onClick={toggleLeftSidebar}
          className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-2 focus:bg-blue-600 focus:text-white focus:rounded"
        >
          Toggle Navigation (Alt + N)
        </button>
      </div>

      {/* Global Keyboard Shortcuts */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('keydown', function(e) {
              // Alt + N for left sidebar
              if (e.altKey && e.key === 'n') {
                e.preventDefault();
                document.querySelector('[data-testid="left-sidebar-toggle"]')?.click();
              }
              // Alt + A for right sidebar (activities)
              if (e.altKey && e.key === 'a') {
                e.preventDefault();
                document.querySelector('[data-testid="right-sidebar-toggle"]')?.click();
              }
              // Escape to close overlays
              if (e.key === 'Escape') {
                document.querySelector('[data-testid="close-overlays"]')?.click();
              }
            });
          `
        }}
      />
      
      {/* Hidden button for keyboard shortcuts */}
      <button
        data-testid="close-overlays"
        onClick={closeOverlays}
        className="sr-only"
        tabIndex={-1}
      />
    </div>
  );
};

export default Layout;