---
id: prd-059-028-orchestrator-auto-cancel-orphaned-nodes
type: PRD
title: Auto-Cancel Orphaned PENDING Nodes in Orchestrator
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-059-orchestrator-auto-cancel-orphaned-nodes
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

# PRD: Auto-Cancel Orphaned PENDING Nodes in Orchestrator

## Overview
When a child node (e.g., an implementation TASK) permanently fails by reaching its `Max rejection count reached`, the orchestrator wakes up the parent node to spawn new tasks. However, sibling tasks that depended on the failed task (like a QA task) are left as orphaned nodes stuck in the `PENDING` state. This PRD outlines the enhancement to the orchestrator to automatically detect and cancel these orphaned nodes, reducing manual cleanup and DAG clutter.

## Requirements

### Cascading Cancellation Logic
1. **Trigger Condition**: During the orchestrator's graph evaluation, if it detects any node in the `FAILED` state with the specific `rejection_reason: 'Max rejection count reached'`.
2. **Target Identification**: The orchestrator MUST identify all nodes currently in the `PENDING` state that list the permanently failed node in their `depends_on` array.
3. **State Transition**: The orchestrator MUST transition these identified `PENDING` nodes to `CANCELLED`.
4. **Reason Logging**: The orchestrator MUST update the `rejection_reason` (or equivalent note field) of the cancelled node to indicate the cause, for example: `"Cancelled due to permanent failure of dependency: <failed-node-id>"`.

### System Integrity
1. **No Circular Dependencies**: The cancellation logic must not introduce circular dependencies or infinite loops during DAG evaluation.
2. **Logging**: The cancellation action must be clearly logged in the orchestrator's output to ensure visibility of the automated action.

## Testing Strategy
- Unit testing in `foundry-orchestrator.test.ts` to ensure `PENDING` nodes depending on permanently `FAILED` nodes are correctly transitioned to `CANCELLED`.
- Verification that the cancellation reason is properly recorded in the node's frontmatter.

## Epics
- .foundry/epics/epic-028-035-orchestrator-auto-cancel-orphaned-nodes.md
