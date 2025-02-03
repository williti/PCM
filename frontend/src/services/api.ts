import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const dashboardService = {
  async getDashboardData() {
    try {
      const response = await api.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      // Fallback para dados mockados em caso de erro
      return getMockDashboardData();
    }
  }
};

// Dados mockados mantidos como fallback
function getMockDashboardData() {
  return {
    totalGeral: 89674.75,
    totalPorArea: {
      'TODAS': 89674.75,
      'MECÂNICA': 15600.00,
      'ELÉTRICA': 28900.00,
      'HIDRÁULICA': 8874.75,
      'ELETRÔNICA': 12500.00,
      'PNEUMÁTICA': 7500.00,
      'INSTRUMENTAÇÃO': 9800.00,
      'AUTOMAÇÃO': 6500.00,
    },
    osCriticas: 0,
    osEmAndamento: 12,
    mtbf: 120,
    mttr: 4,
    disponibilidade: 98.5,
    metaZeroFalhas: 85,
    osProgramadasConcluidas: 92,
    equipamentos: [
      { id: 'PRENSA P2', name: 'PRENSA P2' },
      { id: 'PRENSA P3', name: 'PRENSA P3' },
      { id: 'TORNO CNC', name: 'TORNO CNC' },
      { id: 'FRESA', name: 'FRESA' },
    ]
  };
}
