# Arquitetura do Sistema PCM

## Visão Geral
O Sistema PCM (Planejamento e Controle de Manutenção) é uma aplicação web moderna desenvolvida com React e Node.js, seguindo uma arquitetura de microsserviços.

## Stack Tecnológica

### Frontend
- **Framework**: React com TypeScript
- **UI Framework**: Material-UI (MUI)
- **Gerenciamento de Estado**: Context API
- **Roteamento**: React Router
- **Estilização**: Material-UI Theme System
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **ORM**: Prisma
- **Banco de Dados**: PostgreSQL
- **API**: RESTful

## Estrutura do Projeto

### Frontend
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

### Backend
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

## Fluxo de Dados
1. O frontend faz requisições HTTP para o backend através de endpoints RESTful
2. O backend processa as requisições e interage com o banco de dados via Prisma
3. Os dados são retornados ao frontend em formato JSON
4. O frontend atualiza a interface do usuário com os dados recebidos

## Segurança
- Autenticação via JWT
- CORS configurado para permitir apenas origens autorizadas
- Validação de dados em ambos frontend e backend
- Sanitização de inputs
- Proteção contra XSS e CSRF
