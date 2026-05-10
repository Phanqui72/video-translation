# Skill: Backend Architecture

## 1. Purpose
Defines the core architectural patterns and structural constraints for the Backend system to ensure high maintainability, scalability, and clean separation of concerns.

## 2. Architecture Principles
- **Layered Separation**: Strict boundaries between API, Business Logic, and Data Access.
- **Dependency Inversion**: High-level modules should not depend on low-level modules; both should depend on abstractions.
- **Statelessness**: The backend must be stateless to support horizontal scaling.
- **Resource Orientation**: APIs should be designed around resources (REST principles).
- **Asynchronous First**: Any task taking >500ms (like video processing) MUST be handled asynchronously via queues.

## 3. Folder Structure
```text
com.mgr.api
├── component          # Shared logic/utilities (e.g., S3 client, AI client)
├── config             # System configurations (Security, Redis, RabbitMQ)
├── constant           # Global constants and Enums
├── controller         # REST Controllers (Request/Response handling)
├── dto                # Data Transfer Objects (Output)
├── exception          # Global exception handlers and custom exceptions
├── form               # Input forms and validation
├── mapper             # MapStruct interfaces (Entity <-> DTO)
├── model              # JPA Entities (Database schema)
├── repository         # Spring Data JPA Repositories
├── service            # Business Logic (Interfaces)
│   └── impl           # Service Implementations
├── utils              # Pure utility functions
└── validation         # Custom JSR-303 validators
```

## 4. Implementation Rules
- **Controllers**: Must extend `ABasicController`. Only handle routing and basic `@Valid` checks.
- **Services**: All business logic resides here. Must use `@Transactional` where state changes occur.
- **Entities**: Never expose Entities directly to the API. Use DTOs.
- **Validation**: Use JSR-303 annotations (`@NotNull`, `@NotBlank`) in `Form` classes.
- **Mapping**: Use `MapStruct`. Manual mapping is an anti-pattern.

## 5. Best Practices
- **Thin Controllers**: Aim for < 5 lines of code per controller method.
- **Service Interfaces**: Always define an interface for services to allow easy mocking and multiple implementations.
- **Constructor Injection**: Use `@RequiredArgsConstructor` (Lombok) instead of `@Autowired`.
- **Global Constants**: Use `MgrConstant` for business values.

## 6. Anti-Patterns
- **Magic Strings**: Hardcoding strings in services.
- **Transactional Controllers**: Putting `@Transactional` on controller methods.
- **Circular Dependencies**: Services depending on each other in a loop.
- **Direct Repo Access**: Controllers calling repositories directly.

## 7. Scalability Considerations
- **Distributed Caching**: Use Redis for shared state (sessions, processing status).
- **Horizontal Scaling**: Avoid `synchronized` blocks or local file storage that isn't shared.
- **Database Indexing**: Always index columns used in `where` clauses or joins.

## 8. Security Considerations
- **RBAC**: Use `@PreAuthorize` on every sensitive controller method.
- **Input Sanitization**: Always validate input using `Form` classes.
- **JWT**: Use stateless tokens for all authenticated requests.

## 9. Example Implementation

**Service Pattern:**
```java
@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;
    private final VideoMapper videoMapper;
    private final RabbitTemplate rabbitTemplate;

    @Override
    @Transactional
    public void processVideo(Long id) {
        Video video = videoRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Video not found"));
        
        // Update status and push to queue
        video.setStatus(MgrConstant.VIDEO_STATUS_PENDING);
        videoRepository.save(video);
        
        rabbitTemplate.convertAndSend(VideoQueueConfig.EXCHANGE, VideoQueueConfig.ROUTING_KEY, id);
    }
}
```

## 10. AI Agent Instructions
- **Generate code that fits the Layered Architecture.**
- **Always create a Form, DTO, Mapper, and Service for new features.**
- **Ensure no business logic is in the Controller.**
- **If a task is heavy, suggest a RabbitMQ based worker implementation.**
