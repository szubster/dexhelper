---
id: task-432-448-migrate-select
type: TASK
title: Extract tactical-select utility and refactor TacticalSelect
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '9353881917392776989'
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

# Task: Extract tactical-select utility and refactor TacticalSelect

## Objective
Extract the base styles for `TacticalSelect` into a new `@utility tactical-select` in `src/index.css` and refactor `TacticalSelect.tsx` to use it.

## Scope
1. **Target Components**:
   - `src/index.css`
   - `src/components/TacticalSelect.tsx`
2. **Implementation Process**:
   - In `src/index.css`, create a new `@utility tactical-select`.
   - The styles should be extracted from the `className` of the `select` element in `TacticalSelect.tsx`: `tactical-text focus-visible:tactical-focus w-full appearance-none rounded-none border border-zinc-800 border-dashed bg-zinc-950 px-3 py-2 pr-8 font-black text-[9px] text-zinc-500 transition-all hover:border-zinc-600 hover:bg-zinc-900 hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50`.
   - In `TacticalSelect.tsx`, replace those inline classes with the newly created `tactical-select` class.

## Acceptance Criteria
- [x] `@utility tactical-select` is defined in `src/index.css`.
- [x] `TacticalSelect.tsx` uses the `tactical-select` utility class.
- [x] No visual regressions in `TacticalSelect`.
- [x] Components pass `pnpm run lint` and `pnpm test`.
