# Environment Setup Guide

## Prerequisites

### Required Software
- Node.js 16.x or higher
- npm 8.x or higher
- PostgreSQL 14.x or higher
- Git

### Recommended Tools
- VSCode
- DBeaver or pgAdmin
- Insomnia or Postman

## Initial Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd PCM
```

### 2. Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=PCM System
VITE_APP_VERSION=1.0.0
```

#### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pcm_db"

# Authentication
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="24h"

# Server
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=debug
```

### 3. Database Setup
```bash
# Create database
createdb pcm_db

# Run migrations
cd backend
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

### 4. Install Dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd backend
npm install
```

## Running the Project

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

## VSCode Setup

### Recommended Extensions
- ESLint
- Prettier
- GitLens
- Prisma
- Material Icon Theme

### Workspace Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Troubleshooting

### Common Issues
1. **Database Connection**
   ```bash
   # Check PostgreSQL service
   service postgresql status
   
   # Verify connection
   npx prisma db push --preview-feature
   ```

2. **Node Modules**
   ```bash
   # Clear node_modules
   rm -rf node_modules
   npm install
   ```

3. **Prisma Issues**
   ```bash
   # Reset Prisma
   npx prisma generate
   npx prisma migrate reset
   ```

## CI/CD Setup
- GitHub Actions for automated testing
- Vercel for frontend deployment
- Railway for backend deployment

## Security Notes
- Never commit .env files
- Keep dependencies updated
- Follow security best practices
- Regular security audits
