## Estado Atual do Projeto (2025-02-04 13:10)

### Infraestrutura
- Frontend: React + Vite (http://localhost:5173)
- Backend: Node.js + TypeScript (http://localhost:3000)
- Database: PostgreSQL em Docker (configuração pendente)
- Docker: Desktop v27.4.0 instalado e configurado
- WSL2: Instalado e configurado corretamente

### Progresso
- Servidor frontend configurado e rodando
- Endpoint de teste implementado no backend
- Schema do Prisma definido com todas as tabelas
- Docker Desktop instalado e configurado
- WSL2 e virtualização configurados corretamente

### Próximos Passos
1. Iniciar containers Docker (PostgreSQL + pgAdmin)
2. Executar migrations do Prisma
3. Popular banco com dados iniciais
4. Implementar formulários e funções dos botões
5. Implementar página de login conforme especificações

### Observações Técnicas
- Docker Compose configurado com PostgreSQL e pgAdmin
- Schema do Prisma com 4 tabelas principais:
  - User (autenticação)
  - OrdemServico (gestão de manutenção)
  - Equipamento (cadastro de equipamentos)
  - Metrica (indicadores de performance)
- Volume Docker configurado para persistência de dados
- WSL2 e virtualização habilitados para suporte a Docker

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
