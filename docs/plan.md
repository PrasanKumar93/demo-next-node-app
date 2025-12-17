# Backend Implementation Plan

## Overview

A TypeScript Node.js Express starter application with MongoDB integration (native driver + Zod validation), using Vitest for testing.

---

## Phase 1: Project Initialization

### 1.1 Initialize Node.js Project

- [ ] Create `package.json` with npm init
- [ ] Configure TypeScript with `tsconfig.json`
- [ ] Set up ES modules support

### 1.2 Install Dependencies

- [ ] Install production dependencies (express, mongodb, dotenv, cors, zod)
- [ ] Install dev dependencies (typescript, vitest, tsx, nodemon, types)

### 1.3 Configure Development Tools

- [ ] Set up ESLint for linting
- [ ] Configure Vitest for testing (co-located test files)
- [ ] Set up nodemon for hot reload during development

---

## Phase 2: Project Structure Setup

### 2.1 Create Directory Structure

- [ ] Create `src/` directory with subdirectories
- [ ] Test files co-located with source files (`*.test.ts` alongside `*.ts`)
- [ ] Create configuration files in root

### 2.2 Environment Configuration

- [ ] Create `.env.example` with required variables
- [ ] Create `src/config/env.ts` to map env variables to typed constant object
- [ ] Configure MongoDB connection string in env

---

## Phase 3: Core Application Setup

### 3.1 Express Server Configuration

- [ ] Create main `app.ts` with Express configuration
- [ ] Set up middleware (cors, json parser, error handling)
- [ ] Create `server.ts` entry point

### 3.2 MongoDB Utilities

- [ ] Create `src/utils/db.ts` with MongoDB connection utility
- [ ] Implement connection singleton pattern
- [ ] Add graceful shutdown handling
- [ ] Create generic CRUD utility functions with Zod schema validation

### 3.3 Route Structure

- [ ] Create routes directory structure
- [ ] Implement base router

---

## Phase 4: Hello World API Implementation

### 4.1 Create Hello World Endpoint

- [ ] Create `/api/health` endpoint for health checks
- [ ] Create `/api/hello` endpoint returning "Hello World"
- [ ] Add proper TypeScript types for request/response

### 4.2 Response Formatting

- [ ] Create standard response format utility
- [ ] Implement success and error response helpers

---

## Phase 5: Testing Setup

### 5.1 Configure Vitest

- [ ] Create `vitest.config.ts`
- [ ] Set up test environment for co-located tests
- [ ] Configure coverage reporting

### 5.2 Write Tests

- [ ] Create `hello.controller.test.ts` alongside controller
- [ ] Create `db.test.ts` alongside db utility (mocked)
- [ ] Test Zod schema validation in CRUD utilities

---

## Phase 6: Scripts & Documentation

### 6.1 NPM Scripts

- [ ] `dev` - Run development server with hot reload
- [ ] `build` - Compile TypeScript to JavaScript
- [ ] `start` - Run production build
- [ ] `test` - Run Vitest tests
- [ ] `test:coverage` - Run tests with coverage
- [ ] `lint` - Run ESLint

### 6.2 Documentation

- [ ] Create README with setup instructions
- [ ] Document API endpoints
- [ ] Document MongoDB CRUD utility usage

---

## Success Criteria

1. ✅ Server starts without errors
2. ✅ MongoDB connection establishes successfully via utility
3. ✅ `/api/hello` returns `{ "message": "Hello World" }`
4. ✅ `/api/health` returns server health status
5. ✅ All tests pass with Vitest
6. ✅ TypeScript compiles without errors
7. ✅ Zod schema validation works in CRUD utilities

---

## Timeline Estimate

| Phase     | Estimated Time  |
| --------- | --------------- |
| Phase 1   | 10 minutes      |
| Phase 2   | 5 minutes       |
| Phase 3   | 20 minutes      |
| Phase 4   | 10 minutes      |
| Phase 5   | 15 minutes      |
| Phase 6   | 10 minutes      |
| **Total** | **~70 minutes** |

---

## Notes

- Using native MongoDB driver instead of Mongoose for more control and lighter footprint
- Zod handles schema validation (replaces Mongoose schemas)
- Test files are co-located with source files for better maintainability
- All database operations centralized in `src/utils/db.ts`
- Environment variables mapped to typed constants in `src/config/env.ts`
- MongoDB connection will be optional for the hello world demo (can run without DB)
