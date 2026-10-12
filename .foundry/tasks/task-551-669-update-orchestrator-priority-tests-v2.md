---
id: task-551-669-update-orchestrator-priority-tests-v2
type: TASK
title: Write Unit Tests for Orchestrator Priority Sorting v2
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-09'
depends_on:
  - research-551-668-investigate-orchestrator-priority-tests-failure
jules_session_id: null
parent: story-540-551-priority-engine-dispatch
rejection_reason: ''
locks: []
---

# Write Unit Tests for Orchestrator Priority Sorting v2

## Context
This is a replacement for `task-551-565-update-orchestrator-priority-tests`, incorporating the findings from the research task `research-551-668-investigate-orchestrator-priority-tests-failure`.

## Acceptance Criteria
- [ ] Add unit tests specifically validating the priority-based sorting logic in `.github/scripts/foundry-orchestrator.ts`.
- [ ] Ensure the tests assert that a node with a higher priority (e.g., 100) is placed before a node with a lower priority (e.g., 50), even if the lower priority node has a higher `critical_weight`.
- [ ] Address any architectural constraints or root causes identified in the research node.
