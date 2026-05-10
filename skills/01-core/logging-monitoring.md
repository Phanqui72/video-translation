# Skill: Logging & Monitoring

## 1. Purpose
Standardizes how the system records its behavior and health for debugging and operational visibility.

## 2. Architecture Principles
- **Structured Logging**: Use JSON format in production for easier parsing (ELK/Loki).
- **Levels**: 
    - `ERROR`: System failure, needs immediate attention.
    - `WARN`: Unusual behavior, not a failure yet.
    - `INFO`: Significant business events (e.g., "Video Process Started").
    - `DEBUG`: Internal technical details.
- **Metrics**: Expose Prometheus metrics for performance monitoring.

## 3. Folder Structure
```text
src/main/resources/
└── log4j2-spring.xml
```

## 4. Implementation Rules
- **Correlation IDs**: Pass a `traceId` through all services to track a single request across the system.
- **Sensitive Data**: Never log passwords, tokens, or PII.
- **External Calls**: Always log the latency and outcome of calls to external AI services.

## 5. Best Practices
- **Log4j2/SLF4J**: Use SLF4J abstraction.
- **Monitoring Dashboards**: Create Grafana dashboards for GPU usage, Queue depth, and API latency.
- **Alerting**: Set up alerts for high error rates or low disk space.

## 6. Anti-Patterns
- **System.out.println**: Using stdout instead of a logger.
- **Log Noise**: Logging too much in the hot path, causing performance degradation.

## 7. Example Implementation
```java
@Slf4j
@Service
public class VideoService {
    public void process(Long id) {
        log.info("Starting video process for id: {}", id);
        try {
            // logic
        } catch (Exception e) {
            log.error("Failed to process video {}: {}", id, e.getMessage(), e);
            throw e;
        }
    }
}
```

## 8. AI Agent Instructions
- **Add logging to all critical business paths.**
- **Enforce the use of Slf4j.**
- **Suggest metrics for long-running tasks.**
