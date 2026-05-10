# Skill: RabbitMQ & Kafka

## 1. Purpose
Defines the usage of message brokers for asynchronous communication and event streaming.

## 2. Architecture Principles
- **RabbitMQ for Tasks**: Use RabbitMQ for complex workflows that require flexible routing and individual message ACKs.
- **Kafka for Streams**: Use Kafka for high-throughput data streams and audit logs where replayability is needed.
- **Message Durability**: Ensure messages survive broker restarts.

## 3. Implementation Rules
- **Exchanges/Topics**: Use `Topic` exchanges in RabbitMQ for routing based on patterns.
- **Acknowledge Mode**: Use `MANUAL` for critical tasks to prevent message loss.
- **Prefetch Count**: Set appropriately to balance load across workers.

## 4. Best Practices
- **Dead Letter Exchanges (DLX)**: Route failed messages to a DLX for inspection.
- **Schema Registry**: Use Avro or Protobuf for Kafka to manage message schemas.
- **Idempotent Consumers**: Design consumers to handle duplicate messages gracefully.

## 5. Anti-Patterns
- **Using Brokers as Databases**: Storing messages permanently in the broker.
- **Giant Payloads**: Sending large files through the message broker.

## 6. Example Implementation (RabbitMQ Config)
```java
@Bean
public Queue videoQueue() {
    return QueueBuilder.durable("video.process")
        .withArgument("x-dead-letter-exchange", "dlx.exchange")
        .build();
}
```

## 7. AI Agent Instructions
- **Recommend RabbitMQ for the video translation pipeline.**
- **Enforce message durability and manual acknowledgments.**
- **Include DLQ configurations in all message broker setups.**
