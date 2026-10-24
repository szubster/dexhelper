---
id: task-649-703-priority-dispatch-tests-coder
type: TASK
title: priority orchestrator dispatch tests coder
status: PENDING
owner_persona: coder
created_at: '2026-10-18'
updated_at: '2026-10-24'
depends_on:
  - task-649-702-priority-dispatch-coder
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
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`.

## Acceptance Criteria
- [ ] Add tests for the priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
