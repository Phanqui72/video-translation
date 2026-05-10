# Skill: Video Rendering

## 1. Purpose
Manages the final step of merging video, audio, and subtitles into a finished product.

## 2. Architecture Principles
- **Worker Allocation**: Route rendering tasks to nodes with appropriate GPU resources.
- **Segmented Rendering**: For large videos, render segments in parallel and concatenate them.
- **Export Presets**: Support multiple quality levels (360p, 720p, 1080p, 4K).

## 3. Implementation Rules
- **Primary Engine**: `FFmpeg` for high-performance backend rendering.
- **Frontend Engine**: `Remotion` for dynamic, template-based rendering (especially for marketing/shorts).
- **Status Reporting**: Update the `Project` status to `COMPLETED` only after the final file is verified on storage.

## 4. Best Practices
- **Thumbnail Generation**: Automatically generate a poster image during the render.
- **Progressive Upload**: If possible, upload the rendered chunks to storage immediately.
- **Watermarking**: Add a watermark for free-tier users.

## 5. Anti-Patterns
- **Blocking the Main API**: Rendering video on the same server that handles user requests.
- **Infinite Retries**: Retrying a failed render 100 times without checking the error logs.

## 6. Example Implementation (Remotion Lambda)
```javascript
// Remotion render script snippet
import { renderMedia, selectComposition } from "@remotion/lambda";

await renderMedia({
  compositionId: "Main",
  serveUrl: "https://my-bucket.s3.amazonaws.com/bundle.tar.gz",
  codec: "h264",
  inputProps: { videoUrl, translatedAudioUrl, subtitleUrl },
});
```

## 7. AI Agent Instructions
- **Separate rendering logic from business logic.**
- **Provide a way to cancel a running render task.**
- **Support multiple output formats.**
