# Foundry V2 Transition: Atomic Handoffs

We have initiated the transition from Foundry V1 to V2 to resolve systemic DAG deadlocks.

## Key Changes in V2
1. **Atomic Ownership**: Strictly enforcing single-persona ownership per node. A node must be COMPLETED and a new one spawned if the persona changes (e.g., Idea/PRD by PM -> ADR by Architect).
2. **Lifecycle V2**: Moving towards a more granular handoff: IDEA (PM) -> PRD (PM) -> ADR (Architect) -> EPIC (Planner) -> STORY -> TASK.

## Current State
- `IDEA-003` has been created to bootstrap the Atomic Ownership rule.
- Sequential numbering collisions are being addressed separately in `IDEA-002`.
- Manual unblocking of `IDEA-002` is still required to clear V1 legacy states.