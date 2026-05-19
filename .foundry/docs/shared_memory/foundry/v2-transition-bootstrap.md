# Foundry V2 Transition: Atomic Handoffs

We are transitioning the Foundry infrastructure to a "Single Persona" node model to resolve DAG deadlocks.

## The Problem (V1)
In V1, nodes like IDEA-002 were "Composite," containing tasks for both Product Managers and Tech Leads. This prevented the orchestrator from marking the node `COMPLETED` until all tasks were done, blocking downstream nodes (PRDs) that only needed the PM's portion.

## The Principle of Atomic Ownership
1. **Single Owner**: Every `.foundry/` node file is owned by exactly ONE persona.
2. **Automated Completion**: Status transitions are handled by the `foundry-heartbeat` (detecting merged PRs) and the `foundry-orchestrator` (promoting unblocked dependencies).
3. **Implicit Handoff**: A persona "hands off" work by spawning a new node (e.g., IDEA -> PRD) and merging their current session.

## Note on IDs
Branch collisions and ID generation strategy are being addressed in **IDEA-002**. IDEA-003 focuses exclusively on the workflow and ownership model.