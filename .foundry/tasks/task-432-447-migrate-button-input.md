---
id: task-432-447-migrate-button-input
type: TASK
title: Refactor TacticalButton and TacticalInput to use @utility classes
status: COMPLETED
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-071-432-migrate-tactical-controls
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Refactor TacticalButton and TacticalInput to use @utility classes

## Objective
Refactor `TacticalButton.tsx` and `TacticalInput.tsx` to use the pre-defined `@utility` classes `tactical-button` and `tactical-input` from `src/index.css`.

## Scope
1. **Target Components**:
   - `src/components/TacticalButton.tsx`
   - `src/components/TacticalInput.tsx`
2. **Refactoring Process**:
   - In `TacticalButton.tsx`, replace the long string of inline Tailwind classes (e.g., `tactical-text focus-visible:tactical-focus relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-none border border-dashed font-black transition-all disabled:cursor-not-allowed disabled:opacity-50`) with `tactical-button` where appropriate, taking care to preserve the variant logic (e.g. `variant === 'default'` etc) which should still apply correctly over the base utility.
   - Note: Wait, looking at `tactical-button` in `src/index.css`, it applies `px-4 py-2 text-sm`. The `TacticalButton.tsx` component has `size` variants that also apply padding and text size (e.g., `px-5 py-3 text-[10px]`). Ensure the size variants correctly override or combine with the base `tactical-button` utility, or remove the conflicting classes from the base utility. Let's just say "Ensure size variants still apply correctly". Actually, looking at `src/index.css`, `tactical-button` is just `rounded-none border-dashed font-mono bg-[var(--theme-surface)] border border-[var(--theme-border)] text-white px-4 py-2 text-sm transition-all focus-visible:tactical-focus disabled:opacity-50 disabled:cursor-not-allowed`. It might be easiest to keep the specific variant classes in `TacticalButton.tsx` but replace the base styles with `tactical-button`.
   - In `TacticalInput.tsx`, replace inline base classes with `tactical-input`. Ensure it doesn't break the layout. `tactical-input` has `rounded-none border border-white/20 border-dashed bg-zinc-900/50 py-4 font-black font-mono text-white text-xs uppercase tracking-[0.2em] outline-none transition-all placeholder:text-zinc-400 focus-visible:tactical-focus focus:border-[var(--theme-primary)] focus:bg-zinc-900/80 disabled:opacity-50 disabled:cursor-not-allowed;`.

## Acceptance Criteria
- [x] `TacticalButton` uses the `tactical-button` utility class.
- [x] `TacticalInput` uses the `tactical-input` utility class.
- [x] Variant and sizing logic for `TacticalButton` is preserved and works correctly with the new utility class.
- [x] Components pass `pnpm run lint` and `pnpm test`.
