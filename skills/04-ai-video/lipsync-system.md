# Skill: Lip-Sync System

## 1. Purpose
Explains the integration of AI lip-syncing (Video Retalking) to match character mouth movements with the newly generated Vietnamese audio.

## 2. Architecture Principles
- **Visual Realism**: The mouth should naturally match the phonemes of the audio.
- **Region of Interest (ROI)**: Focus processing on the face/mouth area to save GPU cycles.
- **Consistency**: Maintain the original character's identity and facial expressions.

## 3. Implementation Rules
- **Model**: Use `Video-Retalking` or `Wav2Lip`.
- **Pre-processing**: Detect faces in the video and crop them.
- **Post-processing**: Blend the generated face back into the original frame using seamless cloning.

## 4. Best Practices
- **Resolution Matching**: Match the generated face's resolution to the original video.
- **Temporal Stability**: Ensure there's no "flickering" between frames.
- **Fallback**: If lip-sync fails (e.g., face not detected), fallback to dubbing-only without lip-sync.

## 5. Anti-Patterns
- **Full-Frame Retalking**: Trying to process the entire video frame as a single image, which is extremely slow.
- **Ignoring Occlusions**: Failing to handle hands or objects passing in front of the face.

## 6. Example Implementation (Concept)
```python
def apply_lipsync(video_segment, audio_segment):
    faces = detect_faces(video_segment)
    for face in faces:
        synced_face = lipsync_model.inference(face, audio_segment)
        video_segment.replace_face(synced_face)
    return video_segment
```

## 7. AI Agent Instructions
- **Suggest lip-sync as an optional high-end feature.**
- **Always handle cases where a face is not present in the video.**
- **Recommend GPU workers for this task as it is computationally expensive.**
