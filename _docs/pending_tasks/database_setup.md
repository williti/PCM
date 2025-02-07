# Configuração do Ambiente de Banco de Dados

## Nota sobre Pull Request
Este arquivo faz parte da feature branch `feature/database-setup` e será enviado como PR para o repositório principal.
Autor: williti (williti@resiplac.com.br)

## Status: PENDENTE
Data de Criação: 2025-02-04 13:12

## Descrição
Configurar e inicializar o ambiente de banco de dados usando Docker e Prisma.

## Tarefas
1. [ ] Inicialização dos Containers Docker
   - [ ] Executar `docker-compose up -d`
   - [ ] Verificar status dos containers
   - [ ] Confirmar acesso ao pgAdmin (http://localhost:5050)

2. [ ] Configuração do PostgreSQL e pgAdmin
   - [ ] Acessar pgAdmin com credenciais (admin@pcm.com/admin123)
   - [ ] Conectar ao servidor PostgreSQL
   - [ ] Verificar criação do banco pcm_db

3. [ ] Execução das Migrations do Prisma
   - [ ] Executar `npx prisma generate`
   - [ ] Executar `npx prisma migrate dev --name init`
   - [ ] Verificar criação das tabelas

4. [ ] População do Banco com Dados Iniciais
   - [ ] Executar `npx prisma db seed`
   - [ ] Verificar dados inseridos via pgAdmin
   - [ ] Testar consulta via API

## Dependências
- Docker Desktop instalado e configurado
- WSL2 funcionando corretamente
- Arquivo docker-compose.yml configurado
- Schema do Prisma definido

## Observações Técnicas
- Porta PostgreSQL: 5432
- Porta pgAdmin: 5050
- Banco de dados: pcm_db
- Usuário PostgreSQL: postgres
- Senha PostgreSQL: Nicklu281208@@
