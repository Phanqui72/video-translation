# Skill: Subtitle Processing

## 1. Purpose
Covers the generation, translation, and rendering of subtitles (SRT/VTT/ASS).

## 2. Architecture Principles
- **Timing Accuracy**: Subtitles must align perfectly with the audio timestamps from STT.
- **Readability**: Follow industry standards for characters per line (CPL) and duration.
- **Multilingual Support**: Store original and translated subtitles together.

## 3. Implementation Rules
- **Format**: Use `.srt` for raw data and `.ass` for styled rendering.
- **Encoding**: Always use `UTF-8`.
- **Library**: Use `pysubs2` or `ffmpeg` subtitle filters.

## 4. Best Practices
- **Auto-Correction**: Filter out "uhm", "err" and other filler words from transcription.
- **Translation Context**: Use the surrounding lines to provide context to the LLM during translation.
- **Hardcoding vs Softcoding**: Offer users the choice between burnt-in (hard) or selectable (soft) subtitles.

## 5. Anti-Patterns
- **Direct Translation**: Translating word-for-word without considering Vietnamese grammar or cultural context.
- **Too Many Lines**: Displaying more than 2 lines at once.

## 6. Example Implementation (SRT Parsing)
```java
// Logic to convert Whisper JSON output to SRT
public String convertToSrt(List<TranscriptionSegment> segments) {
    StringBuilder srt = new StringBuilder();
    for (int i = 0; i < segments.size(); i++) {
        srt.append(i + 1).append("\n");
        srt.append(formatTime(segments.get(i).start())).append(" --> ");
        srt.append(formatTime(segments.get(i).end())).append("\n");
        srt.append(segments.get(i).text()).append("\n\n");
    }
    return srt.toString();
}
```

## 7. AI Agent Instructions
- **Enforce UTF-8 encoding.**
- **Include logic for line-splitting and timing validation.**
- **Always allow manual editing of subtitles via the online editor.**
