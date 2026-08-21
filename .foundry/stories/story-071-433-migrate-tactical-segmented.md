---
id: story-071-433-migrate-tactical-segmented
type: STORY
title: Migrate TacticalSegmentedControl and TacticalMultiSelectControl
status: PENDING
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

# Story: Migrate TacticalSegmentedControl and TacticalMultiSelectControl

## Objective
Refactor `TacticalSegmentedControl.tsx` and `TacticalMultiSelectControl.tsx` to utilize the new `@utility` classes defined in `src/index.css`.

## Scope
1. **Target Components**:
   - `src/components/TacticalSegmentedControl.tsx`
   - `src/components/TacticalMultiSelectControl.tsx`
2. **Refactoring Process**: Replace long strings of repetitive inline Tailwind classes with their equivalent semantic `tactical-*` classes. Ensure that the active and inactive states still function correctly.
3. **No Visual Regressions**: Ensure that the migration accurately preserves the pre-existing visual appearance.

## Acceptance Criteria
- [ ] `TacticalSegmentedControl` and `TacticalMultiSelectControl` use the new utility classes instead of inline classes where applicable.
- [ ] No visual regressions in the affected components.
- [ ] Components pass `pnpm run lint` and `pnpm test`.
- [ ] task-433-447-migrate-segmented-controls-impl
