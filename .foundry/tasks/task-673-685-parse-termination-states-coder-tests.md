---
id: task-673-685-parse-termination-states-coder-tests
type: TASK
title: Unit Tests for Orchestrator Termination State Parsing
status: READY
owner_persona: coder
created_at: '2026-10-13'
updated_at: '2026-10-20'
depends_on:
  - task-673-683-parse-termination-states-logic
jules_session_id: null
parent: story-581-673-orchestrator-termination-state-parsing
tags:
  - orchestrator
  - testing
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Unit Tests for Orchestrator Termination State Parsing

## Objective
Write unit tests to verify the DAG Orchestrator correctly parses termination states and distinguishes infrastructure errors from domain rejections.

## Details
- Write unit tests in `packages/foundry/foundry-orchestrator.test.ts` to verify that nodes failing with `Session terminated with state: NOT_FOUND` or `INTERNAL_ERROR` are processed correctly in Phase 3.0.
- Ensure that nodes with infrastructure errors do not falsely trigger the `Max rejection count reached` domain failure.

## Acceptance Criteria
- [x] task-673-685-parse-termination-states-coder-tests
