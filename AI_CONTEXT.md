# Sistema PCM - Contexto do Projeto para IA

## Visão Geral do Projeto
Sistema web para Planejamento e Controle de Manutenção (PCM) industrial, focado em gerenciamento de equipamentos, ordens de serviço, inventário e métricas de manutenção.

## Arquitetura do Sistema

### Stack Tecnológica

#### Frontend
- **Framework Principal**: React com TypeScript
- **UI Framework**: Material-UI (MUI)
- **Gerenciamento de Estado**: Context API
- **Roteamento**: React Router
- **Build Tool**: Vite
- **Estilização**: Material-UI Theme System

#### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **API**: RESTful

## Estrutura do Projeto

### Frontend (`frontend/`)
```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   ├── SubMenu.tsx
│   │   │   └── UserMenu.tsx
│   │   └── charts/
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── OrdensServico.tsx
│   │   ├── Inventario.tsx
│   │   └── metricas/
│   │       ├── Falhas.tsx
│   │       ├── Tempo.tsx
│   │       └── Custos.tsx
│   └── App.tsx
```

### Backend (`backend/`)
```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/
├── prisma/
│   └── schema.prisma
└── server.ts
```

## Estrutura do Banco de Dados

### Tabelas Principais
1. **Users**
   - Gerenciamento de usuários e perfis
   - Campos: id, name, email, password, role

2. **Equipment**
   - Cadastro de equipamentos
   - Campos: id, name, code, description, status, location

3. **MaintenanceOrders**
   - Ordens de serviço
   - Campos: id, equipment_id, requester_id, technician_id, type, priority

4. **MaintenanceHistory**
   - Histórico de manutenções
   - Campos: id, order_id, equipment_id, technician_id, action_taken

5. **Inventory**
   - Controle de estoque
   - Campos: id, name, code, quantity, min_quantity

6. **Notifications**
   - Sistema de notificações
   - Campos: id, user_id, title, message, type, read

## Interface do Usuário

### Componentes Principais
1. **MainLayout**
   - Container principal
   - Gerenciamento de tema
   - Header e SubMenu

2. **Dashboard**
   - 6 cards principais com métricas
   - Gráficos de desempenho
   - Resumo de atividades

3. **Páginas de Métricas**
   - Falhas (MTTR, taxa de conclusão)
   - Tempo (atendimento, manutenção)
   - Custos (total, por equipamento)

## Diretrizes de Desenvolvimento

### Padrões de Código
1. **TypeScript**
   - Usar tipos explícitos
   - Evitar `any`
   - Preferir interfaces a types

2. **React**
   - Componentes funcionais
   - Hooks para estado
   - Evitar props drilling

3. **Estilização**
   - Usar tema Material-UI
   - Evitar CSS inline
   - Manter consistência visual

### Fluxo de Trabalho Git
- `main`: Código em produção
- `develop`: Branch de desenvolvimento
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções

## Histórico de Atualizações

### 25/01/2025
1. **Dashboard**
   - Removidos cards MTTR e Taxa de conclusão
   - Mantidos 6 cards principais

2. **Métricas**
   - Criado submenu com seções:
     - Falhas
     - Tempo
     - Custos

3. **Interface**
   - Implementado tema claro/escuro
   - Reorganização do layout

## Últimas Atualizações (26/01/2025)

### Dashboard PCM
O dashboard principal do sistema foi implementado com as seguintes funcionalidades:

#### 1. Gráfico de Custos por Equipamento
- **Componente**: `CostByEquipmentChart`
- **Funcionalidade**: Exibe um gráfico combinado (barras e linhas) mostrando:
  - Barras: Custo total por área de manutenção ou soma total
  - Linhas: Custos individuais dos equipamentos selecionados
- **Filtros**:
  - Ano e Mês
  - Área (TODAS, MECÂNICA, ELÉTRICA, HIDRÁULICA, PNEUMÁTICA, INSTRUMENTAÇÃO)
  - Até 3 equipamentos para comparação
- **Formatação**: Todos os valores são exibidos em Real Brasileiro (R$)
- **Layout**: 
  - Altura fixa de 400px
  - Botões alinhados abaixo do título "Dashboard PCM"
  - Valor total destacado em card verde

#### 2. Cards de Métricas
- **Componente**: `MetricCard`
- **Métricas Exibidas**:
  - Ordens críticas
  - Total de ordens abertas
  - Tempo médio de reparo

#### 3. Filtros de Manutenção
- **Componente**: `MaintenanceFilter`
- **Filtros Disponíveis**:
  - Seleção de ano
  - Seleção de mês
  - Seleção de até 3 equipamentos
  - Filtro de área

### Componentes Auxiliares

#### TotalValueDisplay
- **Propósito**: Exibir valores monetários formatados em Real Brasileiro
- **Características**:
  - Formatação consistente usando Intl.NumberFormat
  - Background verde para destaque
  - Suporte a label personalizado

### Estrutura de Arquivos
```
frontend/src/
├── components/
│   ├── charts/
│   │   └── CostByEquipmentChart.tsx
│   ├── filters/
│   │   └── MaintenanceFilter.tsx
│   ├── layout/
│   │   └── Header.tsx
│   └── TotalValueDisplay.tsx
└── pages/
    └── Dashboard.tsx
```

### Dependências Principais
```json
{
  "dependencies": {
    "@mui/material": "^6.4.1",
    "recharts": "^2.15.0",
    "react": "^18.3.1"
  }
}
```

### Decisões de Design
1. **Layout Responsivo**:
   - Uso de `ResponsiveContainer` do Recharts
   - Adaptação para diferentes tamanhos de tela
   - Altura fixa para evitar problemas de renderização

2. **Padrões de Código**:
   - Uso de TypeScript para type safety
   - Componentização para reusabilidade
   - Formatação consistente de valores monetários

3. **UX/UI**:
   - Cores consistentes para equipamentos
   - Tooltips informativos
   - Feedback visual nas interações

### Problemas Resolvidos
1. **Gráfico Crescendo Infinitamente**:
   - Definida altura fixa
   - Ajustada estrutura do ResponsiveContainer
   - Removidas dependências conflitantes

2. **Formatação de Valores**:
   - Implementada formatação consistente em Real Brasileiro
   - Corrigida exibição de cifras
   - Sincronizados valores entre gráfico e total

3. **Layout dos Botões**:
   - Alinhamento correto com cards
   - Largura responsiva
   - Espaçamento adequado

### Próximos Passos
1. **Melhorias Planejadas**:
   - Implementar persistência de filtros
   - Adicionar mais métricas
   - Melhorar performance de dados

2. **Bugs Conhecidos**:
   - Monitorar sincronização de valores
   - Verificar comportamento responsivo
   - Testar diferentes combinações de filtros

## Atualizações em Andamento (26/01/2025)
1. **Correções no Gráfico de Custos**
   - Ajustada altura do gráfico para 250px para alinhar com os cards laterais
   - Corrigido problema de "Invalid Date" usando array de nomes de meses em português
   - Implementada exibição correta de múltiplos equipamentos com cores distintas
   - Corrigida exibição do valor total:
     - Mantém consistência entre gráfico e componente de valor total
     - Mostra "Todas" quando todas as áreas estão selecionadas
   - Melhorada visualização:
     - Cores diferentes para total (azul) e área específica (laranja)
     - Mantém nome da área selecionada na legenda
     - Suporte para múltiplos equipamentos simultaneamente

2. **Melhorias na Interface**
   - Implementada lógica de filtros mais precisa
   - Corrigida sincronização entre filtros e exibição
   - Melhorada consistência visual dos dados

3. **Próximos Passos**
   - [ ] Implementar persistência dos filtros
   - [ ] Adicionar mais opções de visualização
   - [ ] Melhorar responsividade em telas menores

## Arquivos de Referência Importantes
- `README.md`: Documentação principal do projeto na raiz
- `frontend/README.md`: Documentação específica do frontend
- `_docs/technical/01-ARCHITECTURE.md`: Arquitetura detalhada
- `_docs/technical/02-DATABASE.md`: Estrutura do banco
- `_docs/technical/03-FRONTEND.md`: Documentação frontend
- `_docs/guides/DEVELOPMENT.md`: Guia de desenvolvimento
- `_docs/conversation_backups/`: Histórico de decisões
- `INICIAR_SERVIDOR.txt`: Instruções de inicialização do ambiente
- `project-structure.txt`: Estrutura detalhada do projeto

## Próximos Passos Sugeridos
1. Implementar notificações
2. Desenvolver páginas de perfil
3. Integrar backend com dados reais
4. Implementar filtros nas métricas
5. Adicionar visualizações de dados

---
*Última atualização: 26/01/2025 09:09*
