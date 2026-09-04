---
id: prd-148-521-orchestrator-priority-scheduling
type: PRD
title: PRD for Foundry Orchestrator DAG Priority Scheduling
status: READY
owner_persona: epic_planner
created_at: 2026-08-13
updated_at: 2026-08-13
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: idea-148-orchestrator-priority-scheduling
tags:
  - foundry
  - orchestrator
  - scheduling
  - optimization
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# PRD: Foundry Orchestrator DAG Priority Scheduling

## Overview
This PRD outlines the requirements for implementing a **Priority Scheduling Engine** in the Foundry DAG Orchestrator (`.github/scripts/foundry-orchestrator.ts`). Currently, all DAG nodes with an in-degree of zero are dispatched simultaneously, leading to GitHub Actions runner starvation, context fragmentation, and severe merge conflicts. This enhancement introduces a priority-based execution queue to ensure strategic, focused vertical slice delivery.

## Requirements

### Schema Updates
1. Introduce a new integer field `priority` to the Foundry node schema (`.foundry/docs/schema.md`).
2. The `priority` field should default to `50` if not explicitly specified.
3. A higher integer value denotes a higher priority (e.g., `100` executes before `50`).

### Orchestrator Engine Modifications
1. Refactor the Node discovery logic in `.github/scripts/foundry-orchestrator.ts`.
2. When parsing and queuing `READY` (in-degree zero) nodes, they must be sorted by their `priority` field in descending order before dispatching.
3. Node properties must successfully parse the new `priority` property and use a fallback mechanism if missing.

### Propagation Guidelines
1. Node templates should be updated to include `priority: 50` by default.
2. Parent nodes (like Epics) generating children should explicitly set elevated priority levels for child nodes on the critical path, allowing them to jump the queue.

## Acceptance Criteria
- [ ] Epic Planner: Break this PRD down into a comprehensive EPIC covering the schema update and orchestrator implementation.
