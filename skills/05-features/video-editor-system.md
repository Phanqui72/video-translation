# Skill: Video Editor System

## 1. Purpose
Explains the architecture of the online video editor, which allows users to tweak translations, dubbing, and subtitles.

## 2. Architecture Principles
- **Non-Destructive Editing**: The original video is never modified; we store a "recipe" (JSON) of edits.
- **Client-Side Rendering**: Use the browser's GPU for real-time previews.
- **Synchronization**: Ensure the timeline, video player, and subtitle list are always in sync.

## 3. Implementation Rules
- **Canvas/Web-GL**: For complex overlays or effects.
- **Web Workers**: Move heavy processing (like local FFmpeg tasks) off the main thread.
- **Format**: Use a standardized JSON schema for the edit timeline.

## 4. Best Practices
- **Auto-Save**: Periodically save the edit recipe to the backend.
- **Undo/Redo**: Implement a state history stack.
- **Keyboard Shortcuts**: Essential for professional video editing workflows.

## 5. Anti-Patterns
- **Uploading on Every Change**: Sending the whole video back to the server for a simple subtitle edit.
- **Main-Thread FFmpeg**: Freezing the UI while processing a local task.

## 6. Example Implementation (Timeline Logic)
```typescript
interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'subtitle';
  items: Array<{
    start: number;
    end: number;
    content: any;
  }>;
}
```

## 7. AI Agent Instructions
- **Suggest client-side preview for better UX.**
- **Maintain a centralized timeline state.**
- **Encourage the use of keyboard shortcuts.**
