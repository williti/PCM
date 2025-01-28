import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
  Typography,
} from '@mui/material';
import { AttachMoney as MoneyIcon } from '@mui/icons-material';

interface MaintenanceFilterProps {
  onFilterChange: (filters: {
    year: number;
    month: number;
    equipment1: string;
    equipment2: string;
    equipment3: string;
    area: string;
  }) => void;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  label: new Date(2000, i, 1).toLocaleString('pt-BR', { month: 'long' })
}));

// Exemplo de equipamentos - substituir por dados da API
const equipments = [
  { id: '', name: 'Selecione...' },
  { id: 'EQ1', name: 'CUBO C1' },
  { id: 'EQ2', name: 'PRENSA P2' },
  { id: 'EQ3', name: 'TORNO T3' },
  { id: 'EQ4', name: 'FRESA F1' },
  { id: 'EQ5', name: 'RETÍFICA R2' },
];

const areas = [
  { id: '', name: 'Todas' },
  { id: 'MEC', name: 'Mecânica' },
  { id: 'ELE', name: 'Elétrica' },
  { id: 'HID', name: 'Hidráulica' },
  { id: 'PNE', name: 'Pneumática' },
  { id: 'INS', name: 'Instrumentação' },
];

export const MaintenanceFilter: React.FC<MaintenanceFilterProps> = ({ onFilterChange }) => {
  const [year, setYear] = React.useState(currentYear);
  const [month, setMonth] = React.useState(new Date().getMonth() + 1);
  const [equipment1, setEquipment1] = React.useState('');
  const [equipment2, setEquipment2] = React.useState('');
  const [equipment3, setEquipment3] = React.useState('');
  const [area, setArea] = React.useState('');

  // Valor total (exemplo - substituir por dados reais da API)
  const totalValue = 44050.00;

  const handleChange = (field: string, value: any) => {
    const updates: any = {
      year,
      month,
      equipment1,
      equipment2,
      equipment3,
      area
    };
    updates[field] = value;

    switch (field) {
      case 'year': setYear(value); break;
      case 'month': setMonth(value); break;
      case 'equipment1': setEquipment1(value); break;
      case 'equipment2': setEquipment2(value); break;
      case 'equipment3': setEquipment3(value); break;
      case 'area': setArea(value); break;
    }

    onFilterChange(updates);
  };

  const currentMonthName = months.find(m => m.value === month)?.label;

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1,
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <FormControl size="small" sx={{ width: 90 }}>
        <InputLabel>Ano</InputLabel>
        <Select
          value={year}
          label="Ano"
          onChange={(e) => handleChange('year', e.target.value)}
        >
          {years.map(year => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 110 }}>
        <InputLabel>Mês</InputLabel>
        <Select
          value={month}
          label="Mês"
          onChange={(e) => handleChange('month', e.target.value)}
        >
          {months.map(month => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 130 }}>
        <InputLabel>Equip. 1</InputLabel>
        <Select
          value={equipment1}
          label="Equip. 1"
          onChange={(e) => handleChange('equipment1', e.target.value)}
        >
          {equipments.map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 130 }}>
        <InputLabel>Equip. 2</InputLabel>
        <Select
          value={equipment2}
          label="Equip. 2"
          onChange={(e) => handleChange('equipment2', e.target.value)}
        >
          {equipments.map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 130 }}>
        <InputLabel>Equip. 3</InputLabel>
        <Select
          value={equipment3}
          label="Equip. 3"
          onChange={(e) => handleChange('equipment3', e.target.value)}
        >
          {equipments.map(eq => (
            <MenuItem key={eq.id} value={eq.id}>{eq.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 110 }}>
        <InputLabel>Área</InputLabel>
        <Select
          value={area}
          label="Área"
          onChange={(e) => handleChange('area', e.target.value)}
        >
          {areas.map(area => (
            <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

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
          ml: 2,
          height: '40px'
        }}
      >
        <MoneyIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
        <Box>
          <Typography variant="caption" sx={{ opacity: 0.9, display: 'block', lineHeight: 1 }}>
            Total em {currentMonthName}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
            R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
