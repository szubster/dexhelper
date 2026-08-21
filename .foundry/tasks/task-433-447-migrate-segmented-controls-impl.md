---
id: task-433-447-migrate-segmented-controls-impl
type: TASK
title: Implement Migration for Segmented Controls
status: ACTIVE
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: '14978398235368870773'
pr_number: null
parent: story-071-433-migrate-tactical-segmented
tags:
  - styling
  - refactor
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Task: Implement Migration for Segmented Controls

## Context
As part of the initiative to utilize the new `@utility` classes defined in `src/index.css`, we need to refactor `TacticalSegmentedControl.tsx` and `TacticalMultiSelectControl.tsx`.

## Objective
Replace long strings of repetitive inline Tailwind classes with their equivalent semantic `tactical-*` classes in the target components. Ensure that the active and inactive states continue to function correctly and without visual regressions.

## Scope
Modify the following components:
- `src/components/TacticalSegmentedControl.tsx`
- `src/components/TacticalMultiSelectControl.tsx`

## Details
- Examine the class names in the `.tsx` files and correlate them with the defined tactical utility classes in `src/index.css`.
- Pay specific attention to standard styling properties like borders, backgrounds, padding, typography, and states (focus, disabled, active).
- You can find the relevant `tactical-*` definitions at the bottom of `src/index.css`.
- Specifically check for the usage of `tactical-button`, `tactical-badge`, or creating specialized combinations if necessary, though it should largely map well to existing `tactical-*` classes. It seems that the existing inline classes should map nicely to the new standard tactical utilities.

## Acceptance Criteria
- [ ] `TacticalSegmentedControl` is updated to use new `@utility` classes.
- [ ] `TacticalMultiSelectControl` is updated to use new `@utility` classes.
- [ ] Active and inactive styles work as expected.
- [ ] Tests and lints pass (`pnpm run lint` and `pnpm test`).
