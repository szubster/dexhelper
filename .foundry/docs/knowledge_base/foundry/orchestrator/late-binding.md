# Foundry Late-Binding Stories

Late-binding stories in the Foundry engine are implemented natively in the infrastructure scripts, not through YAML manipulation.

## The Problem
Directly adding a child story to a parent Epic's `depends_on` array creates a deadlock:
1. Epic waits for Story.
2. Story inherently waits for parent Epic to be ACTIVE or COMPLETED.
3. Deadlock.

## The Solution
1. **Heartbeat Script (`.github/scripts/foundry-heartbeat.ts`)**:
   - When a PR merges, the script checks the node's markdown body for unchecked tasks (`- [ ]`).
   - If unchecked tasks exist, it transitions the node back to `PENDING` instead of `COMPLETED`. This keeps the parent alive.
2. **Orchestrator (`.github/scripts/foundry-orchestrator.ts`)**:
   - **Wait for Children**: A `PENDING` node is explicitly blocked if it has *any* incomplete children.
   - **Exception for Children**: A child node is normally blocked if its parent is `PENDING`. However, if the `PENDING` parent already has children, the orchestrator assumes it is in its "Wait for Children" cycle, and *does not* block the child.

This ensures that the Epic waits in a PENDING state for its child stories to complete before spawning the next ones, creating a seamless, automated delivery pipeline.
## Late-Binding Parent Node Cancellation Logic
The orchestrator correctly handles `CANCELLED` children of late-binding parent nodes. When determining if all children are completed (in `.github/scripts/foundry-orchestrator.ts`), the system explicitly checks that a child is either `COMPLETED` or `CANCELLED`. This means a permanently `CANCELLED` child effectively behaves as "done" from the perspective of its parent. It does not cause a deadlock, and the parent will still correctly wake up once all its children have reached either `COMPLETED` or `CANCELLED` state.
