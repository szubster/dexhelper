# Foundry V2 Transition

We have initiated the transition from Foundry V1 to V2 to resolve systemic DAG deadlocks and branch collisions.

## Key Changes in V2
1. **Distributed IDs**: Moving away from sequential numbering (001, 002) to prevent merge conflicts in parallel agent branches.
2. **Atomic Ownership**: Strictly enforcing single-persona ownership per node. A node must be COMPLETED and a new one spawned if the persona changes (e.g., Idea/PRD by PM -> ADR by Architect).

## Current State
- `IDEA-003` has been created in PR #356 to bootstrap these V2 rules.
- Sequential numbering is being phased out in favour of a yet-to-be-finalized distributed scheme (likely ULID or timestamp-based).
- Manual unblocking of `IDEA-002` is required to clear V1 legacy states.