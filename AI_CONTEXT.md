## Estado Atual do Projeto (2025-02-07)

### Infraestrutura
- Frontend: React + Vite (http://localhost:5173)
- Backend: Node.js + TypeScript (http://localhost:3000)
- Database: PostgreSQL em Docker (configuração concluída)
- Docker: Desktop v27.4.0 instalado e configurado
- WSL2: Instalado e configurado corretamente

### Progresso
- Servidor frontend configurado e rodando
- Endpoint de teste implementado no backend
- Schema do Prisma definido com todas as tabelas
- Docker Desktop instalado e configurado
- WSL2 e virtualização configurados corretamente
- Banco de dados PostgreSQL configurado e rodando em container Docker
- pgAdmin4 configurado e acessível em http://localhost:5050
- Três tabelas principais criadas:
  - User (usuários do sistema)
  - Equipamento (cadastro de equipamentos)
  - OrdemServico (registro de manutenções)

### Próximos Passos
1. Implementar endpoints da API REST
2. Desenvolver interface do usuário em React
3. Configurar sistema de autenticação
4. Implementar CRUD de equipamentos

### Observações Técnicas
- Docker Compose configurado com PostgreSQL e pgAdmin
- Schema do Prisma com 4 tabelas principais:
  - User (autenticação)
  - OrdemServico (gestão de manutenção)
  - Equipamento (cadastro de equipamentos)
  - Metrica (indicadores de performance)
- Volume Docker configurado para persistência de dados
- WSL2 e virtualização habilitados para suporte a Docker
- Documentação completa em `_docs/guides/database_setup_guide.md`

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
