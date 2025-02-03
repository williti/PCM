# Referência Técnica do Projeto

## Estrutura de Componentes

### Dashboard
- **Localização**: `frontend/src/pages/Dashboard.tsx`
- **Propósito**: Página principal do sistema com visualização de métricas
- **Componentes Principais**:
  - GaugeChart: Medidores de desempenho
  - MaintenanceCostChart: Gráfico de custos
  - MaintenanceFilter: Filtros de dados
- **Integração Backend**:
  - API Service: `frontend/src/services/api.ts`
  - Rota Backend: `backend/src/routes/dashboard.ts`
  - Sistema de Fallback para dados mockados

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

## Arquitetura do Sistema

### Frontend
- **Framework**: React + Vite
- **Linguagem**: TypeScript
- **UI Library**: Material-UI
- **Gerenciamento de Estado**: React Hooks
- **Chamadas API**: Axios
- **Sistema de Fallback**: Dados mockados quando API indisponível

### Backend
- **Framework**: Express
- **Linguagem**: TypeScript
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **API**: RESTful
- **Rotas Principais**:
  - `/dashboard`: Métricas e dados do dashboard
  - `/health`: Status da API

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

### Padrões de API
- Respostas padronizadas
- Tratamento de erros consistente
- Sistema de fallback para dados mockados
- Cache de requisições no frontend

## Documentação
- **Roadmap**: `/docs/technical/project_roadmap.md`
- **Guias Técnicos**: `/docs/technical/`
- **Backups**: `/docs/backups/`
- **Referências**: `/docs/technical_reference.md`

## Próximas Implementações Planejadas
Consulte o arquivo `/docs/technical/project_roadmap.md` para detalhes sobre:
- Nova página de login com dashboard demonstrativo
- Melhorias no sistema de cache
- Implementação de websockets
- Sistema de autenticação avançado
- Deploy e infraestrutura
