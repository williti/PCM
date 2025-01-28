# Documentação do Frontend

## Estrutura de Componentes

### Layout
- **MainLayout**: Container principal que envolve toda a aplicação
  - Responsável pelo layout geral
  - Gerencia o tema (claro/escuro)
  - Inclui Header e SubMenu

- **Header**: Barra superior da aplicação
  - Ícone de notificações
  - Toggle de tema claro/escuro
  - Menu do usuário

- **SubMenu**: Menu de navegação horizontal
  - Links para as principais seções
  - Submenu de métricas

- **UserMenu**: Menu dropdown do usuário
  - Perfil do usuário
  - Configurações
  - Logout

### Páginas

#### Dashboard
- Exibe 6 cards principais com métricas
- Gráficos de desempenho
- Resumo das atividades

#### Ordens de Serviço
- Lista de ordens de serviço
- Filtros e pesquisa
- Criação e edição de ordens

#### Inventário
- Gestão de peças e materiais
- Controle de estoque
- Alertas de estoque baixo

#### Métricas
- **Falhas**
  - MTTR (Tempo médio de reparo)
  - Taxa de conclusão de ordens
  - Análise de falhas recorrentes

- **Tempo**
  - Tempo médio de atendimento
  - Tempo total de manutenção
  - Análise de eficiência

- **Custos**
  - Custo total de manutenção
  - Custo por equipamento
  - Análise de gastos

## Contextos

### ThemeContext
```typescript
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}
```
- Gerencia o tema da aplicação
- Persiste a preferência do usuário
- Fornece tema para Material-UI

### AuthContext
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}
```
- Gerencia autenticação do usuário
- Mantém estado do usuário logado
- Controla acesso às rotas protegidas

## Rotas
```typescript
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/ordens-servico" element={<OrdensServico />} />
  <Route path="/inventario" element={<Inventario />} />
  <Route path="/metricas/falhas" element={<Falhas />} />
  <Route path="/metricas/tempo" element={<Tempo />} />
  <Route path="/metricas/custos" element={<Custos />} />
</Routes>
```

## Temas

### Tema Claro
```typescript
const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    }
  }
}
```

### Tema Escuro
```typescript
const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#e3f2fd',
      dark: '#42a5f5',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    }
  }
}
```

## Dependências Principais
```json
{
  "@mui/material": "^5.x.x",
  "@mui/icons-material": "^5.x.x",
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "react-router-dom": "^6.x.x",
  "typescript": "^4.x.x"
}
```

## Padrões de Código
- Componentes funcionais com TypeScript
- Hooks para gerenciamento de estado
- Context API para estado global
- Material-UI para componentes de UI
- CSS-in-JS via Material-UI styled
