---
id: task-050-084-qa-enforce-acceptance-criteria
type: TASK
title: QA - Enforce Acceptance Criteria in Heartbeat and Orchestrator
status: COMPLETED
owner_persona: qa
created_at: '2026-05-12'
updated_at: '2026-05-14'
depends_on:
  - task-050-083-enforce-acceptance-criteria
jules_session_id: null
pr_number: null
parent: story-031-050-enforce-acceptance-criteria-completion
tags: []
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA - Enforce Acceptance Criteria in Heartbeat and Orchestrator

## Context
This task verifies the changes made in `task-050-083-enforce-acceptance-criteria.md`. The coder should have updated `foundry-heartbeat.ts` to assign the rejection reason when failing leaf nodes with unchecked boxes, and updated `foundry-orchestrator.ts` preflight logic to properly fail leaf tasks with unchecked boxes when target artifacts exist.

## Requirements
1. Verify `foundry-heartbeat.ts` changes.
2. Verify `foundry-orchestrator.ts` changes.
3. Write unit tests in `foundry-heartbeat.test.ts` to verify the assignment of rejection reason for leaf tasks with unchecked boxes.
4. Write unit tests in `foundry-orchestrator.test.ts` to verify preflight properly fails a leaf task with unchecked boxes instead of promoting it to READY.

## Acceptance Criteria
- [x] Add unit test in `foundry-heartbeat.test.ts` to verify the different handling of leaf tasks versus parent nodes with unchecked boxes and assert `rejection_reason` is set correctly.
- [x] Add unit test in `foundry-orchestrator.test.ts` to verify a leaf task with completed target artifacts but unchecked boxes is flagged as FAILED via `promoteNodeToFailedWithReason`.
- [x] Verify existing tests still pass.
