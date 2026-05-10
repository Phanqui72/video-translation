# Backend Architecture

## 1. Technology Stack

The `mgr-api` is built on a modern, enterprise-grade stack centered around the Spring ecosystem, optimized for security, scalability, and maintainability.

- **Core Framework**: [Spring Boot 2.3.0.RELEASE](https://spring.io/projects/spring-boot)
- **Language**: Java 11 (LTS)
- **Security & Identity**: 
    - [Spring Security OAuth2](https://spring.io/projects/spring-security-oauth) for robust authentication and authorization.
    - [JWT (JSON Web Tokens)](https://jwt.io/) for stateless session management.
    - [TOTP (Two-Factor Authentication)](https://github.com/samstevens/java-totp) for enhanced account security.
- **Persistence Layer**:
    - [Spring Data JPA](https://spring.io/projects/spring-data-jpa) / [Hibernate 5.6](https://hibernate.org/) for ORM.
    - [MySQL 8.x](https://www.mysql.com/) as the primary relational database.
    - [Liquibase 4.19](https://www.liquibase.org/) for database versioning and migrations.
- **Caching & Communication**:
    - [Redis (Lettuce client)](https://redis.io/) for high-performance caching.
    - [OpenFeign](https://spring.io/projects/spring-cloud-openfeign) for declarative REST clients (service-to-service communication).
- **Utility & Mapping**:
    - [Lombok](https://projectlombok.org/) to reduce boilerplate code.
    - [MapStruct 1.3](https://mapstruct.org/) & [ModelMapper](http://modelmapper.org/) for high-performance Entity-to-DTO mapping.
    - [Apache POI](https://poi.apache.org/) & [Commons CSV](https://commons.apache.org/proper/commons-csv/) for data export/import.
- **Documentation & Monitoring**:
    - [Springfox Swagger 2.9](https://springfox.github.io/springfox/) for interactive API documentation.
    - [Spring Boot Actuator](https://spring.io/projects/spring-boot-actuator) for health checks and metrics.
    - [Spring Boot Admin Client](https://github.com/codecentric/spring-boot-admin) for centralized management.

## 2. Requirements

To run and develop the `mgr-api`, the following environment is required:

- **JDK 11**: The project uses Java 11 language features and APIs.
- **Maven 3.6+**: For dependency management and build automation.
- **MySQL 8.0+**: Primary database with a schema named `db_mgr` (configurable).
- **Redis**: Required for caching and session-related features.
- **Environment Variables**: Managed via `application.properties` and profiles (e.g., `dev`, `local`).

## 3. Folder Structure

The project follows a **Package by Layer** architecture, ensuring a clear separation of concerns:

- `src/main/java/com/mgr/api/`
    - `config/`: Centralized configuration (Security, CORS, Swagger, JPA, Feign).
    - `controller/`: REST API endpoints. Inherits from `ABasicController`.
    - `service/`: Business logic interfaces and implementations (`impl/`).
    - `repository/`: Spring Data JPA repositories for DB access.
    - `model/`: JPA Entities representing the database schema.
    - `dto/`: Data Transfer Objects for API requests and responses.
    - `mapper/`: MapStruct/ModelMapper interfaces for conversion logic.
    - `jwt/`: JWT utility classes (token generation, parsing, filtering).
    - `component/`: Reusable Spring Beans (Interceptors, Auditors).
    - `utils/`: Static utility classes (Date, String, Encryption).
    - `exception/`: Custom exceptions and the `@ControllerAdvice` global handler.
    - `validation/`: Custom JSR-303 validators.
    - `constant/`: Application-wide constants and enums.

## 4. Feature Anatomy

Each business feature (e.g., **Account**, **Permission**) is implemented across the following layers:

1.  **Model**: An `@Entity` class in the `model` package defining the persistence structure.
2.  **Repository**: An interface in `repository` extending `JpaRepository` or `JpaSpecificationExecutor`.
3.  **Service Interface**: Defines the business contract in the `service` package.
4.  **Service Implementation**: Contains the core logic in `service.impl`, interacting with repositories.
5.  **Mapper**: A MapStruct interface in `mapper` to convert between `Model` and `Dto`.
6.  **DTO/Form**: Data structures in `dto` or `form` for data exchange.
7.  **Controller**: REST endpoints in `controller` that orchestrate the request handling.

## 5. Request Flow

A typical API request follows this lifecycle:

1.  **Authentication**: The `JwtTokenFilter` or OAuth2 filter intercepts the request, validates the JWT/Token, and populates the `SecurityContext`.
2.  **Routing**: Spring MVC routes the request to the appropriate method in a `@RestController`.
3.  **Validation**: Input data (usually a `Form` object) is validated using `@Valid` and custom validators.
4.  **Business Logic**: The controller calls a method in the `Service` layer.
5.  **Persistence**: The service interacts with one or more `Repositories` to perform CRUD or complex queries.
6.  **Mapping**: The service converts the resulting `Entity` objects into `Dto` objects using a `Mapper`.
7.  **Response**: The controller wraps the `Dto` in an `ApiMessageDto` (via `ABasicController`) and returns it with the appropriate HTTP status.

## 6. Cross-feature Communication

- **Internal**: Features communicate via Service interfaces. Circular dependencies are avoided by injecting interfaces and following a strict hierarchy where higher-level services can call lower-level ones.
- **External**: Integration with other microservices or external APIs is handled via **OpenFeign** clients, with configurations managed in `com.mgr.api.config.CustomFeignConfig`.

## 7. Shared vs Core

- **Shared (`component/`, `utils/`, `constant/`)**: Contains generic logic used across multiple features (e.g., `AESUtils` for encryption, `LogInterceptor` for auditing, `TablePrefix` for DB naming).
- **Core (`service/`, `model/`)**: Contains the domain-specific business logic and data structures that define the application's unique value.
- **Base Logic**: `ABasicController` provides common methods for response formatting (`makeResponse`), session retrieval (`getCurrentUser`), and permission checks.

## 8. Configuration Management

Configuration is handled hierarchically:

1.  **Code-based Config**: Classes in the `config` package use `@Configuration` and `@Bean` for framework setup (e.g., `SecurityConfig`, `ResourceServerConfig`).
2.  **Properties Files**: 
    - `application.properties`: Default configuration.
    - `application-local.properties`: Local development overrides (DB credentials, Redis host).
3.  **Profiles**: Maven profiles (defined in `pom.xml`) like `dev` control build-time properties and resource filtering.
4.  **Database Migrations**: `Liquibase` manages schema changes through XML changelogs, ensuring consistency across environments.
