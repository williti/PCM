# Correções no Gráfico do Dashboard - 26/01/2025

## Problemas Identificados
1. Gráfico estava "crescendo" para baixo infinitamente
2. Formatação dos valores em Real Brasileiro não estava consistente
3. Botões não estavam alinhados corretamente

## Soluções Implementadas

### 1. Correção do Layout do Gráfico
- Definida altura fixa do container: `height: 400px`
- Ajustada altura do gráfico: `height: calc(100% - 70px)`
- Removidas dependências desnecessárias (ReferenceDot)
- Mantida a estrutura original do componente que estava funcionando

### 2. Formatação de Valores
- Implementada função formatCurrency consistente:
```typescript
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};
```

### 3. Alinhamento dos Botões
- Ajustado o container dos botões:
```typescript
<Box sx={{ 
  display: 'flex', 
  gap: 2, 
  mb: 3,
  width: '100%',
  maxWidth: { xs: '100%', md: '50%' }
}}>
```
- Adicionado `fullWidth` aos botões

## Arquivos Modificados
1. `frontend/src/components/charts/CostByEquipmentChart.tsx`
2. `frontend/src/pages/Dashboard.tsx`
3. `frontend/src/components/filters/MaintenanceFilter.tsx`

## Dependências Relevantes
- recharts: ^2.15.0
- @mui/material: ^6.4.1
- @emotion/react: ^11.14.0
- @emotion/styled: ^11.14.0
