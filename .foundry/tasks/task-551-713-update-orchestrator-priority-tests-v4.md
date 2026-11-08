---
id: task-551-713-update-orchestrator-priority-tests-v4
type: TASK
title: Write Unit Tests for Orchestrator Priority Sorting v4
status: ACTIVE
owner_persona: coder
created_at: '2026-10-20'
updated_at: '2026-11-04'
depends_on:
  - research-551-712-investigate-orchestrator-priority-tests-v3-failure
jules_session_id: '4265850671649013916'
parent: story-540-551-priority-engine-dispatch
rejection_reason: ''
locks: []
rejection_count: 2
---

# Write Unit Tests for Orchestrator Priority Sorting v4

## Context
This is a replacement for `task-551-691-update-orchestrator-priority-tests-v3`, incorporating the findings from the research task `research-551-712-investigate-orchestrator-priority-tests-v3-failure`.

## Acceptance Criteria
- [ ] Add unit tests specifically validating the priority-based sorting logic in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Ensure the tests assert that a node with a higher priority (e.g., 100) is placed before a node with a lower priority (e.g., 50), even if the lower priority node has a higher `critical_weight`.
- [ ] Address any architectural constraints or root causes identified in the research node.
