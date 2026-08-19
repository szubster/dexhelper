---
id: idea-418-replace-xyflow-with-custom-dag
type: IDEA
title: "Replace @xyflow/react with a lightweight custom DAG implementation"
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
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Idea: Replace @xyflow/react with a lightweight custom DAG implementation

## Context
The application currently uses `@xyflow/react` to render the interactive Foundry DAG visualization (`DagDashboard.tsx`).
While robust, the inclusion of `@xyflow/react` comes with a massive bundle size cost. Running `pnpm run build --mode analysis` reveals that the `xyflow` chunk accounts for 175.87 kB (56.82 kB gzipped), making it one of the largest dependencies in the entire application, alongside React itself.

Furthermore, `@xyflow/react` is designed for highly complex, editable node graphs. In our context, the DAG nodes are primarily read-only (with basic filtering and highlighting) and their layout is already statically computed top-down by `dagre` in `DagContext.tsx`. The overhead of ReactFlow's internal state management, physics, and complex DOM mounting leads to unnecessary memory allocation and DOM element bloat for hundreds of nodes.

Previously, a similar optimization was applied to `BattleFrontierDashboard.tsx`, where 7 disconnected nodes were migrated from `@xyflow/react` to standard React flexbox, drastically shrinking the bundle.

## Proposal
Replace `@xyflow/react` entirely with a custom implementation tailored for our read-only DAG context.
1. **Remove the dependency:** Uninstall `@xyflow/react` and remove its chunk configurations from `vite.config.ts`.
2. **Keep Dagre:** Retain the `dagre` library for layout calculation, as it is already being used efficiently in `getLayoutedElements` to compute static `{x,y}` coordinates.
3. **Custom Rendering:** Build a lightweight, custom `DagCanvas` component that accepts the nodes and edges from `dagre`.
    - Nodes can be rendered as absolute-positioned standard React `<div>` elements wrapped in a pan/zoom container.
    - Edges can be rendered using standard SVG `<path>` elements connecting the layout coordinates.
4. **Interactivity:** Implement lightweight pan and zoom using native DOM events or a tiny library (e.g., `d3-zoom` or similar, if absolutely needed, though standard transform wrappers usually suffice).
5. **MiniMap & Controls:** Re-implement the minimap and controls using simple HTML overlays.

## Value Proposition
- **Bundle Size:** Eliminating 175.87 kB from the initial load, providing faster Time To Interactive (TTI), particularly on low-end devices or slow networks.
- **Memory Optimization:** Bypassing ReactFlow's complex internal object lifecycles and event bus drastically reduces memory allocations and DOM nesting depth, leading to smoother pan/zoom frame rates across large DAGs.
- **Simpler Dependency Tree:** Reducing third-party lock-in and the need to parse large external CSS files (`@xyflow/react/dist/style.css`).

## Next Steps
- [ ] prd-418-replace-xyflow-with-custom-dag