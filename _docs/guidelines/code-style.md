# Code Style Guide

## Naming Conventions

### File and Directory Names
```typescript
// Correct ✅
user-service.ts
api-routes/
components/auth/login-form.tsx

// Incorrect ❌
UserService.ts
API_Routes/
Components/Auth/LoginForm.tsx
```

### Classes and Interfaces
```typescript
// Correct ✅
class UserController {
  private userService: UserService;
}

interface AuthenticationResponse {
  accessToken: string;
}

// Incorrect ❌
class userController {
  private UserService: userService;
}
```

### Functions and Variables
```typescript
// Correct ✅
const getUserById = (userId: string): User => {
  const userResponse = await api.get(`/users/${userId}`);
  return userResponse.data;
}

// Incorrect ❌
const GetUserById = (UserID: string): user => {
  const USER_RESPONSE = await api.get(`/users/${UserID}`);
  return USER_RESPONSE.data;
}
```

### Constants
```typescript
// Correct ✅
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Incorrect ❌
const maxRetryAttempts = 3;
const apiBaseUrl = 'https://api.example.com';
```

### Database
```sql
-- Correct ✅
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY,
    first_name VARCHAR(255)
);

-- Incorrect ❌
CREATE TABLE UserProfiles (
    UserID UUID PRIMARY KEY,
    FirstName VARCHAR(255)
);
```

## Code Organization

### React Components
```typescript
// Correct ✅
/components
  /users
    UserList.tsx
    UserCard.tsx
    user-types.ts
    user-hooks.ts
    user-utils.ts

// Incorrect ❌
/Components
  UserStuff.tsx
  Users.tsx
```

### API Routes
```typescript
// Correct ✅
/routes
  /users
    index.ts
    user-controller.ts
    user-service.ts
    user-validation.ts

// Incorrect ❌
/Routes
  /Users
    Users.ts
    UserLogic.ts
```

## Comments and Documentation

### Code Comments (em português BR)
```typescript
// Correct ✅
// Busca usuário pelo ID e atualiza o cache
const fetchUser = async (id: string) => {
  // Verifica primeiro no cache local
  const cachedUser = await cache.get(id);
}

// Incorrect ❌
// Gets user and updates cache
const fetchUser = async (id: string) => {
  // Check local cache first
  const cachedUser = await cache.get(id);
}
```

### JSDoc (em português BR)
```typescript
// Correct ✅
/**
 * Processa a ordem de serviço e notifica os técnicos responsáveis
 * @param {ServiceOrder} ordem - Ordem de serviço a ser processada
 * @returns {Promise<void>}
 * @throws {ErroProcessamentoOrdem} Quando há falha no processamento
 */

// Incorrect ❌
/**
 * Process service order and notify technicians
 * @param {ServiceOrder} order - Order to process
 */
```

## Import/Export
```typescript
// Correct ✅
import { UserService } from './user-service';
export { default as UserList } from './UserList';

// Incorrect ❌
import { userService } from './UserService';
export { default as userList } from './userList';
```

## Type Definitions
```typescript
// Correct ✅
type UserRole = 'admin' | 'user' | 'guest';
interface UserState {
  isAuthenticated: boolean;
  userData: User | null;
}

// Incorrect ❌
type userRole = 'Admin' | 'User' | 'Guest';
interface USER_STATE {
  IS_AUTHENTICATED: boolean;
  USER_DATA: USER | null;
}
```
