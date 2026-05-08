# Backend Project Rules

## 1. Naming Conventions
- **Packages**: `com.mgr.api.<module>`
- **Classes**: PascalCase (e.g., `AccountController`, `AccountService`).
- **Interfaces**: Standard naming, avoid `I` prefix.
- **Methods/Variables**: camelCase.
- **DTOs**: Suffix with `Dto` (e.g., `AccountDto`).
- **Forms/Requests**: Suffix with `Form` (e.g., `CreateAccountForm`).

## 2. Layered Architecture
- **Controller**: Handle HTTP requests, basic validation. Do NOT put business logic here.
- **Service**: Business logic only. Use interfaces if multiple implementations are needed.
- **Repository**: Data access (Spring Data JPA).
- **Mapper**: Use MapStruct for converting between Entity and DTO.

## 3. Error Handling
- Use global exception handling (see `exception` package).
- Throw custom exceptions with descriptive messages.
- Return consistent error responses (code, message, details).

## 4. Authentication & Security
- Use `@PreAuthorize` or custom permission checks for controller methods.
- Passwords MUST be encrypted (BCrypt).
- Use JWT for stateless authentication.

## 5. Coding Standards
- **Lombok**: Use `@Data`, `@Getter`, `@Setter`, `@Builder`.
- **Validation**: Use JSR-303 Bean Validation (`@NotNull`, `@NotEmpty`).
- **Logging**: Use Log4j2 (as configured in `pom.xml`).
- **API Documentation**: Use Swagger annotations on controllers.

## 6. Migration
- Never modify the database schema manually.
- All changes MUST go through Liquibase.
