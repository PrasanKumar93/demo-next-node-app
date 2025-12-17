# Backend Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts                    # Environment variables → typed constants
│   │
│   ├── controllers/
│   │   ├── hello.controller.ts       # Hello world controller logic
│   │   └── hello.controller.test.ts  # Co-located test file
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts       # Global error handling
│   │   └── error.middleware.test.ts  # Co-located test file
│   │
│   ├── routes/
│   │   ├── index.ts                  # Main router aggregator
│   │   └── hello.routes.ts           # Hello world routes
│   │
│   ├── schemas/
│   │   └── index.ts                  # Zod schemas for validation
│   │
│   ├── types/
│   │   └── index.ts                  # Shared TypeScript types/interfaces
│   │
│   ├── utils/
│   │   ├── mongodb/
│   │   │   ├── connect.ts            # MongoDB connection utilities
│   │   │   ├── create.ts             # Create operations
│   │   │   ├── read.ts               # Read operations
│   │   │   ├── update.ts             # Update operations
│   │   │   ├── delete.ts             # Delete operations
│   │   │   └── index.ts              # Re-exports all functions
│   │   └── response.ts               # Standard response helpers
│   │
│   ├── app.ts                        # Express app configuration
│   └── server.ts                     # Server entry point
│
├── .env.example                      # Example environment variables
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── nodemon.json                      # Nodemon configuration
├── package.json                      # Project dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── vitest.config.ts                  # Vitest test configuration
└── README.md                         # Project documentation
```

---

## Directory Descriptions

### `/src`

Main source code directory containing all application code.

### `/src/config`

Contains only `env.ts` - maps environment variables to a typed constant object for type-safe access throughout the app.

### `/src/controllers`

Business logic handlers that process requests and return responses. Controllers are called by routes. Test files are co-located.

### `/src/middleware`

Express middleware functions for cross-cutting concerns like error handling. Test files are co-located.

### `/src/routes`

API route definitions. Maps HTTP endpoints to controller functions.

### `/src/schemas`

Zod schemas for data validation. Used by the MongoDB CRUD utilities for runtime type checking.

### `/src/types`

TypeScript type definitions, interfaces, and enums shared across the application.

### `/src/utils`

Utility functions including:

- `mongodb/` - MongoDB connection and CRUD operations with Zod validation
  - `connect.ts` - Connection singleton (connectDB, getDB, closeDB, isConnected)
  - `create.ts` - Create operations (createOne)
  - `read.ts` - Read operations (findOne, findMany, countDocuments)
  - `update.ts` - Update operations (updateOne)
  - `delete.ts` - Delete operations (deleteOne, deleteMany)
  - `index.ts` - Re-exports all functions
- `response.ts` - Standard API response formatting

---

## Co-located Test Files

Test files live alongside their source files:

```
src/
├── controllers/
│   ├── hello.controller.ts       # Source
│   └── hello.controller.test.ts  # Test
├── schemas/
│   ├── index.ts                  # Source
│   └── index.test.ts             # Test
```

**Benefits:**

- Easy to find tests for any file
- Better code organization
- Encourages writing tests alongside code
- Simpler imports in test files

---

## File Naming Conventions

| Type        | Convention           | Example                    |
| ----------- | -------------------- | -------------------------- |
| Controllers | `*.controller.ts`    | `hello.controller.ts`      |
| Routes      | `*.routes.ts`        | `hello.routes.ts`          |
| Middleware  | `*.middleware.ts`    | `error.middleware.ts`      |
| Tests       | `*.test.ts`          | `hello.controller.test.ts` |
| Schemas     | `*.schema.ts`        | `user.schema.ts`           |
| Types       | `*.ts` or `index.ts` | `index.ts`                 |
| Config      | `env.ts`             | `env.ts`                   |
| Utilities   | `*.ts`               | `db.ts`, `response.ts`     |

---

## MongoDB Utilities Structure (`src/utils/mongodb/`)

```typescript
// connect.ts - Connection utilities
export const connectDB: () => Promise<Db>;
export const getDB: () => Db;
export const getCollection: <T>(name: string) => Collection<T>;
export const closeDB: () => Promise<void>;
export const isConnected: () => boolean;

// create.ts
export const createOne: <T>(collection, data, schema) => Promise<T>;

// read.ts
export const findOne: <T>(collection, query, schema) => Promise<T | null>;
export const findMany: <T>(collection, query, schema, options?) => Promise<T[]>;
export const countDocuments: <T>(collection, query?) => Promise<number>;

// update.ts
export const updateOne: <T>(collection, query, data, schema) => Promise<T | null>;

// delete.ts
export const deleteOne: <T>(collection, query) => Promise<boolean>;
export const deleteMany: <T>(collection, query) => Promise<number>;

// index.ts - Re-exports all above functions
```
