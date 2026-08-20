---
id: idea-418-replace-xyflow-with-custom-dag
type: IDEA
title: "Replace @xyflow/react with a lightweight directory tree visualization"
status: PENDING
owner_persona: product_manager
created_at: "2026-08-19"
updated_at: "2026-08-19"
depends_on: []
jules_session_id: null
parent: null
tags:
  - performance
  - bundle-size
  - memory
  - architecture
  - ui-ux
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Replace @xyflow/react with a lightweight directory tree visualization

## Context
The application currently uses `@xyflow/react` to render the interactive Foundry DAG visualization (`DagDashboard.tsx`).
While robust, the inclusion of `@xyflow/react` comes with a massive bundle size cost. Running `pnpm run build --mode analysis` reveals that the `xyflow` chunk accounts for 175.87 kB (56.82 kB gzipped), making it one of the largest dependencies in the entire application, alongside React itself.

Furthermore, `@xyflow/react` is designed for highly complex, editable node graphs. In our context, the DAG nodes are primarily read-only (with basic filtering and highlighting) and their layout is already statically computed top-down by `dagre` in `DagContext.tsx`. The overhead of ReactFlow's internal state management, physics, and complex DOM mounting leads to unnecessary memory allocation and DOM element bloat for hundreds of nodes.

Beyond technical performance, as the DAG grows in size, it becomes visually overwhelming and difficult to navigate. A massive 2D canvas of nodes is hard to parse for users trying to understand specific task hierarchies.

Previously, a similar optimization was applied to `BattleFrontierDashboard.tsx`, where 7 disconnected nodes were migrated from `@xyflow/react` to standard React flexbox, drastically shrinking the bundle.

## Proposal
Replace `@xyflow/react` entirely with a lightweight, standard DOM-based directory tree visualization.
1. **Remove the dependency:** Uninstall `@xyflow/react` and remove its chunk configurations from `vite.config.ts`.
2. **Remove Dagre:** Since we are moving away from a 2D canvas layout, `dagre` is no longer needed for coordinate calculation and can also be uninstalled, further reducing bundle size.
3. **Custom Rendering:** Build a new `DagTree` component that renders the nodes in a nested list format (like a file explorer).
    - Nodes can be rendered as expandable/collapsible lists (`<ul>`/`<li>`) using standard React and Tailwind CSS.
    - Dependencies can be visually represented through indentation and parent-child nesting.
4. **Interactivity:** Implement standard expanding/collapsing of node branches, which is significantly cheaper than 2D canvas pan/zoom interactions.
5. **MiniMap & Controls:** Remove the minimap (as it's unnecessary for a scrollable tree) and replace canvas controls with simple 'Expand All' / 'Collapse All' toggles.

## Value Proposition
- **Bundle Size:** Eliminating 175.87 kB (from `@xyflow/react`) plus the size of `dagre` from the initial load, providing significantly faster Time To Interactive (TTI), particularly on low-end devices or slow networks.
- **Memory & CPU Optimization:** Bypassing ReactFlow's complex internal object lifecycles, event bus, and `dagre` layout computations drastically reduces memory allocations and initial render blocking time.
- **Improved UX for Large Graphs:** A collapsible directory tree is far easier to read, search, and navigate for large, deeply nested hierarchical data than a massive 2D graph canvas.
- **Simpler Dependency Tree:** Reducing third-party lock-in and the need to parse large external CSS files (`@xyflow/react/dist/style.css`).

## Next Steps
- [ ] prd-418-replace-xyflow-with-custom-dag