---
id: epic-334-338-circular-dependency-detection
type: EPIC
title: Circular Dependency Detection
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-20'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: '18049671747854914907'
pr_number: null
parent: prd-118-334-circular-dependency-detection
tags:
  - foundry
  - orchestrator
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Circular Dependency Detection

## Context
The Foundry DAG Orchestrator currently resolves dependencies linearly. Without cycle detection, agents accidentally introducing circular dependencies (e.g., Node A depends on Node B, which depends on Node A) will cause those nodes to be permanently deadlocked in the `PENDING` state, rendering them invisible and halting progress.

## Requirements
Implement robust circular dependency detection during the MAP or RESOLVE phases of the DAG orchestrator execution in `.github/scripts/foundry-orchestrator.ts`. The algorithm (such as a topological sort or DFS with a recursion stack) must properly evaluate all `PENDING` nodes and their `depends_on` relationships. If a circular dependency is detected, the orchestrator should immediately transition the involved nodes to a `FAILED` status and append a descriptive `rejection_reason` (e.g., "Circular dependency detected") in the frontmatter. Additionally, running the orchestrator in `--dry-run` or `--strict` modes should output explicit warnings or error logs detailing the detected cycle.

## Acceptance Criteria
- [x] story-338-336-implement-orchestrator-cycle-detection
- [x] story-338-356-circular-dependency-detection-e2e
