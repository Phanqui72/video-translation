# Skill: Frontend Architecture

## 1. Purpose
Defines the structure and standards for the web-based user interface, focusing on performance and professional UX.

## 2. Architecture Principles
- **Component-based**: Build reusable, atomic components.
- **Server-Side Rendering (SSR)**: Use Next.js for better SEO and initial load speed.
- **Unidirectional Data Flow**: Clear state management.
- **Type Safety**: Use TypeScript for all frontend code.

## 3. Folder Structure
```text
/frontend
  /components        # Reusable UI elements
  /features          # Large, domain-specific features (Editor, Auth)
  /hooks             # Custom React hooks
  /pages             # Next.js pages (App router)
  /services          # API clients (Axios/Fetch)
  /store             # State management (Zustand/Redux)
  /styles            # Global styles (Tailwind)
  /utils             # Helper functions
```

## 4. Implementation Rules
- **Styling**: Use TailwindCSS only. Avoid custom CSS files.
- **State Management**: Use `Zustand` for global state and `React Query` for server state.
- **Video Playback**: Use `Video.js` or `React-Player`.

## 5. Best Practices
- **Atomic Design**: Structure components into atoms, molecules, and organisms.
- **Lazy Loading**: Code-split large features like the Video Editor.
- **Error Boundaries**: Wrap major components to prevent full-page crashes.

## 6. Anti-Patterns
- **Prop Drilling**: Passing props through 5 layers of components.
- **Direct DOM Manipulation**: Using `document.getElementById`.
- **Large Components**: Files > 300 lines of code.

## 7. Example Implementation (Next.js Page)
```tsx
const VideoDetailPage = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useVideo(params.id);
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div className="flex flex-col gap-4">
      <VideoPlayer url={data.url} />
      <SubtitleEditor videoId={data.id} />
    </div>
  );
}
```

## 8. AI Agent Instructions
- **Follow the Atomic Design pattern.**
- **Use TypeScript for all components and hooks.**
- **Recommend React Query for data fetching.**
