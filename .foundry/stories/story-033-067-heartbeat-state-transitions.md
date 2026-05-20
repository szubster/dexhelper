---
id: story-033-067-heartbeat-state-transitions
type: STORY
title: State Transition Logic for PR-less Completions
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-18'
updated_at: '2026-05-19'
depends_on:
  - story-033-066-heartbeat-prless-detection
jules_session_id: null
pr_number: null
parent: epic-025-033-robust-session-completion
tags:
  - foundry
  - dag
  - orchestrator
  - heartbeat
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: State Transition Logic for PR-less Completions

## Objective
Implement the state transition logic for PR-less `COMPLETED` sessions in `foundry-heartbeat.ts` according to the rules defined in ADR 011 and ADR 007.

## Context
Once a PR-less `COMPLETED` session is detected (handled in Story 066), the heartbeat must evaluate the node's markdown content to check for unchecked acceptance criteria (`- [ ]`) and transition the node's status accordingly.

## Requirements
1. Determine if the node is a "leaf task" or a "late-binding parent" (has children, or is `IDEA`, `PRD`, `EPIC`, `STORY`, or a `TASK`/`RESEARCH` that has generated children).
2. Check the markdown content for unchecked acceptance criteria (`- [ ]`).
3. If leaf task with unchecked boxes -> Transition to `FAILED` with a `rejection_reason`.
4. If valid late-binding parent with unchecked boxes -> Transition to `PENDING` (or remain `READY`).
5. If all boxes checked (or no boxes exist) -> Transition to `COMPLETED`.

## Acceptance Criteria
- [x] PR-less `COMPLETED` sessions for leaf tasks with unchecked boxes are marked `FAILED` with a rejection reason.
- [x] PR-less `COMPLETED` sessions for valid parents with unchecked boxes are transitioned correctly to `PENDING`.
- [x] PR-less `COMPLETED` sessions with all boxes checked (or no boxes) are marked `COMPLETED`.

## Downstream Nodes
- TASK: `.foundry/tasks/task-067-114-implement-heartbeat-state-transitions.md`
- TASK: `.foundry/tasks/task-067-115-implement-heartbeat-state-transitions.md`
- TASK: `.foundry/tasks/task-067-116-qa-heartbeat-state-transitions.md`
