---
id: prd-131-340-orchestrator-resource-locking-mutex
type: PRD
title: PRD for Orchestrator Resource Locking (Mutex)
status: PENDING
owner_persona: epic_planner
created_at: "2026-08-07"
updated_at: "2026-08-07"
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-131-orchestrator-resource-locking-mutex
tags:
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# PRD: Orchestrator Resource Locking (Mutex)

## Overview
This PRD outlines the requirements for introducing a formal Resource Locking (Mutex) mechanism within the Foundry DAG orchestrator to handle concurrent modification of shared resources by multiple agents, thereby preventing git merge conflicts and execution data loss.

## Problem Statement
Currently, multiple active agents may attempt to modify the same shared files simultaneously (e.g., global index files or configuration files). While conflictless agent journals mitigated this issue for journals, a system-wide mechanism is needed to ensure safe concurrent resource access across the entire multi-agent pipeline.

## Proposed Solution
1. **Schema Updates:** Add a new `locks` field to the `.foundry/docs/schema.md` template for nodes. The `locks` array should specify the file paths that the node intends to modify exclusively.
2. **Orchestrator Updates (`.github/scripts/foundry-orchestrator.ts`):**
   - In the `RESOLVE` phase (Phase 4), the orchestrator will aggregate all `locks` declared by currently `ACTIVE` nodes.
   - For every `PENDING` node that is otherwise eligible to transition to `READY`, the orchestrator will check its declared `locks` against the aggregated active locks.
   - If there is an intersection, the `PENDING` node is temporarily blocked and remains in `PENDING` status.
3. **Deadlock Prevention:** Ensure that locks are granular (specific file paths) and automatically released when a node's status changes from `ACTIVE` to `COMPLETED` or `FAILED` (implicitly handled by evaluating locks only from `ACTIVE` nodes).

## Next Steps
- [ ] Epic Planner: Draft the EPIC breaking this PRD down into architecture, orchestrator modifications, and schema updates.

## Acceptance Criteria
- [ ] Epic Planner completes PRD decomposition.
