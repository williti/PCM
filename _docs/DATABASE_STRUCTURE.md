# Estrutura do Banco de Dados PCM

## Tabelas Principais

### 1. Equipamentos (equipment)
```sql
- id: UUID (PK)
- code: VARCHAR (UNIQUE) # ex: c1, C05
- name: VARCHAR # ex: CUBO (C1)
- type: VARCHAR # Máquina/Equipamento
- powerCV: DECIMAL
- amperage: DECIMAL
- powerKW: DECIMAL
- capacity: VARCHAR
- energyCostHour: DECIMAL
- nr12Compliant: BOOLEAN
- popAvailable: BOOLEAN
- equipmentValue: DECIMAL
- manufacturingYear: DATE
- model: VARCHAR
- serialNumber: VARCHAR
- observations: TEXT
- sectorId: UUID (FK)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 2. Ordens de Serviço (work_orders)
```sql
- id: UUID (PK)
- number: INTEGER (UNIQUE)
- openedAt: TIMESTAMP
- deadline: TIMESTAMP
- completedAt: TIMESTAMP
- serviceCost: DECIMAL
- materialCost: DECIMAL
- otherCosts: DECIMAL
- serviceTime: VARCHAR # formato HH:mm
- observations: TEXT
- partsUsed: TEXT
- deadlineObs: VARCHAR # ATRASADO, SHOW, etc
- equipmentId: UUID (FK)
- responsibleId: UUID (FK)
- priorityId: UUID (FK)
- maintenanceTypeId: UUID (FK)
- maintenanceAreaId: UUID (FK)
- statusId: UUID (FK)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Tabelas de Apoio

### 3. Setores (sectors)
```sql
- id: UUID (PK)
- name: VARCHAR (UNIQUE)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 4. Usuários (users)
```sql
- id: UUID (PK)
- name: VARCHAR
- email: VARCHAR (UNIQUE)
- role: VARCHAR
- active: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 5. Operadores de Equipamento (equipment_operators)
```sql
- equipmentId: UUID (PK, FK)
- operatorId: UUID (PK, FK)
- created_at: TIMESTAMP
```

### 6. Prioridades (priorities)
```sql
- id: UUID (PK)
- name: VARCHAR (UNIQUE)
- color: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 7. Tipos de Manutenção (maintenance_types)
```sql
- id: UUID (PK)
- name: VARCHAR (UNIQUE)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 8. Áreas de Manutenção (maintenance_areas)
```sql
- id: UUID (PK)
- name: VARCHAR (UNIQUE)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### 9. Status (status)
```sql
- id: UUID (PK)
- name: VARCHAR (UNIQUE)
- color: VARCHAR
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## Dados de Exemplo

### Setores
```csv
name
Homogenização
Extrusão
Moagem
Laboratorio
Refrigeração
Geral
```

### Tipos de Manutenção
```csv
name
Corretiva
Preventiva
Preditiva
```

### Áreas de Manutenção
```csv
name
Mecânica
Elétrica
Eletrônica
Instrumentação
Operação
```

### Status
```csv
name,color
Não Iniciada,#FFA500
Em Andamento,#0000FF
Finalizada,#008000
Cancelado,#FF0000
Programada,#800080
```

### Prioridades
```csv
name,color
Alta,#FF0000
Média,#FFA500
Baixa,#008000
```
