---
id: task-051-087-implement-core-graph-visualizer
type: TASK
title: Implement Core Graph Visualizer Component
status: COMPLETED
owner_persona: coder
created_at: '2026-05-14'
updated_at: '2026-05-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-029-051-implement-core-graph-visualization.md
tags:
  - dag
  - dashboard
  - ui
research_references: []
rejection_count: 1
rejection_reason: >-
  Implementation violates ADR 008 tactical aesthetic constraints. The DagNode
  component passes a className with "rounded-t" to TelemetryDecoration, which
  violates the strict "rounded-none" requirement.
notes: ''
---

# Implement Core Graph Visualizer Component

## Overview
As per Story 051, you are tasked with implementing the core graph visualization component for the DAG Dashboard using React Flow. This component is responsible for rendering the nodes and edges representing the Foundry DAG.

## Requirements
1. **React Flow Integration:** Use React Flow as chosen in ADR 008.
2. **Node Rendering:** Create custom React Flow node components. Each node MUST display the following data passed into it:
    - `id`
    - `type`
    - `status`
    - `owner_persona`
3. **Styling constraints:** You MUST adhere strictly to the "tactical hardware/snooping" aesthetic outlined in ADR 008.
    - Sharp edges (`rounded-none`).
    - Dashed borders (`border-dashed`).
    - Monospaced telemetry fonts (e.g. `font-mono`).
    - Explicitly AVOID generic visual patterns like soft shadows or rounded corners.
4. **Edge Rendering:** Ensure directed edges are rendered to represent the dependencies (`depends_on`).
5. **Basic Layout:** Ensure the component accepts nodes and edges and renders them effectively. React Flow comes with some basic layout capabilities, or use dagre/elkjs if necessary, but keep it readable for moderate node counts.

## Acceptance Criteria
- [x] Implement a core graph React component using React Flow.
- [x] Create a custom node component that explicitly renders `id`, `type`, `status`, and `owner_persona`.
- [x] Enforce the "tactical hardware" aesthetic for custom nodes using Tailwind CSS (`rounded-none`, `border-dashed`, `font-mono`).
- [x] Ensure the core component can accept and render both nodes and their directed dependency edges.
