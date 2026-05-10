# Frontend Architecture

## 1. Project Context

The `mgr-frontend` is the client-side management interface for the `mgr-api` ecosystem. It is designed to provide a premium, responsive, and high-performance user experience for managing accounts, permissions, and other core system features. It communicates with the Java-based backend via RESTful APIs secured with OAuth2 and JWT.

## 2. Requirements

- **Node.js**: v18.0.0 or higher.
- **Package Manager**: `npm` (v9+) or `pnpm` (v8+).
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions).
- **Environment**: Access to the `mgr-api` backend (local or remote).

## 3. Overview

The frontend is a **Single Page Application (SPA)** built with **React 18** and **Vite**. It emphasizes a modular "Feature-First" architecture to ensure scalability and maintainability.

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) (based on Radix UI) for accessible, high-quality components.
- **Language**: TypeScript (Strict Mode) for type safety.

## 4. Folder Structure

The project follows a modular structure to isolate features and promote reusability:

- `src/`
    - `api/`: Global API client configuration (Axios interceptors).
    - `assets/`: Static assets like images, fonts, and global styles.
    - `components/`: Shared, generic UI components (Buttons, Inputs, Modals).
    - `features/`: Domain-specific modules (e.g., `features/auth`, `features/users`).
    - `hooks/`: Global, reusable React hooks.
    - `layouts/`: Page layout wrappers (e.g., `MainLayout`, `AuthLayout`).
    - `lib/`: Third-party library initializations (e.g., `lib/axios.ts`, `lib/react-query.ts`).
    - `pages/`: Route-level components that assemble features.
    - `routes/`: Routing configuration and navigation logic.
    - `store/`: Global state management (Zustand).
    - `types/`: Global TypeScript definitions and interfaces.
    - `utils/`: Common utility functions (formatters, validators).

## 5. Feature Anatomy

Each feature in `src/features/` is a self-contained module:

```text
features/my-feature/
├── components/    # Feature-specific UI components
├── hooks/         # Custom hooks for feature logic (e.g., useFetchData)
├── services/      # API calls specific to this feature
├── store/         # Feature-level state (if needed)
├── types/         # Feature-specific TS types
└── index.ts       # Public API for the feature
```

## 6. Data Flow

The application follows a unidirectional and predictable data flow:

1.  **Component**: Triggers an action or calls a hook.
2.  **Hook**: Orchestrates logic using `React Query` for server state or `Zustand` for client state.
3.  **Service**: Executes the actual API call using the pre-configured Axios instance.
4.  **Cache/Store**: `React Query` updates the server state cache; `Zustand` updates the client state.
5.  **Re-render**: Components automatically re-render with the fresh data.

## 7. Cross-feature Communication

- **Global Store**: Shared information (like user profile or notification settings) is managed via `Zustand` in `src/store/`.
- **Custom Events**: For decoupled communication where state isn't appropriate.
- **Shared Hooks**: Features can expose hooks in their `index.ts` to be consumed by other features.

## 8. Routing Structure

Routing is managed using **React Router DOM v6**:

- **Lazy Loading**: All route components are dynamically imported using `React.lazy()` to optimize bundle size.
- **Protected Routes**: A specialized component wrapper checks for the presence of a valid JWT and required roles before allowing access.
- **Layout Nesting**: Routes are nested within layouts to maintain persistent UI elements (Sidebar, Navbar).

## 9. State Management Strategy

- **Server State**: [React Query (TanStack Query)](https://tanstack.com/query/latest) is the source of truth for all server-side data, handling caching, synchronization, and loading/error states.
- **Global UI State**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, high-performance global state (e.g., theme, sidebar toggle, authentication status).
- **Local State**: Standard React `useState` and `useReducer` for component-level logic.

## 10. API Layer

- **Client**: Axios instance with a `baseURL` pointing to the `mgr-api`.
- **Interceptors**: 
    - **Request**: Automatically attaches the JWT `Authorization` header.
    - **Response**: Handles 401 Unauthorized errors by clearing the session and redirecting to login.
- **Type Safety**: All API responses are typed to ensure end-to-end type safety from the backend to the UI.

## 11. Shared vs Features

- **Shared (`src/components/`, `src/hooks/`)**: Contains "dumb" or generic logic that has no knowledge of the business domain.
- **Features (`src/features/`)**: Contains "smart" logic that is tightly coupled to specific business requirements (e.g., the User Management feature knows about the User model and its specific API endpoints).
