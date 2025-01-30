# Referência Técnica do Projeto

## Estrutura de Componentes

### Dashboard
- **Localização**: `frontend/src/pages/Dashboard.tsx`
- **Propósito**: Página principal do sistema com visualização de métricas
- **Componentes Principais**:
  - GaugeChart: Medidores de desempenho
  - MaintenanceCostChart: Gráfico de custos
  - MaintenanceFilter: Filtros de dados

### Gráficos

#### GaugeChart
- **Localização**: `frontend/src/components/charts/GaugeChart.tsx`
- **Biblioteca**: Recharts
- **Funcionalidades**:
  - Escala de cores gradativa
  - Ponteiro indicador
  - Responsivo
  - Props:
    - value: número (0-100)
    - title: string

#### MaintenanceCostChart
- **Localização**: `frontend/src/components/charts/MaintenanceCostChart.tsx`
- **Biblioteca**: Chart.js
- **Funcionalidades**:
  - Barras empilhadas
  - Múltiplas áreas
  - Linhas de equipamento
  - Formatação em reais
  - Props:
    - selectedArea: MaintenanceArea
    - selectedYear: string
    - selectedMonth: number
    - selectedEquipment1/2/3: string

## Convenções de Código

### Estilo
- Typescript para tipagem
- Material-UI para componentes
- CSS-in-JS com sx prop
- Cores do tema Material-UI

### Responsividade
- Breakpoints Material-UI
- Mobile-first approach
- Scroll horizontal quando necessário
- Ajuste de tamanhos por viewport

### Dados
- Mock data em constantes
- Formatação BR (R$)
- Tipagem forte
- Interfaces definidas

## Manutenção

### Atualizações
1. Identificar componente a ser atualizado
2. Testar em diferentes resoluções
3. Verificar tipagem
4. Manter padrão de código

### Performance
- Usar useMemo para cálculos
- Evitar re-renders desnecessários
- Otimizar imports
- Lazy loading quando possível
