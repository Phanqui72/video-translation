# Skill: File Upload System

## 1. Purpose
Defines the standards for handling large file uploads, particularly videos, to ensure reliability and performance.

## 2. Architecture Principles
- **Asynchronous Upload**: Don't block the main thread; use multipart or chunked uploads.
- **Direct-to-S3**: Ideally, upload from the client directly to S3 using pre-signed URLs to save server bandwidth.
- **Validation**: Check file type, size, and magic bytes before accepting the upload.

## 3. Folder Structure
```text
com.mgr.api.component.upload
├── UploadService.java
├── ChunkedUploadManager.java
└── S3UploadService.java
```

## 4. Implementation Rules
- **Multipart Config**: Configure max file size and request size in `application.yml`.
- **Temporary Storage**: Use a dedicated scratch directory for assembling chunks.
- **Cleanup**: Automatically delete temporary files if an upload is cancelled or fails.

## 5. Best Practices
- **Resumeable Uploads**: Support TUS or similar protocols for large files.
- **Parallel Processing**: Start processing (e.g., metadata extraction) as soon as the file is available on storage.
- **Visual Feedback**: Provide real-time upload progress to the user.

## 6. Anti-Patterns
- **In-Memory Uploads**: Reading the entire file into RAM.
- **Sync DB Updates**: Updating the database inside the upload stream.

## 7. Example Implementation (Spring Multipart)
```java
@PostMapping("/upload")
public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file) {
    if (file.isEmpty()) return ResponseEntity.badRequest().build();
    String key = s3Service.upload(file);
    return ResponseEntity.ok(new UploadResponse(key));
}
```

## 8. AI Agent Instructions
- **Recommend chunked uploads for files > 500MB.**
- **Always include file type validation.**
- **Suggest pre-signed URLs for client-side uploads.**
