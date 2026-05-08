# ADR: ORM Choice

## Status
Accepted (Inherited from existing code)

## Context
The project needs a robust way to interact with the relational database (MySQL/PostgreSQL).

## Decision
Use **Spring Data JPA (Hibernate)**.

## Rationale
- Standard in the Spring ecosystem.
- Powerful abstraction for CRUD operations.
- Strong support for migrations (via Hibernate properties) and Liquibase integration.

## Consequences
- Requires careful management of "N+1" problems.
- Need to use DTOs for data exposure to avoid LazyInitializationException.
