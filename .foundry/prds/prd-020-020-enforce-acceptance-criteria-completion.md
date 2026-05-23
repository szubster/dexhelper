---
id: prd-020-020-enforce-acceptance-criteria-completion
type: PRD
title: Enforce Acceptance Criteria Checkbox Completion PRD
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-11'
updated_at: '2026-05-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-020-enforce-acceptance-criteria-completion
tags: []
research_references: []
rejection_count: 1
notes: ''
rejection_reason: ''
---

# Enforce Acceptance Criteria Checkbox Completion PRD

## 1. Objective
Design and implement an orchestrator validation check that scans the raw markdown body of nodes and prevents nodes from transitioning to `COMPLETED` if they contain unchecked `[ ]` boxes within their Acceptance Criteria.

## 2. Background
Currently, several Foundry nodes successfully transition to `COMPLETED` even though they still retain unchecked `[ ]` checkboxes in their Acceptance Criteria sections. This leads to reduced reliability in the system's explicit contracts, as it implies tasks are skipping validations or the orchestrator is transitioning states prematurely without enforcing completeness.

## 3. Scope
- **In Scope:**
    - Determining the most appropriate phase to perform the validation (e.g., inside `foundry-heartbeat.ts` during transition to `COMPLETED`, or as a PR check).
    - Developing robust regex/parsing logic to scan the markdown body specifically for unchecked `- [ ]` lists.
    - Implementing the actual block: flagging the node to prevent its transition, or keeping it in a `PENDING`/`ACTIVE` state until all tasks are marked `[x]`.

- **Out of Scope:**
    - Altering the "Self-Healing DAG" logic introduced in Idea 013, other than ensuring this check integrates cleanly with it.
    - Back-filling or modifying existing already-completed nodes.

## 4. Requirements
### 4.1 Orchestrator Logic
- A validation routine must be implemented that can accurately parse the raw markdown body and detect unchecked tasks (e.g., lines starting with `- [ ]`).
- The validation must prevent a node from transitioning its status to `COMPLETED` if unchecked tasks remain.

### 4.2 Integration Point
- The check should preferably integrate seamlessly into the `foundry-heartbeat.ts` script, which governs the transition to `COMPLETED` when PRs are merged or closed. (Currently, the heartbeat checks for unchecked boxes and demotes the node to `PENDING` to keep late-binding parents alive, but it shouldn't allow standard leaf tasks to be COMPLETED with unchecked boxes).

### 4.3 Resilience
- It should properly identify unchecked boxes only, ignoring `[x]` or `[X]`.

## 5. Acceptance Criteria
- [x] Investigate and document the best phase/location to inject this validation logic in the codebase.
- [x] Implement the parsing logic to detect unchecked `- [ ]` boxes in a node's body.
- [x] Integrate the logic to block or revert the node's transition to `COMPLETED` if unchecked boxes are found.
