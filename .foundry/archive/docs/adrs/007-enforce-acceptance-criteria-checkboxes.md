---
id: adr-007-enforce-acceptance-criteria-checkboxes
type: ADR
title: 'ADR 007: Enforce Acceptance Criteria Checkboxes'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-11'
updated_at: '2026-05-11'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 007: Enforce Acceptance Criteria Checkboxes

## Date
2026-05-11

## Status
Accepted

## Context
Currently, several Foundry nodes successfully transition to `COMPLETED` even though they still retain unchecked `[ ]` checkboxes in their Acceptance Criteria sections. This implies tasks are skipping validations or the orchestrator is transitioning states prematurely without enforcing completeness.

While the existing `foundry-heartbeat.ts` script catches unchecked tasks and demotes the node to `PENDING` (to support late-binding parent node awakening), this logic acts indiscriminately. It effectively prevents standard leaf tasks with unchecked boxes from being `COMPLETED`, but leaves them permanently stuck in a `PENDING` state with no mechanism to fail or notify the user unless they happen to be parents that spawn children.

We need a formal architectural directive enforcing that unchecked tasks prevent completion and detailing how different node types must handle this.

## Decision
1. **Strict Completion Enforcement**: No node can transition to `COMPLETED` if it contains an unchecked markdown task box (e.g., `- [ ]`).
2. **Late-Binding vs Leaf Tasks**:
   - If a node is a late-binding parent (it spawns child nodes), containing an unchecked box acts as an intentional signal to the orchestrator to keep the node alive (`PENDING`).
   - If a node is a leaf task (no child generation) and is merged with unchecked boxes, the system must recognize it as an invalid completion attempt. It should be flagged (e.g., set to `FAILED` or a similar failure state) rather than kept perpetually `PENDING`.
3. **Orchestrator Responsibility**: The validation logic checking for `/^\s*-\s*\[\s\]/m` is already present. The orchestrator must be augmented to distinguish between valid late-binding wait states and invalid leaf completions.

## Consequences
- **Positive**: Hardens the system contract. QA and Coder nodes must physically check off acceptance criteria before PR merge.
- **Positive**: Eliminates zombie leaf tasks stuck in `PENDING` because the author forgot to check a box.
- **Negative**: Adds slightly more complexity to the orchestrator state machine to distinguish parent nodes from leaf nodes.
