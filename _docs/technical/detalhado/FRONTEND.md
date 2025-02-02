# Documentação Detalhada do Frontend - PCM

## 1. Estrutura de Componentes

### 1.1 Dashboard
- **KPIs Principais**
  - Equipamentos Ativos
  - Ordens de Serviço em Aberto
  - MTBF (Mean Time Between Failures)
  - Disponibilidade de Equipamentos
- **Gráficos**
  - OS por Status (gráfico de barras)
  - Tendências de Manutenção (linha temporal)
- **Lista de OS Recentes**
  - Últimas 5 ordens abertas
  - Status em tempo real
  - Prioridade e responsável

### 1.2 Gestão de Equipamentos
- **Listagem**
  - Tabela com paginação e filtros
  - Status visual por equipamento
  - Ações rápidas (editar, visualizar)
- **Cadastro/Edição**
  - Formulário completo
  - Upload de documentação técnica
  - Histórico de manutenções
- **Visualização Detalhada**
  - Informações técnicas
  - Indicadores específicos
  - Documentação anexada

### 1.3 Ordens de Serviço
- **Listagem**
  - Filtros avançados
  - Status coloridos
  - Priorização visual
- **Nova OS**
  - Seleção de equipamento
  - Definição de prioridade
  - Atribuição de responsável
  - Descrição detalhada
- **Acompanhamento**
  - Timeline de status
  - Registro de atividades
  - Anexos e fotos

### 1.4 Funcionários
- **Gestão de Usuários**
  - Perfis e permissões
  - Histórico de atividades
  - Especialidades técnicas

### 1.5 Peças e Materiais
- **Controle de Estoque**
  - Quantidade disponível
  - Ponto de reposição
  - Histórico de uso
- **Requisições**
  - Vinculação com OS
  - Aprovações necessárias

## 2. Fluxos de Navegação

### 2.1 Fluxo Principal
1. Login → Dashboard
2. Dashboard → Nova OS
3. OS → Atribuição → Execução → Fechamento

### 2.2 Fluxo de Equipamentos
1. Listagem → Detalhes
2. Detalhes → Histórico/Documentos
3. Detalhes → Nova OS

### 2.3 Fluxo de Manutenção
1. OS Abertas → Detalhes
2. Execução → Registro de Atividades
3. Fechamento → Indicadores

## 3. Tecnologias Utilizadas

### 3.1 Framework e Bibliotecas
- React 18.2
- TypeScript 4.9
- Material-UI 5.15
- React Router 6.21
- Chart.js 4.4
- Axios 1.6

### 3.2 Recursos Técnicos
- Lazy Loading para otimização
- Componentes reutilizáveis
- Temas claro/escuro
- Responsividade mobile

## 4. Segurança e Autenticação

### 4.1 Login
- JWT Token
- Refresh Token
- Controle de Sessão

### 4.2 Permissões
- Baseado em Papéis (RBAC)
- Níveis de Acesso
- Auditoria de Ações

## 5. Integração com Backend

### 5.1 APIs
- REST endpoints
- WebSocket para atualizações
- Upload de arquivos

### 5.2 Cache e Performance
- Caching local
- Otimização de requisições
- Feedback em tempo real
