---
id: task-581-735-gen3-fossil-constants-impl-retry
type: TASK
title: Implement Gen 3 Fossil Constants Retry
status: READY
owner_persona: coder
created_at: '2026-11-01'
updated_at: '2026-11-01'
depends_on:
  - research-581-732-gen3-fossil-flag-offsets
jules_session_id: null
pr_number: null
parent: story-552-581-gen3-fossil-constants
tags:
  - gen3
  - constants
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Implement Gen 3 Fossil Constants Retry

## Objective
Implement module-level constants for Gen 3 fossil offsets as determined by the previous research.

## Context
A previous task (task-581-668-gen3-fossil-constants-impl) reached its maximum rejection count because it omitted constants for the event flags. This task acts as a replacement, depending on new research to clarify the missing event flags.

## Requirements
- Update src/engine/saveParser/gen3/fossil/constants.ts
- Ensure all event flags and variables defined in gen3_fossil_revival_offsets.md are implemented according to Section 13 standards (no magic numbers, relative offsets).
- Refer to research-581-732-gen3-fossil-flag-offsets for missing event flag offsets.

## Acceptance Criteria
- [ ] Constants are defined and accurately match gen3_fossil_revival_offsets.md.
- [ ] Constants for event flags are properly added and conform to the project schema.
- [ ] Code passes all lint checks (pnpm lint).
