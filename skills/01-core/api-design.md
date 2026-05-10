# Skill: API Design

## 1. Purpose
Ensures consistent, predictable, and high-quality RESTful APIs for both frontend and external integrations.

## 2. Architecture Principles
- **RESTful Defaults**: Use proper HTTP verbs (GET, POST, PUT, DELETE, PATCH).
- **Versioning**: All APIs must be versioned (e.g., `/api/v1/...`).
- **Standardized Responses**: Use a common wrapper like `ApiMessageDto<T>`.
- **HATEOAS (Optional)**: Provide links to related resources.

## 3. Folder Structure
```text
com.mgr.api.controller
├── v1
│   ├── VideoController.java
│   └── AuthController.java
└── ABasicController.java
```

## 4. Implementation Rules
- **Resource Naming**: Use plural nouns (e.g., `/videos`, `/projects`).
- **Filtering/Paging**: Use query parameters for filtering and `Pageable` for paging.
- **Error Codes**: Return meaningful HTTP status codes (400, 401, 403, 404, 500).
- **PUT vs PATCH**: Use `PUT` for full updates and `PATCH` for partial updates.

## 5. Best Practices
- **Swagger Documentation**: Use `@ApiOperation` and `@ApiResponse` annotations.
- **Consistent Date Format**: Use ISO-8601 for all timestamps.
- **Rate Limiting**: Implement per-user or per-IP rate limits.

## 6. Anti-Patterns
- **Tunneling**: Using `POST` for everything.
- **Inconsistent Keys**: Mixing `snake_case` and `camelCase` in JSON.
- **Leaking Stack Traces**: Returning raw exception messages in the response.

## 7. Scalability Considerations
- **Pagination by Default**: Never return an unbounded list of resources.
- **Cache-Control Headers**: Use ETags or Cache-Control for GET requests.

## 8. Security Considerations
- **CORS**: Strictly define allowed origins.
- **Input Validation**: Use `@Valid` to reject malformed requests early.

## 9. Example Implementation (Controller)
```java
@RestController
@RequestMapping("/api/v1/videos")
public class VideoController extends ABasicController {
    
    @GetMapping("/{id}")
    public ApiMessageDto<VideoDto> getById(@PathVariable Long id) {
        return makeSuccessResponse(videoService.getById(id), "Get video success");
    }
}
```

## 10. AI Agent Instructions
- **Enforce RESTful conventions.**
- **Always include Swagger annotations.**
- **Ensure response structure follows `ApiMessageDto`.**
