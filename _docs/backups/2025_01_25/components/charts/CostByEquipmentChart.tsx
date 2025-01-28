import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { useAppTheme } from '../../contexts/ThemeContext';
import { TotalValueDisplay } from '../TotalValueDisplay';

interface CostByEquipmentChartProps {
  selectedMonth: number;
  equipment1: string | null;
  equipment2: string | null;
  equipment3: string | null;
}

// Dados de exemplo com custos por equipamento, área e total
const data = [
  { 
    month: 'Jan',
    monthNumber: 1,
    equipment1: 12500,
    equipment2: 8750,
    equipment3: 7200,
    areaCost: 15600,
    total: 44050
  },
  { 
    month: 'Fev',
    monthNumber: 2,
    equipment1: 11200,
    equipment2: 9100,
    equipment3: 6800,
    areaCost: 14800,
    total: 41900
  },
  { 
    month: 'Mar',
    monthNumber: 3,
    equipment1: 13800,
    equipment2: 7900,
    equipment3: 8100,
    areaCost: 16200,
    total: 46000
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="subtitle2">{label}</Typography>
        {payload.map((entry: any) => (
          <Typography 
            key={entry.name}
            variant="body2" 
            sx={{ color: entry.color, mt: 0.5 }}
          >
            {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

export const CostByEquipmentChart: React.FC<CostByEquipmentChartProps> = ({
  selectedMonth,
  equipment1,
  equipment2,
  equipment3,
}) => {
  const { isDarkMode, theme } = useAppTheme();

  // Encontrar o valor total do mês selecionado
  const selectedMonthData = data.find(d => d.monthNumber === selectedMonth);
  const totalValue = selectedMonthData?.total || 0;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <TotalValueDisplay 
        month={selectedMonthData?.month || ''} 
        value={totalValue}
      />
      
      <ResponsiveContainer width="100%" height={450}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 
          />
          <XAxis
            dataKey="month"
            tick={{ fill: theme.palette.text.primary }}
          />
          <YAxis
            tick={{ fill: theme.palette.text.primary }}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(1)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {/* Linhas dos equipamentos - só aparecem quando selecionados */}
          {equipment1 && (
            <Line
              type="monotone"
              dataKey="equipment1"
              name="Equipamento 1"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          )}
          {equipment2 && (
            <Line
              type="monotone"
              dataKey="equipment2"
              name="Equipamento 2"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          )}
          {equipment3 && (
            <Line
              type="monotone"
              dataKey="equipment3"
              name="Equipamento 3"
              stroke={theme.palette.info.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          )}

          {/* Barra do total sempre visível */}
          <Bar
            dataKey="total"
            name="Total"
            fill={theme.palette.success.main}
            opacity={0.3}
            radius={[4, 4, 0, 0]}
          />

          {/* Ponto de destaque no mês selecionado */}
          {selectedMonthData && (
            <ReferenceDot
              x={selectedMonthData.month}
              y={selectedMonthData.total}
              r={8}
              fill={theme.palette.success.main}
              stroke="white"
              strokeWidth={2}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
