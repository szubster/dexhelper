---
id: adr-013-kanban-board-state-management
type: ADR
title: 'ADR 013: Kanban Board State Management and Integration'
status: COMPLETED
owner_persona: architect
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - foundry
  - architecture
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---
# ADR 013: Kanban Board State Management and Integration

## Date
2026-05-19

## Status
Accepted

## Context
We are implementing a DAG Kanban/Scrum Board View to provide an operational visualization of the Foundry DAG (PRD: `prd-051-027-dag-kanban-board-view`). This board will group nodes into columns based on `status`, support swimlanes (`owner_persona` or `type`), and require interactive dependency highlighting.

The existing DAG visualization (`idea-017-dag-dashboard`) uses React Flow (ADR 008) and relies on state management tailored for a spatial node/edge graph layout. We need to define how the new Kanban board integrates with the existing data structures and state management.

## Decision
1.  **Shared Data Source:** The Kanban Board MUST consume the same raw parsed DAG data as the React Flow DAG visualizer to ensure consistency. The data fetching/parsing layer (which reads the `.foundry` markdown files and outputs node/edge data) will act as the single source of truth.
2.  **Separate UI Component, Shared Context:** The Kanban Board will be a distinct, sibling React component to the React Flow visualizer. We will lift the core DAG data state (nodes, edges) into a shared React Context (or existing global state store if applicable) so that both views have access to the same underlying data without redundant fetching or parsing.
3.  **View Toggle:** A high-level toggle control will switch the dashboard UI between the "Graph View" (React Flow) and the "Board View" (Kanban).
4.  **Board State Derivation:** The Kanban Board will derive its layout (columns and swimlanes) entirely by mapping/reducing the shared node data. It will not require its own persistent state for layout beyond user preferences (e.g., currently selected swimlane grouping).
5.  **Interactivity Integration:**
    *   **Dependency Highlighting:** To support highlighting dependencies when a node's badge is clicked in the board view, we will leverage the shared edge data. The board component will calculate the full upstream/downstream closure of the clicked node using the shared edges list and apply a transient "highlighted" style to the corresponding DOM elements in the board. This logic will be separate from React Flow's internal state but will produce a visually consistent result.

## Consequences
*   **Positive:** Single source of truth for DAG data ensures both views are always synchronized.
*   **Positive:** Lifting state allows seamless toggling between views without data reloading.
*   **Positive:** The board logic remains decoupled from the specific complexities of React Flow, making it simpler to implement and test as a pure data-driven UI.
*   **Negative:** Requires refactoring the current data fetching/state logic out of the React Flow component and into a higher-level context if it is not already structured that way.
