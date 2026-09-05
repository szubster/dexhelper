---
id: idea-148-orchestrator-priority-scheduling
type: IDEA
title: Foundry Orchestrator DAG Priority Scheduling
status: ACTIVE
owner_persona: product_manager
created_at: '2026-08-13'
updated_at: '2026-09-04'
depends_on: []
jules_session_id: '7614936305548505962'
pr_number: null
parent: null
tags:
  - foundry
  - orchestrator
  - scheduling
  - optimization
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Foundry Orchestrator DAG Priority Scheduling

## Context & Problem Statement
Currently, the Foundry orchestrator (`.github/scripts/foundry-orchestrator.ts`) parses the DAG and blindly dispatches all nodes with an in-degree of zero in parallel. When the DAG experiences a "horizontal explosion"—for example, breaking an Epic into dozens of parallel Stories and Tasks—the orchestrator queues them all simultaneously. This causes several issues:
1. **Runner Starvation:** The GitHub Actions matrix gets flooded, hitting concurrency limits and blocking other CI tasks.
2. **Context Fragmentation:** The system works on 20 unrelated things at once rather than completing full vertical slices (Feature A, then Feature B).
3. **Merge Conflict Storms:** Having too many agents touching the codebase in parallel drastically increases the likelihood of Git conflicts and failed merges.

## Proposed Solution
Introduce a **Priority Scheduling Engine** into the orchestrator:
1. Add a `priority` integer field to the standard `.foundry/docs/schema.md` node definition (defaulting to 0 or 50).
2. Refactor `foundry-orchestrator.ts` so that when identifying READY nodes (in-degree zero), it sorts them by `priority` descending.
3. Allow higher-level nodes (like Epics) to dictate the priority of their generated children, creating focused "vertical slice" execution paths.

## Value Proposition
This enhancement transitions the autonomous software factory from naive parallel execution to focused, strategic delivery. It prioritizes critical path tasks, minimizes git merge conflicts, and ensures that the most important features are delivered end-to-end first, while still maximizing Jules agent utilization.

## Acceptance Criteria
- [x] Product Manager: Draft a comprehensive PRD detailing the schema changes and priority scheduling algorithm.
- [ ] prd-148-521-orchestrator-priority-scheduling
