---
id: task-512-518-qa-idempotent-bypass
type: TASK
title: QA Idempotent Orchestrator Bypass
status: READY
owner_persona: qa
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on:
  - task-512-517-implement-idempotent-bypass
jules_session_id: null
pr_number: null
parent: story-018-512-idempotent-orchestrator-bypass
tags:
  - orchestrator
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Idempotent Orchestrator Bypass

## Objective
Verify the implementation of Phase 4.5 auto-checking logic in `.github/scripts/foundry-orchestrator.ts`.

## Acceptance Criteria
- [ ] Verify that `foundry-orchestrator.ts` automatically checks off non-node checkboxes when `shouldBypass` is true.
- [ ] Verify that nodes are correctly promoted to READY if there are remaining unchecked tasks after auto-checking.
- [ ] Verify that nodes are auto-fulfilled and bypass dispatch if all tasks are checked.
- [ ] Ensure that `story-018-513-orchestrator-test-updates` is completed or that unit tests appropriately cover the change.
