---
id: adr-014-auditor-persona-state-machine
type: ADR
title: 'ADR 014: Auditor Persona and VERIFYING State Machine Modifications'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-20'
updated_at: '2026-05-20'
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
# ADR 014: Auditor Persona and VERIFYING State Machine Modifications

## Context
As the Foundry autonomous software factory scales (IDEA 060, PRD 060-029), we have identified a gap in the post-execution lifecycle of nodes. Currently, when an owner persona completes a task, the orchestrator immediately transitions the node from `ACTIVE` to `COMPLETED` upon PR merge. This assumes the output perfectly matches both intent and quality requirements, without a mechanism to analyze learnings or verify high-level artifacts (like Epics or PRDs) before they are permanently archived.

## Decision
We are introducing the `auditor` persona and a new `VERIFYING` state to the node lifecycle.

Instead of transitioning directly to `COMPLETED` when a PR is merged, nodes will now transition from `ACTIVE` to `VERIFYING`. The `auditor` persona takes ownership of nodes in the `VERIFYING` state.

### Auditor Responsibilities
1. **Verification**: Assess the generated artifacts against the original intent of the node.
2. **Analysis**: Extract learnings, identify technical debt, or find unresolved questions that arose during execution.
3. **Node Generation**: Dynamically spawn new downstream nodes (such as `RESEARCH`, `IDEA`, or `ADR` nodes) based on these learnings to capture value that would otherwise be lost when the node is archived.
4. **Resolution**: If the verification passes, the auditor transitions the node to `COMPLETED`. If it fails or requires a retry, the auditor transitions it to `FAILED` (or sends it back to the resurrection loop) with appropriate feedback.

### State Transitions Updated
The `stateDiagram-v2` in `.foundry/docs/schema.md` has been modified to support this workflow:
- `ACTIVE --> VERIFYING` : Work submitted by owner / PR merged.
- `VERIFYING --> COMPLETED` : Auditor approves verification.
- `VERIFYING --> FAILED` : Auditor rejects verification (triggers resurrection loop or cancellation).

## Consequences
- **Positive**: Improved quality control and a formal mechanism to capture emergent learnings or follow-up work dynamically.
- **Negative**: Adds a step to the node lifecycle, increasing the time to final `COMPLETED` state and archiving.

## Status
Accepted
