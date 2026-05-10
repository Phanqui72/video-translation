# Skill: Authentication & RBAC

## 1. Purpose
Details the implementation of user identity and permission management.

## 2. Architecture Principles
- **Stateless Auth**: Use JWT (JSON Web Tokens).
- **Refresh Token Pattern**: Use short-lived access tokens and longer-lived refresh tokens.
- **Role Hierarchy**: Support multiple roles (FREE, PRO, STUDIO, ADMIN).

## 3. Folder Structure
```text
com.mgr.api.jwt
├── JwtTokenProvider.java
├── JwtAuthenticationFilter.java
└── JwtAuthenticationEntryPoint.java
```

## 4. Implementation Rules
- **Roles**: Store roles in the JWT claims.
- **Interceptors**: Check for roles before executing business logic.
- **Admin Access**: Explicitly check for `ROLE_ADMIN` for system-wide management.

## 5. Best Practices
- **Token Revocation**: Implement a blacklist in Redis for logged-out tokens.
- **Secure Cookies**: Use `HttpOnly`, `Secure`, and `SameSite=Strict` for tokens if stored in cookies.

## 6. Anti-Patterns
- **Session-based Auth**: Using JSESSIONID in a distributed microservice system.
- **Client-side Role Checks**: Trusting the frontend to hide/show buttons without backend validation.

## 7. Example Implementation (PreAuthorize)
```java
@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
    
    @PostMapping("/users/ban")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiMessageDto<Void> banUser(@RequestBody Long userId) {
        userService.ban(userId);
        return makeSuccessResponse(null, "User banned");
    }
}
```

## 8. AI Agent Instructions
- **Always include role-based checks for any sensitive action.**
- **Explain how tokens are validated in any auth-related code.**
