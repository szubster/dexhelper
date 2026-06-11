---
id: task-106-159-dag-utils-unit-tests-impl
type: TASK
title: Implement Unit Tests for Shared DAG Utilities
status: PENDING
owner_persona: coder
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-053-106-dag-utils-unit-tests
tags:
  - testing
  - foundry
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Spawned from story-053-106-dag-utils-unit-tests
---

# Implement Unit Tests for Shared DAG Utilities

## 1. Context
This task implements unit tests for the shared DAG utility functions located in `.github/scripts/dag-utils.ts`.
This task was generated from `.foundry/stories/story-053-106-dag-utils-unit-tests.md`.

## 2. Requirements
1.  **Create Test File:** Create `.github/scripts/dag-utils.test.ts`.
2.  **Test `buildReverseDependencyGraph`:** Write unit tests to cover various scenarios, including valid dependencies, missing dependencies, and empty graphs.
3.  **Test `getOrphanedNodes`:** Write unit tests to verify the correctness of the traversal logic for finding orphaned nodes given a starting node and a dependency map.
4.  **Framework:** Use `vitest` to run tests and assure they pass successfully.

## 3. Important Reminders
*   If you encounter a permanent failure, you MUST update the YAML frontmatter to `status: FAILED` or `CANCELLED` with a `rejection_reason`.
*   If submitting an empty PR for a completed task (e.g., if you realize the file already has complete tests), you MUST check off all Acceptance Criteria checkboxes before submitting.

## 4. Acceptance Criteria
- [ ] `.github/scripts/dag-utils.test.ts` is created.
- [ ] Comprehensive unit tests for `buildReverseDependencyGraph` are written and pass.
- [ ] Comprehensive unit tests for `getOrphanedNodes` are written and pass.
- [ ] Running `pnpm exec vitest run` passes without errors.
