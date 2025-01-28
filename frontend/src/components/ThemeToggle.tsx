import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useAppTheme();

  return (
    <Tooltip title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        size="small"
        sx={{
          opacity: 0.7,
          '&:hover': {
            opacity: 1
          }
        }}
      >
        {isDarkMode ? (
          <Brightness7 sx={{ fontSize: '1.2rem' }} />
        ) : (
          <Brightness4 sx={{ fontSize: '1.2rem' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
