// src/context/ThemeContextProvider.js
import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

const ThemeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false); // Changed from isDarkMode to darkMode

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Save theme preference to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', darkMode);
    setDarkMode(prevMode => !prevMode);
  };

  // Create MUI theme based on darkMode
  const muiTheme = useMemo(() => {
    console.log('Creating MUI theme with mode:', darkMode ? 'dark' : 'light');
    
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
          main: darkMode ? '#90caf9' : '#1976d2',
        },
        secondary: {
          main: darkMode ? '#ce93d8' : '#dc004e',
        },
        background: {
          default: darkMode ? '#121212' : '#fafafa',
          paper: darkMode ? '#1e1e1e' : '#ffffff',
        },
        text: {
          primary: darkMode ? '#ffffff' : '#000000',
          secondary: darkMode ? '#b3b3b3' : '#666666',
        },
        divider: darkMode ? '#333333' : '#e0e0e0',
      },
    });
  }, [darkMode]);

  const value = {
    darkMode,        // Match your App.js expectation
    isDarkMode: darkMode, // Keep for backward compatibility
    toggleTheme,
    muiTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
