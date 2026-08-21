---
id: task-431-447-integrate-dag-context-with-views-impl
type: TASK
title: Integrate DagContext with Views Implementation
status: READY
owner_persona: coder
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-431-integrate-dag-context-with-views
tags:
  - architecture
  - ui
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Integrate DagContext with Views Implementation

## Overview
This task is to implement the requirements of `story-070-431-integrate-dag-context-with-views`. The goal is to ensure that the DAG views (specifically the React Flow `DagDashboard`) correctly consume `DagContext` data, and that `DagProvider` actually implements the missing fetching logic to fully manage the core DAG data state.

## Requirements
1. **Update `DagProvider`:**
   - Ensure that `DagProvider` in `src/components/dashboard/DagContext.tsx` fully manages the core DAG data state (`nodes`, `edges`, `isLoading`).
   - It should fetch the DAG data (using existing utilities like `buildDagGraph` or parsing utilities) and update its internal state (`setNodes`, `setEdges`).

2. **Update `DagDashboard`:**
   - The React Flow DAG visualizer (`src/components/dag/DagDashboard.tsx`) must consume `nodes` and `edges` from `useDagContext()`.
   - Ensure `DagDashboard` (or any other view) is NOT managing its own isolated DAG fetching logic. It should rely solely on the data provided by `DagContext`.

3. **Testing & Integration:**
   - Write or update necessary unit tests for `DagProvider` to ensure it fetches and provides data correctly.
   - Write or update tests for `DagDashboard` to ensure it correctly renders nodes/edges consumed from the context.
   - Make sure no view has duplicated fetching logic.

## Acceptance Criteria
- [ ] `DagProvider` fetches and manages `nodes` and `edges` state.
- [ ] `DagDashboard` correctly consumes data from `DagContext` and displays it.
- [ ] No isolated fetching logic remains in individual view components.
- [ ] Tests for `DagProvider` and `DagDashboard` are updated and passing.
