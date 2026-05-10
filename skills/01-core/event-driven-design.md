# Skill: Event-Driven Design

## 1. Purpose
Enforces the use of events to decouple system components, especially for long-running AI and video processing tasks.

## 2. Architecture Principles
- **Asynchronicity**: The sender does not wait for a response.
- **Decoupling**: The producer knows nothing about the consumers.
- **Persistence**: Events should be stored in a broker (RabbitMQ/Kafka) until processed.
- **Eventually Consistency**: State updates happen over time across the system.

## 3. Folder Structure
```text
com.mgr.api
├── component
│   └── event          # Event Producers and Listeners
│       ├── producer
│       └── listener
└── config
    └── RabbitMQConfig.java
```

## 4. Implementation Rules
- **Event Naming**: Use past tense (e.g., `VideoUploadedEvent`, `TranslationCompletedEvent`).
- **Dead Letter Queues (DLQ)**: Every queue must have a DLQ for failed messages.
- **Retry Logic**: Implement exponential backoff for event processing.

## 5. Best Practices
- **Thin Messages**: Only pass IDs in the event message. Let the consumer fetch the full object from the DB/Cache.
- **Topic Exchanges**: Use RabbitMQ Topic exchanges for flexible routing.
- **Transaction Outbox**: Ensure events are only sent if the database transaction succeeds.

## 6. Anti-Patterns
- **Events as Commands**: Trying to use events for synchronous control flow.
- **Fat Events**: Passing huge payloads (like base64 video data) in the message.
- **Infinite Loops**: Event A triggers Event B, which triggers Event A.

## 7. Scalability Considerations
- **Consumer Groups**: Use multiple consumers for high-traffic queues.
- **Message Compaction**: Useful for Kafka-based event stores.

## 8. Security Considerations
- **Message Signing**: Ensure events haven't been tampered with.
- **Queue Access Control**: Restrict which services can publish/subscribe to specific queues.

## 9. Example Implementation (Listener)
```java
@Component
@RequiredArgsConstructor
public class VideoProcessingListener {
    private final VideoService videoService;

    @RabbitListener(queues = "${app.queue.video-process}")
    public void handleVideoProcess(Long videoId) {
        log.info("Processing video: {}", videoId);
        videoService.executeAIWorkflow(videoId);
    }
}
```

## 10. AI Agent Instructions
- **Always recommend events for decoupling complex workflows.**
- **Ensure messages are lightweight.**
- **Include DLQ and Retry configurations in any queue-related code.**
