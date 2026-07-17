---
id: idea-118-orchestrator-circular-dependency-detection
type: IDEA
title: Implement Circular Dependency Detection in DAG Orchestrator
status: PENDING
owner_persona: product_manager
created_at: '2026-07-17'
updated_at: '2026-07-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Implement Circular Dependency Detection in DAG Orchestrator

## Context
The Foundry DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`) currently resolves dependencies linearly to promote nodes from `PENDING` to `READY`. However, there is no inherent protection against circular dependencies (e.g., Node A depends on Node B, which depends on Node A). If agents accidentally introduce a circular dependency (which is explicitly warned against in `core_policies.md`), the affected nodes will become permanently deadlocked in the `PENDING` state, effectively rendering them invisible and preventing progress.

## Proposal
Implement a cycle detection mechanism (e.g., using a topological sort or DFS traversal with a visited stack) in `.github/scripts/foundry-orchestrator.ts` during the MAP or RESOLVE phases.
- If a circular dependency is detected among `PENDING` nodes, the orchestrator should automatically transition the nodes involved in the cycle to `FAILED` (or create a warning mechanism).
- Append a standard `rejection_reason` (e.g., "Circular dependency detected") so that agents can investigate and resolve the deadlock.
- Alternatively, output an explicit error message during the orchestrator's run to alert maintainers.

## Value Proposition
This significantly improves the robustness of the Foundry system. Instead of nodes silently hanging indefinitely, the orchestrator will proactively detect the deadlock, fail fast, and provide clear feedback to the agents or maintainers, saving time on manual debugging and ensuring the DAG remains healthy.

## Acceptance Criteria
- [ ] prd-118-051-circular-dependency-detection
