// src/App.js - Updated with SearchProvider
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightSidebar from './components/layout/RightSidebar';

// Context Providers
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContextProvider";
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext'; // Add this import

// Pages
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);

  // Responsive state
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1280 : true);
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      if (width < 1024) {
        setLeftSidebarVisible(false);
      }
      if (width < 1280) {
        setRightSidebarVisible(false);
      }

      if (width >= 1024 && width < 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(false);
      }
      if (width >= 1280) {
        setLeftSidebarVisible(true);
        setRightSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle functions
  const toggleLeftSidebar = () => setLeftSidebarVisible(prev => !prev);
  const toggleRightSidebar = () => setRightSidebarVisible(prev => !prev);

  // Dashboard refresh
  const handleDashboardRefresh = useCallback(() => {
    setDashboardRefreshKey(prev => prev + 1);
  }, []);

  // Close sidebars when clicking overlay on mobile
  const handleOverlayClick = () => {
    if (windowWidth < 1024) setLeftSidebarVisible(false);
    if (windowWidth < 1280) setRightSidebarVisible(false);
  };

  // App-level styles for dark/light
  const appBg = darkMode ? '#000000' : '#ffffff';
  const contentSurface = darkMode ? '#0a0a0a' : '#ffffff';
  const textColor = darkMode ? '#FFFFFF' : '#111827';

  return (
    <div style={{ background: appBg, color: textColor, minHeight: '100vh' }}>
      <div
        className="min-h-screen flex transition-colors duration-300 relative overflow-hidden"
        style={{
          background: appBg,
          color: textColor,
        }}
      >
        {/* Mobile/Tablet Overlay (shown when sidebars are visible on small screens) */}
        {((leftSidebarVisible && windowWidth < 1024) || (rightSidebarVisible && windowWidth < 1280)) && (
          <div
            onClick={handleOverlayClick}
            role="button"
            aria-label="Close overlays"
            tabIndex={0}
            className="fixed inset-0 z-30 transition-opacity duration-300"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)'
            }}
          />
        )}

        {/* Left Sidebar - Responsive positioning */}
        <div
          className={`
            ${windowWidth < 1024 ? 'fixed' : 'relative'}
            inset-y-0 left-0 z-40
            transform transition-transform duration-300 ease-in-out
            ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
            ${windowWidth >= 1024 ? (leftSidebarVisible ? 'block' : 'hidden') : ''}
          `}
        >
          <Sidebar
            isVisible={leftSidebarVisible}
            isMobile={windowWidth < 1024}
            onClose={() => setLeftSidebarVisible(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            onRefreshDashboard={handleDashboardRefresh}
            isMobile={windowWidth < 1024}
            isTablet={windowWidth < 1280}
          />

          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-3 sm:p-4 lg:p-6" style={{ background: 'transparent' }}>
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
        <div
          className={`
            ${windowWidth < 1280 ? 'fixed' : 'relative'}
            inset-y-0 right-0 z-40
            transform transition-transform duration-300 ease-in-out
            ${rightSidebarVisible ? 'translate-x-0' : 'translate-x-full'}
            ${windowWidth >= 1280 ? (rightSidebarVisible ? 'block' : 'hidden') : ''}
          `}
        >
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
    <SearchProvider> {/* Add SearchProvider as the outermost provider */}
      <ThemeContextProvider>
        <ToastProvider>
          <Router>
            <AppContent />
          </Router>
        </ToastProvider>
      </ThemeContextProvider>
    </SearchProvider>
  );
};

export default App;