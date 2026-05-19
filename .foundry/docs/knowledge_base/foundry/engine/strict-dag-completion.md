# Foundry: Strict DAG Completion & Self-Healing Protocol

## Core Principle
The Foundry engine now utilizes a **Strict DAG Completion** model. Traditional markdown checkboxes (`- [ ]`) are no longer used for engine-level progress tracking. Instead, completion is derived entirely from the state of a node's children and dependencies.

## Engine Behavior
1.  **Heartbeat (`foundry-heartbeat.ts`)**: 
    - No longer scans for unchecked boxes.
    - Automatically transitions a node to `COMPLETED` immediately upon its associated Pull Request being merged.
2.  **Orchestrator (`foundry-orchestrator.ts`)**:
    - Implements a **Self-Healing DAG** via Phase 3.5.
    - If a `COMPLETED` node is found to be **Hierarchically Incomplete** (i.e., it has children or dependencies that are not `COMPLETED`), it is demoted back to `PENDING`.
    - This allows for "Wait & Wake" behavior where a parent node stays `PENDING` until its entire subtree is finished, even if the parent's own work (PR) was merged early.

## Node Authoring Rules
- **Hierarchical Linking**: Every internal task must be defined as a child node file (`parent` field) or an explicit `depends_on` link.
- **Completion Invariant**: A parent node will never truly stay `COMPLETED` until all its children are `COMPLETED`.
- **Late-Binding Exception**: `PENDING` parents with children do not block those children from starting. This prevents deadlocks while maintaining the hierarchical invariant.

## Impact on Idea 007
Idea-007 (Migrate Saves to IndexedDB) was previously stuck because it was marked `COMPLETED` on `main` while its implementation stories were still open. The new "Self-Healing" logic correctly identifies this discrepancy and demotes the Idea/PRD to `PENDING` until the story implementation is finished.