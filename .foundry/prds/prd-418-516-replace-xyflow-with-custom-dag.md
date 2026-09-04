---
id: prd-418-516-replace-xyflow-with-custom-dag
type: PRD
title: Replace @xyflow/react with a lightweight directory tree visualization
status: READY
owner_persona: epic_planner
created_at: '2026-09-02'
updated_at: '2026-09-02'
depends_on: []
jules_session_id: null
parent: idea-418-replace-xyflow-with-custom-dag
tags:
  - performance
  - bundle-size
  - memory
  - architecture
  - ui-ux
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Replace @xyflow/react with a lightweight directory tree visualization

## 1. Context and Problem Statement
The application currently uses `@xyflow/react` to render the interactive Foundry DAG visualization (`DagDashboard.tsx`).
The inclusion of `@xyflow/react` comes with a massive bundle size cost, accounting for 175.87 kB (56.82 kB gzipped) of the Vite bundle. Alongside React itself, this makes it one of the largest dependencies in the application.

Additionally, `@xyflow/react` is designed for editable node graphs, which leads to unnecessary memory allocation and DOM element bloat for our DAG dashboard, where nodes are primarily read-only. We currently use `dagre` to statically compute layouts top-down, but the massive 2D canvas of nodes is hard to parse as the DAG grows in size.

## 2. Objectives and Success Criteria
- Completely replace `@xyflow/react` and `dagre` dependencies to improve the Time To Interactive (TTI).
- Build a new `DagTree` custom component that renders the nodes in a nested, standard DOM-based list format (like a file explorer).
- Represent dependencies visually through indentation and parent-child nesting.
- Improve the User Experience (UX) for large graphs by allowing users to expand and collapse node branches rather than scrolling across a massive 2D canvas.
- Replace canvas controls with simple 'Expand All' / 'Collapse All' toggles.

## 3. Scope and Requirements
### In Scope
- Uninstalling `@xyflow/react` and `dagre`.
- Removing `xyflow` chunk configurations from `vite.config.ts`.
- Creating a `DagTree` component with an expandable/collapsible list structure (`<ul>`/`<li>`) using Tailwind CSS.
- Removing the current minimap and old canvas pan/zoom interactions.
- Integrating standard 'Expand All' / 'Collapse All' functionality.
- Maintaining the basic filtering and highlighting functionalities for nodes.

### Out of Scope
- Adding node editing capabilities.
- Redesigning the entire DAG application beyond the DAG dashboard visualization.

## 4. Technical Constraints
- The new `DagTree` visualization must be lightweight, using standard React flexbox and DOM nodes, similarly to the previous optimization applied to `BattleFrontierDashboard.tsx`.
- Styling must follow the "tactical hardware/snooping" aesthetic outlined in ADR 008 (sharp edges `rounded-none`, dashed borders, monospaced telemetry fonts).

## Acceptance Criteria
- [ ] Time To Interactive is significantly reduced due to the removal of `@xyflow/react` and `dagre`.
- [ ] The DAG is displayed as a nested, DOM-based directory tree instead of a 2D canvas.
- [ ] epic-516-530-replace-xyflow-core
- [ ] Node branches can be expanded and collapsed, and 'Expand All' / 'Collapse All' controls are functional.
- [ ] The UI adheres to the tactical hardware aesthetic (sharp edges, dashed borders, monospaced fonts).
