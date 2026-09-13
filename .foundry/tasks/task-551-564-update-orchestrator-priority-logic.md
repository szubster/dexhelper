---
id: task-551-564-update-orchestrator-priority-logic
type: TASK
title: Update Orchestrator Dispatch Logic with Priority Sorting
status: COMPLETED
owner_persona: coder
created_at: '2026-09-09'
updated_at: '2026-09-10'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-540-551-priority-engine-dispatch
priority: 50
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update Orchestrator Dispatch Logic with Priority Sorting

## Acceptance Criteria
- [x] Implement priority-based sorting in `.github/scripts/foundry-orchestrator.ts`.
- [x] Update the sorting logic for `readyNodes` to evaluate `a.priority ?? 50` versus `b.priority ?? 50` as the first sorting condition, ordering higher priorities first (descending).
- [x] Verify that the `critical_weight` check remains as the secondary sorting condition if `priority` values are equal.
