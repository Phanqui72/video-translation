# Skill: Spring Boot Best Practices

## 1. Purpose
Defines the standard patterns for Spring Boot development within the project to ensure code quality and consistency.

## 2. Architecture Principles
- **Starter-based Configuration**: Use official Spring Boot starters.
- **Externalized Configuration**: Use `application.yml` and environment variables.
- **Profiles**: Use `dev`, `uat`, and `prod` profiles for different environments.

## 3. Implementation Rules
- **Lombok Usage**: Use `@Data`, `@Builder`, and `@RequiredArgsConstructor`.
- **Validation**: Use JSR-303 (`@Valid`, `@NotNull`) on all input DTOs.
- **Transactional Management**: Use `@Transactional` on service methods that modify data.
- **Dependency Injection**: Use constructor injection, not `@Autowired`.

## 4. Best Practices
- **MapStruct**: Use for all object conversions.
- **Exception Handling**: Use `@RestControllerAdvice` for global error handling.
- **Async Processing**: Use `@Async` for tasks that don't need to block the response (but prefer RabbitMQ for heavy tasks).
- **Caching**: Use `@Cacheable` with Redis.

## 5. Anti-Patterns
- **Field Injection**: Using `@Autowired` on private fields.
- **Business Logic in Controllers**: Putting logic in the API layer.
- **Manual JSON Parsing**: Using `JSONObject` instead of DTOs and Jackson.

## 6. Example Implementation (Modern Service)
```java
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDto update(UserUpdateForm form) {
        User user = userRepository.findById(form.getId())
            .orElseThrow(() -> new NotFoundException("User not found"));
        userMapper.updateEntityFromForm(form, user);
        return userMapper.toDto(userRepository.save(user));
    }
}
```

## 7. AI Agent Instructions
- **Follow constructor injection patterns.**
- **Always use MapStruct for mapping.**
- **Suggest `@Transactional` for all write operations.**
