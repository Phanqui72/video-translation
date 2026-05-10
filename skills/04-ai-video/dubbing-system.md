# Skill: Dubbing System

## 1. Purpose
Covers the generation of synthetic voice-overs and their synchronization with the video timeline.

## 2. Architecture Principles
- **Voice Cloning**: Use base models that can be "fine-tuned" or "cloned" with 3-5 seconds of original audio.
- **Timeline Alignment**: The duration of the generated audio must match the visual segment or be adjusted via speed manipulation.
- **Multi-track Mixing**: Keep original background music/SFX while replacing the dialogue.

## 3. Implementation Rules
- **TTS Engine**: Use `GPT-SoVITS` or `MeloTTS`.
- **Audio Normalization**: Ensure all generated clips have consistent volume levels.
- **Format**: Generate in high-quality WAV or MP3 (320kbps).

## 4. Best Practices
- **Contextual Prosody**: Use LLMs to provide "emotion" or "tone" hints to the TTS engine.
- **Phonetic Corrections**: Maintain a dictionary for common mispronunciations in Vietnamese.
- **Dynamic Speed**: Automatically stretch/shrink audio duration (within ±10%) to fit the video timestamp.

## 5. Anti-Patterns
- **Robot Voice**: Using default browser TTS or low-quality voices.
- **Audio Overlap**: Failing to duck (lower volume) the background music during speech.
- **Desynchronization**: Letting the audio drift away from the visual cues.

## 6. Example Implementation (Voice Gen Logic)
```python
def generate_dub(text, reference_audio, target_duration):
    voice = clone_voice(reference_audio)
    raw_audio = tts.generate(text, voice)
    
    current_duration = get_duration(raw_audio)
    speed_factor = current_duration / target_duration
    
    final_audio = apply_speed(raw_audio, speed_factor)
    return final_audio
```

## 7. AI Agent Instructions
- **Recommend Voice Cloning for a premium user experience.**
- **Ensure audio speed is adjusted to match subtitle timestamps.**
- **Always suggest background music "ducking" for clarity.**
