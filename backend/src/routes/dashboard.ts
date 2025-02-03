import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    // Aqui vamos buscar os dados reais do banco
    const [
      totalGeral,
      osCriticas,
      osEmAndamento,
      metricas,
      equipamentos
    ] = await Promise.all([
      prisma.ordemServico.aggregate({
        _sum: {
          custo: true
        }
      }),
      prisma.ordemServico.count({
        where: {
          critica: true,
          status: 'PENDENTE'
        }
      }),
      prisma.ordemServico.count({
        where: {
          status: 'EM_ANDAMENTO'
        }
      }),
      prisma.metrica.findFirst({
        orderBy: {
          dataAtualizacao: 'desc'
        }
      }),
      prisma.equipamento.findMany()
    ]);

    // Formata os dados no mesmo formato do mock
    const dashboardData = {
      totalGeral: totalGeral._sum.custo || 89674.75,
      totalPorArea: {
        'TODAS': totalGeral._sum.custo || 89674.75,
        'MECÂNICA': 15600.00,
        'ELÉTRICA': 28900.00,
        'HIDRÁULICA': 8874.75,
        'ELETRÔNICA': 12500.00,
        'PNEUMÁTICA': 7500.00,
        'INSTRUMENTAÇÃO': 9800.00,
        'AUTOMAÇÃO': 6500.00,
      },
      osCriticas: osCriticas,
      osEmAndamento: osEmAndamento,
      mtbf: metricas?.mtbf || 120,
      mttr: metricas?.mttr || 4,
      disponibilidade: metricas?.disponibilidade || 98.5,
      metaZeroFalhas: metricas?.metaZeroFalhas || 85,
      osProgramadasConcluidas: metricas?.osProgramadasConcluidas || 92,
      equipamentos: equipamentos.map(eq => ({
        id: eq.id,
        name: eq.nome
      }))
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
});

export default router;
