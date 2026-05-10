# Skill: Queue Processing

## 1. Purpose
Defines standards for handling background jobs, especially video rendering and AI inference, ensuring the system remains responsive.

## 2. Architecture Principles
- **Guaranteed Delivery**: Messages must not be lost if a worker crashes.
- **Parallelism**: Multiple workers should be able to process the same queue.
- **Prioritization**: Support for different priority levels (e.g., Free vs. Pro users).
- **Progress Tracking**: Real-time progress updates for the user via WebSocket or polling.

## 3. Folder Structure
```text
com.mgr.api
├── config
│   └── RabbitMQConfig.java
└── service
    └── worker
        ├── VideoWorker.java
        └── TranslationWorker.java
```

## 4. Implementation Rules
- **Acknowledgements**: Use manual ACKs to ensure a message is only removed from the queue after successful processing.
- **Timeouts**: Set strict timeouts for long-running jobs to prevent worker starvation.
- **Concurrency**: Configure `concurrentConsumers` in the listener container.

## 5. Best Practices
- **Prefetch Count**: Set `prefetchCount=1` for heavy tasks (video) to avoid overwhelming a single worker.
- **State Persistence**: Update the database at each stage of processing (e.g., 25%, 50%, 75%).
- **Resource Monitoring**: Workers should report their health and GPU utilization.

## 6. Anti-Patterns
- **Long Blocks**: Workers blocking on a network call without a timeout.
- **Memory Leaks**: Creating FFmpeg processes without properly cleaning them up.
- **Synchronous API calls in Workers**: Workers should be as self-contained as possible.

## 7. Scalability Considerations
- **Worker Auto-scaling**: Use Kubernetes KEDA to scale workers based on queue depth.
- **Queue Partitioning**: Sharding queues if the message volume exceeds single-broker capacity.

## 8. Security Considerations
- **Sanitized Job Data**: Validate that the IDs and parameters in the queue message are valid and the user has permissions.

## 9. Example Implementation (Worker with Progress)
```java
@Service
public class VideoWorker {
    @RabbitListener(queues = "video.render")
    public void onRenderTask(RenderTask task) {
        try {
            // Update DB: Status = PROCESSING, Progress = 0
            // Run FFmpeg...
            // Update DB: Progress = 50...
            // Ack message
        } catch (Exception e) {
            // Nack with requeue=false or send to DLQ
        }
    }
}
```

## 10. AI Agent Instructions
- **Design workers to be idempotent.**
- **Implement detailed logging and progress updates.**
- **Always include error handling and message acknowledgment.**
