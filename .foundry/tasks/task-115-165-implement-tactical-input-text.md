---
id: task-115-165-implement-tactical-input-text
type: TASK
title: Implement tactical-input and tactical-text utilities
status: PENDING
owner_persona: coder
created_at: '2026-06-11'
updated_at: '2026-06-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-074-115-define-tactical-input-and-text
tags:
  - styling
  - tailwind
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Implement tactical-input and tactical-text utilities

## Objective
Implement `@utility tactical-input` and `@utility tactical-text` in `src/index.css` using Tailwind v4 syntax, and apply them across the codebase to consolidate repetitive styling patterns for inputs and text.

## Context
As per ADR 024, we are enforcing a strict "tactical hardware" aesthetic characterized by sharp edges (`rounded-none`), dashed borders (`border-dashed`), and monospaced telemetry fonts (`font-mono`). Currently, these styles are achieved by repeating long strings of inline classes. We need to define custom utilities in `src/index.css` to centralize this styling logic.

## Instructions for Coder

1. **Define Utilities**:
   - Open `src/index.css`.
   - Add `@utility tactical-input` to encapsulate the repetitive input styling patterns (e.g., `rounded-none border border-dashed bg-zinc-900/50 font-mono focus:border-[var(--theme-primary)] focus:bg-zinc-900/80 outline-none`).
   - Add `@utility tactical-text` to encapsulate common tactical text patterns (e.g., `font-mono uppercase tracking-widest`). Note: It might be helpful to have variations for text sizes or colors, or keep the utility strictly for the font-family, transform, and tracking base.
   - Ensure you follow the Tailwind v4 `@utility` directive structure correctly.

2. **Apply to Components**:
   - Search the codebase (specifically `src/components/`) for the repetitive patterns you just encapsulated.
   - Replace the long inline class strings with your new `tactical-input` and `tactical-text` utilities.
   - Key areas to check: `TacticalInput.tsx`, `AppHeader.tsx`, `StorageGrid.tsx`, `PokedexGrid.tsx`, `SearchAndFilters.tsx`.
   - Ensure hover and focus states are correctly inherited.
   - *CRITICAL*: Ensure no visual regressions occur. The "tactical hardware" aesthetic must remain perfectly intact. Ensure explicit integration steps/tests for rendering are maintained if needed.

3. **Important Constraints**:
   - DO NOT modify the YAML frontmatter of this task node except to mark it as `FAILED` or `CANCELLED` with a `rejection_reason` if you cannot complete it.
   - If you submit an Empty PR because the target artifacts are already completely implemented, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) below before submitting, as per ADR 007 and ADR 009.

## Acceptance Criteria
- [ ] `@utility tactical-input` is defined in `src/index.css` using Tailwind v4 syntax.
- [ ] `@utility tactical-text` is defined in `src/index.css` using Tailwind v4 syntax.
- [ ] Repetitive inline classes in `src/components/` (especially inputs and text blocks) have been replaced with the new utilities.
- [ ] No visual regressions are introduced; the tactical aesthetic remains unchanged.
