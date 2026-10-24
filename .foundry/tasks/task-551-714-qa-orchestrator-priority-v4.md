---
id: task-551-714-qa-orchestrator-priority-v4
type: TASK
title: QA Verification for Priority Sorting in Orchestrator v4
status: READY
owner_persona: qa
created_at: '2026-10-20'
updated_at: '2026-10-20'
rejection_reason: ""
depends_on:
  - task-551-713-update-orchestrator-priority-tests-v4
jules_session_id: null
parent: story-540-551-priority-engine-dispatch
locks: []
---

# QA Verification for Priority Sorting in Orchestrator v4

## Context
This is a replacement for `task-551-692-qa-orchestrator-priority-v3`.

## Acceptance Criteria
- [ ] Verify that priority-based sorting handles undefined priorities correctly (defaulting to 50).
- [ ] Verify that the `critical_weight` is evaluated as the secondary condition when priority values are equal.
- [ ] Validate that the tests correctly assert the behavior of priority sorting.
- [ ] Ensure any constraints identified in the research phase were adhered to.
