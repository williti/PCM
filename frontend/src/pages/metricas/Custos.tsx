import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const Custos = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Métricas de Custos
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Custo Total de Manutenção
              </Typography>
              <Typography variant="h4">R$ 45.000</Typography>
              <Typography variant="body2" color="text.secondary">
                Total gasto em manutenção no mês
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Custo Médio por Equipamento
              </Typography>
              <Typography variant="h4">R$ 2.500</Typography>
              <Typography variant="body2" color="text.secondary">
                Média de custo por equipamento
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Custos;
