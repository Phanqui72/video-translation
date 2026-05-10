# Frontend Project Rules

## 1. Tech Stack & Environment
- **Framework**: Next.js 14/15 (App Router).
- **Styling**: Tailwind CSS + Shadcn/UI.
- **State**: Zustand (Global) + React Context (Local).
- **Data**: Axios + TanStack Query.
- **Tools**: Remotion (Video), FFmpeg.wasm (Client processing).

## 2. Naming Conventions (MUST follow)
- **Components**: PascalCase (e.g., `VideoEditor.tsx`).
- **Hooks**: camelCase with `use` prefix (e.g., `useVideo.ts`).
- **Files**: 
    - Components: PascalCase.
    - Hooks/Services/Utils: camelCase.
    - Assets: kebab-case.
- **Variables/Constants**: camelCase for variables, UPPER_SNAKE_CASE for constants.

## 3. Code Patterns (MUST follow)
- **Feature-based Structure**: Group logic by feature (e.g., `src/features/auth`).
- **Server Components**: Use React Server Components (RSC) by default; use `'use client'` only when necessary (interactivity).
- **Zod Validation**: Mandatory for all forms and API response parsing.
- **Query Keys**: Use a central factory for TanStack Query keys.
- **API Interaction**: 
    - Use the central Axios instance.
    - Match backend `ApiMessageDto<T>` structure.
- **Error Boundaries**: Wrap features in Error Boundaries to prevent full-page crashes.

## 4. Anti-patterns (MUST NOT do)
- **NO Inline Styles**: Use Tailwind classes or CSS modules.
- **NO Direct API calls in Components**: Use hooks or services.
- **NO Props Drilling**: Use Context or Zustand for state shared across >2 levels.
- **NO `any` types**: Use proper TypeScript interfaces/types.
- **NO Business Logic in Components**: Move logic to hooks or utils.
- **NO Hardcoded Magic Strings/Numbers**: Use constant files.

## 5. Git Workflow
- **Branch Naming**:
    - `feature/ui-name`
    - `fix/issue-name`
    - `chore/refactor-name`
- **Commits**: Follow conventional commits (e.g., `feat: implement video timeline`).

---

## 6. UX & Aesthetics (Quality Standards)

Để đạt điểm tối đa về Giao diện & Trải nghiệm (UI/UX), tất cả các thành phần phải tuân thủ:

- **Aesthetics (Thẩm mỹ)**: 
    - Sử dụng hệ màu Harmonious (phối màu hài hòa), hỗ trợ Dark Mode.
    - Typography sử dụng Inter hoặc Roboto (Sans-serif hiện đại).
- **Responsive (Tương thích)**:
    - Thiết kế theo hướng Mobile-First. 
    - Kiểm tra hiển thị trên ít nhất 3 kích thước màn hình (375px, 1024px, 1440px).
- **Feedback (Phản hồi)**:
    - Luôn có trạng thái **Loading** (Skeleton hoặc Spinner) cho các tác vụ bất đồng bộ.
    - Sử dụng **Toast notifications** cho các thông báo Thành công/Thất bại.
    - **Micro-animations**: Sử dụng Framer Motion cho các hiệu ứng Hover, Transition giữa các trang và Modal.
- **Simplification (Tối giản)**:
    - Luồng người dùng (User flow) không quá 3 bước để đạt được mục tiêu chính (ví dụ: Upload -> Dịch -> Xuất).
- **Accessibility (Tiếp cận)**:
    - Đảm bảo độ tương phản màu sắc và hỗ trợ điều hướng bằng bàn phím.

## 7. Testing (Future)
- **Component Testing**: Use Vitest + React Testing Library.
- **E2E Testing**: Use Playwright for critical user journeys (Login, Export Video).
