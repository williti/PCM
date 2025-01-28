import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement;
  color?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon,
  color = '#1976d2',
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          right: -10,
          opacity: 0.1,
          transform: 'scale(2)',
        }}
      >
        {React.cloneElement(icon, { style: { fontSize: 100, color } })}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            p: 1,
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { style: { color } })}
        </Box>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'medium' }}>
        {value}
      </Typography>
    </Paper>
  );
};
