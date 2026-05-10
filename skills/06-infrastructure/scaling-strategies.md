# Skill: Scaling Strategies

## 1. Purpose
Provides a roadmap for scaling the system to handle thousands of concurrent users and massive video processing loads.

## 2. Architecture Principles
- **Horizontal Scaling**: Add more instances of services instead of making a single instance larger.
- **Statelessness**: Remove any local state from application servers.
- **Load Balancing**: Use Layer 7 load balancers to distribute traffic.

## 3. Implementation Rules
- **Database Scaling**: Implement read replicas and eventually sharding.
- **Cache Scaling**: Use Redis Cluster or sharded Redis.
- **Worker Scaling**: Use KEDA (Kubernetes Event-driven Autoscaling) to scale GPU workers based on queue length.

## 4. Best Practices
- **Graceful Shutdown**: Ensure services finish current tasks before stopping during a scale-down event.
- **Database Connection Pooling**: Tune HikariCP to prevent exhaustion during scale-up.
- **Static Content**: Offload all static assets and processed videos to a CDN.

## 5. Anti-Patterns
- **Vertical Scaling Only**: Depending on larger and larger VMs.
- **Hardcoded Instance Counts**: Fixed number of replicas in config files.

## 6. Scaling considerations
- **Cold Start**: AI models take time to load into GPU memory; factor this into scaling latency.
- **Storage Bandwidth**: Ensure MinIO/S3 can handle the aggregate throughput of many parallel workers.

## 7. AI Agent Instructions
- **Design all components to be horizontally scalable.**
- **Recommend KEDA for scaling the AI pipeline.**
- **Flag any stateful logic that would prevent scaling.**
