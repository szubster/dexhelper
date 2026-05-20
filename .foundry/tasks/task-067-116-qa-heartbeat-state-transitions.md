---
id: task-067-116-qa-heartbeat-state-transitions
type: TASK
title: QA State Transition Logic for PR-less Completions
status: COMPLETED
owner_persona: qa
created_at: '2026-05-18'
updated_at: '2026-05-20'
depends_on:
  - .foundry/tasks/task-067-115-implement-heartbeat-state-transitions.md
jules_session_id: null
pr_number: null
parent: story-033-067-heartbeat-state-transitions
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA State Transition Logic for PR-less Completions

## Objective
Verify the changes made in `.foundry/tasks/task-067-115-implement-heartbeat-state-transitions.md`.

## Context
Once a PR-less `COMPLETED` session is detected (handled in Story 066), the heartbeat must evaluate the node's markdown content to check for unchecked acceptance criteria (`- [ ]`) and transition the node's status accordingly.

## Requirements
1. Verify that the node type determination works correctly.
2. Verify unchecked boxes cause `FAILED` transition on a leaf node.
3. Verify unchecked boxes cause `PENDING` on a parent node.
4. Verify completely checked boxes cause `COMPLETED` transition.

## Acceptance Criteria
- [x] Ensure that PR-less `COMPLETED` sessions for leaf tasks with unchecked boxes are marked `FAILED` with a rejection reason.
- [x] Ensure that PR-less `COMPLETED` sessions for valid parents with unchecked boxes are transitioned correctly to `PENDING`.
- [x] Ensure that PR-less `COMPLETED` sessions with all boxes checked (or no boxes) are marked `COMPLETED`.
- [x] Run test suite with `cd .github/scripts && pnpm install && npx vitest run`.
