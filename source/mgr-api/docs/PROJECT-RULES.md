# Backend Project Rules

## 1. Tech Stack & Core Principles
- **Runtime**: Java 11 (OpenJDK).
- **Framework**: Spring Boot 2.3.0.RELEASE.
- **Build Tool**: Maven.
- **Database**: MySQL (Dev/UAT), PostgreSQL (Production).
- **Migration**: Liquibase (All schema changes must be versioned).
- **Caching**: Redis (Lettuce client).
- **Message Broker**: RabbitMQ (For video processing pipeline).
- **API Documentation**: Swagger 2.9.2.
- **Principles**: **Clean Code**, **SOLID**, **DRY** (Don't Repeat Yourself).
- **Architecture**: Layered Monolith (Controller -> Service -> Repository).


## 2. Naming Conventions (MUST follow)
- **Packages**: `com.mgr.api.<module>`
- **Classes**: PascalCase (e.g., `AccountController`, `AccountService`).
- **Interfaces**: No `I` prefix. Implementation in `.impl` package (e.g., `UserServiceImpl`).
- **Methods/Variables**: camelCase.
- **DTOs/Forms**: 
    - Suffix with `Dto` for output data (e.g., `AccountDto`).
    - Suffix with `Form` for input data (e.g., `CreateAccountForm`).
    - Suffix with `Criteria` for search/filter parameters.
- **Constants**: UPPER_SNAKE_CASE.

## 3. Code Patterns (MUST follow)
- **Constants**:
    - **NO local constant declarations**.
    - All business constants must be declared in `com.mgr.api.constant.MgrConstant` or module-specific constant files.
- **API Responses**:
    - Use `ApiMessageDto<T>` for **ALL** API responses to ensure consistency.
    - Methods that don't return data (e.g., `create`, `delete`) **MUST** return `ApiMessageDto<Void>` (and use `void` in internal service methods).
- **API Method Signatures**:
    - **Create/Delete**: Service methods should return `void`. Controller returns `ApiMessageDto<Void>`.
    - **Update**: Use `@PutMapping("/update")`. **ID MUST be passed in the Request Body**, not as a path parameter.
- **Layering & Responsibility**:
    - **Controller**: Routing, validation (`@Valid`), and response mapping only. Extend `ABasicController`.
    - **Service**: Business logic and transactional boundaries (`@Transactional`).
    - **Repository**: Query logic only. Use `Specification` for dynamic filtering.
- **Mapping**: Use **MapStruct** for all Entity <-> DTO conversions.

## 4. Anti-patterns (MUST NOT do)
- **NO Logic in Controllers**: Business logic must never be written in controller methods.
- **NO Hardcoded Magic Strings/Numbers**: Use constants for all status codes, roles, and config keys.
- **NO Local Constants**: Declaring `private static final String` inside a class for business values is forbidden.
- **NO Direct Entity Exposure**: Never return JPA Entities to the client; always convert to DTOs first.
- **NO Ignoring Exceptions**: Never use empty `catch` blocks. Rely on global exception handling.
- **NO Deep Nesting**: Avoid deep `if-else` or `try-catch` nesting. Use guard clauses for early exit.

## 5. Git Workflow
- **Branching Strategy**:
    - `feature/feature-name`: For new features.
    - `fix/bug-name`: For bug fixes.
    - `chore/task-name`: For non-feature tasks (refactoring, docs).
- **Commits**: Follow conventional commits (e.g., `feat: ...`, `fix: ...`, `refactor: ...`).
- **Review**: All code must pass PR review before merging into `develop` or `main`.

## 6. Testing
- **Unit Tests**: Mandatory for business logic in services using **JUnit 5** and **Mockito**.
- **Integration Tests**: Use `@SpringBootTest` for critical workflows and repository validation.
- **Naming Convention**: `methodName_stateUnderTest_expectedBehavior`.

## 7. Database & Migration
- **Liquibase**: Every database change must be a new changelog in `src/main/resources/liquibase/dev/`.
- **Manual DB Edits**: Absolutely forbidden.
- **Production**: `ddl-auto` must be set to `none` or `validate`.
