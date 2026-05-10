# API Specification: AI-Powered Video Translation Platform

## 1. Overview

- **Base URL**: `/api/v1`
- **Versioning**: 
  - `/api/v1/` (Current)
  - `/api/v2/` (Planned)
- **Content-Type**: `application/json`
- **Encoding**: `UTF-8`
- **Realtime Updates**: 
  - **WebSocket Namespace**: `/ws`
  - **Events**: `translation_progress`, `render_progress`, `export_progress`

---

## 2. Authentication & Authorization

### Authentication
- **Mechanism**: JWT Bearer Token
- **Header**: `Authorization: Bearer <access_token>`
- **Token Strategy**:
  - `access_token`: 15 minutes
  - `refresh_token`: 7 days (stored in `httpOnly` cookie)

### RBAC & Subscriptions
| Role | Access Level |
| :--- | :--- |
| `user` | Standard access, personal projects |
| `pro` | Faster queues, HD export, more credits |
| `studio` | Team collaboration, premium voices, advanced analytics |
| `enterprise` | Full automation, bulk processing, API access |
| `admin` | System management, user auditing |

| Subscription Plan | Cost | Key Limits |
| :--- | :--- | :--- |
| **Free** | $0 | Watermarked, SD only, limited AI minutes |
| **Pro** | $15/mo | No watermark, HD 1080p, faster priority |
| **Studio** | $30/mo | Team seats, 4K render, premium AI voices |
| **Enterprise** | Custom | Automation workflows, dedicated GPU workers |

---

## 3. Request & Response Conventions

### Request Formatting
- **Pagination**: `page`, `limit` (Max 100)
- **Sorting**: `sort` (field), `order` (`asc`\|`desc`)
- **Filtering**: `status`, `plan`, `processing_state`, `createdAt` (range)
- **Body**: JSON with `camelCase` keys.
- **Uploads**: `multipart/form-data` (Chunked upload supported for large files).

### Response Structure
**Success**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Paginated**
```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

**Error**
```json
{
  "success": false,
  "error": {
    "code": "VIDEO_001",
    "message": "Upload failed",
    "details": { "reason": "Unsupported format" }
  }
}
```

---

## 4. Error Codes

| Range | Feature | Example |
| :--- | :--- | :--- |
| `AUTH_001-099` | Authentication | `AUTH_001`: Invalid credentials |
| `SUB_001-099` | Subscription | `SUB_001`: Subscription expired |
| `VIDEO_001-099` | Video Management | `VIDEO_001`: Upload failed |
| `AI_001-099` | AI Pipeline | `AI_001`: Translation failed |
| `EDIT_001-099` | Editor | `EDIT_001`: Timeline render failed |
| `SYS_001-099` | System/General | `SYS_001`: Database connection error |

---

## 5. Features & Endpoints

### Auth Feature
| Method | Path | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/auth/register` | Register new account | No |
| POST | `/auth/login` | Login & receive tokens | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Revoke session | Yes |
| GET | `/auth/me` | Get current user profile | Yes |

### Video Management
| Method | Path | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/videos/upload` | Upload video (Multipart) | Yes |
| GET | `/videos` | List user videos | Yes |
| GET | `/videos/:id` | Get video metadata | Yes |
| DELETE | `/videos/:id` | Delete video & assets | Yes |

### AI Processing Pipeline
| Method | Path | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/videos/:id/translate` | Start AI Translation Job | Yes |
| GET | `/videos/:id/status` | Check processing status | Yes |
| POST | `/videos/:id/export` | Export/Render final video | Yes |
| POST | `/ai/dubbing` | Manual voice synthesis | Yes |
| POST | `/ai/lipsync` | Manual lip-sync task | Yes |

### Online Video Editor
| Method | Path | Description | Auth |
| :--- | :--- | :--- | :--- |
| GET | `/editor/projects` | List editor projects | Yes |
| POST | `/editor/projects` | Create new project | Yes |
| GET | `/editor/projects/:id` | Get timeline JSON | Yes |
| PATCH | `/editor/projects/:id`| Save timeline snapshot | Yes |
| POST | `/editor/projects/:id/render` | Trigger high-quality render | Yes |

### Enterprise Automation
| Method | Path | Description | Auth |
| :--- | :--- | :--- | :--- |
| POST | `/enterprise/automation/start`| Trigger workflow | Yes |
| POST | `/enterprise/fetch` | Auto-collect Chinese videos | Yes |
| POST | `/enterprise/bulk-translate` | Bulk processing | Yes |
| GET | `/enterprise/workflows` | Monitor active automations | Yes |

---

## 6. Complex Endpoint Details

### `POST /videos/:id/translate`
Starts the multi-stage AI pipeline.

**Request Body**:
```json
{
  "sourceLanguage": "zh",
  "targetLanguage": "vi",
  "voiceStyle": "female-young",
  "lipSyncEnabled": true,
  "removeOriginalVoice": true,
  "exportQuality": "1080p"
}
```

**Workflow Logic**:
1.  **Validation**: Check user credits and video duration.
2.  **Queueing**: Adds task to `video-processing` BullMQ queue.
3.  **Orchestration**: 
    - `Stage 1`: Speech-to-Text (Chinese).
    - `Stage 2`: LLM Translation (ZH -> VI).
    - `Stage 3`: TTS Synthesis (Vietnamese).
    - `Stage 4`: Audio merging & Lip-sync.
4.  **Notification**: WebSocket event `translation_progress` sent at each stage.

---

## 7. Architecture & Scalability

### Microservices Overview
- **Gateway Service**: Routing, Auth, Rate Limiting.
- **Video Service**: Storage, Metadata, Uploads.
- **AI Orchestrator**: Manages the pipeline state machine.
- **Worker Services**: Distributed workers for GPU-heavy tasks (TTS, Lip-sync).
- **Social Service**: Integration with TikTok, YouTube APIs.

### Infrastructure
- **Message Broker**: Redis (BullMQ) for high-performance queues.
- **Realtime**: NestJS WebSocket Gateway (Socket.io).
- **Storage**: S3-compatible object storage with signed URLs.
- **Database**: PostgreSQL for transactional data, Redis for caching.

### Scaling Considerations
- **Horizontal Scaling**: Worker services scale based on queue depth.
- **GPU Pooling**: Dedicated worker pools for AI models.
- **Chunked Processing**: Large videos (3-4h) are split into segments for parallel processing.
