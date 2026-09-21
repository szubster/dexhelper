---
id: task-573-603-tree-level-completeness-qa
type: TASK
title: QA Tree Level Completeness Verification
status: READY
owner_persona: qa
created_at: '2026-09-20T19:00:00Z'
updated_at: '2026-09-20T19:00:00Z'
depends_on:
  - task-573-602-tree-level-completeness-logic
jules_session_id: null
parent: story-550-573-tree-level-completeness-logic
tags:
  - foundry
  - infrastructure
  - orchestrator
rejection_count: 0
locks: []
---

# QA Tree Level Completeness Verification

## Objective
Verify the implementation of tree-level completeness verification in `.github/scripts/sweep-active-nodes.ts`.

## Context & Constraints
The `coder` has implemented a connected component graph analysis to ensure that no node is archived unless its entire parent-child tree is terminal (COMPLETED or CANCELLED).

## Acceptance Criteria
- [ ] Verify `sweep-active-nodes.ts` correctly blocks archival of terminal nodes if they have active parents or children.
- [ ] Verify the unit tests in `sweep-active-nodes.test.ts` thoroughly cover the new tree-level graph analysis.
- [ ] Verify all tests pass (`pnpm test`) and code conforms to Biome formatting (`pnpm lint`).
