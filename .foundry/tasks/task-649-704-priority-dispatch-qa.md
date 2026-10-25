---
id: task-649-704-priority-dispatch-qa
type: TASK
title: priority orchestrator dispatch qa
status: CANCELLED
owner_persona: qa
created_at: '2026-10-18'
updated_at: '2026-10-25'
depends_on:
  - task-649-702-priority-dispatch-coder
  - task-649-703-priority-dispatch-tests-coder
jules_session_id: null
pr_number: null
parent: story-531-649-priority-orchestrator-dispatch-impl
tags:
  - orchestrator
  - scheduling
  - logic
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  task-649-702-priority-dispatch-coder
notes: ''
locks: []
---

# Task: Priority-Based Dispatch in Orchestrator Implementation QA

## Context
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`.

## Acceptance Criteria
- [ ] Verify priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
- [ ] Verify tests for the new logic.
