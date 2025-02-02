# Guia de Desenvolvimento

## Configuração do Ambiente

### Requisitos
- Node.js 16.x ou superior
- npm 8.x ou superior
- PostgreSQL 14.x ou superior
- Git

### Instalação
1. Clone o repositório:
```bash
git clone <repository-url>
cd PCM
```

2. Instale as dependências do frontend:
```bash
cd frontend
npm install
```

3. Instale as dependências do backend:
```bash
cd ../backend
npm install
```

4. Configure as variáveis de ambiente:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000

# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/pcm_db"
JWT_SECRET="your-secret-key"
PORT=3000
```

5. Execute as migrações do banco de dados:
```bash
cd backend
npx prisma migrate dev
```

### Executando o Projeto

#### Frontend
```bash
cd frontend
npm run dev
```
O frontend estará disponível em `http://localhost:5173`

#### Backend
```bash
cd backend
npm run dev
```
O backend estará disponível em `http://localhost:3000`

## Fluxo de Trabalho

### Branches
- `main`: Código em produção
- `develop`: Branch de desenvolvimento
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `release/*`: Preparação para release

### Commits
Use commits semânticos:
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

Exemplo:
```bash
git commit -m "feat: adiciona filtro na lista de ordens de serviço"
```

## Padrões de Código

### TypeScript
- Use tipos explícitos
- Evite `any`
- Prefira interfaces a types
- Use enums para valores fixos

### React
- Use componentes funcionais
- Use hooks
- Evite props drilling
- Mantenha componentes pequenos e focados

### Estilização
- Use o sistema de tema do Material-UI
- Evite CSS inline
- Use styled-components quando necessário
- Mantenha consistência com o design system

### Testes
- Escreva testes unitários
- Use Jest e React Testing Library
- Mantenha cobertura mínima de 80%

## Deploy

### Preparação
1. Build do frontend:
```bash
cd frontend
npm run build
```

2. Build do backend:
```bash
cd backend
npm run build
```

### Produção
1. Configure as variáveis de ambiente de produção
2. Execute as migrações do banco
3. Inicie os serviços:
```bash
# Backend
npm run start

# Frontend (via servidor web)
serve -s dist
```

## Monitoramento
- Use logs estruturados
- Configure alertas
- Monitore métricas de performance
- Acompanhe erros via Sentry

## Suporte
Para dúvidas ou problemas:
1. Consulte a documentação
2. Verifique issues existentes
3. Abra uma nova issue
4. Contate a equipe de desenvolvimento
