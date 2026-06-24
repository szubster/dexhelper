---
id: idea-051-dag-kanban-board-view
type: IDEA
title: DAG Kanban/Scrum Board View
status: COMPLETED
owner_persona: product_manager
created_at: '2026-05-14'
updated_at: '2026-05-21'
depends_on: []jules_session_id: null
parent: null
tags:
  - foundry
  - dag
  - visualization
  - board
notes: ''
rejection_reason: ''
---

# Idea: DAG Kanban/Scrum Board View

## Context
The current DAG graph visualization (`idea-017-dag-dashboard`) is useful for tracing complex dependency chains, but as the number of nodes grows, the graph becomes excessively wide and difficult to read. It fails to provide an immediate, digestible overview of the project's current operational state (e.g., "what's active right now?", "what's blocked?").

## Proposal
Introduce a Kanban/Scrum-style board view as an alternative or complementary visualization to the DAG diagram. This board would reorganize the nodes to prioritize operational status over structural relationships.

**Key Features:**
1. **Columns by Status:** Nodes are organized into columns based on their operational state: `PENDING`, `ACTIVE`, `BLOCKED`, `COMPLETED`, `FAILED`, `CANCELLED`.
2. **Swimlanes by Persona or Type:** Allow grouping rows by either `owner_persona` (e.g., `coder`, `qa`, `architect`) or node `type` (e.g., `IDEA`, `EPIC`, `TASK`).
3. **Dependency Indicators:** Since it's a flat board, nodes should feature visual badges indicating upstream/downstream dependencies. Clicking a badge could momentarily highlight related cards across the board.
4. **Roll-up Metrics:** Display counts for nodes within each column/swimlane intersection to provide an immediate summary of the workload.

## Next Steps
- [x] Convert this idea into a detailed PRD defining the board layout, interactions, and integration with the existing DAG Dashboard data structures.

- `.foundry/prds/prd-051-027-dag-kanban-board-view.md`
