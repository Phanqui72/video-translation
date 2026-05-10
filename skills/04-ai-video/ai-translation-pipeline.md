# Skill: AI Translation Pipeline

## 1. Purpose
Defines the orchestration of AI models for translating video content, ensuring a seamless flow from audio extraction to final dubbing.

## 2. Architecture Principles
- **Pipeline Segregation**: Break down the process into discrete, retriable steps:
    1. Audio Extraction
    2. Transcription (STT)
    3. Translation (LL)
    4. Dubbing (TTS)
    5. Lip-Sync
    6. Mixing & Rendering
- **Stateless Workers**: Workers pick up tasks from a queue and report progress to a central database/cache.
- **Resumability**: If a pipeline fails at step 4, it should be able to restart from step 4 without re-running 1-3.

## 3. Folder Structure (AI Worker)
```text
/ai-worker
  /tasks
    ├── stt_task.py
    ├── translation_task.py
    └── tts_task.py
  /models
    ├── whisper_model.py
    └── llama_model.py
  main.py
```

## 4. Implementation Rules
- **Timeout Management**: Each pipeline stage must have a maximum execution time.
- **Worker Concurrency**: Limit the number of concurrent heavy AI tasks (e.g., STT/TTS) per worker based on VRAM.
- **Quality Checks**: Implement automated checks between stages (e.g., ensure translated text length matches original audio duration).

## 5. Best Practices
- **Chunking**: For long videos (3-4 hours), split the audio into 5-10 minute chunks for parallel processing.
- **Model Warmup**: Pre-load models into GPU memory on worker startup.
- **Parameter Optimization**: Tune Whisper/TTS parameters for the specific language pair (CN -> VN).

## 6. Anti-Patterns
- **Monolithic Scripts**: One script that does everything from upload to render in a single loop.
- **GPU Oversubscription**: Trying to run too many models on a single GPU simultaneously.
- **Ignoring Alignment**: Failing to synchronize subtitles and audio timing precisely.

## 7. Scalability Considerations
- **GPU Partitioning**: Use multi-instance GPU (MIG) or multiple GPU workers.
- **Cold Storage**: Move intermediate files (uncompressed audio/chunks) to object storage to save local disk space.

## 8. Security Considerations
- **Data Privacy**: Ensure user videos are processed in a secure environment and deleted after rendering.
- **API Security**: Secure the communication between the Java backend and Python workers.

## 9. Example Implementation (Pipeline Orchestrator)
```python
def run_pipeline(video_id):
    steps = [extract_audio, transcribe, translate, dub, lip_sync, render]
    for step in steps:
        if not step.is_completed(video_id):
            step.execute(video_id)
            update_progress(video_id, step.name)
```

## 10. AI Agent Instructions
- **Design pipelines to be modular and fault-tolerant.**
- **Use queues to pass data between stages.**
- **Always include detailed logging for each stage of the AI pipeline.**
