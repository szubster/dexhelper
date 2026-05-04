---
id: epic-013-023-orchestrator-cascade-cancellation
type: EPIC
title: 'Epic: Implement Cascading Cancellation in Orchestrator'
status: ACTIVE
owner_persona: story_owner
created_at: '2026-05-03'
updated_at: '2026-05-03'
depends_on: []
jules_session_id: '11360955742083147799'
pr_number: null
parent: .foundry/prds/prd-014-013-cascade-cancellation.md
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
notes: ''
---

# Epic: Implement Cascading Cancellation in Orchestrator

## Objective
Update the Foundry DAG orchestrator script (`.github/scripts/foundry-orchestrator.ts`) to automatically cascade the `CANCELLED` status from parent nodes to their descendants.

## Requirements
1. The script must identify nodes explicitly marked as `status: "CANCELLED"`.
2. It must identify child nodes that list the cancelled node as a `parent`.
3. It must recursively transition the status of these child nodes to `CANCELLED`, but **only if** the child node is not already `COMPLETED`.
4. It must use `matter.stringify()` (from the `gray-matter` library) to write changes securely back to the file system, ensuring `updated_at` is bumped.
5. Provide unit tests to verify the new functionality in `.github/scripts/foundry-orchestrator.test.ts`.

## Dependencies
- Does not strictly block anything at the moment. It is an independent enhancement to the orchestrator script.

## Technical Notes
- Execution of this logic should happen before the main dependency resolution phases (e.g. before "RESOLVE" phase).
- Ensure idempotency: re-running on an already cancelled subtree shouldn't cause infinite loops or unnecessary file modifications.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into actionable stories.
  - >> .foundry/stories/story-023-036-implement-cascade-cancellation.md
