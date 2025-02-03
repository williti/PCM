import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import dashboardRoutes from './routes/dashboard';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API status endpoint
app.get('/', (req, res) => {
  res.json({ message: 'API PCM está funcionando!' });
});

// Endpoint de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    status: "success",
    message: "Conexão backend OK!",
    timestamp: new Date().toISOString()
  });
});

// Endpoint de teste
app.get('/api/test', (req, res) => {
  res.json({ 
    status: "success",
    message: "Conexão backend OK!",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida');
    
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
