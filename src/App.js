import React, { useContext, useState, useCallback } from 'react';
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
  
  // Sidebar visibility state
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);
  
  // Dashboard refresh state
  const [dashboardRefreshKey, setDashboardRefreshKey] = useState(0);

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

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* Left Sidebar */}
        <Sidebar isVisible={leftSidebarVisible} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header with refresh functionality */}
          <Header 
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
            onRefreshDashboard={handleDashboardRefresh}
          />

          {/* Page Routes */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-6">
              <Switch>
                <Route 
                  exact 
                  path="/" 
                  render={() => <DashboardPage refreshKey={dashboardRefreshKey} />}
                />
                <Route 
                  path="/overview" 
                  component={OrdersPage} 
                />
                <Route 
                  path="/projects" 
                  render={() => <DashboardPage refreshKey={dashboardRefreshKey} />}
                />
              </Switch>
            </div>
          </main>
        </div>

        {/* Right Sidebar */}
        <RightSidebar isVisible={rightSidebarVisible} />
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
