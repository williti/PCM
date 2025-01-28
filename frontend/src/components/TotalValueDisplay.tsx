import React from 'react';
import { Box, Typography } from '@mui/material';

interface TotalValueDisplayProps {
  value: number;
  label?: string;
}

// Formatar valor em Real Brasileiro
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const TotalValueDisplay: React.FC<TotalValueDisplayProps> = ({ 
  value,
  label = 'Total'
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'success.main',
        color: 'white',
        px: 2,
        py: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="caption" sx={{ mr: 1 }}>
        {label}:
      </Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
        {formatCurrency(value)}
      </Typography>
    </Box>
  );
};
