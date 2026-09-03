---
id: idea-148-priority-based-dispatch-queue
type: IDEA
title: Priority-Based Dispatch Queue for Orchestrator
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-14'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: '7152446436725615922'
pr_number: null
parent: null
tags:
  - orchestrator
  - scheduling
  - pipeline
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Priority-Based Dispatch Queue for Orchestrator

## Context & Problem Statement
Currently, the Foundry Orchestrator transitions nodes from `PENDING` to `READY` when their dependencies are met, and dispatches them in an arbitrary or timestamp-based order. As the autonomous factory scales and the DAG becomes wider, non-critical, exploratory, or low-value nodes (like minor UI tweaks or isolated research tasks) can consume available `jules` runner slots, starving the critical path nodes (e.g., core infrastructure tasks or blocker bug fixes).

To ensure optimal resource utilization and pipeline throughput, we need a mechanism to signal the relative importance of nodes to the orchestrator.

## Proposed Solution
Introduce a priority-based scheduling mechanism into the orchestrator.

1. **Schema Update:** Add an optional `priority` integer field to the YAML frontmatter schema. By default, nodes are priority `0`. A higher integer (e.g., `10`, `100`) indicates a higher priority. A lower integer (e.g., `-10`) indicates a background task.
2. **Orchestrator Dispatch Logic Update:** In `.github/scripts/foundry-orchestrator.ts`, modify the dispatch logic. When iterating through the queue of `READY` nodes, sort them by `priority` (descending) before selecting which ones to assign to `ACTIVE` Jules sessions.
3. **Priority Inheritance:** The Orchestrator should optionally support priority inheritance, where an `EPIC` with a high priority passes that priority down to all its dynamically generated `STORY` and `TASK` descendant nodes.

## Value Proposition
This enhancement will allow Product Managers and TPMs to steer the multi-agent pipeline efficiently, ensuring that blockers and critical path features are dispatched before exploratory or low-priority tasks. It optimizes the operational cost and lead time of high-value features.

## Acceptance Criteria
- [ ] Product Manager: Draft a PRD outlining the exact changes required to `schema.md` and `foundry-orchestrator.ts`.
