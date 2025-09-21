// src/components/common/ThemeToggle.js - Optimized for instant response
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContextProvider';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  // Optimized click handler with immediate visual feedback
  const handleToggle = () => {
    // Pre-apply styles immediately for instant visual feedback
    document.documentElement.style.setProperty(
      '--theme-transition-duration', 
      '100ms'
    );
    
    toggleTheme();

    // Reset transition duration after theme change
    setTimeout(() => {
      document.documentElement.style.removeProperty('--theme-transition-duration');
    }, 100);
  };

  return (
    <Tooltip 
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      // Faster tooltip transitions
      enterDelay={300}
      leaveDelay={100}
      TransitionProps={{
        timeout: 150
      }}
    >
      <IconButton
        onClick={handleToggle}
        sx={{
          ml: 1,
          color: muiTheme.palette.text.primary,
          bgcolor: 'transparent',
          // Optimized hover transitions
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'action.hover',
            transform: 'scale(1.05)',
          },
          '&:active': {
            transform: 'scale(0.95)',
            transition: 'transform 100ms cubic-bezier(0.4, 0, 0.2, 1)',
          },
          // Add subtle animation to the icon
          '& .MuiSvgIcon-root': {
            transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'rotate(180deg)',
            },
          },
        }}
        aria-label="toggle-theme"
        // Add immediate visual feedback
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = '';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = '';
        }}
      >
        {darkMode ? (
          <LightMode 
            sx={{ 
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              color: '#FFF59D' // Slight yellow tint for light mode icon
            }} 
          />
        ) : (
          <DarkMode 
            sx={{ 
              transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
              color: '#424242' // Darker tint for dark mode icon
            }} 
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;