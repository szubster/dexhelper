---
id: epic-045-072-refactor-views
type: EPIC
title: Refactor DagDashboard Views to consume DagContext
status: PENDING
owner_persona: story_owner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on:
  - epic-045-071-refactor-data-parsing-layer

jules_session_id: null
pr_number: null
parent: prd-073-045-refactor-dag-dashboard-context
tags:
  - ui
  - dashboard
  - react-flow
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor DagDashboard Views to consume DagContext

## Overview
With \`DagContext\` in place, the existing React Flow DAG visualizer (and any other DAG views) need to be refactored to consume data from this shared context instead of maintaining their own isolated state.

## Requirements
- Refactor the existing React Flow DAG visualizer to consume data from \`DagContext\`.
- Ensure that the visualizer correctly renders nodes and edges based on the context data.
- Ensure that any future views (Kanban, Permanent Failures) can seamlessly consume this context.
- Verify that there are no performance regressions due to the context refactoring.

## Acceptance Criteria
- [ ] Break down into Stories
