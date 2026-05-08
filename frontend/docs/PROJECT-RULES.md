# Frontend Project Rules (Proposed)

## 1. Tech Stack
- **Framework**: React 18+ with Vite.
- **State Management**: React Context or Zustand (Keep it simple).
- **Data Fetching**: Axios + React Query (TanStack Query).
- **Styling**: Tailwind CSS (as per common modern standards).
- **Forms**: React Hook Form + Zod.
- **Icons**: Lucide React.

## 2. Naming Conventions
- **Components**: PascalCase (e.g., `ProductCard.tsx`).
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`).
- **Utils/Helpers**: camelCase.
- **Files**: kebab-case for assets/styles, PascalCase for components.

## 3. Directory Structure
- `src/components`: Shared UI components.
- `src/features`: Business features (e.g., `features/products`).
- `src/hooks`: Custom hooks.
- `src/services`: API calling logic.
- `src/store`: Global state management.
- `src/utils`: Helper functions.

## 4. API Interaction
- Use a central Axios instance with interceptors for JWT.
- Handle loading/error states using React Query.
