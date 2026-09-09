---
id: task-551-565-update-orchestrator-priority-tests
type: TASK
title: Write Unit Tests for Orchestrator Priority Sorting
status: READY
owner_persona: coder
created_at: "2026-09-09"
updated_at: "2026-09-09"
depends_on:
  - task-551-564-update-orchestrator-priority-logic
jules_session_id: null
locks: []
pr_number: null
parent: story-540-551-priority-engine-dispatch
priority: 50
tags: []
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Write Unit Tests for Orchestrator Priority Sorting

## Acceptance Criteria
- [ ] Add unit tests specifically validating the priority-based sorting logic.
- [ ] Ensure the tests assert that a node with a higher priority (e.g., 100) is placed before a node with a lower priority (e.g., 50), even if the lower priority node has a higher `critical_weight`.
