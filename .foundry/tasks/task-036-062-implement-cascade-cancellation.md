---
id: task-036-062-implement-cascade-cancellation
type: TASK
title: Implement Cascading Cancellation in Orchestrator
status: ACTIVE
owner_persona: coder
created_at: '2026-05-04'
updated_at: '2026-05-04'
depends_on: []
jules_session_id: '10335124015720706367'
pr_number: null
parent: .foundry/stories/story-023-036-implement-cascade-cancellation.md
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
notes: ''
---

# Task 062: Implement Cascading Cancellation in Orchestrator

## Context
The story requires the Foundry DAG orchestrator script (`.github/scripts/foundry-orchestrator.ts`) to automatically cascade the `CANCELLED` status from parent nodes to their descendants. The logic seems to be partially implemented in Phase 3.1 but requires unit tests to be written and the implementation to be fully verified.

## Technical Blueprint
1. Verify the cascading cancellation logic in `.github/scripts/foundry-orchestrator.ts`. Ensure that if a node explicitly marked as `status: "CANCELLED"` is found, any child nodes listing it as a `parent` are recursively transitioned to `CANCELLED`, but only if the child is not already `COMPLETED`. Ensure idempotency.
2. Update `.github/scripts/foundry-orchestrator.test.ts` to include unit tests covering the cascading cancellation behavior.
   - Test case 1: Explicitly cancelled parent node successfully cascades `CANCELLED` status to a pending child.
   - Test case 2: Cascade operation does not overwrite a child node that is already `COMPLETED`.
   - Test case 3: Recursive cascading works across multiple levels of descendants.

## Acceptance Criteria
- [x] Unit tests for cascading cancellation logic are added to `.github/scripts/foundry-orchestrator.test.ts`.
- [x] Verification confirms that `foundry-orchestrator.ts` correctly applies the cascading rules.
- [x] `pnpm lint`, `pnpm test`, and `pnpm test:e2e` run successfully.
