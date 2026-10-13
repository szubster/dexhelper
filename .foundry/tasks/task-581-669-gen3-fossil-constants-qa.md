---
id: task-581-669-gen3-fossil-constants-qa
type: TASK
title: QA Gen 3 Fossil Constants
status: PENDING
owner_persona: qa
created_at: '2026-10-08'
updated_at: '2026-10-08'
depends_on:
  - task-581-668-gen3-fossil-constants-impl
jules_session_id: null
pr_number: null
parent: story-552-581-gen3-fossil-constants
tags:
  - gen3
  - constants
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA Gen 3 Fossil Constants

## Objective
Verify the module-level constants for Gen 3 fossil offsets.

## Context
A coder task implemented constants for tracking fossil states in Generation 3 games based on `gen3_fossil_revival_offsets.md`.

## Requirements
- Verify that the new constants file `src/engine/saveParser/gen3/fossil/constants.ts` exists.
- Cross-reference the constants against `gen3_fossil_revival_offsets.md` to ensure they are mathematically correct and conform to Section 13 standards (no magic numbers, relative offsets).
- Confirm that both RSE and FRLG constants are present.

## Acceptance Criteria
- [ ] Constants are mathematically correct and verified against documentation.
- [ ] Constants adhere to schema guidelines.
