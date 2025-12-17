# Technology Stack & Libraries

## Core Technologies

| Technology     | Version | Purpose               |
| -------------- | ------- | --------------------- |
| **Node.js**    | 18+     | JavaScript runtime    |
| **TypeScript** | ^5.x    | Type-safe JavaScript  |
| **Express**    | ^4.x    | Web framework         |
| **MongoDB**    | -       | NoSQL database        |
| **mongodb**    | ^6.x    | Native MongoDB driver |
| **Zod**        | ^3.x    | Schema validation     |

---

## Production Dependencies

### Web Framework

```json
{
  "express": "^4.21.0"
}
```

Fast, unopinionated, minimalist web framework for Node.js.

### Database

```json
{
  "mongodb": "^6.11.0"
}
```

Official MongoDB driver for Node.js. Provides direct access to MongoDB without ORM overhead.

### Schema Validation

```json
{
  "zod": "^3.23.0"
}
```

TypeScript-first schema validation with static type inference. Replaces Mongoose schemas.

### Configuration

```json
{
  "dotenv": "^16.4.0"
}
```

Loads environment variables from `.env` file into `process.env`.

### Security & Utilities

```json
{
  "cors": "^2.8.5",
  "helmet": "^8.0.0"
}
```

- **cors**: Enable Cross-Origin Resource Sharing
- **helmet**: Secure Express apps with various HTTP headers

---

## Development Dependencies

### TypeScript & Types

```json
{
  "typescript": "^5.6.0",
  "@types/node": "^22.0.0",
  "@types/express": "^5.0.0",
  "@types/cors": "^2.8.0"
}
```

### Development Server

```json
{
  "tsx": "^4.19.0",
  "nodemon": "^3.1.0"
}
```

- **tsx**: TypeScript execute - run TS directly without compilation
- **nodemon**: Automatically restart server on file changes

### Testing (Vitest)

```json
{
  "vitest": "^2.1.0",
  "supertest": "^7.0.0",
  "@types/supertest": "^6.0.0"
}
```

- **vitest**: Vite-native unit test framework (fast, ESM-first)
- **supertest**: HTTP assertions for testing Express apps

### Linting

```json
{
  "eslint": "^9.0.0",
  "@typescript-eslint/eslint-plugin": "^8.0.0",
  "@typescript-eslint/parser": "^8.0.0"
}
```

---

## Complete package.json Dependencies

```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.0",
    "express": "^4.21.0",
    "helmet": "^8.0.0",
    "mongodb": "^6.11.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.9.0",
    "@types/supertest": "^6.0.2",
    "@typescript-eslint/eslint-plugin": "^8.15.0",
    "@typescript-eslint/parser": "^8.15.0",
    "eslint": "^9.15.0",
    "nodemon": "^3.1.7",
    "supertest": "^7.0.0",
    "tsx": "^4.19.2",
    "typescript": "^5.6.3",
    "vitest": "^2.1.5"
  }
}
```

---

## NPM Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}
```

---

## Why These Choices?

### Native MongoDB Driver over Mongoose

- **Lighter footprint**: No ORM abstraction layer
- **Full control**: Direct access to all MongoDB features
- **Better performance**: No middleware overhead
- **Flexibility**: Use Zod for validation, not locked into Mongoose schemas
- **Type safety**: Zod provides excellent TypeScript inference

### Zod for Schema Validation

- **TypeScript-first**: Automatic type inference from schemas
- **Runtime validation**: Validates data at runtime
- **Composable**: Build complex schemas from simple ones
- **Lightweight**: Small bundle size
- **Error messages**: Detailed, customizable error messages

```typescript
// Example: Zod schema with type inference
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});

type User = z.infer<typeof UserSchema>; // TypeScript type auto-generated
```

### Express over Fastify/Koa

- Most popular Node.js framework with huge ecosystem
- Extensive middleware support
- Large community and documentation
- Simple learning curve for starters

### Vitest over Jest

- Native ESM support (no configuration headaches)
- Vite-powered = extremely fast
- Jest-compatible API (easy migration)
- Built-in TypeScript support
- Hot module replacement for tests

### Co-located Tests

- Tests live next to source files (`*.test.ts`)
- Easier to maintain and discover
- Better developer experience
- Common pattern in modern codebases

### tsx over ts-node

- Faster execution using esbuild
- No configuration required
- Native ESM support
- Better error messages

---

## Node.js Version Requirement

```
>=18.0.0
```

Reasons:

- Native fetch API support
- Stable ES modules
- Built-in test runner (optional)
- LTS support until April 2025

---

## TypeScript Configuration Highlights

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

## MongoDB CRUD Utility Pattern

The `src/utils/db.ts` provides generic CRUD operations with Zod validation:

```typescript
import { z } from "zod";
import { getDB } from "./db";

// Define schema
const UserSchema = z.object({
  _id: z.any().optional(),
  name: z.string(),
  email: z.string().email(),
});

// Create with validation
const user = await createOne(
  "users",
  { name: "John", email: "john@example.com" },
  UserSchema
);

// Find with validation
const found = await findOne("users", { email: "john@example.com" }, UserSchema);

// Update with validation
const updated = await updateOne(
  "users",
  { email: "john@example.com" },
  { name: "Jane" },
  UserSchema
);

// Delete
const deleted = await deleteOne("users", { email: "john@example.com" });
```

This pattern provides:

- Type-safe database operations
- Runtime validation on read/write
- Consistent error handling
- Single source of truth for data shapes
