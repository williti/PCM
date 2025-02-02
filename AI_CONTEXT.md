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

### Últimas Implementações (02/02/2025)
- Integração do Prisma ORM com PostgreSQL
- Configuração inicial do banco de dados
- Criação das migrations para as tabelas principais
- Atualização das dependências do backend

### Próximos Passos
- Implementar endpoints REST utilizando o Prisma Client
- Criar validações de dados usando os tipos gerados pelo Prisma
- Desenvolver testes para as operações do banco de dados
- Integrar frontend com os novos endpoints

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
