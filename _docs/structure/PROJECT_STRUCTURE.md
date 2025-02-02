# Estrutura do Projeto PCM

```
PCM/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── providers.tsx
│   │   │   └── routes.tsx
│   │   ├── assets/
│   │   │   ├── fonts/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── forms/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── equipment/
│   │   │   ├── maintenance/
│   │   │   ├── reports/
│   │   │   └── notifications/
│   │   ├── hooks/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── common/
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   ├── services/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   └── storage/
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   └── hooks/
│   │   ├── styles/
│   │   │   ├── global/
│   │   │   ├── themes/
│   │   │   └── variables/
│   │   ├── types/
│   │   │   ├── api/
│   │   │   ├── models/
│   │   │   └── common/
│   │   └── utils/
│   │       ├── formatters/
│   │       ├── validators/
│   │       └── helpers/
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── auth.ts
│   │   │   └── env.ts
│   │   ├── modules/
│   │   │   ├── equipment/
│   │   │   ├── maintenance/
│   │   │   └── users/
│   │   ├── shared/
│   │   │   ├── middlewares/
│   │   │   ├── errors/
│   │   │   ├── utils/
│   │   │   └── infra/
│   │   ├── types/
│   │   └── app.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed/
│   ├── tests/
│   ├── docs/
│   ├── scripts/
│   └── logs/
│
├── _docs/           # Documentação do projeto
├── .env
├── .gitignore
└── README.md
```
