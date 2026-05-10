# 🗺️ Bản đồ Kỹ năng Dự án (Project Skills Map)

Tài liệu này tổng hợp và giải thích toàn bộ các file kỹ năng (skill files) trong thư mục `/skills`. Đây là "bộ não" hướng dẫn cho các AI Agent và lập trình viên để đảm bảo dự án luôn tuân thủ đúng kiến trúc, tiêu chuẩn và tầm nhìn cốt lõi.

---

## 🏗️ 1. Kiến trúc lõi (Core Architecture)
Các kỹ năng này định hình cấu trúc tổng thể của toàn bộ nền tảng.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [Backend Architecture](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/backend-architecture.md) | Quy định cấu trúc phân lớp (Controller-Service-Repo), tách biệt logic và cách tổ chức package. |
| [Microservice Patterns](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/microservice-patterns.md) | Các nguyên tắc để chia nhỏ hệ thống thành các dịch vụ độc lập, giao tiếp qua Feign hoặc gRPC. |
| [Event-Driven Design](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/event-driven-design.md) | Hướng dẫn sử dụng sự kiện (Events) để giảm sự phụ thuộc giữa các module, xử lý bất đồng bộ. |
| [Queue Processing](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/queue-processing.md) | Tiêu chuẩn xử lý hàng đợi cho các tác vụ nặng (Video/AI), quản lý retry và progress. |
| [Domain-Driven Design](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/domain-driven-design.md) | Cách mô hình hóa phần mềm dựa trên nghiệp vụ thực tế (Aggregates, Value Objects). |
| [API Design](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/api-design.md) | Chuẩn hóa thiết kế RESTful API, phiên bản hóa và cấu trúc phản hồi đồng nhất. |
| [Database Design](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/database-design.md) | Quy tắc thiết kế schema, lập chỉ mục (index) và quản lý migration qua Liquibase. |
| [Error Handling](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/error-handling.md) | Hệ thống quản lý lỗi tập trung, mã lỗi đồng nhất cho toàn hệ thống. |
| [Logging & Monitoring](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/logging-monitoring.md) | Quy chuẩn ghi log có cấu trúc và giám sát sức khỏe hệ thống (Prometheus/Grafana). |
| [Testing Strategy](file:///d:/Itz/mgr-api/mgr-api/skills/01-core/testing-strategy.md) | Chiến lược kiểm thử: Unit Test, Integration Test và E2E Test cho pipeline AI. |

---

## 🤖 2. Pipeline AI & Xử lý Media
Tập hợp các kỹ năng cốt lõi cho tính năng dịch thuật và xử lý video tự động.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [AI Translation Pipeline](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/ai-translation-pipeline.md) | Quy trình phối hợp giữa STT, LLM, TTS và Lip-sync để tạo ra luồng dịch thuật hoàn chỉnh. |
| [Video Processing](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/video-processing.md) | Tiêu chuẩn xử lý file video, tối ưu hóa dung lượng và định dạng chuẩn server. |
| [FFmpeg Workflows](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/ffmpeg-workflows.md) | Thư viện các câu lệnh FFmpeg tối ưu cho bóc tách âm thanh, chèn sub, và render video. |
| [Dubbing System](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/dubbing-system.md) | Kỹ thuật lồng tiếng AI, Clone giọng nói và đồng bộ hóa thời gian (alignment). |
| [Lip-Sync System](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/lipsync-system.md) | Tích hợp AI khớp khẩu hình miệng nhân vật theo âm thanh tiếng Việt. |
| [Subtitle Processing](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/subtitle-processing.md) | Xử lý file phụ đề (SRT/ASS), dịch thuật ngữ cảnh và định dạng hiển thị chuyên nghiệp. |
| [Video Rendering](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/video-rendering.md) | Kỹ thuật render video cuối cùng (FFmpeg & Remotion), quản lý tài nguyên GPU. |
| [Media Storage](file:///d:/Itz/mgr-api/mgr-api/skills/04-ai-video/media-storage.md) | Quản lý lưu trữ file lớn trên Object Storage (MinIO/S3), bảo mật qua Signed URL. |

---

## ☕ 3. Kỹ thuật Backend chuyên sâu
Hướng dẫn thực thi chi tiết trên nền tảng Java Spring Boot và các công cụ hỗ trợ.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [Spring Boot Best Practices](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/spring-boot-best-practices.md) | Quy chuẩn code Spring Boot: Lombok, Constructor Injection, MapStruct, Validation. |
| [NestJS Best Practices](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/nestjs-best-practices.md) | Hướng dẫn cho các microservices viết bằng Node.js/NestJS. |
| [Security Guidelines](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/security-guidelines.md) | Các nguyên tắc bảo mật: HTTPS, SQL Injection, XSS, quản lý Secrets. |
| [Authentication & RBAC](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/authentication-rbac.md) | Triển khai xác thực JWT và phân quyền đa cấp (Free, Pro, Studio, Admin). |
| [File Upload System](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/file-upload-system.md) | Xử lý upload file video dung lượng lớn, upload theo chunk và resumeable. |
| [WebSocket & Real-time](file:///d:/Itz/mgr-api/mgr-api/skills/02-backend/websocket-realtime.md) | Thông báo trạng thái xử lý video và tương tác thời gian thực qua Socket.io/STOMP. |

---

## 🌐 4. Hạ tầng & Vận hành (DevOps)
Đảm bảo hệ thống chạy ổn định, bảo mật và có khả năng mở rộng cực cao.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [Docker Guidelines](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/docker-guidelines.md) | Tiêu chuẩn đóng gói container, tối ưu layer và bảo mật image. |
| [Kubernetes Guidelines](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/kubernetes-guidelines.md) | Triển khai K8s, quản lý Resource Limits, HPA và Liveness/Readiness Probes. |
| [Redis Patterns](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/redis-patterns.md) | Chiến lược Caching, Session và Distributed Lock (Redlock). |
| [RabbitMQ & Kafka](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/rabbitmq-kafka.md) | Cấu hình Message Broker cho các tác vụ tin cậy và streaming dữ liệu. |
| [Scaling Strategies](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/scaling-strategies.md) | Chiến lược mở rộng ngang, tối ưu database và worker AI theo tải thực tế. |
| [CDN & Storage](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/cdn-storage.md) | Phân phối video qua CDN (HLS/DASH) và tối ưu hóa Origin Storage. |
| [GPU Worker Architecture](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/gpu-worker-architecture.md) | Thiết kế hạ tầng đặc thù cho GPU, quản lý VRAM và model pre-loading. |
| [DevOps & CI/CD](file:///d:/Itz/mgr-api/mgr-api/skills/06-infrastructure/devops-cicd.md) | Tự động hóa quy trình Build-Test-Deploy, quản lý môi trường Staging/Prod. |

---

## 🎨 5. Frontend & Trình chỉnh sửa Video
Tập trung vào trải nghiệm người dùng và các công nghệ giao diện hiện đại.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [Frontend Architecture](file:///d:/Itz/mgr-api/mgr-api/skills/03-frontend/frontend-architecture.md) | Cấu trúc Next.js, Atomic Design, TypeScript và quản lý component. |
| [Video Editor System](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/video-editor-system.md) | Kiến trúc bộ chỉnh sửa video online, xử lý preview thời gian thực trên client. |
| [Timeline Editor](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/timeline-editor.md) | Kỹ thuật xây dựng thanh timeline, kéo thả và đồng bộ hóa frame. |
| [State Management](file:///d:/Itz/mgr-api/mgr-api/skills/03-frontend/state-management.md) | Quản lý state phức tạp với Zustand và React Query. |
| [Real-time Collaboration](file:///d:/Itz/mgr-api/mgr-api/skills/03-frontend/realtime-collaboration.md) | Kỹ thuật làm việc nhóm trên cùng project (CRDT, Cursors, Presence). |

---

## 📈 6. Doanh nghiệp & Tự động hóa cao cấp
Các tính năng mở rộng dành cho khách hàng Enterprise và tối ưu nội dung.

| Tên Skill | Mô tả & Công dụng |
| :--- | :--- |
| [Social Platform Integration](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/social-platform-integration.md) | Tích hợp API YouTube, TikTok, Facebook để tự động đăng tải video. |
| [Analytics Engine](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/analytics-engine.md) | Theo dõi hành vi người dùng và hiệu suất video sau khi dịch. |
| [Enterprise Automation](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/enterprise-automation.md) | Luồng tự động hóa quy mô lớn: Watch Folder, Bulk Processing, Webhooks. |
| [Content Recommendation AI](file:///d:/Itz/mgr-api/mgr-api/skills/05-features/content-recommendation-ai.md) | AI gợi ý nội dung Trung Quốc đang trending phù hợp để dịch sang Việt Nam. |

---

## 🚀 Cách sử dụng các Kỹ năng này
Khi yêu cầu AI thực hiện bất kỳ công việc nào, hãy nhắc AI tham chiếu đến các file kỹ năng này (ví dụ: *"Hãy viết module xử lý video theo đúng skills/video-processing.md"*). Điều này sẽ giúp AI:
1.  **Code đúng chuẩn**: Không viết code rác, không bỏ qua các bước bảo mật.
2.  **Đúng kiến trúc**: Tự động chia layer, dùng đúng Mapper, DTO.
3.  **Sẵn sàng mở rộng**: Tự động thêm hàng đợi, cache và logging.
