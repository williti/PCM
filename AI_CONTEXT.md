## Estado Atual do Projeto (2025-02-04)

### Infraestrutura
- Frontend: React + Vite (http://localhost:5173)
- Backend: Node.js + TypeScript (http://localhost:3000)
- Database: PostgreSQL em Docker (pendente instalação Docker Desktop)
- Gerenciamento BD: pgAdmin em Docker (pendente)

### Progresso
- Servidor frontend configurado e rodando
- Endpoint de teste implementado no backend
- Schema do Prisma definido com todas as tabelas
- Docker Compose configurado para ambiente de desenvolvimento

### Próximos Passos
1. Instalar Docker Desktop
2. Iniciar ambiente Docker (PostgreSQL + pgAdmin)
3. Executar migrations do Prisma
4. Popular banco com dados iniciais
5. Implementar página de login conforme especificações

### Observações Técnicas
- Docker Compose configurado com PostgreSQL e pgAdmin
- Schema do Prisma com 4 tabelas principais:
  - User (autenticação)
  - OrdemServico (gestão de manutenção)
  - Equipamento (cadastro de equipamentos)
  - Metrica (indicadores de performance)
- Volume Docker configurado para persistência de dados

### Padrões de Desenvolvimento
#### Commits
Seguir convenção:
```
<tipo>(<escopo>): <descrição curta>

<descrição detalhada em tópicos>

<referências>
```
- Tipos: feat, fix, docs, style, refactor, test, chore
- Escopo: área específica (auth, api, ui, etc)
- Descrição: clara e objetiva
- Detalhes: listar todas alterações relevantes
- Referências: incluir número da issue quando aplicável
