import React, { useContext } from 'react';
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

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen flex transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Page Routes */}
          <main className="flex-1 p-6">
            <Switch>
              <Route exact path="/" component={DashboardPage} />
              <Route path="/overview" component={OrdersPage} />
            </Switch>
          </main>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
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
