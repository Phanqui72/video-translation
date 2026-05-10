# Backend Project Status

## Project Overview
The platform is an enterprise-grade AI-powered video translation and dubbing system. It automates the localization of Chinese video content (movies, short films) into Vietnamese through a complex multi-stage AI pipeline involving Speech-to-Text, LLM-based translation, Text-to-Speech synthesis, and Lip-sync optimization. The system is designed for high concurrency, large file processing (3-4 hours), and distributed GPU-accelerated rendering.

## Current Architecture Status
- **Current Core**: Spring Boot 2.3 monolith (Transitioning to NestJS v11 microservice-ready architecture).
- **Persistence**: Relational database (MySQL/PostgreSQL) with Liquibase migrations.
- **Security**: JWT-based authentication with RBAC and OAuth2 support.
- **Infrastructure**: Redis caching, Swagger documentation.
- **Missing**: API Gateway, Distributed Queue (BullMQ/Kafka), GPU Worker services, WebSocket Gateway, S3 Storage integration.

## Frontend Project Status
- **Stack**: Vite + React + TypeScript + Tailwind CSS + Framer Motion.
- **Design System**: "Hyper-Premium Glassmorphism" (UTEer AI brand colors).
- **Architecture**: Feature-First Modular (src/features/[feature-name]).
- **Status**: Core foundations established.

## Currently Implemented
- [x] Spring Boot 2.3.0.RELEASE Core Boilerplate
- [x] Multi-environment Database Configuration (MySQL/PostgreSQL)
- [x] Liquibase Database Migration Framework
- [x] RBAC Foundation (Account, Group, Permission entities & logic)
- [x] Backend Controllers (Account, Group, Permission strictly adhering to ApiMessageDto)
- [x] OAuth2 & JWT Authentication Flow
- [x] Custom Token Enhancement (Additional claims, Zip compression)
- [x] Global Exception Handling & Standardized API Response (`ApiMessageDto`)
- [x] MapStruct & Lombok Integration for clean DTO mapping
- [x] Swagger 2.9.2 Documentation Setup
- [x] AES Encryption/Decryption utilities for sensitive data
- [x] Static Utility classes (Date, String, Zip, Tenant parsing)

## Partially Implemented
- [x] Security Hardening (JWT validation present, Basic RBAC enforced)
- [x] File Utility System (Basic local storage helpers present)
- [x] Auditor Tracking (JPA Auditor aware implementation verified)
- [x] Premium Frontend Core (Tailwind + Framer Motion + Glassmorphism implemented)
- [x] Core Admin UI (Login, User Management, RBAC screens finalized)

## Missing Critical Features
- [ ] Resumable Chunked Video Upload System
- [ ] AI Pipeline Orchestration (Speech-to-Text -> Translation -> TTS -> Lip-sync)
- [ ] Online Video Editor Timeline Engine (CapCut-like logic)
- [ ] Distributed Video Rendering & FFmpeg GPU acceleration
- [ ] Subscription & Billing (Stripe/Paypal & Credit management)
- [ ] Social Platform API Integrations (TikTok, YouTube, FB)
- [ ] Enterprise Automation Workflows (Crawl -> Process -> Publish)

## Backend TODO List

### Phase 1 — Core Foundation
- [ ] Migrate/Initialize NestJS v11 Microservice workspace
- [ ] Setup API Gateway with authentication forwarding
- [ ] Implement shared Internal DTO library (npm package/git submodule)
- [ ] Configure centralized Config Service (Vault/Consul integration)
- [ ] Implement distributed tracing with OpenTelemetry

### Phase 2 — Authentication & RBAC
- [/] Implement Refresh Token Rotation (RTR)
- [ ] Add Multi-device session management & revocation
- [/] Implement Hierarchical RBAC (Inherited permissions)
- [ ] Add Enterprise Organization/Team account support
- [ ] Implement IP-based rate limiting and brute force protection

### Phase 3 — Subscription & Billing
- [ ] Integrate Stripe/PayPal Webhook handlers
- [ ] Implement Credit Ledger system (Atomic increments/decrements)
- [ ] Add Subscription plan enforcement middleware
- [ ] Implement usage-based billing alerts
- [ ] Create Invoice generation & storage system

### Phase 4 — Video Upload Infrastructure
- [ ] Implement Resumable Chunked Upload (TUS or S3 Multipart)
- [ ] Add Upload Virus/Malware scanning pipeline
- [ ] Implement Video Metadata extraction (FFprobe)
- [ ] Add Automatic Thumbnail generation service
- [ ] Setup CDN-backed Signed URLs for private asset access

### Phase 5 — AI Translation Pipeline
- [ ] Implement Chinese Speech-to-Text (STT) worker (Whisper/Model-specific)
- [ ] Add Subtitle timestamp synchronization logic
- [ ] Implement LLM-based Context-aware Translation (Chinese -> Vietnamese)
- [ ] Add Human-in-the-loop (HITL) subtitle correction interface
- [ ] Setup BullMQ/Kafka for translation job orchestration

### Phase 6 — Dubbing & Voice Synthesis
- [ ] Implement Vietnamese TTS generation worker
- [ ] Add Voice Style & Speaker Selection logic
- [ ] Implement Voice Cloning module for specific actors
- [ ] Add Audio normalization & Noise reduction pipeline
- [ ] Implement Audio-to-Video sync (AVSync) logic

### Phase 7 — Video Rendering & FFmpeg
- [ ] Setup FFmpeg GPU-accelerated rendering cluster
- [ ] Implement multi-quality transcode (360p, 720p, 1080p, 4K)
- [ ] Add Watermark burn-in logic (conditional on plan)
- [ ] Implement Subtitle hard-coding (Burn-in) service
- [ ] Add Lip-sync AI processing stage (Wav2Lip/SadTalker integration)

### Phase 8 — Online Video Editor
- [ ] Implement Timeline JSON state management (Snapshots)
- [ ] Add Asset Library management (Stickers, Music, Transitions)
- [ ] Implement Server-side Clip Trimming & Cutting logic
- [ ] Add Audio Track Layering & Mixing (Mixing original vs dubbed)
- [ ] Implement Real-time preview stream generation

### Phase 9 — Analytics System
- [ ] Implement Audience behavior tracking (Views, Retention)
- [ ] Add AI Recommendation engine for "Trending Chinese content"
- [ ] Implement Profitability estimation for specific niches
- [ ] Add Viral potential scoring for translated videos
- [ ] Create Enterprise-level reporting dashboard

### Phase 10 — Social Platform Integration
- [ ] Integrate TikTok Content Posting API
- [ ] Integrate YouTube Data API v3 (Auto-upload, Captions)
- [ ] Integrate Facebook Graph API (Pages publishing)
- [ ] Implement Cross-platform scheduling system
- [ ] Add Social Account OAuth token management & auto-refresh

### Phase 11 — Enterprise Automation
- [ ] Implement Web Crawler for Chinese platforms (Douyin/Bilibili)
- [ ] Add Automatic Download & Ingest pipeline
- [ ] Implement "Auto-Dub & Publish" workflow templates
- [ ] Add Bulk processing tools for large content libraries
- [ ] Implement Enterprise API access for external integrations

### Phase 12 — Infrastructure & Scalability
- [ ] Setup Kubernetes (K8s) Cluster for auto-scaling
- [ ] Implement GPU Worker Auto-scaling based on queue depth
- [ ] Setup Distributed Locking with Redis (Redlock)
- [ ] Implement Database Sharding/Partitioning for large video tables
- [ ] Add Global CDN for low-latency video delivery

### Phase 13 — Security Hardening
- [ ] Implement Encryption-at-rest for user media files
- [ ] Add Webhook signature validation for all 3rd party integrations
- [ ] Implement Advanced Audit Logging for sensitive actions
- [ ] Add OWASP Top 10 security scanning in CI pipeline
- [ ] Setup Secret Management (AWS Secrets Manager/HashiCorp Vault)

### Phase 14 — Observability & Monitoring
- [ ] Setup Prometheus & Grafana Dashboards
- [ ] Implement OpenTelemetry tracing across all microservices
- [ ] Setup Centralized Logging (ELK/Loki)
- [ ] Add GPU Health & Performance monitoring
- [ ] Implement Queue latency & error rate alerts

### Phase 15 — Testing
- [ ] Implement 80%+ coverage Unit Tests
- [ ] Add Integration Tests for AI Pipeline stages
- [ ] Implement E2E Tests for critical user flows (Upload -> Translate -> Export)
- [ ] Perform Load Testing for concurrent video renders
- [ ] Add Stress Testing for message broker/queue overflow

### Phase 16 — CI/CD & DevOps
- [ ] Implement Multi-stage Docker builds
- [ ] Setup Helm Charts for K8s deployment
- [ ] Add Blue-Green / Canary deployment strategy
- [ ] Implement Automated Rollback on health check failure
- [ ] Setup Environment-specific CI/CD pipelines (Dev/Staging/Prod)

### Phase 17 — Documentation
- [ ] Maintain comprehensive API_SPEC.md (OpenAPI/Swagger)
- [ ] Add Technical Architecture diagrams (C4 Model)
- [ ] Write Developer Onboarding Guide
- [ ] Add Infrastructure-as-Code (Terraform/Ansible) documentation
- [ ] Write Disaster Recovery Plan

### Phase 18 — Production Readiness
- [ ] Perform Final Security Audit & Pentest
- [ ] Complete Database indexing optimization
- [ ] Setup Backup & Recovery automation (Daily/Weekly)
- [ ] Finalize SLAs and support monitoring
- [ ] Perform Production Dry-run (Smoke tests)

## Technical Debt
- **Monolith to Microservice**: Existing Spring Boot monolith needs to be decomposed.
- **Legacy Logic**: Some older DTOs and Controllers use inconsistent naming conventions.
- **Dependency Versioning**: Spring Boot 2.3 is nearing EOL; migration to 3.x or NestJS is required.
- **Documentation Gaps**: Missing detailed logic for Lip-sync AI integration.

## Suggested Next Priorities
1. **NestJS Migration**: Initialize the microservice workspace to support AI pipeline scaling.
2. **Chunked Upload**: Critical for handling 3-4 hour video files.
3. **Queue Infrastructure**: Setup BullMQ/Redis for job orchestration.
4. **AI Pipeline v1**: Connect STT and Translation services as a POC.

## Long-Term Scalability Considerations
- **Multi-region Support**: Distribute GPU workers globally to reduce latency.
- **Cost Optimization**: Auto-shutdown GPU instances when queues are empty.
- **Data Retention**: Implement lifecycle policies for large video assets.
- **Edge Rendering**: Explore browser-based rendering for lightweight editing tasks.
