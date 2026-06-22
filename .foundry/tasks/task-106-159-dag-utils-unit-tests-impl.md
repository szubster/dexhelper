---
id: task-106-159-dag-utils-unit-tests-impl
type: TASK
title: Implement Unit Tests for Shared DAG Utilities
status: ACTIVE
owner_persona: coder
created_at: '2026-06-15'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: '9565618731398937782'
pr_number: null
parent: story-053-106-dag-utils-unit-tests
tags:
  - testing
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Unit Tests for Shared DAG Utilities

## Context
This task implements unit tests for the shared DAG utility functions located in `.github/scripts/dag-utils.ts`.

## Constraints & Architecture
- Write unit tests for `buildReverseDependencyGraph` and `getOrphanedNodes`.
- Use Vitest.
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] `.github/scripts/dag-utils.test.ts` is created.
- [x] Unit tests for `buildReverseDependencyGraph` are implemented.
- [x] Unit tests for `getOrphanedNodes` are implemented.
- [x] All tests pass successfully (`pnpm install && npx vitest run`).
