---
id: task-551-670-qa-orchestrator-priority-v2
type: TASK
title: QA Verification for Priority Sorting in Orchestrator v2
status: READY
owner_persona: qa
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on:
  - task-551-669-update-orchestrator-priority-tests-v2
jules_session_id: null
parent: story-540-551-priority-engine-dispatch
rejection_reason: ''
locks: []
---

# QA Verification for Priority Sorting in Orchestrator v2

## Context
This is a replacement for `task-551-566-qa-orchestrator-priority`.

## Acceptance Criteria
- [ ] Verify that priority-based sorting handles undefined priorities correctly (defaulting to 50).
- [ ] Verify that the `critical_weight` is evaluated as the secondary condition when priority values are equal.
- [ ] Validate that the tests correctly assert the behavior of priority sorting.
- [ ] Ensure any constraints identified in the research phase were adhered to.
