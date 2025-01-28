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
  ListItemText
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
  NotificationsActive as NotificationsActiveIcon
} from '@mui/icons-material';
import { MetricCard } from '../components/MetricCard';
import { MaintenanceFilter } from '../components/filters/MaintenanceFilter';
import { MaintenanceCostChart } from '../components/charts/MaintenanceCostChart';
import { TotalCard } from '../components/TotalCard';
import { MAINTENANCE_AREAS, MaintenanceArea } from '../types/maintenance';
import inventory from '../data/inventory.json';

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
    <Container maxWidth={false} sx={{ p: 3 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 500, mb: 2 }}>
          Dashboard
        </Typography>

        {/* Linha de botões e cards */}
        <Box sx={{ 
          display: 'flex',
          gap: 3,
          alignItems: 'center',
        }}>
          {/* Coluna da esquerda - Botões */}
          <Stack 
            direction="row"
            spacing={2}
            sx={{ 
              width: '30%',
              minWidth: '420px',
            }}
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              sx={{ 
                textTransform: 'none',
                height: 48,
                fontSize: '0.95rem',
                flex: 1,
                '& .MuiButton-startIcon': {
                  marginRight: 1,
                },
              }}
            >
              Nova OS
            </Button>
            <Button
              variant="contained"
              sx={{ 
                bgcolor: '#9c27b0',
                '&:hover': {
                  bgcolor: '#7b1fa2',
                },
                textTransform: 'none',
                height: 48,
                fontSize: '0.95rem',
                flex: 1,
                '& .MuiButton-startIcon': {
                  marginRight: 1,
                },
              }}
              startIcon={<InsightsIcon />}
            >
              Insights
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<MessageIcon />}
              sx={{ 
                textTransform: 'none',
                height: 48,
                fontSize: '0.95rem',
                flex: 1,
                '& .MuiButton-startIcon': {
                  marginRight: 1,
                },
              }}
            >
              Mensagem
            </Button>
          </Stack>

          {/* Coluna da direita - Cards */}
          <Box sx={{ display: 'flex', gap: 2, width: '70%' }}>
            {/* Card de Pendências Críticas */}
            <Paper
              elevation={0}
              sx={{
                flex: 2,
                p: '12px 16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                bgcolor: '#fff3e0',
                borderRadius: 1,
                height: 48,
                overflow: 'hidden',
              }}
            >
              <WarningAmberIcon color="warning" />
              <Box sx={{ overflow: 'hidden', width: '100%' }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ lineHeight: 1, mb: 0.5 }}>
                  Pendências Críticas
                </Typography>
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <style>{scrollingTextKeyframes}</style>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      lineHeight: 1,
                      whiteSpace: 'nowrap',
                      animation: 'scrollText 20s linear infinite',
                      '&:hover': {
                        animationPlayState: 'paused',
                      },
                    }}
                  >
                    {criticalTasks}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Card de Valor Total */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: '#e8f5e9',
                borderRadius: 1,
                height: 48,
              }}
            >
              <MonetizationOnIcon color="success" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ lineHeight: 1, mb: 0.5 }}>
                  Total em Janeiro
                </Typography>
                <Typography variant="h6" sx={{ lineHeight: 1, fontSize: '1.1rem' }}>
                  {mockTotalData.totalPorArea[selectedGraphArea].toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* Grid principal */}
      <Grid container spacing={3}>
        {/* Coluna da Esquerda - 40% */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="OS Críticas"
                value="5"
                icon={<MonetizationOnIcon />}
                subtitle="Necessitam atenção imediata"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="Total de OS em Aberto"
                value="28"
                icon={<EngineeringIcon />}
                subtitle={`${MONTHS[selectedMonth - 1]}/${selectedYear}`}
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="OS em Andamento"
                value="12"
                icon={<SpeedIcon />}
                subtitle="Em execução"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="Disponibilidade"
                value="98.5%"
                icon={<TimelineIcon />}
                subtitle="Disponibilidade de Equipamentos"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="MTBF"
                value="120h"
                icon={<UpdateIcon />}
                subtitle="Tempo Médio entre Falhas"
                showInfo
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                title="MTTR"
                value="4h"
                icon={<PendingIcon />}
                subtitle="Tempo Médio de Reparo"
                showInfo
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Coluna da Direita - Gráfico - 60% */}
        <Grid item xs={12} md={7}>
          {/* Filtros */}
          <Box sx={{ mb: 2 }}>
            <MaintenanceFilter
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedEquipment1={selectedFilters.equipment1}
              selectedEquipment2={selectedFilters.equipment2}
              selectedEquipment3={selectedFilters.equipment3}
              onFilterChange={handleFilterChange}
              getAvailableEquipments={getAvailableEquipments}
            />
          </Box>

          {/* Gráfico */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2,
              height: { xs: 'auto', md: '520px' },
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}>
              <Typography variant="h6" component="h2">
                Custos por Área de Manutenção
              </Typography>
              
              <FormControl 
                size="small" 
                sx={{ 
                  minWidth: 200,
                  ml: { sm: 'auto' },
                }}
              >
                <InputLabel>Área</InputLabel>
                <Select
                  value={selectedGraphArea}
                  label="Área"
                  onChange={handleGraphAreaChange}
                >
                  <MenuItem value="TODAS">Todas</MenuItem>
                  {MAINTENANCE_AREAS.map(area => (
                    <MenuItem key={area} value={area}>{area}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
              <MaintenanceCostChart
                selectedArea={selectedGraphArea}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                selectedEquipments={getSelectedEquipments()}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
