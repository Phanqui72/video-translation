# Skill: Microservice Patterns

## 1. Purpose
Provides guidance on breaking down the monolith into microservices or maintaining microservice-like boundaries within the existing system to ensure independence and scalability.

## 2. Architecture Principles
- **Single Responsibility**: Each service (or module) should own one business domain (e.g., Auth, Media Processing, Billing).
- **Database per Service**: In a true microservice world, services do not share databases.
- **API First**: Services communicate via well-defined REST or gRPC APIs.
- **Observability**: Every service must provide health checks and tracing.

## 3. Folder Structure (Service Template)
```text
/microservices
  /media-processor
    /src
    Dockerfile
    pom.xml
  /translation-engine
    /src
    Dockerfile
    pom.xml
```

## 4. Implementation Rules
- **Inter-service Communication**: Use `OpenFeign` for synchronous calls and `RabbitMQ` for asynchronous events.
- **Circuit Breaker**: Use Resilience4j or similar to prevent cascading failures.
- **Configuration**: Use a centralized config (Spring Cloud Config or Environment Variables).

## 5. Best Practices
- **Idempotency**: All service operations should be idempotent to handle retries.
- **Service Discovery**: Use Eureka or Kubernetes DNS.
- **API Gateway**: All external traffic must pass through a single gateway for Auth and Rate Limiting.

## 6. Anti-Patterns
- **Shared Libraries (Overuse)**: Creating "common" libraries that link every service together, making them impossible to update independently.
- **Distributed Transactions**: Avoid two-phase commits. Use the Saga pattern instead.

## 7. Scalability Considerations
- **Auto-scaling**: Design services to be stateless so K8s HPA can scale them based on CPU/Memory.
- **Caching**: Use a shared Redis instance for distributed state if necessary.

## 8. Security Considerations
- **mTLS**: Encrypt traffic between services.
- **Internal JWT**: Pass user context between services using a standardized JWT claim.

## 9. Example Implementation (Feign Client)
```java
@FeignClient(name = "media-processor")
public interface MediaProcessorClient {
    @PostMapping("/api/v1/render")
    void startRendering(@RequestBody RenderRequest request);
}
```

## 10. AI Agent Instructions
- **When suggesting new features, evaluate if they should be a separate service.**
- **Enforce isolation between existing modules.**
- **Recommend asynchronous patterns for cross-service communication.**
