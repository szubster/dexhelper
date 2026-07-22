---
id: prd-118-334-circular-dependency-detection
type: PRD
title: Circular Dependency Detection in DAG Orchestrator
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-07-20'
updated_at: '2026-07-20'
depends_on: []
jules_session_id: '9070248959047080232'
pr_number: null
parent: idea-118-orchestrator-circular-dependency-detection
tags:
  - foundry
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Circular Dependency Detection in DAG Orchestrator

## Context
The Foundry DAG Orchestrator currently resolves dependencies linearly to promote nodes from `PENDING` to `READY`. However, there is no inherent protection against circular dependencies (e.g., Node A depends on Node B, which depends on Node A). If agents accidentally introduce a circular dependency (which is explicitly warned against in `core_policies.md`), the affected nodes will become permanently deadlocked in the `PENDING` state, effectively rendering them invisible and preventing progress.

## Requirements
The orchestrator must be able to detect cycles in the dependency graph during its execution (e.g., in the MAP or RESOLVE phases).
1. Implement a cycle detection algorithm (such as a topological sort or a depth-first search with a visited/recursion stack) within `.github/scripts/foundry-orchestrator.ts`.
2. The orchestrator should evaluate all PENDING nodes and their `depends_on` relationships.
3. If a circular dependency is detected among `PENDING` nodes, the orchestrator should automatically transition the nodes involved in the cycle to `FAILED` status.
4. The orchestrator must append a standard `rejection_reason` (e.g., "Circular dependency detected") in the frontmatter of the failed nodes so that agents or maintainers can investigate and resolve the deadlock.
5. In `--dry-run` or `--strict` modes, the orchestrator should also output an explicit error message or log a clear warning regarding the detected cycle.

## Acceptance Criteria
- [ ] epic-334-335-circular-dependency-detection-epic
