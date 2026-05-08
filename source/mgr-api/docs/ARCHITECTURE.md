# Backend Architecture

## Overview
A Spring Boot 2.3 application following a layered monolith architecture.

## Tech Stack
- **Runtime**: Java 11
- **Framework**: Spring Boot 2.3.0
- **Persistence**: Spring Data JPA / Hibernate
- **Security**: Spring Security + JWT
- **Migration**: Liquibase
- **Docs**: Swagger 2

## Folder Structure
- `controller/`: REST endpoints.
- `service/`: Business logic implementations.
- `repository/`: Persistence layer.
- `model/`: JPA Entities.
- `dto/`: Data Transfer Objects.
- `mapper/`: MapStruct interfaces for DTO/Entity conversion.
- `config/`: Spring Configuration classes (Security, Swagger, JPA).
- `exception/`: Custom exceptions and Global Handler.
- `jwt/`: JWT logic (Generation, Parsing, Filter).

## Data Flow
1. Client sends request to `Controller`.
2. `Controller` validates input (`Form`) and calls `Service`.
3. `Service` processes logic, interacts with `Repository`.
4. `Repository` performs DB operations on `Entity`.
5. `Service` converts `Entity` to `Dto` via `Mapper`.
6. `Controller` returns `Dto` to Client.
