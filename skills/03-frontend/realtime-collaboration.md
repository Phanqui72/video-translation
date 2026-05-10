# Skill: Real-time Collaboration

## 1. Purpose
Explains how to implement collaborative features (like shared projects) using WebSockets and CRDTs.

## 2. Architecture Principles
- **Optimistic Updates**: Show changes immediately on the local UI before server confirmation.
- **Conflict Resolution**: Use CRDTs (Conflict-free Replicated Data Types) like `Yjs` for complex shared state.
- **Presence**: Show who else is currently viewing or editing the project.

## 3. Implementation Rules
- **WebSocket Transport**: Use `Socket.io` or standard WebSockets.
- **Granular Locking**: If CRDTs are too complex, implement segment-level locking to prevent two users from editing the same subtitle line.
- **Audit Trail**: Record a history of who made what change.

## 4. Best Practices
- **Cursors**: Show real-time mouse cursors of other collaborators.
- **Throttling**: Limit the frequency of synchronization messages.
- **Batching**: Group multiple small edits into a single sync message.

## 5. Anti-Patterns
- **Last-Writer-Wins**: Simply overwriting the database without checking for concurrent changes.
- **Global Locks**: Locking the entire project when one person is editing, preventing any teamwork.

## 6. AI Agent Instructions
- **Recommend optimistic updates for a snappy feel.**
- **Suggest Yjs for collaborative text/subtitle editing.**
- **Include presence indicators in any shared workspace feature.**
