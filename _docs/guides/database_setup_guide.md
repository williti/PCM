# Guia de Configuração do Banco de Dados

Este guia detalha o processo de configuração do ambiente de banco de dados PostgreSQL usando Docker e pgAdmin.

## Pré-requisitos
- Docker Desktop instalado e em execução
- Node.js e npm instalados
- WSL2 configurado (para Windows)

## 1. Configuração do Docker

### 1.1 Arquivo docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    container_name: pcm_postgres
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: Nicklu281208@@
      POSTGRES_DB: pcm_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  pgadmin:
    container_name: pcm_pgadmin
    image: dpage/pgadmin4:latest
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@pcm.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - postgres
    restart: unless-stopped

volumes:
  postgres_data:
```

### 1.2 Iniciar Containers
```bash
docker-compose up -d
```

## 2. Configuração do Backend

### 2.1 Arquivo .env
```env
DATABASE_URL="postgresql://postgres:Nicklu281208@@localhost:5432/pcm_db"
JWT_SECRET="pcm_secret_key_2025"
```

### 2.2 Instalação de Dependências
```bash
cd backend
npm install
npm install -D typescript ts-node @types/node
npm install bcrypt @types/bcrypt
```

## 3. Configuração do pgAdmin

1. Acesse: http://localhost:5050
2. Login:
   - Email: admin@pcm.com
   - Senha: admin123

3. Adicionar Servidor PostgreSQL:
   - Nome: PCM Database
   - Host: pcm_postgres
   - Porta: 5432
   - Banco de manutenção: pcm_db
   - Usuário: postgres
   - Senha: Nicklu281208@@

## 4. Criação das Tabelas

As tabelas são criadas automaticamente através das migrations do Prisma:

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

### 4.1 Estrutura das Tabelas

1. **User**
   - Armazena informações dos usuários
   - Campos principais: id, name, email, password, role

2. **Equipamento**
   - Cadastro de equipamentos
   - Campos principais: id, nome, codigo, descricao, area, status, criticidade

3. **OrdemServico**
   - Registro de ordens de serviço
   - Campos principais: id, numero, titulo, descricao, status, tipo, prioridade, etc.
   - Relacionamentos com User (responsável) e Equipamento

## 5. Verificação

Para verificar se tudo está funcionando:

1. Docker Desktop:
   - Verifique se os containers estão rodando (pcm_postgres e pcm_pgadmin)

2. pgAdmin:
   - Confirme se consegue ver as tabelas em:
     `Servers > PCM Database > Bancos de dados > pcm_db > Schemas > public > Tabelas`

## 6. Problemas Comuns e Soluções

### 6.1 Problemas com Caracteres Especiais na Senha

**Problema:**
- A senha `Nicklu281208@@` contém caracteres especiais (@)
- Isso causou problemas na string de conexão do DATABASE_URL
- O Prisma não conseguia conectar ao banco

**Solução:**
1. Encode da senha na string de conexão:
```env
# Antes (não funcionava):
DATABASE_URL="postgresql://postgres:Nicklu281208@@localhost:5432/pcm_db"

# Depois (funcionando):
DATABASE_URL="postgresql://postgres:Nicklu281208%40%40@localhost:5432/pcm_db"
```

2. Ou usar aspas duplas ao redor da senha no docker-compose.yml:
```yaml
environment:
  POSTGRES_PASSWORD: "Nicklu281208@@"
```

### 6.2 Problemas com Migrations do Prisma

**Problema:**
- As migrations do Prisma não estavam criando as tabelas
- Mensagens de erro sobre schema não encontrado
- Tabelas não apareciam no pgAdmin

**Solução:**
1. Limpamos o schema do banco:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

2. Criamos as tabelas manualmente via SQL para garantir a estrutura correta
3. Depois disso, as migrations do Prisma passaram a funcionar

### 6.3 Problemas de Conexão no pgAdmin

**Problema:**
- Erro "Email/Username is not valid" no pgAdmin
- Não conseguia conectar ao servidor PostgreSQL

**Solução:**
1. Usar as credenciais corretas do pgAdmin:
   - Email: admin@pcm.com
   - Senha: admin123

2. Na configuração do servidor PostgreSQL:
   - Host: pcm_postgres (não localhost)
   - Aguardar alguns segundos após iniciar os containers

### 6.4 Problemas com Schemas no Prisma

**Problema:**
- Erro ao tentar usar `schemas = ["public"]` no schema.prisma
- Mensagem: "The `schemas` property is only available with the `multiSchema` preview feature"

**Solução:**
1. Removemos a linha `schemas = ["public"]` do datasource
2. Usamos apenas a configuração básica:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 6.5 Dicas Importantes

1. **Ordem de Inicialização:**
   - Sempre inicie o Docker Desktop primeiro
   - Depois suba os containers com `docker-compose up -d`
   - Aguarde alguns segundos antes de tentar conexões

2. **Verificação de Problemas:**
   ```bash
   # Ver logs dos containers
   docker-compose logs

   # Ver status dos containers
   docker-compose ps

   # Reiniciar containers
   docker-compose down
   docker-compose up -d
   ```

3. **Backup e Restauração:**
   - Sempre faça backup antes de alterações grandes
   - Use `docker-compose down -v` para limpar volumes se necessário
   - Mantenha o script SQL das tabelas como fallback

### 6.6 Persistência de Conexão no pgAdmin

**Problema:**
- Ao fechar e reabrir o navegador, ou atualizar a página
- A conexão com o servidor PostgreSQL é perdida
- Necessário reconectar manualmente

**Solução e Dicas:**
1. Isso é um comportamento normal do pgAdmin por questões de segurança
2. Para evitar reconfigurar tudo novamente:
   - Salve a senha ao configurar o servidor (marque "Save password?")
   - Mantenha uma aba do pgAdmin sempre aberta
   - Use bookmarks no navegador para o pgAdmin
   - Se precisar reconectar, os dados salvos aparecerão ao clicar no servidor

3. Dados para reconexão rápida:
   ```
   Nome: PCM Database
   Host: pcm_postgres
   Porta: 5432
   Banco: pcm_db
   Usuário: postgres
   Senha: Nicklu281208@@
   ```

4. Alternativas:
   - Use um cliente desktop como DBeaver ou DataGrip que mantém as conexões salvas
   - Crie um script de conexão rápida
   - Use a extensão do VS Code para PostgreSQL

## 7. Troubleshooting

Se encontrar problemas:

1. **Containers não iniciam:**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```

2. **Erro de conexão no pgAdmin:**
   - Verifique se os containers estão rodando
   - Aguarde alguns segundos para o PostgreSQL inicializar completamente
   - Confirme as credenciais

3. **Tabelas não aparecem:**
   - Execute `npx prisma migrate reset --force`
   - Atualize a árvore no pgAdmin

## 8. Informações Importantes sobre Docker

### 8.1 Docker Desktop
- Deve permanecer aberto durante o desenvolvimento
- Os containers param se o Docker Desktop for fechado
- Ao reabrir, os containers reiniciam automaticamente
- Não é necessário instalar PostgreSQL no computador

### 8.2 Configurando em um Novo Computador

1. **Instalar Pré-requisitos:**
   - Docker Desktop
   - Node.js e npm
   - VS Code
   - Git

2. **Clonar e Configurar:**
   ```bash
   # Clonar repositório
   git clone [url-do-repositorio]
   cd PCM

   # Instalar dependências
   cd backend
   npm install

   # Iniciar containers
   cd ..
   docker-compose up -d
   ```

3. **Configurar VS Code:**
   - Instalar extensão MySQL/PostgreSQL
   - Configurar conexão com os mesmos dados:
     ```
     Host: localhost
     Port: 5432
     User: postgres
     Password: Nicklu281208@@
     Database: pcm_db
     ```

4. **Verificar Instalação:**
   - Acessar pgAdmin: http://localhost:5050
   - Ou usar extensão VS Code
   - Confirmar se as tabelas estão visíveis

### 8.3 Vantagens do Docker
- Ambiente consistente em qualquer máquina
- Não precisa instalar PostgreSQL localmente
- Fácil de compartilhar e versionar
- Isolamento de ambientes
