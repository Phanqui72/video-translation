# Skill: FFmpeg Workflows

## 1. Purpose
Provides a library of optimized FFmpeg commands and strategies for specific project tasks like audio extraction, subtitling, and rendering.

## 2. Architecture Principles
- **Modular Commands**: Create small, reusable command fragments.
- **Pipe-based Processing**: Use pipes `|` to avoid writing intermediate files to disk when possible.
- **Logging Integration**: Capture FFmpeg's `stderr` for debugging and progress tracking.

## 3. Implementation Rules
- **Codec Selection**: 
    - Video: `libx264` (CPU) or `h264_nvenc` (GPU).
    - Audio: `aac` or `libmp3lame`.
- **Scaling**: Use `-vf scale=-1:720` for consistent output resolution.
- **Audio Extraction**: Use `-vn -acodec pcm_s16le -ar 16000` for Whisper-compatible audio.

## 4. Best Practices
- **Overlaying Subtitles**: Use the `subtitles` filter for hardcoding.
- **Concatenation**: Use the `concat` demuxer for joining video chunks.
- **Faststart**: Use `-movflags +faststart` for web-optimized MP4s.

## 5. Anti-Patterns
- **Re-encoding when unnecessary**: Using `-c:v libx264` when `-c:v copy` would suffice.
- **Low Bitrate**: Setting bitrates too low, causing compression artifacts.

## 6. Example Workflows
- **Extract Audio for STT**: `ffmpeg -i video.mp4 -vn -ac 1 -ar 16000 -acodec pcm_s16le audio.wav`
- **Lip-Sync Masking**: `ffmpeg -i original.mp4 -i generated_face.mp4 -filter_complex "[0:v][1:v]overlay=x=10:y=10" output.mp4`
- **Adding Audio to Video**: `ffmpeg -i video_no_audio.mp4 -i dubbed_audio.mp3 -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4`

## 7. AI Agent Instructions
- **Consult this guide for any FFmpeg command generation.**
- **Always prefer `nvenc` for server-side rendering if a GPU is available.**
- **Use `ffprobe` to validate output files.**
