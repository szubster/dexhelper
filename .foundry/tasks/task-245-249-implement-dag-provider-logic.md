---
id: task-245-249-implement-dag-provider-logic
type: TASK
title: Implement DagProvider Logic and State Management
status: COMPLETED
owner_persona: coder
created_at: '2026-06-30'
updated_at: '2026-07-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-070-245-implement-dag-provider-state-management
tags:
  - architecture
  - ui
  - context
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement DagProvider Logic and State Management

## Context
As mandated by ADR 013 and ADR 017, the core DAG data state must be lifted into a shared React Context (`DagContext`) to serve as a single source of truth for all DAG views (React Flow graph, Kanban Board, Permanent Failure Dashboard). Currently, `DagProvider` exists but does not actually fetch or manage the core DAG data state (nodes, edges), nor does it wrap the DAG views.

## Requirements
1. **State Management**: Implement the logic within `DagProvider` to fetch and manage the core DAG data state (nodes, edges). You should utilize the parsing utility that reads the `.foundry` markdown files to populate this state.
2. **View Wrapping**: Ensure that `DagProvider` correctly wraps the DAG views (e.g., `GraphView`, `KanbanView`) so they can consume the shared context.
3. **Architectural Scaffolding**: Ensure the React Context layer is fully defined and correctly integrated before adjusting the UI components to consume it. This is to prevent tight coupling and permanent failures.

## Contracts & Guidelines
*   **Transient Failures**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`.
*   **Permanent Failures**: If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`.
*   **Empty PRs**: If you submit an empty PR for a completed task (e.g., the target artifact already exists and matches the required state), you MUST check off all Acceptance Criteria checkboxes before submitting.

## Acceptance Criteria
- [x] Implement data fetching and state management logic in `DagProvider`.
- [x] Wrap the DAG views with `DagProvider`.
- [x] Ensure `DagProvider` provides the correct data structure required by ADR 013 and ADR 017.
