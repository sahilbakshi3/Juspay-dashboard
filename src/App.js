import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import RightSidebar from './components/layout/RightSidebar';

// Theme Context
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContextProvider";

// Pages
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext); // Access the theme state
  
  // Sidebar visibility state
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  // Toggle functions
  const toggleLeftSidebar = () => {
    setLeftSidebarVisible(prev => !prev);
  };

  const toggleRightSidebar = () => {
    setRightSidebarVisible(prev => !prev);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* Left Sidebar */}
        <Sidebar isVisible={leftSidebarVisible} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header 
            leftSidebarVisible={leftSidebarVisible}
            rightSidebarVisible={rightSidebarVisible}
            toggleLeftSidebar={toggleLeftSidebar}
            toggleRightSidebar={toggleRightSidebar}
          />

          {/* Page Routes */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="p-6">
              <Switch>
                <Route exact path="/" component={DashboardPage} />
                <Route path="/overview" component={OrdersPage} />
                <Route path="/projects" component={DashboardPage} /> {/* Add this route since it's referenced in sidebar */}
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
      <Router>
        <AppContent />
      </Router>
    </ThemeContextProvider>
  );
};

export default App;