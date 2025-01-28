import React from 'react';
import { Box, Typography } from '@mui/material';
import { AttachMoney as MoneyIcon } from '@mui/icons-material';

interface TotalValueDisplayProps {
  month: string;
  value: number;
}

export const TotalValueDisplay: React.FC<TotalValueDisplayProps> = ({ month, value }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'success.main',
        color: 'white',
        py: 0.5,
        px: 2,
        borderRadius: 1,
        boxShadow: 1,
        alignSelf: 'flex-end',
        mb: 2
      }}
    >
      <MoneyIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
      <Box>
        <Typography variant="caption" sx={{ opacity: 0.9 }}>
          Total em {month}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
          R$ {value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Typography>
      </Box>
    </Box>
  );
};
