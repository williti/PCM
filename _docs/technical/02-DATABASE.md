# Estrutura do Banco de Dados

## Visão Geral
O sistema utiliza PostgreSQL como banco de dados principal, gerenciado através do Prisma ORM.

## Tabelas Principais

### Users
```sql
CREATE TABLE "Users" (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    role        VARCHAR(50) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Equipment
```sql
CREATE TABLE "Equipment" (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    code            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    status          VARCHAR(50) NOT NULL,
    location        VARCHAR(255),
    department      VARCHAR(255),
    purchase_date   DATE,
    warranty_until  DATE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### MaintenanceOrders
```sql
CREATE TABLE "MaintenanceOrders" (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id    UUID NOT NULL REFERENCES "Equipment"(id),
    requester_id    UUID NOT NULL REFERENCES "Users"(id),
    technician_id   UUID REFERENCES "Users"(id),
    type            VARCHAR(50) NOT NULL,
    priority        VARCHAR(50) NOT NULL,
    status          VARCHAR(50) NOT NULL,
    description     TEXT NOT NULL,
    scheduled_for   TIMESTAMP WITH TIME ZONE,
    started_at      TIMESTAMP WITH TIME ZONE,
    completed_at    TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### MaintenanceHistory
```sql
CREATE TABLE "MaintenanceHistory" (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id            UUID NOT NULL REFERENCES "MaintenanceOrders"(id),
    equipment_id        UUID NOT NULL REFERENCES "Equipment"(id),
    technician_id       UUID NOT NULL REFERENCES "Users"(id),
    action_taken        TEXT NOT NULL,
    parts_replaced      TEXT[],
    labor_hours         DECIMAL(10,2),
    cost               DECIMAL(10,2),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Inventory
```sql
CREATE TABLE "Inventory" (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    code            VARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    category        VARCHAR(100) NOT NULL,
    quantity        INTEGER NOT NULL,
    min_quantity    INTEGER NOT NULL,
    unit_cost       DECIMAL(10,2),
    location        VARCHAR(255),
    supplier        VARCHAR(255),
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Notifications
```sql
CREATE TABLE "Notifications" (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID NOT NULL REFERENCES "Users"(id),
    title       VARCHAR(255) NOT NULL,
    message     TEXT NOT NULL,
    type        VARCHAR(50) NOT NULL,
    read        BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Índices
```sql
CREATE INDEX idx_equipment_code ON "Equipment"(code);
CREATE INDEX idx_maintenance_orders_equipment ON "MaintenanceOrders"(equipment_id);
CREATE INDEX idx_maintenance_orders_status ON "MaintenanceOrders"(status);
CREATE INDEX idx_inventory_code ON "Inventory"(code);
CREATE INDEX idx_notifications_user ON "Notifications"(user_id, read);
```

## Triggers
```sql
-- Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON "Users"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- (Repetir para outras tabelas que precisam de updated_at)
```

## Relacionamentos
- Um equipamento pode ter várias ordens de manutenção
- Uma ordem de manutenção pertence a um equipamento
- Um usuário pode ser requisitante ou técnico em várias ordens
- Uma ordem de manutenção tem um histórico de manutenção
- Um item do inventário pode ser usado em várias manutenções
- Um usuário pode ter várias notificações
