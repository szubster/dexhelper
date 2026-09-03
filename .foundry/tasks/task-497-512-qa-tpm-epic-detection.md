---
id: task-497-512-qa-tpm-epic-detection
type: TASK
title: QA TPM EPIC Detection Logic
status: ACTIVE
owner_persona: qa
created_at: '2026-09-01'
updated_at: '2026-09-03'
depends_on:
  - task-497-513-test-tpm-epic-detection
jules_session_id: '2904338605215007079'
pr_number: null
parent: story-406-497-tpm-epic-detection-logic
tags:
  - script
  - typescript
  - tpm
  - qa
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# QA TPM EPIC Detection Logic

## Objective
Verify the implementation of the TPM EPIC detection logic and ensure all unit tests pass and provide adequate coverage.

## Requirements
- Verify that a function or utility was created to accurately detect `COMPLETED` EPIC nodes.
- Run the unit tests added by the coder and confirm they pass successfully.
- Ensure the unit tests cover edge cases (e.g. non-completed epics, nodes that are not epics).
- Ensure code follows Foundry conventions and doesn't introduce regressions.

## Acceptance Criteria
- [x] Verify the implementation of the detection function.
- [x] Run and verify unit tests for the detection logic.
