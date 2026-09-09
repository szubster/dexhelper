---
id: task-551-566-qa-orchestrator-priority
type: TASK
title: QA Verification for Priority Sorting in Orchestrator
status: PENDING
owner_persona: qa
created_at: '2026-09-09'
updated_at: '2026-09-09'
depends_on:
  - task-551-565-update-orchestrator-priority-tests
jules_session_id: null
pr_number: null
parent: story-540-551-priority-engine-dispatch
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# QA Verification for Priority Sorting in Orchestrator

## Acceptance Criteria
- [ ] Verify that priority-based sorting handles undefined priorities correctly (defaulting to 50).
- [ ] Verify that the `critical_weight` is evaluated as the secondary condition when priority values are equal.
- [ ] Validate that the tests correctly assert the behavior of priority sorting.
