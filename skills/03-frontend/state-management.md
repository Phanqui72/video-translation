# Skill: State Management

## 1. Purpose
Defines how application state is managed across the frontend, from simple UI toggles to complex editor timelines.

## 2. Architecture Principles
- **Local vs Global**: Use `useState` for component-specific state and `Zustand` for cross-component state.
- **Immutability**: Never mutate state directly; use setter functions or `immer`.
- **Derived State**: Use `useMemo` to calculate values based on state rather than storing redundant data.

## 3. Implementation Rules
- **Server State**: Use `React Query` (TanStack Query) for all API data.
- **Hydration**: Handle SSR hydration correctly when using global stores.
- **DevTools**: Enable Redux/Zustand DevTools in development for debugging.

## 4. Best Practices
- **Store Slicing**: Break large stores into smaller, focused slices (e.g., `useUserStore`, `useEditorStore`).
- **Selective Subscriptions**: Only subscribe components to the specific slices of state they need.
- **Persistence**: Use `zustand/middleware` for persisting certain state (like user preferences) to `localStorage`.

## 5. Anti-Patterns
- **Globalizing Everything**: Putting temporary form state into a global store.
- **Syncing State with Effects**: Overusing `useEffect` to sync one state with another.

## 6. Example Implementation (Zustand)
```typescript
const useEditorStore = create<EditorState>((set) => ({
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
}));
```

## 7. AI Agent Instructions
- **Recommend React Query for all server-side data.**
- **Suggest Zustand for lightweight global state.**
- **Enforce the use of derived state to minimize redundancy.**
