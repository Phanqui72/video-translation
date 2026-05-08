# ADR: Caching Strategy

## Status
Accepted

## Context
Performance optimization for frequently accessed data (e.g., product lists, configurations).

## Decision
Use **Redis** (via Lettuce client as configured in `pom.xml`) for distributed caching.

## Rationale
- High performance.
- Supports distributed systems (if we scale horizontally).
- Built-in TTL and eviction policies.

## Consequences
- Adds an infrastructure dependency (Redis server).
- Need to ensure cache consistency during updates.
