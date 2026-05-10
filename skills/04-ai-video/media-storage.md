# Skill: Media Storage

## 1. Purpose
Standardizes how large video and audio files are stored, retrieved, and managed across the system.

## 2. Architecture Principles
- **Object Storage**: Use S3-compatible storage (MinIO for self-hosted, S3/R2 for cloud).
- **Unique Keys**: Use UUIDs or hashes for storage keys to avoid collisions.
- **Lifecycle Management**: Automatically move old temporary files to cold storage or delete them.
- **CDN Integration**: Use a CDN for delivering the final processed videos to users.

## 3. Folder Structure (Object Storage)
```text
/uploads
  /original-videos
  /temp-audio
/processed
  /dubbed-videos
  /subtitles
/users
  /avatars
```

## 4. Implementation Rules
- **Signed URLs**: Never expose direct public links to raw video files. Use time-limited signed URLs.
- **Multipart Upload**: Use for any file > 100MB.
- **Streaming**: Backend should support range requests for video playback.

## 5. Best Practices
- **Compression**: Compress intermediate audio files (e.g., use MP3 instead of WAV) if quality loss is acceptable.
- **Checksums**: Verify file integrity after upload using MD5/SHA256.
- **Versioning**: If a user re-renders a video, keep the old version for a short period.

## 6. Anti-Patterns
- **Local Disk Storage**: Storing production files on the worker's local SSD without backing them up to S3.
- **Public Buckets**: Making the entire storage bucket public.
- **Sync Uploads**: Waiting for a 1GB upload to complete in an HTTP request.

## 7. Example Implementation (S3 Client)
```java
@Component
public class S3Service {
    public String uploadFile(String bucket, String key, File file) {
        s3Client.putObject(PutObjectRequest.builder().bucket(bucket).key(key).build(), 
                           RequestBody.fromFile(file));
        return s3Client.utilities().getUrl(b -> b.bucket(bucket).key(key)).toString();
    }
}
```

## 8. AI Agent Instructions
- **Always use the S3Service/MinIOService abstraction.**
- **Suggest Signed URLs for all file access.**
- **Implement chunked uploads for large videos.**
