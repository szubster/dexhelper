---
id: story-071-432-migrate-tactical-controls
type: STORY
title: 'Migrate TacticalButton, TacticalInput, TacticalSelect to Utility Classes'
status: READY
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-071-124-migrate-core-tactical-components-v2
tags:
  - styling
  - refactor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Migrate TacticalButton, TacticalInput, TacticalSelect to Utility Classes

## Objective
Refactor `TacticalButton.tsx`, `TacticalInput.tsx`, and `TacticalSelect.tsx` to utilize the new `@utility` classes (e.g., `tactical-button`, `tactical-input`) defined in `src/index.css`.

## Scope
1. **Target Components**:
   - `src/components/TacticalButton.tsx`
   - `src/components/TacticalInput.tsx`
   - `src/components/TacticalSelect.tsx`
2. **Refactoring Process**: Replace long strings of repetitive inline Tailwind classes with their equivalent semantic `tactical-*` classes. Ensure variants still properly apply.
3. **No Visual Regressions**: Ensure that the migration accurately preserves the pre-existing visual appearance.

## Acceptance Criteria
- [ ] `TacticalButton`, `TacticalInput`, and `TacticalSelect` use the new utility classes instead of inline classes where applicable.
- [ ] No visual regressions in the affected components.
- [ ] Components pass `pnpm run lint` and `pnpm test`.

- [ ] task-432-447-migrate-button-input
- [ ] task-432-448-migrate-select
- [ ] task-432-449-qa-controls
