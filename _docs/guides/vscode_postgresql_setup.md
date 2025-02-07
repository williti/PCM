# Configuração do PostgreSQL no VS Code

## 1. Instalação da Extensão

1. Abra o VS Code
2. Pressione `Ctrl+Shift+X` para abrir o painel de extensões
3. Pesquise por "PostgreSQL" (por "cweijan.vscode-postgresql-client2")
4. Instale a extensão "PostgreSQL" (a que tem mais downloads)

## 2. Configuração da Conexão

1. Após instalar, clique no ícone da extensão na barra lateral esquerda (parece um banco de dados)
2. Clique no botão "+" para adicionar uma nova conexão
3. Use os seguintes dados:
   ```
   Host: localhost
   Port: 5432
   Username: postgres
   Password: Nicklu281208@@
   Database: pcm_db
   ```

## 3. Recursos Principais

1. **Visualização de Tabelas:**
   - Expanda a conexão para ver todas as tabelas
   - Clique com botão direito para ver opções
   - Visualize e edite dados diretamente

2. **Execução de Queries:**
   - Crie novo arquivo SQL (extensão .sql)
   - Execute queries com botão direito
   - Veja resultados no painel inferior

3. **Gerenciamento de Tabelas:**
   - Crie novas tabelas
   - Modifique estrutura existente
   - Exporte e importe dados

## 4. Atalhos Úteis

- `Ctrl+Enter`: Executa a query selecionada
- `Shift+Enter`: Executa a query atual
- `Alt+Enter`: Executa todas as queries

## 5. Dicas

1. **Organização:**
   - Crie uma pasta `sql` no projeto para scripts
   - Use comentários para documentar queries
   - Salve queries frequentes

2. **Boas Práticas:**
   - Sempre revise queries antes de executar
   - Use transações para operações críticas
   - Faça backup antes de alterações grandes

3. **Debug:**
   - Use o painel de saída para ver erros
   - Verifique a conexão se houver problemas
   - Consulte logs do Docker se necessário
