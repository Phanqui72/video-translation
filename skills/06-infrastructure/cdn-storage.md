# Skill: CDN & Storage

## 1. Purpose
Explains how to efficiently deliver large media files to users across the globe.

## 2. Architecture Principles
- **Edge Caching**: Cache processed videos as close to the user as possible.
- **Origin Shield**: Use a CDN to protect the origin storage from excessive traffic.
- **Private Content**: Use signed URLs or cookies to restrict access to user-specific videos.

## 3. Implementation Rules
- **Cache Control**: Set appropriate `Expires` and `Cache-Control` headers.
- **Purging**: Implement a mechanism to purge CDN cache when a video is updated.
- **Fallback**: Always have a direct-to-origin fallback in case of CDN issues.

## 4. Best Practices
- **Adaptive Bitrate Streaming (ABR)**: Use HLS or DASH for delivering video in various qualities based on user bandwidth.
- **Compression**: Use Gzip or Brotli for text-based assets (subtitles, JS, CSS).

## 5. Anti-Patterns
- **Direct Link Sharing**: Allowing users to link directly to the S3 bucket.
- **No Caching**: Setting `no-cache` on static media files.

## 6. Example Implementation (HLS Workflow)
1. Original MP4 uploaded to S3.
2. Worker converts MP4 to HLS (m3u8 + segments).
3. CDN serves m3u8 playlist and segments.

## 7. AI Agent Instructions
- **Recommend HLS for video delivery.**
- **Include Cache-Control headers in all media-serving logic.**
- **Suggest CDN integration for global low-latency.**
