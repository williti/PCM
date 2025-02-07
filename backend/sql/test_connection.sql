-- Teste de conexão com o banco de dados
SELECT current_database() as banco_atual,
       current_user as usuario_atual,
       version() as versao_postgres;

-- Lista todas as tabelas
SELECT table_name, 
       (SELECT count(*) FROM information_schema.columns WHERE table_name=tables.table_name) as total_colunas
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
