# Sistema PCM - Contexto do Projeto para IA

## Visão Geral do Projeto
Sistema web para Planejamento e Controle de Manutenção (PCM) industrial, focado em gerenciamento de equipamentos, ordens de serviço, inventário e métricas de manutenção.

## Organização da Documentação

### Idiomas e Nomenclatura
- **Comunicação e Documentação Explicativa**: Português brasileiro
- **Código e Estrutura Técnica**: Nomenclatura padrão internacional
  - Nomes de arquivos: lowercase com hífens (ex: `user-service.ts`)
  - Diretórios: lowercase com hífens (ex: `api-docs/`)
  - Classes: PascalCase (ex: `UserController`)
  - Funções e variáveis: camelCase (ex: `getUserById`)
  - Constantes: UPPERCASE com underscore (ex: `MAX_RETRY_COUNT`)

### Estrutura de Arquivos
```
_docs/
├── guidelines/     # Development guidelines
├── technical/      # Technical documentation
│   └── detailed/  # Detailed technical specs
├── backups/       # Chat and changes history
└── structure/     # Project structure docs
```

### Regras Principais
1. Documentação explicativa em português brasileiro
2. Nomenclatura técnica seguindo padrões internacionais
3. Backups centralizados em `_docs/backups`
4. Consulte `GUIDELINES.md` na raiz antes de alterações

## Estado Atual do Projeto

### Última Atualização
Data: 02/02/2025
Sessão: Integração Frontend-Backend e Documentação

### Tarefas Pendentes
Todas as tarefas pendentes estão em /_docs/pending_tasks/
1. Nova página de login com dashboard demonstrativo (login_page_enhancement.md)
2. Implementação de websockets
3. Sistema de cache no frontend
4. Exportação de relatórios

### Últimas Alterações
1. Implementada camada de serviços no frontend
2. Criadas rotas do dashboard no backend
3. Implementado sistema de fallback para dados mockados
4. Reorganizada estrutura de documentação

### Próximos Passos Prioritários
1. Implementar nova página de login (ver /pending_tasks/login_page_enhancement.md)
2. Melhorar sistema de cache
3. Implementar websockets

### Decisões Técnicas Recentes
1. Manter repositório como proprietário (não fork)
2. Usar sistema de fallback para dados mockados
3. Consolidar backups em arquivo único

### Arquivos Importantes
1. Histórico de conversas: /_docs/backups/chat_history.md
2. Tarefas pendentes: /_docs/pending_tasks/*
3. Roadmap: /_docs/technical/project_roadmap.md
4. Referência técnica: /_docs/technical/technical_reference.md

### Stack Atual
Frontend:
- React + Vite + TypeScript
- Material-UI
- Context API

Backend:
- Express
- Prisma ORM
- PostgreSQL

### Observações
- Sempre verificar tarefas pendentes em /pending_tasks/
- Manter backups consolidados em /backups/chat_history.md
- Seguir padrões definidos em start PCM prompt.txt

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
- **ORM**: Prisma (Novo)
- **Banco de Dados**: PostgreSQL
- **API**: RESTful

### Configuração do Banco de Dados
- Gerenciado através do Prisma ORM
- Migrations automáticas via Prisma Migrate
- Schema definido em `prisma/schema.prisma`
- Conexão configurada via variável de ambiente `DATABASE_URL`

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
│   ├── schema.prisma    # Schema do banco de dados
│   ├── migrations/      # Histórico de migrations
│   └── seed.ts         # Dados iniciais (quando necessário)
└── server.ts
```

## Estrutura do Banco de Dados

### Tabelas Principais (Gerenciadas pelo Prisma)
1. **Users**
   - Gerenciamento de usuários e perfis
   - Campos: id (UUID), name, email, password, role, timestamps

2. **Equipment**
   - Cadastro de equipamentos
   - Campos: id (UUID), name, code, description, status, location, department, purchase_date, warranty_until, timestamps

3. **MaintenanceOrders**
   - Ordens de serviço
   - Campos: id (UUID), equipment_id, requester_id, technician_id, type, priority, status, description, scheduled_for, started_at, completed_at, timestamps

4. **MaintenanceHistory**
   - Histórico de manutenções
   - Campos: id (UUID), order_id, equipment_id, technician_id, action_taken, timestamps

5. **Inventory**
   - Controle de estoque
   - Campos: id (UUID), name, code, quantity, min_quantity, timestamps

6. **Notifications**
   - Sistema de notificações
   - Campos: id (UUID), user_id, title, message, type, read, timestamps

## Fluxo de Desenvolvimento

### Processo de Contribuição
1. Fork do repositório principal (itiro2024/PCM)
2. Desenvolvimento em branch feature específica
3. Pull Request para revisão
4. Merge após aprovação

### Comandos Importantes
```bash
# Atualizar schema do banco
npx prisma generate

# Criar nova migration
npx prisma migrate dev

# Aplicar migrations pendentes
npx prisma migrate deploy
```

## Interface do Usuário

### Componentes Principais
1. **MainLayout**
   - Container principal
   - Gerenciamento de tema
   - Header e SubMenu

2. **Dashboard**
   - 6 cards principais com métricas
