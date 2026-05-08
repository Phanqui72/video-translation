# ADR: API Versioning Strategy

## Status
Accepted

## Context
We need a consistent way to handle breaking changes in the API as the Badminton Store Management system evolves.

## Decision
We will use **URL Path Versioning** (e.g., `/api/v1/...`).

## Consequences
- **Pros**: Easy to discover, easy to route (e.g., via Nginx or Spring Dispatcher), clear distinction.
- **Cons**: URLs change, potentially requires maintaining multiple versions in code for a period.

## Implementation
- Current version is `v1`.
- Controllers should be prefixed with `@RequestMapping("/api/v1/...")`.
