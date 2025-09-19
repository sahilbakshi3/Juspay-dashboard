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
  const [darkMode, setDarkMode] = useState(false);

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

  // Save theme preference to localStorage and toggle `dark` class on <html>
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  // Create MUI theme based on darkMode (dark = black)
  const muiTheme = useMemo(() => {
    const isDark = darkMode === true;

    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light',
        primary: {
          main: isDark ? '#90caf9' : '#1976d2',
        },
        secondary: {
          main: isDark ? '#ce93d8' : '#dc004e',
        },
        background: {
          // full black page background
          default: isDark ? '#000000' : '#fafafa',
          // slightly off-black for cards / surfaces so elements have a subtle separation
          // change to '#000000' if you want absolutely no contrast between body and cards
          paper: isDark ? '#0a0a0a' : '#ffffff',
        },
        text: {
          primary: isDark ? '#FFFFFF' : '#111827',
          secondary: isDark ? '#cfcfcf' : '#6b7280',
        },
        divider: isDark ? 'rgba(255,255,255,0.06)' : '#e0e0e0',
      },

      // component overrides so MUI built-in components respect the black backgrounds
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: isDark ? '#000000' : undefined,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? '#0a0a0a' : undefined,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? '#0a0a0a' : undefined,
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: isDark ? '#0a0a0a' : undefined,
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            paper: {
              backgroundColor: isDark ? '#0a0a0a' : undefined,
              boxShadow: isDark ? '0 6px 24px rgba(0,0,0,0.6)' : undefined,
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDark ? '#111111' : undefined,
              color: isDark ? '#FFFFFF' : undefined,
              boxShadow: isDark ? '0 4px 14px rgba(0,0,0,0.6)' : undefined,
              fontSize: '0.75rem',
            },
            arrow: {
              color: isDark ? '#111111' : undefined,
            },
          },
          defaultProps: {
            // Tooltips render in a portal by default, but ensure high zIndex so they sit above sidebars
            PopperProps: {
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: false,
                  },
                },
              ],
            },
          },
        },
        MuiBackdrop: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : undefined,
            },
          },
        },
      },

      // global z-index guidance (optional — you can tune to your layout)
      zIndex: {
        appBar: 1300,
        drawer: 1200,
        modal: 1400,
        tooltip: 2000, // ensure tooltips are above sidebars
      },
    });
  }, [darkMode]);

  const value = {
    darkMode,
    isDarkMode: darkMode, // backward compatibility
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
