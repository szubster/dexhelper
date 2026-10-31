---
id: task-649-727-priority-dispatch-coder-retry
type: TASK
title: priority orchestrator dispatch coder retry
status: PENDING
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-31'
depends_on:
  - research-649-726-investigate-priority-dispatch-failure
jules_session_id: null
pr_number: null
parent: story-531-649-priority-orchestrator-dispatch-impl
tags:
  - orchestrator
  - scheduling
  - logic
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Priority-Based Dispatch in Orchestrator Implementation

## Context
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`. This is a retry of `task-649-702-priority-dispatch-coder` based on the findings from `research-649-726-investigate-priority-dispatch-failure`.

## Acceptance Criteria
- [ ] Implement priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
