CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Equipamento" (
    id TEXT PRIMARY KEY,
    nome TEXT NOT NULL,
    codigo TEXT UNIQUE NOT NULL,
    descricao TEXT NOT NULL,
    area TEXT NOT NULL,
    status TEXT NOT NULL,
    criticidade TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "OrdemServico" (
    id TEXT PRIMARY KEY,
    numero TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    status TEXT NOT NULL,
    tipo TEXT NOT NULL,
    prioridade TEXT NOT NULL,
    critica BOOLEAN NOT NULL DEFAULT false,
    custo DOUBLE PRECISION NOT NULL DEFAULT 0,
    area TEXT NOT NULL,
    "equipamentoId" TEXT NOT NULL REFERENCES "Equipamento"(id),
    "responsavelId" TEXT NOT NULL REFERENCES "User"(id),
    "dataAbertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPrevisao" TIMESTAMP(3),
    "dataConclusao" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
