# Backend Structure

```
backend/src/
├── config/env.ts          → env vars → typed obj
├── api/                   → req handlers, tests co-located
├── middleware/            → express middleware (error handling)
├── routes/index.ts        → route aggregator → controllers
├── schemas/index.ts       → zod validation schemas
├── types/index.ts         → shared TS types/interfaces
├── utils/
│   ├── mongodb/           → CRUD + connection w/ zod validation
│   │   ├── connect.ts     → connectDB, getDB, closeDB, isConnected
│   │   ├── create.ts      → createOne
│   │   ├── read.ts        → findOne, findMany, countDocuments
│   │   ├── update.ts      → updateOne
│   │   ├── delete.ts      → deleteOne, deleteMany
│   │   └── index.ts       → barrel exports
│   └── response.ts        → API response helpers
├── app.ts                 → express app config
└── server.ts              → entry point
```

## Key Patterns

- **routes** → **controllers** → **utils/mongodb** → DB
- tests: `*.test.ts` co-located with source
- validation: zod schemas in `/schemas`, used by mongodb utils
- env: `/config/env.ts` single source of truth
