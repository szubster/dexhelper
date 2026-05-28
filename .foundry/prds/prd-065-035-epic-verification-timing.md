---
id: prd-065-035-epic-verification-timing
type: PRD
title: Enforce Hierarchical Verification Timing for Macro Nodes
status: VERIFYING
owner_persona: epic_planner
created_at: '2026-05-23'
updated_at: '2026-05-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-065-epic-verification-timing
tags:
  - foundry
  - process
  - orchestrator
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Enforce Hierarchical Verification Timing for Macro Nodes

## Context
Currently, macroscopic Foundry nodes like `EPIC` and `STORY` nodes can transition to the `VERIFYING` (and subsequently `COMPLETED`) status prematurely. A parent node is often marked complete once its immediate functional requirement—usually just the creation of child nodes—is met. This happens even though the actual implementation tasks have not been executed and merged into the codebase.

Because the orchestrator treats these as standalone completions, it creates a false sense of progress and can cause downstream nodes (which depend on the Epic or Story) to be dispatched before the underlying codebase is actually ready.

## Goal
The Foundry Orchestrator must be updated to enforce strict hierarchical completion timing. A parent node (e.g., an Epic or Story) MUST NOT transition to `COMPLETED` or `VERIFYING` until all of its descendant nodes (the entire spawned sub-tree) are completely verified and in the `COMPLETED` state.

This ensures that "Epic implementation is done" is semantically accurate.

## Requirements

1. **Implicit Dependency Enforcement:**
   - The Orchestrator's DAG resolution algorithm in `.github/scripts/foundry-orchestrator.ts` must be updated to infer that any parent node implicitly depends on all of its recursive descendants.
   - A node cannot be considered for `READY` (and thereby cannot transition to `COMPLETED`) if any node in its descendant tree is in any state other than `COMPLETED`.

2. **Late-Binding Accommodation:**
   - The system already accommodates late-binding parents (e.g., a node kept `PENDING` because it contains unchecked boxes or is explicitly spawning children). The new hierarchical check must integrate seamlessly with this logic. A parent that has generated children must wait for those children to finish, even if its own checkboxes are ticked.

3. **Backwards Compatibility:**
   - Existing DAG logic for explicit `depends_on` arrays remains unchanged. This PRD focuses purely on inferring the parent-child relationship to block parent completion.
   - The solution must avoid circular dependency deadlocks (where a parent blocks a child and the child blocks the parent) by ensuring parents only wait on descendants, not vice-versa, for their final completion state.

## Acceptance Criteria
- [x] The `foundry-orchestrator.ts` script is updated to block parent nodes from transitioning to `COMPLETED` or `VERIFYING` if any descendant child node is incomplete.
- [x] Unit tests in `.github/scripts/foundry-orchestrator.test.ts` are updated or added to verify that a parent node remains pending/active while its spawned children are being executed.
- [x] The DAG remains deadlock-free; children are still dispatched normally, but the parent waits.
- [x] The TPM or Agile Coach journal is updated to reflect this new process change.


## Generated Epics
- [.foundry/epics/epic-035-048-implicit-dependency-enforcement.md](./../epics/epic-035-048-implicit-dependency-enforcement.md)
- [.foundry/epics/epic-035-049-late-binding-accommodation.md](./../epics/epic-035-049-late-binding-accommodation.md)
