# Database Architecture: AI Video Translation & Dubbing Platform

## Overview

- **Database**: MySQL 8.x (Dev/UAT), PostgreSQL 15+ (Production)
- **ORM**: TypeORM (NestJS integration)
- **Architecture**: Feature-based organization

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `users`, `translation_jobs` |
| Columns | snake_case | `created_at`, `user_id` |
| Foreign Keys | `[singular_table]_id` | `project_id`, `role_id` |
| Indexes | `idx_[table]_[column]` | `idx_users_email` |
| Auditing | `created_at`, `updated_at`, `created_by`, `updated_by` | Common for all entities |

---

## Scientific Design Principles

1. **Normalization (3NF)**: Tất cả các bảng được chuẩn hóa ở mức 3 (Third Normal Form) để loại bỏ dư thừa dữ liệu và đảm bảo tính nhất quán.
2. **Indexing Strategy**: 
   - Đánh Index cho các cột thường xuyên tìm kiếm (`email`, `user_id`, `project_id`, `status`).
   - Sử dụng Composite Index cho các truy vấn phức tạp trong `translation_jobs`.
3. **Audit Tracking**: Sử dụng `Auditable` entity để tự động ghi lại lịch sử tạo và cập nhật dữ liệu, hỗ trợ truy vết lỗi (Troubleshooting).
4. **Transaction Integrity**: Đảm bảo tính nguyên tử (ACID) thông qua `@Transactional` trong tầng Service, đặc biệt là trong các quy trình thanh toán (Credit Transactions) và cập nhật trạng thái Job.

---

## Entities by Feature

### Auth Feature

**roles**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(50) | NOT NULL, UNIQUE |
| description | VARCHAR(255) | NULLABLE |

**users**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| role_id | BIGINT | FK → roles |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password_hash | VARCHAR(255) | NOT NULL |
| full_name | VARCHAR(100) | NOT NULL |
| avatar_url | VARCHAR(255) | NULLABLE |
| phone | VARCHAR(20) | NULLABLE |
| is_active | BOOLEAN | DEFAULT TRUE |
| email_verified_at | DATETIME | NULLABLE |
| last_login_at | DATETIME | NULLABLE |
| created_at | DATETIME | AUTO |
| updated_at | DATETIME | AUTO |

**refresh_tokens**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | |
| user_id | BIGINT | FK → users, NOT NULL | Token owner |
| token_hash | VARCHAR(255) | NOT NULL, UNIQUE | Hashed token |
| device_name | VARCHAR(100) | NULLABLE | "Chrome on Windows" |
| ip_address | VARCHAR(45) | NULLABLE | IPv4/IPv6 |
| user_agent | VARCHAR(255) | NULLABLE | Browser info |
| expires_at | DATETIME | NOT NULL | Expiration |
| is_revoked | BOOLEAN | DEFAULT FALSE | |
| created_at | DATETIME | AUTO | |

**oauth_accounts**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| provider | VARCHAR(50) | NOT NULL (google, facebook, etc.) |
| provider_user_id | VARCHAR(255) | NOT NULL |
| access_token | TEXT | NULLABLE |
| refresh_token | TEXT | NULLABLE |
| expires_at | DATETIME | NULLABLE |

---

### Subscription & Billing Feature

**subscription_plans**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| name | VARCHAR(50) | NOT NULL (free, pro, studio, enterprise) |
| monthly_price | DECIMAL(10,2) | NOT NULL |
| max_storage_gb | INT | NOT NULL |
| max_video_minutes | INT | NOT NULL |
| max_ai_processing_hours | INT | NOT NULL |
| max_projects | INT | NOT NULL |
| max_team_members | INT | NOT NULL |
| created_at | DATETIME | AUTO |

**user_subscriptions**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| subscription_plan_id | BIGINT | FK → subscription_plans |
| started_at | DATETIME | NOT NULL |
| expired_at | DATETIME | NOT NULL |
| status | VARCHAR(20) | active, expired, cancelled |
| auto_renew | BOOLEAN | DEFAULT TRUE |
| created_at | DATETIME | AUTO |

**credit_transactions**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| amount | INT | NOT NULL |
| transaction_type | VARCHAR(20) | add, consume, refund |
| description | VARCHAR(255) | NULLABLE |
| created_at | DATETIME | AUTO |

---

### Video Project Feature

**projects**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NULLABLE |
| thumbnail_url | VARCHAR(255) | NULLABLE |
| status | VARCHAR(20) | draft, processing, completed |
| visibility | VARCHAR(20) | private, public |
| created_at | DATETIME | AUTO |
| updated_at | DATETIME | AUTO |

**videos**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| project_id | BIGINT | FK → projects |
| original_filename | VARCHAR(255) | NOT NULL |
| storage_url | VARCHAR(255) | NOT NULL |
| duration_seconds | INT | NOT NULL |
| resolution | VARCHAR(50) | NULLABLE |
| file_size | BIGINT | NOT NULL |
| language_source | VARCHAR(10) | NOT NULL |
| upload_status | VARCHAR(20) | pending, uploaded, failed |
| created_at | DATETIME | AUTO |

**video_versions**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| project_id | BIGINT | FK → projects |
| version_name | VARCHAR(100) | NOT NULL |
| rendered_video_url | VARCHAR(255) | NULLABLE |
| render_status | VARCHAR(20) | pending, rendering, completed, failed |
| created_at | DATETIME | AUTO |

---

### AI Translation Pipeline Feature

**translation_jobs**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| project_id | BIGINT | FK → projects |
| user_id | BIGINT | FK → users |
| source_language | VARCHAR(10) | NOT NULL |
| target_language | VARCHAR(10) | NOT NULL |
| translation_status | VARCHAR(20) | pending, processing, completed, failed, cancelled |
| progress_percentage | INT | DEFAULT 0 |
| started_at | DATETIME | NULLABLE |
| completed_at | DATETIME | NULLABLE |
| error_message | TEXT | NULLABLE |

**subtitles**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| translation_job_id | BIGINT | FK → translation_jobs |
| start_time_ms | BIGINT | NOT NULL |
| end_time_ms | BIGINT | NOT NULL |
| original_text | TEXT | NOT NULL |
| translated_text | TEXT | NOT NULL |

**voice_tracks**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| translation_job_id | BIGINT | FK → translation_jobs |
| speaker_name | VARCHAR(100) | NULLABLE |
| voice_model | VARCHAR(100) | NOT NULL |
| audio_url | VARCHAR(255) | NOT NULL |
| duration_seconds | INT | NOT NULL |
| created_at | DATETIME | AUTO |

**audio_segments**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| voice_track_id | BIGINT | FK → voice_tracks |
| segment_order | INT | NOT NULL |
| start_time_ms | BIGINT | NOT NULL |
| end_time_ms | BIGINT | NOT NULL |
| audio_url | VARCHAR(255) | NOT NULL |

---

### Video Editor Feature

**editor_timelines**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | |
| project_id | BIGINT | FK → projects | |
| timeline_json | JSON/JSONB | NOT NULL | Full editor state snapshot |
| version | INT | DEFAULT 1 | |
| created_at | DATETIME | AUTO | |
| updated_at | DATETIME | AUTO | |

**editor_assets**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| project_id | BIGINT | FK → projects |
| asset_type | VARCHAR(50) | text, sticker, music, transition, subtitle, icon, video, image |
| asset_url | VARCHAR(255) | NOT NULL |
| metadata_json | JSON/JSONB | NULLABLE |
| created_at | DATETIME | AUTO |

---

### Social Media Integration Feature

**social_accounts**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| platform | VARCHAR(50) | youtube, facebook, tiktok, instagram |
| platform_user_id | VARCHAR(255) | NOT NULL |
| access_token | TEXT | NOT NULL |
| refresh_token | TEXT | NULLABLE |
| connected_at | DATETIME | AUTO |

**social_videos**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| social_account_id | BIGINT | FK → social_accounts |
| external_video_id | VARCHAR(255) | NOT NULL |
| title | VARCHAR(255) | NULLABLE |
| thumbnail_url | VARCHAR(255) | NULLABLE |
| total_views | BIGINT | DEFAULT 0 |
| total_likes | BIGINT | DEFAULT 0 |
| total_comments | BIGINT | DEFAULT 0 |
| uploaded_at | DATETIME | NULLABLE |

**content_recommendations**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| recommendation_type | VARCHAR(50) | topic, style, keyword |
| title | VARCHAR(255) | NOT NULL |
| description | TEXT | NULLABLE |
| score | DECIMAL(5,2) | NULLABLE |
| created_at | DATETIME | AUTO |

---

### Enterprise Automation Feature

**automation_workflows**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| user_id | BIGINT | FK → users |
| workflow_name | VARCHAR(100) | NOT NULL |
| source_platform | VARCHAR(50) | NULLABLE |
| auto_translate | BOOLEAN | DEFAULT FALSE |
| auto_voiceover | BOOLEAN | DEFAULT FALSE |
| auto_publish | BOOLEAN | DEFAULT FALSE |
| is_active | BOOLEAN | DEFAULT TRUE |
| created_at | DATETIME | AUTO |

**crawled_videos**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| automation_workflow_id | BIGINT | FK → automation_workflows |
| source_url | VARCHAR(255) | NOT NULL |
| title | VARCHAR(255) | NULLABLE |
| thumbnail_url | VARCHAR(255) | NULLABLE |
| duration_seconds | INT | NULLABLE |
| crawl_status | VARCHAR(20) | pending, crawled, failed |
| created_at | DATETIME | AUTO |

**publishing_jobs**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| project_id | BIGINT | FK → projects |
| platform | VARCHAR(50) | youtube, facebook, tiktok, instagram |
| publish_status | VARCHAR(20) | scheduled, publishing, completed, failed |
| scheduled_at | DATETIME | NULLABLE |
| published_at | DATETIME | NULLABLE |
| error_message | TEXT | NULLABLE |

---

### Queue & Processing System

**processing_queues**
| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT |
| queue_name | VARCHAR(100) | NOT NULL, UNIQUE |
| queue_type | VARCHAR(50) | cpu, gpu, external_api |
| created_at | DATETIME | AUTO |

**processing_jobs**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | |
| queue_id | BIGINT | FK → processing_queues | |
| reference_type | VARCHAR(50) | NOT NULL | e.g., "translation_job" |
| reference_id | BIGINT | NOT NULL | |
| job_status | VARCHAR(20) | queued, processing, completed, failed, retrying | |
| retry_count | INT | DEFAULT 0 | |
| payload_json | JSON/JSONB | NULLABLE | Dynamic worker payload |
| started_at | DATETIME | NULLABLE | |
| completed_at | DATETIME | NULLABLE | |
| failed_at | DATETIME | NULLABLE | |
