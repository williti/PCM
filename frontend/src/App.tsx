import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { OrdensServico } from './pages/OrdensServico';
import { Inventario } from './pages/Inventario';
import Falhas from './pages/metricas/Falhas';
import Tempo from './pages/metricas/Tempo';
import Custos from './pages/metricas/Custos';
import { ThemeProvider, useAppTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function AppWithProviders() {
  const { theme } = useAppTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ordens-servico" element={<OrdensServico />} />
              <Route path="/solicitacoes" element={<div>Página de Solicitações em desenvolvimento</div>} />
              <Route path="/planos" element={<div>Página de Planos em desenvolvimento</div>} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/metricas/falhas" element={<Falhas />} />
              <Route path="/metricas/tempo" element={<Tempo />} />
              <Route path="/metricas/custos" element={<Custos />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppWithProviders />
    </ThemeProvider>
  );
}

export default App;
