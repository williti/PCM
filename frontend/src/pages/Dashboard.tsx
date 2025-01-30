import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Container,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  MonetizationOn as MonetizationOnIcon,
  Engineering as EngineeringIcon,
  Speed as SpeedIcon,
  Timeline as TimelineIcon,
  Update as UpdateIcon,
  Pending as PendingIcon,
  Add as AddIcon,
  Insights as InsightsIcon,
  Message as MessageIcon,
  Build as BuildIcon,
  Settings as SettingsIcon,
  Paid as PaidIcon,
  WarningAmber as WarningAmberIcon,
  NotificationsActive as NotificationsActiveIcon,
  AttachMoney,
  Info as InfoIcon
} from '@mui/icons-material';
import { MetricCard } from '../components/MetricCard';
import { MaintenanceFilter } from '../components/filters/MaintenanceFilter';
import { MaintenanceCostChart } from '../components/charts/MaintenanceCostChart';
import { TotalCard } from '../components/TotalCard';
import { MAINTENANCE_AREAS, MaintenanceArea } from '../types/maintenance';
import inventory from '../data/inventory.json';
import { GaugeChart } from '../components/charts/GaugeChart';

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const Dashboard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedGraphArea, setSelectedGraphArea] = useState<string>('TODAS');
  const [selectedFilters, setSelectedFilters] = useState({
    equipment1: '',
    equipment2: '',
    equipment3: '',
  });

  // Dados mockados para os totais
  const mockTotalData = {
    totalGeral: 89674.75,
    totalPorArea: {
      'TODAS': 89674.75,
      'MECÂNICA': 15600.00,
      'ELÉTRICA': 28900.00,
      'HIDRÁULICA': 8874.75,
      'ELETRÔNICA': 12500.00,
      'PNEUMÁTICA': 7500.00,
      'INSTRUMENTAÇÃO': 9800.00,
      'AUTOMAÇÃO': 6500.00,
    }
  };

  const handleFilterChange = (filters: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  const handleGraphAreaChange = (event: SelectChangeEvent) => {
    setSelectedGraphArea(event.target.value as string);
  };

  const getAvailableEquipments = (equipmentNumber: 1 | 2 | 3) => {
    // Simulando uma lista de equipamentos
    return [
      { id: '', name: 'Nenhum' },
      { id: 'PRENSA P2', name: 'PRENSA P2' },
      { id: 'PRENSA P3', name: 'PRENSA P3' },
      { id: 'TORNO CNC', name: 'TORNO CNC' },
      { id: 'FRESA', name: 'FRESA' },
    ];
  };

  const getSelectedEquipments = () => {
    return Object.values(selectedFilters).filter(Boolean);
  };

  // Calcula o total atual baseado nos filtros
  const currentTotal = useMemo(() => {
    const baseTotal = mockTotalData.totalGeral;
    const selectedEquips = getSelectedEquipments();
    return selectedEquips.length > 0 
      ? baseTotal * (selectedEquips.length / 3) 
      : baseTotal;
  }, [selectedFilters]);

  // Calcula o total do gráfico baseado na área selecionada
  const graphTotal = useMemo(() => {
    return mockTotalData.totalPorArea[selectedGraphArea] || 0;
  }, [selectedGraphArea]);

  // Estilo para animação de rolagem
  const scrollingTextKeyframes = `
    @keyframes scrollText {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;

  const criticalTasks = [
    'Manutenção Preventiva #123 - Vencida há 2 dias',
    'Calibração #456 - Vence hoje',
    'Inspeção #789 - Vence em 1 dia',
  ].join(' • ');

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      bgcolor: '#f0f2f5', // Fundo da página mais escuro
      minHeight: '100vh'
    }}>
      {/* Cabeçalho */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontSize: '1.75rem',
            fontWeight: 400,
            display: { xs: 'none', sm: 'block' } 
          }}
        >
          Dashboard
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ 
              bgcolor: '#2196f3',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#1976d2'
              }
            }}
            startIcon={<AddIcon />}
          >
            Nova OS
          </Button>
          <Button
            variant="contained"
            sx={{ 
              bgcolor: '#e91e63',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#d81b60'
              }
            }}
            startIcon={<InsightsIcon />}
          >
            Análise
          </Button>
          <Button
            variant="contained"
            sx={{ 
              bgcolor: '#03a9f4',
              textTransform: 'none',
              borderRadius: 1,
              '&:hover': {
                bgcolor: '#0288d1'
              }
            }}
            startIcon={<MessageIcon />}
          >
            Comunicação
          </Button>
        </Stack>
      </Box>

      {/* Grid principal */}
      <Grid 
        container 
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        sx={{ width: '100%', margin: 0 }}
      >
        {/* Coluna da Esquerda - Cards */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {/* Cards de valores totais do mês atual */}
            <Grid item xs={12}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' } 
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: '#fff', // Container branco
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ color: '#4caf50', display: 'flex', alignItems: 'center' }}>
                    <AttachMoney sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Total em {MONTHS[new Date().getMonth()]}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      R$ 89.674,75
                    </Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: '#fff', // Container branco
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ color: '#03a9f4', display: 'flex', alignItems: 'center' }}>
                    <BuildIcon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Preventiva em {MONTHS[new Date().getMonth()]}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      R$ 35.869,90
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MonetizationOnIcon sx={{ color: '#f44336', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      OS Críticas
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Necessitam atenção imediata
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EngineeringIcon sx={{ color: '#2196f3', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Total de OS em Aberto
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  28
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {MONTHS[selectedMonth - 1]}/{selectedYear}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BuildIcon sx={{ color: '#ff9800', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      OS em Andamento
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  12
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Em execução
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TimelineIcon sx={{ color: '#4caf50', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      Disponibilidade
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  98.5%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disponibilidade de Equipamentos
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <UpdateIcon sx={{ color: '#9c27b0', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      MTBF
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  120h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tempo Médio entre Falhas
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper 
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: '#fff', // Container branco
                  borderRadius: 1,
                  height: '100%'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PendingIcon sx={{ color: '#ff5722', fontSize: 24 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      MTTR
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <InfoIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  </IconButton>
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 500 }}>
                  4h
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tempo Médio de Reparo
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Coluna da Direita - Gráfico */}
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2,
              bgcolor: '#fff', // Container branco
              borderRadius: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Filtros dentro do Paper */}
            <Box sx={{ mb: 3 }}>
              <MaintenanceFilter
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                selectedEquipment1={selectedFilters.equipment1}
                selectedEquipment2={selectedFilters.equipment2}
                selectedEquipment3={selectedFilters.equipment3}
                selectedArea={selectedGraphArea}
                onYearChange={setSelectedYear}
                onMonthChange={setSelectedMonth}
                onAreaChange={setSelectedGraphArea}
                onEquipment1Change={(equipment) => handleFilterChange({ equipment1: equipment })}
                onEquipment2Change={(equipment) => handleFilterChange({ equipment2: equipment })}
                onEquipment3Change={(equipment) => handleFilterChange({ equipment3: equipment })}
                getAvailableEquipments={getAvailableEquipments}
              />
            </Box>

            {/* Gráfico */}
            <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
              <MaintenanceCostChart
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                selectedArea={selectedGraphArea}
                selectedEquipment1={selectedFilters.equipment1}
                selectedEquipment2={selectedFilters.equipment2}
                selectedEquipment3={selectedFilters.equipment3}
                onYearChange={setSelectedYear}
                onMonthChange={setSelectedMonth}
                onAreaChange={setSelectedGraphArea}
                onEquipment1Change={(equipment) => handleFilterChange({ equipment1: equipment })}
                onEquipment2Change={(equipment) => handleFilterChange({ equipment2: equipment })}
                onEquipment3Change={(equipment) => handleFilterChange({ equipment3: equipment })}
                getAvailableEquipments={getAvailableEquipments}
              />
            </Box>

            {/* Medidores */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-around',
                mt: 2,
                pt: 2,
                borderTop: '1px solid #e0e0e0'
              }}
            >
              <GaugeChart
                value={85}
                title="Meta Zero Falhas"
              />
              <GaugeChart
                value={92}
                title="OS Programadas Concluídas"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
