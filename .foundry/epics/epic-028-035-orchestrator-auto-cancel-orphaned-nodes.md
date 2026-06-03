---
id: epic-028-035-orchestrator-auto-cancel-orphaned-nodes
type: EPIC
title: Implement Orchestrator Auto-Cancel for Orphaned Nodes
status: COMPLETED
owner_persona: story_owner
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-059-028-orchestrator-auto-cancel-orphaned-nodes
tags:
  - foundry
  - dag
  - orchestrator
  - cancellation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Implement Orchestrator Auto-Cancel for Orphaned Nodes

## Context
When a child node (e.g., an implementation TASK) permanently fails by reaching its `Max rejection count reached`, the orchestrator currently wakes up the parent node to spawn new tasks. However, sibling tasks that depended on the failed task (like a QA task) are left as orphaned nodes stuck in the `PENDING` state.

## Objective
This epic implements an enhancement to the orchestrator (`.github/scripts/foundry-orchestrator.ts`) to automatically detect and cancel these orphaned nodes, reducing manual cleanup and DAG clutter.

## Requirements Checklist
- [x] During the orchestrator's graph evaluation, detect any node in the `FAILED` state with `rejection_reason: 'Max rejection count reached'`.
- [x] Identify all nodes currently in the `PENDING` state that list the permanently failed node in their `depends_on` array.
- [x] Transition these identified `PENDING` nodes to `CANCELLED`.
- [x] Update the `rejection_reason` of the cancelled node to indicate the cause: `"Cancelled due to permanent failure of dependency: <failed-node-id>"`.
- [x] Ensure the cancellation logic does not introduce circular dependencies or infinite loops.
- [x] Log the cancellation action clearly in the orchestrator's output.
- [x] Add unit tests in `foundry-orchestrator.test.ts` to ensure `PENDING` nodes depending on permanently `FAILED` nodes are correctly transitioned to `CANCELLED` and reasons are recorded.

## Assigned Stories
- `.foundry/stories/story-035-072-implement-cancellation-logic.md`
- `.foundry/archive/stories/story-035-073-orchestrator-cancellation-tests.md`
