# Tailwind v4 `@utility` Consolidation Strategy

## Objective
This document outlines the strategy for consolidating repetitive UI classes using the native `@utility` directive in Tailwind CSS v4.

## Findings: The `@utility` API in Tailwind v4

Based on research and terminal testing with `tailwindcss v4.3.0`, the `@utility` directive offers a powerful way to define custom utilities.

1.  **Basic Syntax**: Custom utilities are defined using `@utility utility-name { ... }`.
2.  **Native Variant Support**: The most significant advantage of `@utility` over `@layer components` is that utilities defined this way **automatically inherit all variants** (like `hover:`, `md:`, `focus:`, `group-hover:`, etc.). You do not need to wrap them in responsive or hover media queries manually.
    *   Example: Defining `@utility tactical-panel { ... }` automatically generates `.tactical-panel`, `.hover\:tactical-panel`, `.md\:tactical-panel`, etc., when those variants are used in the HTML.
3.  **Nesting and `@apply`**: `@apply` works perfectly inside `@utility` blocks. Tailwind v4 correctly maps applied classes (e.g., `hover:bg-blue-600` inside `@apply`) into properly nested css rules (e.g., `@media (hover: hover) { &:hover { ... } }`).
    *   This makes it trivial to compose complex utilities from existing utility classes while retaining all variant support.

## Edge Cases and Pitfalls

1.  **Over-scoping with Nested Selectors**: When using nested selectors inside `@utility` (e.g., `& .child { ... }`), be aware that variants applied to the utility will affect the entire nested block. This is generally expected but can sometimes lead to overly broad target matching if not careful.
2.  **Specificity**: Utilities defined with `@utility` share the same specificity as standard Tailwind utilities. This is generally better than `@layer components` because it integrates more naturally with the rest of the utility-first ecosystem.
3.  **Deprecation of `@layer components`**: It's highly recommended to migrate away from `@layer components` for simple component classes, as `@utility` provides a more robust and "Tailwind-native" way to handle custom abstractions with full variant support.

## Proposed Structure for `src/index.css`

To consolidate repetitive UI classes, we should introduce a dedicated section in `src/index.css` for `@utility` definitions. This keeps the configuration clean and grouped.

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* ... existing theme variables ... */
}

:root {
  /* ... existing CSS variables ... */
}

/* ... existing body styles and retro effects ... */

/* =========================================
   Tactical Primitives (@utility definitions)
   ========================================= */

@utility tactical-panel {
  @apply border border-dashed rounded-none border-zinc-800 bg-zinc-900/50 flex items-center justify-between text-zinc-100 font-mono text-sm transition-colors duration-200;

  /* Example of adding nested hover state explicitly within the utility */
  &:hover {
    @apply bg-zinc-800 border-zinc-500;
  }
}

@utility tactical-button {
  /* Define tactical button base styles here using @apply or native CSS */
  @apply bg-theme-surface border border-theme-border text-white px-4 py-2 font-mono text-sm transition-all;

  &:hover {
    @apply bg-[rgba(var(--theme-primary-rgb),0.2)] border-theme-primary text-theme-primary;
  }

  &:active {
    @apply scale-95;
  }
}

/* Add other tactical primitives here as needed */
```

### Next Steps for Implementation
When implementing these primitives across the codebase, replace inline classes like `border border-dashed rounded-none border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-500 transition-colors duration-200 p-4 flex items-center justify-between text-zinc-100 font-mono text-sm` with the much simpler `tactical-panel p-4`.
Note that spacing modifiers like `p-4` are deliberately left out of the base utility when they vary between instances, allowing the utility to remain flexible.
