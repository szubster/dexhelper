---
id: task-153-254-orchestrator-max-rejection-cancellation-impl
type: TASK
title: Implement Max Rejection Cancellation
status: READY
owner_persona: coder
created_at: '2026-07-01'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-096-153-max-rejection-cancellation
tags:
  - foundry
  - orchestrator
  - resilience
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Max Rejection Cancellation

## Reminders for Coder
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Ensure `foundry-orchestrator.ts` has logic to change a node's status to `CANCELLED` if its status is `FAILED` and its `rejection_count >= MAX_REJECTION_THRESHOLD`.
