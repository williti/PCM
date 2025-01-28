import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { MainLayout } from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { Dashboard } from '../pages/Dashboard';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const WorkOrders = () => (
  <div>Ordens de Serviço em construção</div>
);

const Inventory = () => (
  <div>Inventário em construção</div>
);

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      
      <Route
        path="/ordens-servico"
        element={
          <PrivateRoute>
            <MainLayout>
              <WorkOrders />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/solicitacoes"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>Solicitações em construção</div>
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/planos"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>Planos em construção</div>
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/inventario"
        element={
          <PrivateRoute>
            <MainLayout>
              <Inventory />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/metricas"
        element={
          <PrivateRoute>
            <MainLayout>
              <div>Métricas em construção</div>
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
};
