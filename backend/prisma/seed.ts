import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@pcm.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  });

  // Criar alguns equipamentos
  const equipamentos = await Promise.all([
    prisma.equipamento.create({
      data: {
        nome: 'Torno CNC',
        codigo: 'EQ-001',
        descricao: 'Torno CNC para usinagem de peças',
        area: 'MECÂNICA',
        status: 'ATIVO',
        criticidade: 'ALTA',
      },
    }),
    prisma.equipamento.create({
      data: {
        nome: 'Compressor Industrial',
        codigo: 'EQ-002',
        descricao: 'Compressor de ar industrial',
        area: 'PNEUMÁTICA',
        status: 'ATIVO',
        criticidade: 'CRÍTICA',
      },
    }),
    prisma.equipamento.create({
      data: {
        nome: 'Painel Elétrico Principal',
        codigo: 'EQ-003',
        descricao: 'Painel elétrico principal da fábrica',
        area: 'ELÉTRICA',
        status: 'ATIVO',
        criticidade: 'CRÍTICA',
      },
    }),
  ]);

  // Criar ordens de serviço
  await Promise.all([
    prisma.ordemServico.create({
      data: {
        numero: 'OS-2025-001',
        titulo: 'Manutenção Preventiva Torno CNC',
        descricao: 'Realizar manutenção preventiva no torno CNC',
        status: 'EM_ANDAMENTO',
        tipo: 'PREVENTIVA',
        prioridade: 'ALTA',
        critica: false,
        custo: 1500.00,
        area: 'MECÂNICA',
        equipamentoId: equipamentos[0].id,
        responsavelId: adminUser.id,
        dataPrevisao: new Date('2025-02-10'),
      },
    }),
    prisma.ordemServico.create({
      data: {
        numero: 'OS-2025-002',
        titulo: 'Reparo Emergencial Compressor',
        descricao: 'Vazamento identificado no compressor principal',
        status: 'PENDENTE',
        tipo: 'CORRETIVA',
        prioridade: 'CRÍTICA',
        critica: true,
        custo: 3000.00,
        area: 'PNEUMÁTICA',
        equipamentoId: equipamentos[1].id,
        responsavelId: adminUser.id,
        dataPrevisao: new Date('2025-02-05'),
      },
    }),
  ]);

  // Criar métricas para os equipamentos
  await Promise.all(
    equipamentos.map((eq) =>
      prisma.metrica.create({
        data: {
          equipamentoId: eq.id,
          mtbf: 120,
          mttr: 4,
          disponibilidade: 98.5,
          metaZeroFalhas: 85,
          osProgramadasConcluidas: 92,
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
