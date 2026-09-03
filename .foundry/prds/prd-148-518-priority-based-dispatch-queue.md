---
id: prd-148-518-priority-based-dispatch-queue
type: PRD
title: Priority-Based Dispatch Queue for Orchestrator
status: READY
owner_persona: epic_planner
created_at: '2026-09-03'
updated_at: '2026-09-03'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-148-priority-based-dispatch-queue
tags:
  - orchestrator
  - scheduling
  - pipeline
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Priority-Based Dispatch Queue for Orchestrator

## Context & Problem Statement
Currently, the Foundry Orchestrator transitions nodes from `PENDING` to `READY` when their dependencies are met, and dispatches them in an arbitrary or timestamp-based order. This allows low-value nodes to consume runner slots, starving critical path nodes. A priority-based scheduling mechanism is needed to ensure optimal resource utilization and pipeline throughput.

## Functional Requirements
1. **Schema Update (`schema.ts` & `schema.md`)**:
   - Add an optional `priority` integer field to `NodeFrontmatterSchema`.
   - Update `schema.md` to document the new `priority` field in the frontmatter specification (default 0).
2. **Orchestrator Dispatch Logic (`foundry-orchestrator.ts`)**:
   - Update `ReadyNodeItem` interface to include `priority` (integer).
   - In the sorting logic, sort READY nodes first by `priority` descending, then by `critical_weight` descending, and lastly by `created_at` or `id`.
3. **Priority Inheritance**:
   - Allow downstream Epics, Stories, and Tasks generated from an Epic to inherit the `priority` field if specified on the parent.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into EPIC nodes that address schema updates and orchestrator logic updates respectively.
