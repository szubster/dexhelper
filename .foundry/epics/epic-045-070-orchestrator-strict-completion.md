---
id: epic-045-070-orchestrator-strict-completion
type: EPIC
title: Orchestrator Hierarchical Completion Checks
status: PENDING
owner_persona: auditor
created_at: '2026-06-10'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-072-045-strict-macro-node-completion
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Orchestrator Hierarchical Completion Checks

## Context
Macro nodes (like `IDEA`, `PRD`, `EPIC`, and `STORY`) are transitioning to `VERIFYING` right after spawning their initial child nodes, even though the spawned descendants are still `PENDING` or `ACTIVE`. This is causing problems because a node shouldn't be completed if its requirements, mapped to child tasks, are not implemented.

## Objective
Update the DAG Orchestrator to ensure strict hierarchical completion. A node must only transition to `VERIFYING` or `COMPLETED` when all of its descendant child nodes are `COMPLETED`.

## Requirements
1. **Orchestrator Modifications**: Modify `.github/scripts/foundry-orchestrator.ts` to block the `VERIFYING` and `COMPLETED` transitions for any node that has children not in the `COMPLETED` state.
2. **Child Identification**:
    - Parse the `parent` field of other nodes to find reverse relationships.
    - Parse the markdown body for references to generated nodes (e.g. `- [ ] path/to/file.md`).
3. **Tests**: Add unit tests in `.github/scripts/foundry-orchestrator.test.ts` to ensure these new validations work correctly and don't break existing functionality.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] Implement hierarchical completion logic in `foundry-orchestrator.ts`.
- [x] Add unit tests verifying the behavior blocks transition when children are not completed.
- [x] Ensure tests cover both `parent` field links and markdown body references.

- [x] story-070-108-orchestrator-hierarchical-completion-logic
- [x] story-070-109-orchestrator-hierarchical-completion-tests

- [x] story-070-276-orchestrator-verifying-block
- [x] story-070-358-orchestrator-strict-completion-e2e
