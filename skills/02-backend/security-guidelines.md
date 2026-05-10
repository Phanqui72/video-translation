# Skill: Security Guidelines

## 1. Purpose
Defines the security standards for the entire platform to protect user data and system integrity.

## 2. Architecture Principles
- **Defense in Depth**: Multiple layers of security (Network, OS, App, Data).
- **Least Privilege**: Users and services should only have the permissions they need.
- **Zero Trust**: Validate everything, even internal requests.

## 3. Implementation Rules
- **Authentication**: JWT-based, stateless.
- **Authorization**: RBAC (Role-Based Access Control) using Spring Security.
- **Password Hashing**: Use BCrypt with a high cost factor.
- **Secrets Management**: Use environment variables or Vault; NEVER hardcode keys.

## 4. Best Practices
- **HTTPS Only**: Enforce TLS 1.2+ for all connections.
- **CORS Policy**: Restrict to known frontend domains.
- **SQL Injection**: Use JPA/ORM to avoid raw queries.
- **XSS Protection**: Sanitize all user-generated content on the frontend and backend.

## 5. Anti-Patterns
- **Storing Passwords in Plaintext**.
- **Returning Sensitive Fields** (like `passwordHash` or `ssn`) in API responses.
- **Using Weak JWT Secrets**.

## 6. Security Considerations
- **Rate Limiting**: Protect against Brute Force and DoS.
- **Input Validation**: Treat all client input as malicious.

## 7. Example Implementation (Security Config)
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/v1/auth/**").permitAll()
            .anyRequest().authenticated()
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
```

## 8. AI Agent Instructions
- **Flag any code that hardcodes credentials or sensitive data.**
- **Ensure all new endpoints are protected by authentication by default.**
- **Recommend secure defaults for all configurations.**
