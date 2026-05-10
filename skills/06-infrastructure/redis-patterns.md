# Skill: Redis Patterns

## 1. Purpose
Defines how Redis should be used for caching, session management, and distributed locking.

## 2. Architecture Principles
- **TTL by Default**: Every key should have an expiration time unless it's a permanent record.
- **Key Namespacing**: Use prefixes to avoid collisions (e.g., `user:session:123`, `video:progress:456`).
- **Memory Management**: Monitor memory usage and set an appropriate eviction policy (e.g., `allkeys-lru`).

## 3. Implementation Rules
- **Caching Strategy**: Use Cache-Aside (Lazy Loading) for most scenarios.
- **Serialization**: Use JSON or Protobuf for complex objects; avoid raw Java serialization.
- **Atomic Operations**: Use Lua scripts or `INCR/DECR` for atomic state changes.

## 4. Best Practices
- **Distributed Locking**: Use Redlock (via Redisson) for synchronizing tasks across multiple instances.
- **Connection Pooling**: Use the Lettuce driver with proper pooling configuration.

## 5. Anti-Patterns
- **Big Keys**: Storing massive objects (like a whole video's metadata) in a single key.
- **KEYS Command**: Using `KEYS *` in production; use `SCAN` instead.

## 6. Example Implementation (Spring Data Redis)
```java
@Cacheable(value = "videoCache", key = "#id")
public VideoDto getById(Long id) {
    return videoRepository.findById(id).map(videoMapper::toDto).orElse(null);
}
```

## 7. AI Agent Instructions
- **Recommend caching for frequently read, slowly changing data.**
- **Enforce the use of TTLs for all cache entries.**
- **Suggest distributed locks for critical resource synchronization.**
