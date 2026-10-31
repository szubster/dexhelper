---
id: task-649-728-priority-dispatch-tests-coder-retry
type: TASK
title: priority orchestrator dispatch tests coder retry
status: READY
owner_persona: coder
created_at: '2026-10-25'
updated_at: '2026-10-25'
depends_on:
  - task-649-727-priority-dispatch-coder-retry
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

# Task: Priority-Based Dispatch in Orchestrator Tests

## Context
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`. This is a retry of `task-649-703-priority-dispatch-tests-coder`.

## Acceptance Criteria
- [ ] Add tests for the priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
