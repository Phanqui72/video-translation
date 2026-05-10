# Skill: Error Handling

## 1. Purpose
Ensures consistent and helpful error reporting across the entire system.

## 2. Architecture Principles
- **Centralized Handling**: Use `@RestControllerAdvice` in Spring Boot and Global Filters in other layers.
- **Exception Hierarchy**: Use custom checked/unchecked exceptions for different business scenarios.
- **No Leaks**: Never expose internal stack traces or database details to the client.

## 3. Folder Structure
```text
com.mgr.api.exception
├── GlobalExceptionHandler.java
├── BaseException.java
└── ResourceNotFoundException.java
```

## 4. Implementation Rules
- **Response Format**: Always return `ApiMessageDto` with an error code and message.
- **HTTP Status Codes**: Map exceptions to appropriate status codes (4xx for client errors, 5xx for server errors).
- **Logging**: Log all 5xx errors with full stack traces; log 4xx errors at the `WARN` level.

## 5. Best Practices
- **User-Friendly Messages**: Provide messages that the user can understand and act upon.
- **Validation Errors**: Return a list of all validation failures, not just the first one.
- **Retryable Errors**: Identify errors that can be retried (e.g., network timeout) and flag them in the response.

## 6. Anti-Patterns
- **Swallowing Exceptions**: `try { ... } catch (Exception e) {}`
- **Generic RuntimeException**: Throwing raw `RuntimeException` for everything.
- **Hardcoded Error Strings**: Put messages in a properties file or constant.

## 7. Example Implementation
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiMessageDto<Void>> handleNotFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiMessageDto<>(ex.getCode(), ex.getMessage(), null));
    }
}
```

## 8. AI Agent Instructions
- **Suggest custom exceptions for specific business logic errors.**
- **Ensure all API responses follow the standard error format.**
- **Enforce proper HTTP status code selection.**
