import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import TimerIcon from '@mui/icons-material/Timer';

const Falhas = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
        Métricas de Falhas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                MTTR
              </Typography>
              <Typography variant="h4">4.5h</Typography>
              <Typography variant="body2" color="text.secondary">
                Tempo médio de reparo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Taxa de Conclusão
              </Typography>
              <Typography variant="h4">85%</Typography>
              <Typography variant="body2" color="text.secondary">
                Ordens concluídas no prazo
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Falhas;
