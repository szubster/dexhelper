---
id: task-431-447-migrate-tactical-components
type: TASK
title: 'Migrate TacticalPanel, TacticalCard, TacticalBadge to Utility Classes'
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '11865806002143543364'
pr_number: null
parent: story-071-431-migrate-tactical-panel
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Migrate TacticalPanel, TacticalCard, TacticalBadge to Utility Classes

## Objective
Refactor `src/components/TacticalPanel.tsx`, `src/components/TacticalCard.tsx`, and `src/components/TacticalBadge.tsx` to utilize the new `@utility` classes defined in `src/index.css`.

## Scope and Implementation Details
1. **`TacticalPanel.tsx`**:
   - Replace the repetitive inline utility classes (e.g., `overflow-hidden rounded-none border border-dashed transition-all duration-300`) with the `tactical-panel` utility class.
   - Maintain context-specific classes like `group` and `relative`.
   - Ensure variant color overrides continue to work correctly through `cn` (tailwind-merge).

2. **`TacticalCard.tsx`**:
   - Apply the `tactical-card` class where appropriate, replacing inline equivalents (e.g., `rounded-none border border-dashed p-4 font-mono transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]`).
   - Note that `tactical-card` includes `flex flex-col` and `bg-zinc-950`. Take care to preserve layout for variants like `storage-*` that might have specific overrides (e.g., `p-5`, `hover:-translate-y-1`, `active:scale-95`).

3. **`TacticalBadge.tsx`**:
   - Replace the inline classes with the `tactical-badge` utility class.
   - Note that `tactical-badge` includes `flex flex-col`, `gap-1`, and `text-[10px]`, whereas the inline classes previously used `inline-flex`, `px-2 py-1`, and `text-[8px]`. Ensure the new styling is correctly applied and adjust specific overrides if necessary to avoid visual regression.

4. **Testing & QA**:
   - Verify visually via storybook/dev server or unit tests to ensure no regressions.
   - No separate QA task is generated for this simple styling refactor. The Coder is responsible for self-verification.

## Acceptance Criteria
- [x] `TacticalPanel` utilizes `tactical-panel` and correctly merges variant styles.
- [x] `TacticalCard` utilizes `tactical-card` and correctly merges variant styles.
- [x] `TacticalBadge` utilizes `tactical-badge` and correctly merges variant styles.
- [x] All components pass type-checking (`pnpm run type-check` if applicable), linting (`pnpm run lint`), and tests (`pnpm test`).
