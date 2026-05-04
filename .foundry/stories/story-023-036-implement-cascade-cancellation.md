---
id: story-023-036-implement-cascade-cancellation
type: STORY
title: 'Story: Implement Cascading Cancellation in Orchestrator'
status: PENDING
owner_persona: tech_lead
created_at: '2026-05-03'
updated_at: '2026-05-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/epics/epic-013-023-orchestrator-cascade-cancellation.md
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
notes: ''
---

# Story: Implement Cascading Cancellation in Orchestrator

## Objective
Update the Foundry DAG orchestrator script (`.github/scripts/foundry-orchestrator.ts`) to automatically cascade the `CANCELLED` status from parent nodes to their descendants.

## Requirements
1. Identify nodes explicitly marked as `status: "CANCELLED"`.
2. Identify child nodes that list the cancelled node as a `parent`.
3. Recursively transition the status of these child nodes to `CANCELLED`, but **only if** the child node is not already `COMPLETED`.
4. Use `matter.stringify()` to write changes securely back to the file system, ensuring `updated_at` is bumped.
5. Provide unit tests to verify the new functionality in `.github/scripts/foundry-orchestrator.test.ts`.

## Technical Notes
- Execution of this logic should happen before the main dependency resolution phases (e.g. before "RESOLVE" phase).
- Ensure idempotency: re-running on an already cancelled subtree shouldn't cause infinite loops or unnecessary file modifications.

## Acceptance Criteria
- [ ] Tech Lead: Break down into implementation tasks.
