# Skill: Video Processing

## 1. Purpose
Sets standards for video manipulation, encoding, and optimization to ensure high-quality output and efficient server usage.

## 2. Architecture Principles
- **Format Standardization**: Convert all input videos to a common format (e.g., H.264/AAC in MP4) before processing.
- **Non-Blocking IO**: Use asynchronous processes for all FFmpeg operations.
- **Resource Limiting**: Constrain CPU/GPU usage per process.
- **Metadata Preservation**: Keep track of original frame rate, resolution, and bit rate.

## 3. Folder Structure
```text
com.mgr.api.component
└── media
    ├── VideoConverter.java
    ├── FrameExtractor.java
    └── MetadataService.java
```

## 4. Implementation Rules
- **FFmpeg Integration**: Use a library like `ffmpeg-cli-wrapper` or run commands via `ProcessBuilder`.
- **Cleanup**: Always delete temporary files/frames after processing is complete.
- **Validation**: Check video integrity before starting any AI tasks.

## 5. Best Practices
- **Hardware Acceleration**: Use `h264_nvenc` (NVIDIA) or `h264_vaapi` for encoding.
- **Two-Pass Encoding**: Use for high-quality professional exports.
- **Probing**: Use `ffprobe` to gather technical details before deciding on a processing strategy.

## 6. Anti-Patterns
- **In-Memory Buffering**: Trying to read a 4GB video file into a `byte[]`.
- **Hardcoded Paths**: Using absolute local paths instead of temporary directories or object storage keys.
- **Ignoring Return Codes**: Not checking if the FFmpeg process actually succeeded.

## 7. Scalability Considerations
- **Distributed Transcoding**: Use multiple workers to process different segments of a long video simultaneously.
- **Object Storage Streaming**: Stream data directly to/from S3/MinIO instead of downloading the whole file first.

## 8. Security Considerations
- **Zip Slip / Path Traversal**: Sanitize input filenames used in FFmpeg commands.
- **Bomb Protection**: Limit the resolution and duration of videos that can be processed.

## 9. Example Implementation (FFmpeg Command)
```java
// Example: Adding subtitles to a video
String command = String.format(
    "ffmpeg -i %s -vf \"subtitles=%s\" -c:v h264_nvenc -c:a copy %s",
    inputPath, subPath, outputPath
);
ProcessBuilder pb = new ProcessBuilder("sh", "-c", command);
pb.start();
```

## 10. AI Agent Instructions
- **Prioritize GPU-accelerated encoding.**
- **Enforce strict cleanup of temporary files.**
- **Use `ffprobe` for all metadata gathering tasks.**
