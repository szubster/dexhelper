---
id: task-497-513-test-tpm-epic-detection
type: TASK
title: Unit Test TPM EPIC Detection Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on:
  - task-497-511-implement-tpm-epic-detection
jules_session_id: '17991724655564046634'
pr_number: null
parent: story-406-497-tpm-epic-detection-logic
tags:
  - script
  - typescript
  - tpm
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Unit Test TPM EPIC Detection Logic

## Context
The logic for detecting `COMPLETED` EPIC nodes is implemented in `task-497-511-implement-tpm-epic-detection`. This task is responsible for writing unit tests to cover that implementation.

## Objective
Write comprehensive unit tests for the TPM EPIC detection utility function.

## Requirements
- Create a test file (e.g., `tpm-distillation.test.ts`) corresponding to the script modified in `task-497-511-implement-tpm-epic-detection`.
- The tests must verify that the logic correctly identifies `COMPLETED` EPICs in the `.foundry/epics/` directory.
- The tests must verify negative cases: ignoring nodes that are not `type: EPIC`, and ignoring EPICs that are not `status: COMPLETED`.

## Acceptance Criteria
- [x] Implement unit tests covering positive and negative cases for the detection logic.
