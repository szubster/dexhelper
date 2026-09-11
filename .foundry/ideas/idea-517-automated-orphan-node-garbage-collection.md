---
id: idea-517-automated-orphan-node-garbage-collection
type: IDEA
title: Automated Orphan Node Garbage Collection
status: BLOCKED
owner_persona: tpm
created_at: '2026-09-04'
updated_at: '2026-09-09'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - maintenance
research_references: []
rejection_reason: '[ACKNOWLEDGED] ACTIVE node missing or malformed session ID'
locks: []
---

# Idea: Automated Orphan Node Garbage Collection

## Context
As the Foundry DAG evolves, particularly when complex nodes are cancelled or replaced through late-binding and impossible-loop workflows, nodes can occasionally become "orphaned." These are nodes that exist in the directory structure but are no longer referenced by any parent's `depends_on` array or `parent` field, yet remain in a non-terminal state (like `PENDING` or `READY`).

These orphaned nodes clutter the DAG visualizer, waste execution cycles if dispatched, and create semantic confusion for developers trying to understand active workflows. While `idea-079-foundry-zombie-node-cleanup` handles crashes of *active* sessions, it does not handle nodes structurally detached from the graph.

## Proposal
Implement an automated structural orphan detection and garbage collection (GC) mechanism.
1. **DAG Reachability Analysis:** During the `foundry-orchestrator.ts` sweep, or as a standalone scheduled script, traverse the DAG starting from root nodes (typically Epics or PRDs).
2. **Orphan Identification:** Any node that is not reachable from an active root node, and is not explicitly tagged as a root node itself, is flagged as an orphan.
3. **Automated Archival:** Automatically transition these orphaned nodes to `CANCELLED` and optionally move them to an `.foundry/archive/orphans/` directory, safely pruning dead branches from the active graph.

## Value Proposition
- Maintains a clean, accurate DAG visualization.
- Prevents wasted Jules tokens on structurally irrelevant tasks.
- Enforces strict graph hygiene autonomously, without manual TPM intervention.

## Acceptance Criteria
- [ ] prd-517-518-automated-orphan-node-garbage-collection
