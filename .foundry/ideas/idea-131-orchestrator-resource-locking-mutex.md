---
id: idea-131-orchestrator-resource-locking-mutex
type: IDEA
title: Implement Resource Locking (Mutex) in DAG Orchestrator
status: ACTIVE
owner_persona: product_manager
created_at: '2026-07-31'
updated_at: '2026-08-07'
depends_on: []
jules_session_id: '7649435094531398053'
pr_number: null
parent: null
tags:
  - orchestrator
  - architecture
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Implement Resource Locking (Mutex) in DAG Orchestrator

## Context
As the Foundry multi-agent pipeline scales, multiple active agents may attempt to modify the same shared resources (e.g., global configuration files, aggregated index files, or specific node files) concurrently. We've seen issues such as git merge conflicts on `.foundry/journals/*.md` files, which sparked idea-120 (Conflictless Agent Journals). However, the core issue of concurrent resource contention remains in the DAG orchestrator.

## Proposal
Introduce a formal "Resource Locking" (Mutex) mechanism within the DAG orchestrator.
- **Resource Declarations:** Nodes (Tasks, Stories) can declare specific file paths or directories they need exclusive access to in a new `locks` field in their YAML frontmatter.
- **Mutex Engine:** During the `RESOLVE` phase, the orchestrator checks if any currently `ACTIVE` node holds a lock on a requested resource. If so, the `READY` node is temporarily blocked from being dispatched until the lock is released.
- **Deadlock Prevention:** Implement a simple timeout or cycle detection for locks to prevent deadlocks.

## Value Proposition
This ensures that multiple agents do not stomp on each other's work or cause complex git merge conflicts when dealing with central configuration or index files. It moves the Foundry from simple state tracking to true concurrent execution safety.

## Next Steps
- [x] Product Manager: Draft a PRD outlining the YAML schema changes and the orchestrator logic for lock acquisition and release.

## Acceptance Criteria
- [ ] prd-131-340-orchestrator-resource-locking-mutex
