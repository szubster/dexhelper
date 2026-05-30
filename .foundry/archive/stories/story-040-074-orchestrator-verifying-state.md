---
id: story-040-074-orchestrator-verifying-state
type: STORY
title: Orchestrator VERIFYING State and Matrix Dispatch
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-21'
updated_at: '2026-05-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-029-040-auditor-implementation
tags:
  - process
  - orchestrator
rejection_count: 0
rejection_reason: ''
---

# Story: Orchestrator VERIFYING State and Matrix Dispatch

## Objective
Implement updates to `foundry-orchestrator.ts` type definitions and matrix JSON formulation logic for the new VERIFYING state.

## Implementation Details
- Add `'VERIFYING'` to the list of valid node statuses (`VALID_STATUSES`).
- In Phase 6 (Collect Phase) of matrix output formulation, check if a node is in the `VERIFYING` state. If it is, dynamically set `owner_persona: 'auditor'` in the JSON object *without* modifying the actual YAML frontmatter in the file.
- Update `isHierarchicallyIncomplete` function and related `depends_on` suspension logic to treat `VERIFYING` nodes similarly to `ACTIVE` nodes; they are not `COMPLETED`, so they still block downstream nodes from transitioning to `READY`.

## Acceptance Criteria
- [x] Added `VERIFYING` to valid statuses.
- [x] Matrix logic overrides persona to auditor for VERIFYING nodes.
- [x] Dependencies check treats VERIFYING nodes as blocking.
