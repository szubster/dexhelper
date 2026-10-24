---
id: task-564-611-verify-heartbeat-violation-detection-coder
type: TASK
title: Verify Heartbeat Violation Detection Coder
status: COMPLETED
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-563-564-verify-heartbeat-violation-detection
tags:
  - integration
  - e2e
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# TASK: Verify Heartbeat Violation Detection Coder

## Objective
Examine the heartbeat test suite at `.github/scripts/foundry-heartbeat.test.ts` to confirm there is a test asserting that if a session goes into `AWAITING_USER_FEEDBACK`, the heartbeat script transitions the task to `FAILED`. If the test exists and works, simply verify its correctness.

## Acceptance Criteria
- [x] The tests pass successfully and verify the No-Ask policy correctly.
