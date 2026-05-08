# ADR: Frontend State Management

## Status
Accepted (Proposed)

## Context
Handling UI state and server data in the React frontend.

## Decision
Use **React Context** for global UI state (Auth, Theme) and **TanStack Query** (React Query) for server-state synchronization.

## Rationale
- Context is built-in and sufficient for light global state.
- React Query handles caching, re-fetching, and loading/error states out-of-box, reducing boilerplate.

## Consequences
- Requires understanding of Query Keys and invalidation logic.
