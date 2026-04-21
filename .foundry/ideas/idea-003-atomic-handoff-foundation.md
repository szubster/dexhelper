---
id: "idea-003-atomic-handoff-foundation"
type: "IDEA"
title: "Foundry V2: Atomic Handoffs & Single-Persona Ownership"
status: "READY"
owner_persona: "product_manager"
created_at: "2026-04-21"
updated_at: "2026-04-21"
depends_on: []
jules_session_id: null
---

# Foundry V2: Atomic Handoffs & Single-Persona Ownership

## Problem Statement

The Foundry V1 suffers from **Composite Node Deadlocks**: Nodes containing tasks for multiple personas (e.g., PM + Tech Lead in one `IDEA`) cannot be marked `COMPLETED` until all tasks are done, but downstream nodes often depend on only a subset of those tasks being finished. This causes a DAG deadlock.

## Proposed Solution

This idea bootstraps the transition to **Foundry V2 Architecture**, enforcing the core invariant of **Atomic Node Ownership**.

### Atomic Node Ownership (Single-Persona Nodes)
*   **Fundamental Rule**: A node MUST have exactly one `owner_persona`.
*   A node is considered "In Review" or "Completed" once the specific owner has finished their portion.
*   If the next step requires a different persona (e.g., an `IDEA` requiring an `ADR`), the first persona MUST mark their node `COMPLETED` and spawn a NEW successor node for the second persona.
*   This prevents "leaking" responsibilities across nodes and ensures the Orchestrator can always promote downstream nodes as soon as the prerequisite work is truly done.

## Next Steps
- [ ] **Product Manager**: Create a PRD for the V2 Atomic Handoff protocol and single-persona node enforcement.
