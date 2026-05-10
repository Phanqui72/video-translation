# Skill: Timeline Editor

## 1. Purpose
Defines the specialized UI component for managing video/audio segments over time.

## 2. Architecture Principles
- **Virtualization**: Render only the visible parts of the timeline for performance.
- **Snapping**: Implement magnetic snapping to help users align clips precisely.
- **Zooming**: Allow smooth zooming from frame-level to hour-level views.

## 3. Implementation Rules
- **Library**: Use `d3.js` or a custom canvas-based implementation for high performance.
- **Drag & Drop**: Use `dnd-kit` or native drag events for moving segments.
- **Time Units**: Store everything in milliseconds or frames for precision.

## 4. Best Practices
- **Waveform Rendering**: Generate and display audio waveforms to help with alignment.
- **Layering**: Support multiple tracks for audio (Music, SFX, Dub).
- **Tooltips**: Show exact timestamps during drag operations.

## 5. Anti-Patterns
- **Re-rendering the whole timeline on every frame**: Causing severe lag during playback.
- **Inaccurate Timestamps**: Small rounding errors that accumulate over long videos.

## 6. AI Agent Instructions
- **Optimize for performance using virtualization.**
- **Suggest snapping and zooming features.**
- **Include audio waveform visualization for dubbing tasks.**
