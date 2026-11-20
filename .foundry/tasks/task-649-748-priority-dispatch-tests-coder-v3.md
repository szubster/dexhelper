---
id: task-649-748-priority-dispatch-tests-coder-v3
type: TASK
title: priority orchestrator dispatch tests coder v3
status: READY
owner_persona: coder
created_at: '2026-11-09'
updated_at: '2026-11-09'
depends_on:
  - research-649-747-investigate-priority-dispatch-tests-failure
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
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`. This is the third iteration of the tests implementation task.

## Acceptance Criteria
- [ ] Add tests for the priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
