---
id: task-120-236-refactor-dagdashboard-context-impl
type: TASK
title: Refactor DagDashboard and DagProvider to use DagContext
status: PENDING
owner_persona: coder
created_at: '2026-06-28'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-078-120-integrate-dag-context-with-views
tags:
  - refactor
  - dashboard
  - state-management
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor DagDashboard and DagProvider to use DagContext

## Objective
Refactor `DagDashboard` to consume the unified DAG data (nodes, edges, and loading state) from `DagContext` instead of managing it locally. Update `DagProvider` to handle data fetching and layout logic.

## Context
Following ADR 013, we need to unify the DAG data state management into `DagContext`. Currently, `DagDashboard` fetches data and manages `nodes`, `edges`, and `isLoading` locally. The new Kanban board view will also need access to this data. To support both views efficiently, the data fetching and layout derivation must be lifted up to `DagProvider`, and `DagDashboard` must consume it via `useDagContext()`.

## Requirements
- Move the `loadData` function, fetch logic, and `getLayoutedElements` from `DagDashboard.tsx` into `DagProvider` in `DagContext.tsx`.
- Update `DagProvider` to manage the fetching side-effects (`useEffect`) and layout generation, setting its internal state (`nodes`, `edges`, `isLoading`).
- Update `DagDashboard.tsx` to use `useDagContext()` and consume `nodes`, `edges`, and `isLoading`. Remove its local `useState` and `useEffect` for data loading.
- Ensure integration tests in `DagDashboard.test.tsx` pass with these changes. Ensure rendering components are properly integrated into the application's view hierarchy.

## Developer Notes
- If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
- If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
- If you submit an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [ ] Move fetching and layout logic from `DagDashboard` to `DagProvider`.
- [ ] `DagDashboard` consumes state from `useDagContext()`.
- [ ] Existing functionality works as before and tests pass.
