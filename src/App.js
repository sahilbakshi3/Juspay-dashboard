import React, { useContext, useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightSidebar from './components/layout/RightSidebar';

// Context Providers
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContextProvider";
import { ToastProvider } from './context/ToastContext';

// Pages
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  
  // Responsive state management
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(window.innerWidth >= 1024);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(window.innerWidth >= 1280);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Auto-hide sidebars on smaller screens
      if (width < 1024) {
        setLeftSidebarVisible(false);
      }
      if (width < 1280) {
        setRightSidebarVisible(false);
      }
      
      // Auto-show sidebars on larger screens when appropriate
      if (width >= 1024 && width < 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(false);
      }
      if (width >= 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle functions
  const toggleLeftSidebar = () => {
    setLeftSidebarVisible(prev => !prev);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(prev => !prev);
  };

  // Dashboard refresh function
  const handleDashboardRefresh = useCallback(() => {
    setDashboardRefreshKey(prev => prev + 1);
  }, []);

  // Close sidebars when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (windowWidth < 1024) {
      setLeftSidebarVisible(false);
    }
    if (windowWidth < 1280) {
      setRightSidebarVisible(false);
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-black dark:text-white relative overflow-hidden">
        
        {/* Mobile/Tablet Overlay */}
        {((leftSidebarVisible && windowWidth < 1024) || (rightSidebarVisible && windowWidth < 1280)) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
            onClick={handleOverlayClick}
          />
        )}

        {/* Left Sidebar - Responsive positioning */}
        <div className={`
          ${windowWidth < 1024 ? 'fixed' : 'relative'} 
          inset-y-0 left-0 z-40 
          transform transition-transform duration-300 ease-in-out
          ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
          ${windowWidth >= 1024 ? (leftSidebarVisible ? 'block' : 'hidden') : ''}
        `}>
          <Sidebar 
            isVisible={leftSidebarVisible} 
            isMobile={windowWidth < 1024}
            onClose={() => setLeftSidebarVisible(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Header with responsive props */}
          <Header 
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            onRefreshDashboard={handleDashboardRefresh}
            isMobile={windowWidth < 1024}
            isTablet={windowWidth < 1280}
          />

          {/* Page Routes */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-6">
              <Switch>
                <Route 
                  exact 
                  path="/" 
                  render={() => (
                    <DashboardPage 
                      refreshKey={dashboardRefreshKey} 
                      isMobile={windowWidth < 768}
                      isTablet={windowWidth < 1024}
                    />
                  )}
                />
                <Route 
                  path="/overview" 
                  render={() => (
                    <OrdersPage 
                      isMobile={windowWidth < 768}
                      isTablet={windowWidth < 1024}
                    />
                  )}
                />
                <Route 
                  path="/projects" 
                  render={() => (
                    <DashboardPage 
                      refreshKey={dashboardRefreshKey}
                      isMobile={windowWidth < 768}
                      isTablet={windowWidth < 1024}
                    />
                  )}
                />
              </Switch>
            </div>
          </main>
        </div>

        {/* Right Sidebar - Responsive positioning */}
        <div className={`
          ${windowWidth < 1280 ? 'fixed' : 'relative'} 
          inset-y-0 right-0 z-40 
          transform transition-transform duration-300 ease-in-out
          ${rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'}
          ${windowWidth >= 1280 ? (rightSidebarVisible ? 'block' : 'hidden') : ''}
        `}>
          <RightSidebar 
            isVisible={rightSidebarVisible} 
            isMobile={windowWidth < 1024}
            onClose={() => setRightSidebarVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeContextProvider>
      <ToastProvider>
        <Router>
          <AppContent />
        </Router>
      </ToastProvider>
    </ThemeContextProvider>
  );
};

export default App;