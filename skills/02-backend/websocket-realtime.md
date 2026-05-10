# Skill: WebSocket & Real-time

## 1. Purpose
Defines how to implement real-time features like progress bars, notifications, and collaboration.

## 2. Architecture Principles
- **Pub/Sub Pattern**: Use Redis or RabbitMQ as a backplane for WebSocket messages to support multiple server instances.
- **Message Types**: Define clear message types (e.g., `PROGRESS`, `NOTIFICATION`, `ERROR`).
- **Heartbeat**: Implement ping/pong to detect dead connections.

## 3. Folder Structure
```text
com.mgr.api.config
└── WebSocketConfig.java
com.mgr.api.component.websocket
├── NotificationHandler.java
└── ProgressBroadcaster.java
```

## 4. Implementation Rules
- **STOMP/SockJS**: Use standard protocols for compatibility.
- **Authentication**: Secure WebSocket connections using JWT passed in the initial handshake or query parameters.
- **Topic Naming**: Use user-specific topics (e.g., `/topic/user.{userId}.progress`).

## 5. Best Practices
- **Throttling**: Don't send updates more than 1-2 times per second.
- **Graceful Degradation**: Fallback to long-polling if WebSockets are blocked by a proxy.

## 6. Anti-Patterns
- **Massive Payloads**: Sending large chunks of data over WebSockets.
- **Stateful Handlers**: Storing business logic inside the WebSocket handler.

## 7. Example Implementation (Spring Boot)
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
}
```

## 8. AI Agent Instructions
- **Always use user-specific topics for private notifications.**
- **Include authentication logic in the handshake.**
- **Suggest Redis/RabbitMQ for distributed WebSocket support.**
