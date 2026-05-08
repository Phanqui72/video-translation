# ADR: Frontend Styling Approach

## Status
Accepted (Proposed)

## Context
Defining how to style components efficiently and maintainably.

## Decision
Use **Tailwind CSS**.

## Rationale
- Utility-first approach allows for rapid prototyping.
- Excellent developer experience with IDE extensions.
- Consistent design system without writing custom CSS.
- Small bundle size due to PurgeCSS/JIT.

## Consequences
- HTML can become cluttered with many class names.
- Requires team familiarity with Tailwind utility names.
