---
id: prd-073-045-refactor-dag-dashboard-context
type: PRD
title: Refactor DagDashboard to use React Context (ADR 013/017)
status: READY
owner_persona: epic_planner
created_at: '2026-06-10'
updated_at: '2026-06-10'
depends_on: []
jules_session_id: null
parent: idea-073-refactor-dag-dashboard-context
tags:
  - architecture
  - ui
  - dashboard
rejection_count: 0
rejection_reason: ''
---

# Refactor DagDashboard to use React Context (ADR 013/017)

## Overview
Recent implementation attempts permanently failed because the state was left tightly coupled within `DagDashboard.tsx`. ADR 013 (Kanban Board State Management) and ADR 017 (Permanent Failure Dashboard) require the core DAG data state to be lifted out of the isolated component and into a shared React Context (or global store). This single source of truth will be consumed by multiple views (Graph View, Board View, Permanent Failures).

## Requirements
- Create a `DagContext` to manage the core DAG data state (nodes, edges).
- The `DagContext` must be the single source of truth for the DAG data.
- Refactor the existing React Flow DAG visualizer to consume data from `DagContext`.
- Ensure the state structure supports future views like the Kanban Board and Permanent Failure Dashboard.
- Extract `rejection_count` from node frontmatter during data parsing so it is available in the shared context (as per ADR 017).

## Acceptance Criteria
- [ ] Break down into Epics
