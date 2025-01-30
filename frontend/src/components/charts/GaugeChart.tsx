import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { Box, Typography } from '@mui/material';

interface GaugeChartProps {
  value: number;
  title: string;
}

const RADIAN = Math.PI / 180;

// Função para interpolar cores
const interpolateColor = (value: number): string => {
  // Cores em RGB para interpolação suave
  const colors = [
    { val: 70, r: 244, g: 67, b: 54 },   // Vermelho
    { val: 80, r: 255, g: 152, b: 0 },   // Laranja
    { val: 90, r: 139, g: 195, b: 74 },  // Verde claro
    { val: 100, r: 76, g: 175, b: 80 }   // Verde
  ];

  // Encontrar as cores para interpolação
  let color1, color2;
  for (let i = 0; i < colors.length - 1; i++) {
    if (value <= colors[i + 1].val) {
      color1 = colors[i];
      color2 = colors[i + 1];
      break;
    }
  }

  if (!color1 || !color2) {
    return `rgb(${colors[colors.length - 1].r}, ${colors[colors.length - 1].g}, ${colors[colors.length - 1].b})`;
  }

  // Calcular a porcentagem entre as duas cores
  const range = color2.val - color1.val;
  const percent = (value - color1.val) / range;

  // Interpolar cada componente RGB
  const r = Math.round(color1.r + (color2.r - color1.r) * percent);
  const g = Math.round(color1.g + (color2.g - color1.g) * percent);
  const b = Math.round(color1.b + (color2.b - color1.b) * percent);

  return `rgb(${r}, ${g}, ${b})`;
};

// Componente do ponteiro com destaque
const renderNeedle = (value: number, cx: number, cy: number) => {
  const rotation = 180 - (value * 1.8); // 180 graus é o início, 1.8 é o fator para chegar a 0 graus
  const length = 45; // Ponteiro mais longo
  const x = cx + length * Math.cos(-rotation * RADIAN);
  const y = cy + length * Math.sin(-rotation * RADIAN);

  return (
    <g>
      {/* Sombra do ponteiro */}
      <line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke="rgba(0,0,0,0.2)"
        strokeWidth={5}
        strokeLinecap="round"
      />
      {/* Ponteiro principal */}
      <line
        x1={cx}
        y1={cy}
        x2={x}
        y2={y}
        stroke="#333"
        strokeWidth={3}
        strokeLinecap="round"
      />
      {/* Base do ponteiro */}
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#333"
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

export const GaugeChart: React.FC<GaugeChartProps> = ({ value, title }) => {
  // Criar segmentos para gradiente
  const segments = Array.from({ length: 30 }, (_, i) => ({
    name: `segment-${i}`,
    value: 100 / 30, // Dividir em 30 segmentos para um gradiente mais suave
    color: interpolateColor(70 + (i * 30 / 30))
  }));

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <PieChart width={200} height={120}>
        {/* Escala de cores gradativa */}
        <Pie
          data={segments}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={0}
          dataKey="value"
        >
          {segments.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        
        {/* Texto do valor */}
        <text
          x={100}
          y={85}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            fill: interpolateColor(value)
          }}
        >
          {value}%
        </text>
        
        {/* Renderiza o ponteiro */}
        {renderNeedle(value, 100, 100)}
      </PieChart>
    </Box>
  );
};
