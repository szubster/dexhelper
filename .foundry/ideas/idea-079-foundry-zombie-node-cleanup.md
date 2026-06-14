---
id: idea-079-foundry-zombie-node-cleanup
type: IDEA
title: Foundry Zombie Node Garbage Collection
status: ACTIVE
owner_persona: product_manager
created_at: '2026-06-14'
updated_at: '2026-06-14'
depends_on: []
jules_session_id: '14689750101582934654'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Foundry Zombie Node Garbage Collection

## Context
The Foundry orchestrator relies on a heartbeat workflow to transition nodes from `ACTIVE` to `FAILED` if a session crashes silently. However, if the heartbeat workflow itself fails or if nodes get into an inconsistent state (e.g., marked `ACTIVE` but without a valid `jules_session_id`, or `jules_session_id` refers to a long-dead action run), these "zombie" nodes can block the entire Directed Acyclic Graph (DAG) indefinitely because their dependents will remain in `PENDING`.

## Proposal
Implement a garbage collection (GC) mechanism directly within `.github/scripts/foundry-orchestrator.ts` or as a new scheduled TPM script.
1. **Detect Zombies:** During the orchestrator run, sweep all nodes in the `.foundry` directory. If a node is in the `ACTIVE` state, verify that its `jules_session_id` corresponds to a currently running GitHub Action workflow. If the workflow does not exist or has finished, or if `jules_session_id` is null, flag the node as a zombie.
2. **Auto-Remediate:** Automatically transition detected zombie nodes from `ACTIVE` to `FAILED`. This will trigger the Resurrection Loop on the next orchestrator cycle, ensuring the task is re-queued and the DAG unblocks.

## Value Proposition
This enhancement significantly improves the resilience and self-healing capabilities of the Foundry system, reducing the need for manual TPM intervention to resolve DAG deadlocks caused by transient CI failures.

## Generated PRDs
- [ ] .foundry/prds/prd-079-050-foundry-zombie-node-cleanup.md
