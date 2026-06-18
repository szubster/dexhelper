---
id: story-029-052-implement-graph-filtering
type: STORY
title: Implement Graph Filtering UI Controls
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-05-14'
updated_at: '2026-05-16'
depends_on:
  - story-029-051-implement-core-graph-visualization
jules_session_id: null
pr_number: null
parent: epic-017-029-dag-dashboard-ui
tags:
  - dag
  - dashboard
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Graph Filtering UI Controls

## Overview
Following the implementation of the core graph visualization for the DAG Dashboard, this story focuses on adding interactive filtering controls. These controls will allow users to filter the visible nodes by their type (e.g., IDEA, EPIC, STORY, TASK) or status (e.g., PENDING, READY, ACTIVE, COMPLETED), improving the readability and navigability of large graphs.

## Requirements
- Implement UI controls (e.g., dropdowns, toggle buttons) for filtering the graph.
- Support filtering by `type` (IDEA, PRD, EPIC, STORY, TASK).
- Support filtering by `status` (PENDING, READY, ACTIVE, COMPLETED, FAILED, BLOCKED, CANCELLED).
- Ensure the filtering logic efficiently updates the React Flow graph state to show/hide nodes and their connecting edges appropriately.
- Adhere to the 'tactical hardware/snooping' aesthetic (sharp edges, dashed borders, monospaced fonts) for the new UI controls as specified in ADR 008.

## Acceptance Criteria
- [x] Create UI components for filtering by node type and status.
- [x] Integrate filtering logic with the React Flow graph component state.
- [x] Ensure edges are updated correctly when nodes are filtered out (e.g., hiding edges connected to hidden nodes).
- [x] Verify that the styling of the filter controls matches the project's strict design system requirements.

## Tasks
- [.foundry/archive/tasks/task-052-090-implement-graph-filtering.md](../tasks/task-052-090-implement-graph-filtering.md)
- [.foundry/archive/tasks/task-052-091-qa-graph-filtering.md](../tasks/task-052-091-qa-graph-filtering.md)
