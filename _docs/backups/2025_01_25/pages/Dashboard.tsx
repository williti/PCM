import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Build as BuildIcon,
  Assignment as AssignmentIcon,
  Timer as TimerIcon,
  Engineering as EngineeringIcon,
  PendingActions as PendingIcon,
  Timeline as TimelineIcon,
  Info as InfoIcon,
  Speed as SpeedIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { useAppTheme } from '../contexts/ThemeContext';
import { CostByEquipmentChart } from '../components/charts/CostByEquipmentChart';
import { MaintenanceFilter } from '../components/filters/MaintenanceFilter';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  subtitle?: string;
  info?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, progress, subtitle, info }) => {
  const { isDarkMode } = useAppTheme();

  return (
    <Card
      sx={{
        height: '100%',
        backgroundColor: isDarkMode ? 'background.paper' : 'background.paper',
        boxShadow: isDarkMode 
          ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
          : '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDarkMode 
            ? '0 6px 12px rgba(0, 0, 0, 0.4)' 
            : '0 4px 8px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: isDarkMode ? 'rgba(144, 202, 249, 0.2)' : 'primary.light',
              color: isDarkMode ? 'primary.light' : 'primary.dark',
              mr: 1.5,
            }}
          >
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          {info && (
            <Tooltip title={info}>
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        
        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            mb: 0.5,
            fontWeight: 600,
            color: isDarkMode ? 'primary.light' : 'primary.main',
            fontSize: '1.75rem',
          }}
        >
          {value}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 0.5,
              fontSize: '0.8rem',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {progress !== undefined && (
          <Box sx={{ width: '100%', mt: 1.5 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  const [selectedFilters, setSelectedFilters] = React.useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    equipment1: '',
    equipment2: '',
    equipment3: '',
    area: ''
  });

  const handleFilterChange = (filters: { 
    year: number; 
    month: number; 
    equipment1: string;
    equipment2: string;
    equipment3: string;
    area: string;
  }) => {
    setSelectedFilters(filters);
    console.log('Filtros alterados:', filters);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Cabeçalho com título e filtros */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 4,
        mb: 4,
        flexWrap: 'wrap'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            minWidth: '200px'
          }}
        >
          Dashboard PCM
        </Typography>

        <Box sx={{ flex: 1 }}>
          <MaintenanceFilter onFilterChange={handleFilterChange} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Coluna dos Cards (60%) */}
        <Grid item xs={12} md={7}>
          {/* Primeira linha de cards */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={4}>
              <MetricCard
                title="OS Críticas"
                value="5"
                icon={<PendingIcon color="error" />}
                subtitle="Necessitam atenção imediata"
                info="Ordens de serviço com prioridade alta que precisam ser atendidas urgentemente"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MetricCard
                title="Total de OS em Aberto"
                value="28"
                icon={<AssignmentIcon />}
                subtitle="Janeiro/2025"
                info="Total de ordens de serviço abertas no mês atual"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MetricCard
                title="OS em Andamento"
                value="12"
                icon={<BuildIcon />}
                subtitle="Em execução"
                info="Ordens de serviço que estão sendo executadas no momento"
              />
            </Grid>
          </Grid>

          {/* Segunda linha de cards */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <MetricCard
                title="Tempo de Inatividade"
                value="24h"
                icon={<TimerIcon />}
                subtitle="Último período"
                info="Tempo total em que os equipamentos ficaram inativos devido a falhas"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MetricCard
                title="MTBF"
                value="120h"
                icon={<SpeedIcon />}
                subtitle="Tempo Médio entre Falhas"
                info="Mean Time Between Failures - Média de tempo entre falhas dos equipamentos"
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <MetricCard
                title="MTTR"
                value="4h"
                icon={<UpdateIcon />}
                subtitle="Tempo Médio de Reparo"
                info="Mean Time To Repair - Tempo médio necessário para reparar um equipamento"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Coluna do Gráfico (40%) */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', minHeight: 600 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Custos por Área de Manutenção
              </Typography>
              
              <Box sx={{ height: 'calc(100% - 60px)' }}>
                <CostByEquipmentChart 
                  selectedMonth={selectedFilters.month}
                  equipment1={selectedFilters.equipment1 || null}
                  equipment2={selectedFilters.equipment2 || null}
                  equipment3={selectedFilters.equipment3 || null}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
