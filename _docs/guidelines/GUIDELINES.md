# Diretrizes do Projeto PCM

## 1. Estrutura de Pastas e Arquivos
- Manter estrutura inicial sem alterações sem autorização explícita
- Alterações limitadas ao conteúdo de arquivos existentes
- Usar versionamento em branches separadas
- Manter documentação da estrutura atualizada
- Seguir padrão de nomenclatura consistente

## 2. Conformidade com Boas Práticas de Banco de Dados
- Manter campos created_at e updated_at em todas as tabelas principais
- Garantir integridade referencial
- Manter índices em colunas críticas
- Implementar sistema de log de alterações
- Validar dados antes da inserção
- Configurar backups regulares

## 3. Manutenção da Modularidade
- Manter tabelas auxiliares isoladas e reutilizáveis
- Evitar duplicação de código
- Seguir princípio de responsabilidade única (SRP)
- Criar componentes reutilizáveis
- Documentar módulos e tabelas auxiliares

## 4. Segurança e Validação de Dados
- Implementar validações automáticas
- Adotar padrões de tratamento de erros
- Implementar validações no frontend e backend
- Tratar erros de forma amigável
- Proteger contra injeção de SQL

## 5. Desempenho e Escalabilidade
- Utilizar caching para consultas frequentes
- Limitar complexidade das consultas
- Otimizar consultas ao banco de dados
- Considerar escalabilidade horizontal
- Implementar monitoramento de desempenho

## 6. Gestão do Estado do Aplicativo
- Usar Redux ou Context API para estado global
- Evitar estados locais redundantes
- Centralizar e documentar estado global
- Usar padrões de imutabilidade
- Implementar testes de estado

## 7. Manutenção e Atualizações
- Documentar alterações em changelogs
- Permitir revisões manuais para atualizações críticas
- Manter changelog estruturado
- Implementar sistema de rollback

## 8. Testes Automatizados
- Incluir testes unitários e de integração
- Cobrir cenários críticos
- Manter cobertura mínima de 80%
- Incluir testes de carga
- Configurar CI/CD

## 9. Manutenção do Histórico de Auditoria
- Rastrear alterações em tabelas sensíveis
- Proteger dados históricos
- Manter logs detalhados e seguros
- Registrar IP, data/hora e ações

## 10. Escalabilidade de Relatórios
- Manter estrutura de consultas escalável
- Projetar consultas flexíveis
- Considerar integração com ferramentas de BI
