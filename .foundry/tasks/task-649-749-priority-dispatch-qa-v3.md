---
id: task-649-749-priority-dispatch-qa-v3
type: TASK
title: priority orchestrator dispatch qa v3
status: READY
owner_persona: qa
created_at: '2026-11-09'
updated_at: '2026-11-09'
depends_on:
  - task-649-748-priority-dispatch-tests-coder-v3
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

# Task: Priority-Based Dispatch in Orchestrator Implementation QA

## Context
Following the schema update for the `priority` field, the orchestrator needs to intelligently leverage this field to dispatch nodes based on priority (descending) first, then `critical_weight` (descending), and finally `created_at`. This is the third iteration of the QA task.

## Acceptance Criteria
- [ ] Verify priority-based dispatch logic in `packages/foundry/foundry-orchestrator.ts`.
- [ ] Verify tests for the new logic.
