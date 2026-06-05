---
id: task-053-124-retry-dependency-highlighting
type: TASK
title: Retry Implement Dependency Highlighting Interactions
status: COMPLETED
owner_persona: coder
created_at: '2026-05-20'
updated_at: '2026-05-20'
depends_on:
  - research-053-002-dependency-highlighting-failure
jules_session_id: null
pr_number: null
parent: story-029-053-implement-dependency-highlighting
tags:
  - dag
  - dashboard
  - ui
  - react-flow
research_references:
  - research-053-002-dependency-highlighting-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Retry Implement Dependency Highlighting Interactions

## Context & Requirements
This task replaces the permanently failed task `task-053-092-implement-dependency-highlighting.md`. The objective remains to build an interactive dependency highlighting feature for the React Flow DAG Dashboard. The previous implementation failed to fulfill the acceptance criteria.

The `coder` must carefully review the findings in the attached research node `.foundry/research/research-053-002-dependency-highlighting-failure.md` before proceeding.

## Technical Blueprint

1. **Review Research**:
   - Read `.foundry/research/research-053-002-dependency-highlighting-failure.md` to understand why the previous attempt failed and integrate its recommendations.

2. **Interaction Handling (React Flow)**:
   - Implement `onNodeClick` or `onNodeMouseEnter`/`onNodeMouseLeave` handlers in the React Flow component to track the currently "focused" or "selected" node ID in state.
   - Also provide a way to clear the selection (e.g., `onPaneClick`).

3. **Dependency Traversal Logic**:
   - Write a function to calculate the "highlight path". Given a selected `nodeId`, find:
     - The node itself.
     - All direct upstream connections (nodes that this node `depends_on`).
     - All direct downstream connections (nodes that have this node in their `depends_on`).

4. **Visual Styling updates**:
   - Dynamically update the styling of Nodes and Edges based on the selection state.
   - **No Selection:** Default styling for all nodes and edges.
   - **Active Selection:**
     - **Highlighted Elements:** Apply a prominent style (e.g., high opacity, distinct border color).
     - **Dimmed Elements:** Apply a faded style to nodes and edges that are *not* part of the calculated highlight path.
   - **Tactical Aesthetic Constraint:** Ensure all highlighted and dimmed styles adhere to ADR 008 (no soft shadows, sharp edges, dashed borders, monospace fonts).

5. **Integration**:
   - Ensure this highlighting logic works harmoniously with the graph filtering logic implemented in previous tasks. Only visible nodes should participate in highlighting.

## Acceptance Criteria
- [x] Implement state management to track the currently selected/focused node.
- [x] Implement traversal logic to identify upstream and downstream connections for a node.
- [x] Apply visual styles to highlight the active path and dim unrelated nodes/edges, adhering to the tactical aesthetic.
- [x] Ensure selection can be cleared (e.g., clicking the background).
- [x] Add unit tests to verify the traversal logic correctly identifies dependencies.
