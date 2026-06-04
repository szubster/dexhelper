---
id: task-086-146-impl-implicit-dependency-check
type: TASK
title: Update implicit dependency check to include CANCELLED
status: READY
owner_persona: coder
created_at: '2026-06-01'
updated_at: '2026-06-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-048-086-implement-implicit-dependency-check
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Update implicit dependency check to include CANCELLED

Modify `isHierarchicallyIncomplete` or node resolution logic in `.github/scripts/foundry-orchestrator.ts` to return `true` if the node's status is neither `COMPLETED` nor `CANCELLED`. Ensure that a parent node isn't ready if its descendant tree has any nodes not in the COMPLETED or CANCELLED state.

If you abort or permanently fail a task, you MUST update the YAML frontmatter to `status: FAILED` or `status: CANCELLED` with a `rejection_reason`.
If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Update `isHierarchicallyIncomplete` or node resolution logic in `foundry-orchestrator.ts` to ensure that a parent node isn't ready if its descendant tree has any nodes not in the COMPLETED or CANCELLED state.
- [ ] Update `isHierarchicallyIncomplete` to accept `CANCELLED` state as complete.
- [ ] Add unit tests in `foundry-orchestrator.test.ts` to verify that `CANCELLED` nodes satisfy hierarchical completeness, and that descendant trees are properly checked.
