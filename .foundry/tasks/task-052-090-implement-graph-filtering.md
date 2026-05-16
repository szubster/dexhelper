---
id: task-052-090-implement-graph-filtering
type: TASK
title: Implement Graph Filtering UI Controls
status: COMPLETED
owner_persona: coder
created_at: '2026-05-16'
updated_at: '2026-05-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-029-052-implement-graph-filtering.md
tags:
  - dag
  - dashboard
  - ui
  - react-flow
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Graph Filtering UI Controls

## Context & Requirements
This task is part of Story 052. The objective is to build UI controls to filter the React Flow nodes and edges in the DAG Dashboard based on node `type` and node `status`. The controls must strictly follow the "tactical hardware/snooping" aesthetic described in ADR 008.

## Technical Blueprint

1. **Create Filter UI Components**:
   - Build a control panel overlay containing toggles or dropdowns for filtering nodes.
   - You must support filtering by `type`: `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`.
   - You must support filtering by `status`: `PENDING`, `READY`, `ACTIVE`, `COMPLETED`, `FAILED`, `BLOCKED`, `CANCELLED`.
   - **Styling Requirements:** Adhere strictly to the project's tactical hardware aesthetic (ADR 008). Use sharp edges (`rounded-none`), monospace fonts, and dashed borders where appropriate (e.g., `border border-dashed`). Avoid standard, rounded web patterns.

2. **Integrate with React Flow State**:
   - Store the selected filter criteria in the state (e.g., using React state or Zustand, matching the rest of the application's patterns).
   - Apply the filter logic to the nodes array passed to React Flow.
   - Hide nodes that do not match the selected filters (`type` and `status`).
   - Hide any edges connected to hidden nodes to avoid dangling edge lines.

3. **Performance & Rendering**:
   - Ensure the filtering operation is performant, given that graphs can have moderate node counts. Re-evaluate graph rendering strategies if performance becomes an issue during development, but base the implementation on standard React Flow filtering mechanisms.

## Acceptance Criteria
- [x] Implement filter controls for node `type` and `status` using the tactical UI aesthetic.
- [x] Connect the controls to filter the nodes rendered in React Flow.
- [x] Hide edges that are attached to nodes that are currently filtered out.
- [x] Add unit tests verifying the filtering logic correctly hides nodes and updates the view.
