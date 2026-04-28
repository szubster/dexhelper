---
id: idea-003-atomic-handoff-foundation
type: IDEA
title: "Foundry V2: Atomic Handoffs & Single-Persona Ownership"
status: PENDING
owner_persona: product_manager
created_at: "2026-04-21"
updated_at: "2026-04-27"
depends_on: []
jules_session_id: null
---

# Foundry V2: Atomic Handoffs & Single-Persona Ownership

## Problem Statement

The Foundry V1 infrastructure allows for "Composite Nodes"—files containing tasks for multiple personas (e.g., Product Manager and Tech Lead both acting on a single `IDEA` node). This causes **DAG Deadlocks**: the orchestrator cannot mark the node `COMPLETED` until *all* persona tasks are finished, even if downstream nodes (like a `PRD`) only require the PM's portion to be done.

## Proposed Strategy: Atomic Handoffs

This idea establishes the **Atomic Ownership** invariant for all Foundry V2 nodes:

### 1. Single Owner Persona
Every node MUST have exactly one `owner_persona`. Responsibilities must not leak across different personas within the same file.

### 2. Automated Completion Lifecycle
The status lifecycle is enforced by system automation, not manual edits:
- **Work Phase**: The `owner_persona` performs the task (e.g., drafting a new PRD) and opens a Pull Request.
- **Completion**: Once the PR is merged into `main`, the `foundry-heartbeat` script automatically transitions the node status from `ACTIVE` to `COMPLETED`.
- **Handoff**: Successor nodes (e.g., the newly created PRD) are then unblocked by the `foundry-orchestrator` once their dependencies reach the `COMPLETED` state.

### 3. Clean Decoupling
If a workflow step requires a transition from one persona to another, the first persona delivers their output as a new node and concludes their session. This ensures the DAG stays fluid and unblocked.

## Next Steps
- [x] **Product Manager**: Draft the V2 Lifecycle PRD specifying the formal transition requirements for each node type.
