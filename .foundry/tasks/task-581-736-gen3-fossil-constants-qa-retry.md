---
id: task-581-736-gen3-fossil-constants-qa-retry
type: TASK
title: QA Gen 3 Fossil Constants Retry
status: READY
owner_persona: qa
created_at: '2026-11-01'
updated_at: '2026-11-01'
depends_on:
  - task-581-735-gen3-fossil-constants-impl-retry
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

# QA Gen 3 Fossil Constants Retry

## Objective
Verify the module-level constants for Gen 3 fossil offsets, including event flags.

## Context
A coder task has retried the implementation of constants for tracking fossil states in Generation 3 games based on gen3_fossil_revival_offsets.md.

## Requirements
- Verify that the constants file src/engine/saveParser/gen3/fossil/constants.ts is updated correctly.
- Cross-reference the constants against gen3_fossil_revival_offsets.md to ensure they are mathematically correct and conform to Section 13 standards (no magic numbers, relative offsets).
- Confirm that both RSE and FRLG constants, including all event flags, are present.

## Acceptance Criteria
- [ ] Constants are mathematically correct and verified against documentation.
- [ ] Constants adhere to schema guidelines.
