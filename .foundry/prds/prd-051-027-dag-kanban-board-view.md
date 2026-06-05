---
id: prd-051-027-dag-kanban-board-view
type: PRD
title: DAG Kanban/Scrum Board View
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-05-19'
updated_at: '2026-05-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-051-dag-kanban-board-view
tags:
  - foundry
  - dag
  - visualization
  - board
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: DAG Kanban/Scrum Board View

## Overview
The DAG Kanban/Scrum Board View will provide an operational visualization of the Foundry DAG. It acts as an alternative/complement to the current DAG visualization (`idea-017-dag-dashboard`) that focuses more on structural dependencies rather than execution status. The board will prioritize showing "what is active", "what is blocked", and "who is assigned", making it easier to track project progress in a Kanban-style layout.

## Requirements

### Layout and Organization
1. **Columns by Status**: The board MUST group nodes into columns based on their operational `status`:
   - `PENDING`
   - `READY`
   - `ACTIVE`
   - `BLOCKED`
   - `COMPLETED`
   - `FAILED`
   - `CANCELLED`
2. **Swimlanes**: The board MUST support horizontal swimlanes to group nodes further. Users should be able to toggle between grouping by:
   - `owner_persona` (e.g., `coder`, `qa`, `architect`, `product_manager`).
   - `type` (e.g., `IDEA`, `PRD`, `EPIC`, `STORY`, `TASK`, `RESEARCH`).
3. **Roll-up Metrics**: Each column and swimlane intersection MUST display a count of nodes to provide an immediate summary of the workload.

### Node Cards
1. **Details**: Each node card MUST display its `id` (or `slug`), `title`, `owner_persona`, and `type`.
2. **Dependency Indicators**: Cards MUST feature visual badges or indicators showing the number of upstream (blocking) and downstream (blocked) dependencies.

### Interactivity
1. **Dependency Highlighting**: Clicking on a node's dependency badge MUST momentarily highlight related (upstream/downstream) cards across the board to visualize the dependency chain in the flat board layout.
2. **Integration**: This view MUST be integrated with the existing DAG Dashboard data structures and state management.

## Next Steps
- [x] Create an ADR defining the state management and integration approach of this board with the existing React Flow DAG viewer.
- [ ] Create EPICs to implement the UI layout, swimlanes logic, and interactive highlighting.
