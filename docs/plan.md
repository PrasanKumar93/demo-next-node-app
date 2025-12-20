# Frontend Plan — Next.js Starter

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Testing**: Vitest + React Testing Library
- **API**: Client-side fetch to Express backend (no SSR pages)
- **Styling**: SASS (SCSS)

---

## Phase 1: Project Setup

**Goal**: Scaffold Next.js app with TypeScript, SASS, Vitest

**Deliverables**:

- `create-next-app` with TypeScript
- Install `sass` package
- Vitest + React Testing Library configured
- `vitest.config.ts` with jsdom environment
- Global SCSS setup (variables, reset)
- Sample test to verify setup works
- Folder structure created (empty files ok)

**Structure after Phase 1**:

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.scss        → global styles, reset
│   ├── styles/
│   │   ├── _variables.scss     → colors, fonts, spacing
│   │   ├── _mixins.scss        → reusable mixins
│   │   └── _reset.scss         → CSS reset
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── vitest.config.ts
└── package.json
```

**Commit**: `feat(frontend): project setup with Next.js, TS, SASS, Vitest`

---

## Phase 2: API Layer + Types

**Goal**: Create API utilities and shared types

**Deliverables**:

- `/lib/api.ts` — fetch wrapper with error handling
- `/types/index.ts` — Student, ApiResponse types
- `/lib/validators.ts` — zod schemas (mirror backend)
- Tests for api utilities

**Files**:

```
src/
├── lib/
│   ├── api.ts          → fetchApi<T>(endpoint, options)
│   └── validators.ts   → StudentSchema (zod)
└── types/
    └── index.ts        → Student, ApiResponse<T>
```

**Commit**: `feat(frontend): API layer and shared types`

---

## Phase 3: UI Components

**Goal**: Build reusable form elements

**Deliverables**:

- `TextInput` — text input with label + error
- `EmailInput` — email input with label + error
- `TelInput` — phone/tel input with label + error
- `NumberInput` — number input with label + error
- `Select` — dropdown with options
- `Button` — primary, secondary, loading state
- `DatePicker` — date input
- SCSS module per component
- Test / sample example page for each component

**Files**:

```
src/components/ui/
├── TextInput.tsx
├── TextInput.module.scss
├── TextInput.test.tsx
├── EmailInput.tsx
├── EmailInput.module.scss
├── EmailInput.test.tsx
├── TelInput.tsx
├── TelInput.module.scss
├── TelInput.test.tsx
├── NumberInput.tsx
├── NumberInput.module.scss
├── NumberInput.test.tsx
├── Select.tsx
├── Select.module.scss
├── Select.test.tsx
├── Button.tsx
├── Button.module.scss
├── Button.test.tsx
├── DatePicker.tsx
├── DatePicker.module.scss
├── DatePicker.test.tsx
└── index.ts            → barrel exports
```

**Commit**: `feat(frontend): reusable UI form components`

---

## Phase 4: Layout Components

**Goal**: Create app shell (header, footer, nav)

**Deliverables**:

- `Header` — logo, navigation links (Home, Dashboard)
- `Footer` — simple footer (with company name copyright)
- SCSS modules for layout components
- Update `layout.tsx` to use Header/Footer

**Files**:

```
src/
├── components/layout/
│   ├── Header.tsx
│   ├── Header.module.scss
│   ├── Footer.tsx
│   ├── Footer.module.scss
│   └── index.ts
└── app/
    ├── layout.tsx      → uses Header, Footer
    ├── page.tsx        → existing home page

```

**Commit**: `feat(frontend): layout components and home page`

---

## Phase 5: Student Registration Form

**Goal**: Build student form page `students/new` with form `StudentRegistrationForm`

**Deliverables**:

- `StudentRegistrationForm` using UI components
- Form state management (controlled inputs)
- Client-side validation with zod
- Error display per field
- SCSS module for form styling
- Tests for form

**Fields**: (check schema)

- firstName, lastName, email
- dateOfBirth, studentId, phone
- address (street, city, state, zipCode, country)
- enrollmentDate, course, department, year
- guardianName, guardianPhone (optional)

- form submit call API `createStudent` in frontend/src/lib/api.ts and show alert message with success or error

**Files**:

```
src/components/business/
├── StudentRegistrationForm.tsx
├── StudentRegistrationForm.module.scss
├── StudentRegistrationForm.test.tsx
└── index.ts
```

**Commit**: `feat(frontend): student registration form component`

---

## Phase 6: Student Form Page

**Goal**: Create student creation page

**Deliverables**:

- `/students/new` page
- Integrate StudentRegistrationForm
- API call: `POST /api/createStudent`
- Success/error handling + redirect
- Page styles
- Page tests

**Files**:

```
src/app/students/new/
├── page.tsx
└── page.module.scss
```

**Commit**: `feat(frontend): student creation page`

---

## Phase 7: Student Dashboard Page

**Goal**: Create student listing page

**Deliverables**:

- `/students` page
- Fetch: `GET /api/getAllStudents`
- Display students in table/cards
- Loading and error states
- Link to create new student
- Page styles
- Page tests

**Files**:

```
src/app/students/
├── page.tsx
└── page.module.scss
```

**Commit**: `feat(frontend): student dashboard page`

---

## API Reference

| Method | Endpoint            | Purpose         |
| ------ | ------------------- | --------------- |
| GET    | /api/getAllStudents | List students   |
| POST   | /api/createStudent  | Add new student |
| POST   | /api/health         | Health check    |

Response: `{ success: boolean, data?: T, error?: string }`

---

## Phase Summary

| Phase | Focus             | Key Output                                                               |
| ----- | ----------------- | ------------------------------------------------------------------------ |
| 1     | Project Setup     | Next.js + SASS + Vitest configured                                       |
| 2     | API Layer         | fetch wrapper, types, validators                                         |
| 3     | UI Components     | TextInput, EmailInput, TelInput, NumberInput, Select, Button, DatePicker |
| 4     | Layout            | Header, Footer, home page                                                |
| 5     | Registration Form | StudentRegistrationForm                                                  |
| 6     | Form Page         | /students/new                                                            |
| 7     | Dashboard         | /students                                                                |

Each phase is independent → review → commit → next phase.
