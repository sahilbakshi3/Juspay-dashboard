// src/components/common/ThemeToggle.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../context/ThemeContextProvider';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme(); // Use darkMode instead of isDarkMode
  const muiTheme = useMuiTheme();

  return (
    <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
      <IconButton 
        onClick={toggleTheme}
        sx={{ 
          ml: 1,
          color: muiTheme.palette.text.primary,
          bgcolor: muiTheme.palette.mode === 'dark' ? 'grey.800' : 'transparent',
          '&:hover': {
            bgcolor: muiTheme.palette.mode === 'dark' ? 'grey.700' : 'action.hover',
          },
        }}
      >
        {darkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
