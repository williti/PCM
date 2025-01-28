import React, { useMemo, useEffect } from 'react';
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
} from 'recharts';
import { 
  Box, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAppTheme } from '../../contexts/ThemeContext';
import inventory from '../../data/inventory.json';

interface CostByEquipmentChartProps {
  selectedYear: number;
  selectedMonth: number;
  selectedArea: string;
  selectedEquipments?: Array<{
    id: string;
    name: string;
  }>;
  onAreaChange?: (area: string) => void;
  onTotalUpdate?: (total: number) => void;
}

// Áreas disponíveis
const areas = [
  { id: 'TODAS', name: 'Todas' },
  { id: 'MEC', name: 'Mecânica' },
  { id: 'ELE', name: 'Elétrica' },
  { id: 'HID', name: 'Hidráulica' },
  { id: 'PNE', name: 'Pneumática' },
  { id: 'INS', name: 'Instrumentação' },
];

// Cores para os equipamentos
const EQUIPMENT_COLORS = [
  '#1976d2', // azul
  '#dc004e', // vermelho
  '#388e3c', // verde
  '#f57c00', // laranja
  '#7b1fa2', // roxo
];

// Formatar valor em Real Brasileiro
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Função para obter os últimos 6 meses
const getLastSixMonths = (year: number, month: number) => {
  const months = [];
  for (let i = 5; i >= 0; i--) {
    let m = month - i;
    let y = year;
    if (m <= 0) {
      m += 12;
      y -= 1;
    }
    months.push({
      month: new Date(y, m - 1).toLocaleString('pt-BR', { month: 'short' }),
      monthNumber: m,
      year: y
    });
  }
  return months;
};

// Gerar dados de exemplo
const generateData = (lastSixMonths: any[], selectedEquipments: Array<{id: string, name: string}> = []) => {
  // Função para calcular custo de manutenção baseado no equipamento
  const calculateMaintenanceCost = (equipment: any, baseValue: number) => {
    const age = new Date().getFullYear() - equipment.manufacturingYear;
    const ageFactor = 1 + (age * 0.1); // Equipamentos mais antigos custam mais
    const powerFactor = equipment.power ? (1 + (equipment.power / 50)) : 1; // Maior potência = maior custo
    return Math.round(baseValue * ageFactor * powerFactor);
  };

  // Custos base por área com variação mensal
  const getAreaCost = (baseValue: number, monthIndex: number) => {
    const seasonalFactor = 1 + Math.sin(monthIndex * Math.PI / 6) * 0.3; // Variação sazonal
    const randomFactor = 0.8 + Math.random() * 0.4; // Variação aleatória entre 0.8 e 1.2
    return Math.round(baseValue * seasonalFactor * randomFactor);
  };

  // Custos base por área (valores mais realistas)
  const baseAreaCosts = {
    MEC: 45000, // Manutenção mecânica (maior devido à complexidade)
    ELE: 35000, // Manutenção elétrica
    HID: 25000, // Manutenção hidráulica
    PNE: 20000, // Manutenção pneumática
    INS: 30000  // Instrumentação
  };

  // Mapa de equipamentos do inventário
  const equipmentMap = new Map(
    inventory.equipment.map(eq => [eq.code, eq])
  );
  
  return lastSixMonths.map(({ month, monthNumber, year }, index) => {
    const data: any = {
      month,
      monthNumber,
      year
    };

    // Adicionar custos para cada área com variação mensal
    Object.entries(baseAreaCosts).forEach(([area, baseCost]) => {
      data[area] = getAreaCost(baseCost, index);
    });

    // Calcular o total como soma das áreas
    data.total = Object.entries(data)
      .filter(([key]) => Object.keys(baseAreaCosts).includes(key))
      .reduce((acc, [_, value]) => acc + (typeof value === 'number' ? value : 0), 0);

    // Adicionar dados para cada equipamento selecionado
    selectedEquipments.forEach(equipment => {
      const inventoryEquipment = equipmentMap.get(equipment.id);
      if (inventoryEquipment) {
        const baseCost = 15000; // Custo base de manutenção
        const maintenanceCost = calculateMaintenanceCost(inventoryEquipment, baseCost);
        
        // Adicionar variação sazonal e aleatória
        const seasonalFactor = 1 + Math.sin(index * Math.PI / 6) * 0.2;
        const randomFactor = 0.9 + Math.random() * 0.3;
        
        data[equipment.name] = Math.round(maintenanceCost * seasonalFactor * randomFactor);
      }
    });

    return data;
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;

  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      p: 1,
      border: 1,
      borderColor: 'divider',
      borderRadius: 1
    }}>
      <Typography variant="subtitle2">{label}</Typography>
      {payload.map((entry: any, index: number) => (
        <Typography
          key={index}
          variant="body2"
          sx={{ color: entry.color }}
        >
          {entry.name}: {formatCurrency(entry.value)}
        </Typography>
      ))}
    </Box>
  );
};

export const CostByEquipmentChart: React.FC<CostByEquipmentChartProps> = ({
  selectedYear,
  selectedMonth,
  selectedArea = 'TODAS',
  selectedEquipments = [],
  onAreaChange,
  onTotalUpdate,
}) => {
  const { isDarkMode, theme } = useAppTheme();

  // Gerar dados dos últimos 6 meses
  const lastSixMonths = useMemo(() => 
    getLastSixMonths(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  const data = useMemo(() => 
    generateData(lastSixMonths, selectedEquipments),
    [lastSixMonths, selectedEquipments]
  );

  // Encontrar o valor total do mês selecionado
  const selectedMonthData = data.find(d => 
    d.monthNumber === selectedMonth && d.year === selectedYear
  );

  // Determinar o valor total baseado na área selecionada
  const totalValue = selectedArea === 'TODAS'
    ? selectedMonthData?.total || 0
    : selectedMonthData?.[selectedArea] || 0;

  // Atualizar o componente pai sobre o valor total
  useEffect(() => {
    if (onTotalUpdate) {
      onTotalUpdate(selectedMonthData?.total || 0);
    }
  }, [selectedMonthData, onTotalUpdate]);

  return (
    <Box sx={{ width: '100%', height: 400 }}>
      {/* Header com Valor Total e Filtro */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        px: 1
      }}>
        {/* Filtro de Área */}
        <FormControl size="small" sx={{ width: 130 }}>
          <InputLabel>Área</InputLabel>
          <Select
            value={selectedArea}
            label="Área"
            onChange={(e) => onAreaChange?.(e.target.value)}
            disabled={false}
          >
            {areas.map(area => (
              <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Valor Total */}
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="subtitle2" color="textSecondary">
            Total em {selectedMonthData?.month || ''}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {formatCurrency(totalValue)}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ width: '100%', height: 'calc(100% - 70px)' }}>
        <ResponsiveContainer>
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
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ width: '100%' }} />
            
            {/* Barra do total */}
            <Bar
              dataKey="total"
              name="Total"
              fill={theme.palette.primary.main}
              opacity={0.3}
              radius={[4, 4, 0, 0]}
            />

            {/* Linhas dos equipamentos selecionados */}
            {selectedEquipments?.map((equipment, index) => (
              <Line
                key={equipment.id}
                type="monotone"
                dataKey={equipment.name}
                name={equipment.name}
                stroke={EQUIPMENT_COLORS[index % EQUIPMENT_COLORS.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
