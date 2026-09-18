---
id: task-569-584-setup-css-theme-variables
type: TASK
title: Setup CSS theme variables in index.css
status: ACTIVE
owner_persona: coder
created_at: '2026-09-16T18:34:46Z'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '15179318630921598367'
pr_number: null
parent: story-566-569-cva-theme-variables-setup
tags:
  - refactor
  - styling
  - frontend
  - theming
research_references:
  - .foundry/research/research-145-002-component-theming-mechanisms.md
rejection_reason: ''
locks: []
priority: 60
---

# Task: Setup CSS theme variables in index.css

## Context
As detailed in ADR 031, we are using CSS custom variables swapped at the document root for multi-theming. We need to centralize our theme colors in `src/index.css`.

## Objective
Verify and format the multi-theme colors stored as semantic tokens inside `src/index.css`.

## Implementation Details
1. Open `src/index.css`.
2. Ensure that the `@theme` directive exists and properly configures `--color-theme-primary` and `--color-theme-bg` to point to CSS variables (e.g., `var(--theme-primary)`).
3. Ensure that the `:root` and `.theme-*` classes are defined to set those custom properties.
4. The styles in `src/index.css` actually already contain most of the setup described in the research (`.theme-red`, `.theme-blue`, etc. are defined, and `:root` has `--theme-primary`).
5. But the `@theme` block does not map them to `--color-theme-primary`, which is required for tailwind classes like `bg-theme-primary`.
6. Add `--color-theme-primary: var(--theme-primary);` and `--color-theme-bg: var(--theme-bg);` to the `@theme` block in `src/index.css`.

## Acceptance Criteria
- [x] Ensure `src/index.css` has `--color-theme-primary: var(--theme-primary);` and `--color-theme-bg: var(--theme-bg);` in its `@theme` block.
- [x] Run `pnpm lint` and `pnpm test`.
