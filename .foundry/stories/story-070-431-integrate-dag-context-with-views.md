---
id: story-070-431-integrate-dag-context-with-views
type: STORY
title: Integrate DagContext with Views
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-19'
updated_at: '2026-08-21'
depends_on:
  - story-070-245-implement-dag-provider-state-management
jules_session_id: null
pr_number: null
parent: epic-045-070-implement-dag-context
tags:
  - architecture
  - ui
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Integrate DagContext with Views

## Overview
This story ensures that the DAG views (like React Flow GraphView) are correctly updated to consume the `DagContext` data. This is part of the refactoring to lift the core state up so multiple DAG dashboards can share a single source of truth.

## Requirements
- Update `DagProvider` (or ensure it is updated) to actually implement the missing fetching logic and fully manage the core DAG data state.
- The existing React Flow DAG visualizer should consume `nodes` and `edges` from `DagContext`.
- Ensure no view is managing its own isolated DAG fetching logic anymore.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-431-447-integrate-dag-context-with-views-impl
- [x] task-431-448-integrate-dag-context-with-views-qa
