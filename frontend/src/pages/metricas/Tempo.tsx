import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const Tempo = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Métricas de Tempo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tempo Médio de Atendimento
              </Typography>
              <Typography variant="h4">2.5h</Typography>
              <Typography variant="body2" color="text.secondary">
                Média de tempo para início do atendimento
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tempo Total de Manutenção
              </Typography>
              <Typography variant="h4">180h</Typography>
              <Typography variant="body2" color="text.secondary">
                Total de horas em manutenção no mês
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tempo;
