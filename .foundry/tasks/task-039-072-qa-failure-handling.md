---
id: task-039-072-qa-failure-handling
type: TASK
title: 'QA: Implement Failure Handling for Validation Mismatches'
status: READY
owner_persona: qa
created_at: '2026-05-09'
updated_at: '2026-05-10'
depends_on:
  - .foundry/tasks/task-039-071-implement-failure-handling.md
jules_session_id: null
pr_number: null
parent: story-025-039-implement-failure-handling
tags:
  - foundry
  - dag
  - orchestrator
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Verification: Implement Failure Handling for Validation Mismatches

## Overview
Verify the implementation of `task-039-071-implement-failure-handling`.

## Acceptance Criteria
- [ ] Nodes with invalid mapping are transitioned to `FAILED`.
- [ ] A descriptive `rejection_reason` is set.
- [ ] A warning/error is logged.
- [ ] Ensure that `foundry-orchestrator.test.ts` passes and the test logic for mapping validation correctly reflects the new requirement (`FAILED` state and rejection reason).
