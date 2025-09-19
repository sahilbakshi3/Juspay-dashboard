// src/components/common/ThemeToggle.js
import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../../context/ThemeContextProvider'; // adjust path if needed

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Tooltip title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          ml: 1,
          color: muiTheme.palette.text.primary,
          bgcolor: darkMode ? 'transparent' : 'transparent',
          '&:hover': {
            bgcolor: darkMode ? 'rgba(255,255,255,0.04)' : 'action.hover',
          },
        }}
        aria-label="toggle-theme"
      >
        {darkMode ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
