# Estrutura Detalhada do Banco de Dados - PCM

## 1. Tabelas Principais

### 1.1 Equipamentos (equipment)
```sql
CREATE TABLE equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type_id UUID REFERENCES equipment_types(id),
    sector_id UUID REFERENCES sectors(id),
    power_cv DECIMAL(10,2),
    power_kw DECIMAL(10,2),
    amperage DECIMAL(10,2),
    capacity VARCHAR(50),
    energy_cost_hour DECIMAL(10,2),
    nr12_compliant BOOLEAN DEFAULT false,
    pop_available BOOLEAN DEFAULT false,
    equipment_value DECIMAL(15,2),
    manufacturing_year DATE,
    model VARCHAR(100),
    serial_number VARCHAR(100),
    status_id UUID REFERENCES operational_status(id),
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 1.2 Ordens de Serviço (work_orders)
```sql
CREATE TABLE work_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number SERIAL UNIQUE,
    equipment_id UUID REFERENCES equipment(id),
    opened_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deadline TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    responsible_id UUID REFERENCES users(id),
    priority_id UUID REFERENCES priorities(id),
    maintenance_type_id UUID REFERENCES maintenance_types(id),
    maintenance_area_id UUID REFERENCES maintenance_areas(id),
    status_id UUID REFERENCES work_order_status(id),
    service_cost DECIMAL(15,2) DEFAULT 0,
    material_cost DECIMAL(15,2) DEFAULT 0,
    other_costs DECIMAL(15,2) DEFAULT 0,
    service_time VARCHAR(50),
    observations TEXT,
    parts_used TEXT,
    deadline_obs TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 1.3 Usuários (users)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id UUID REFERENCES roles(id),
    sector_id UUID REFERENCES sectors(id),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 2. Tabelas de Apoio

### 2.1 Setores (sectors)
```sql
CREATE TABLE sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES sectors(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Tipos de Manutenção (maintenance_types)
```sql
CREATE TABLE maintenance_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.3 Áreas de Manutenção (maintenance_areas)
```sql
CREATE TABLE maintenance_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.4 Status Operacional (operational_status)
```sql
CREATE TABLE operational_status (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2.5 Prioridades (priorities)
```sql
CREATE TABLE priorities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7),
    sla_hours INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 3. Tabelas de Relacionamento

### 3.1 Operadores de Equipamento (equipment_operators)
```sql
CREATE TABLE equipment_operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    equipment_id UUID REFERENCES equipment(id),
    user_id UUID REFERENCES users(id),
    main_operator BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(equipment_id, user_id)
);
```

### 3.2 Histórico de Manutenção (maintenance_history)
```sql
CREATE TABLE maintenance_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id UUID REFERENCES work_orders(id),
    status_id UUID REFERENCES work_order_status(id),
    user_id UUID REFERENCES users(id),
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## 4. Índices

```sql
-- Índices para busca rápida
CREATE INDEX idx_equipment_code ON equipment(code);
CREATE INDEX idx_equipment_sector ON equipment(sector_id);
CREATE INDEX idx_work_orders_equipment ON work_orders(equipment_id);
CREATE INDEX idx_work_orders_status ON work_orders(status_id);
CREATE INDEX idx_work_orders_priority ON work_orders(priority_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_sector ON users(sector_id);
```

## 5. Funções e Triggers

### 5.1 Atualização de updated_at
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger em todas as tabelas relevantes
CREATE TRIGGER update_equipment_updated_at
    BEFORE UPDATE ON equipment
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_work_orders_updated_at
    BEFORE UPDATE ON work_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

## 6. Views

### 6.1 View de Equipamentos Ativos
```sql
CREATE VIEW active_equipment AS
SELECT 
    e.*,
    s.name as sector_name,
    st.name as status_name,
    COUNT(wo.id) as open_work_orders
FROM equipment e
LEFT JOIN sectors s ON e.sector_id = s.id
LEFT JOIN operational_status st ON e.status_id = st.id
LEFT JOIN work_orders wo ON e.id = wo.equipment_id 
    AND wo.status_id NOT IN (SELECT id FROM work_order_status WHERE name = 'Concluída')
WHERE e.status_id IN (SELECT id FROM operational_status WHERE name != 'Desativado')
GROUP BY e.id, s.name, st.name;
```

### 6.2 View de Indicadores
```sql
CREATE VIEW maintenance_indicators AS
SELECT 
    e.id as equipment_id,
    e.name as equipment_name,
    COUNT(wo.id) as total_work_orders,
    AVG(EXTRACT(EPOCH FROM (wo.completed_at - wo.opened_at))/3600) as avg_repair_time,
    AVG(wo.service_cost + wo.material_cost + wo.other_costs) as avg_maintenance_cost
FROM equipment e
LEFT JOIN work_orders wo ON e.id = wo.equipment_id
WHERE wo.completed_at IS NOT NULL
GROUP BY e.id, e.name;
```
