---
id: task-580-602-virtualize-storage-grid-ui
type: TASK
title: Virtualize StorageGrid Implementation
status: READY
owner_persona: coder
created_at: '2026-09-18T09:12:07Z'
updated_at: '2026-09-18T09:12:07Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-566-580-virtualize-storage-grid-impl
tags:
  - frontend
  - performance
  - react
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Virtualize StorageGrid Implementation

## Context
The `StorageGrid` component currently renders up to 420 Pokémon slots (14 boxes x 30 + party) concurrently, which causes significant main-thread bottlenecks. This task implements windowing/virtualization for the grid using `@tanstack/react-virtual` to ensure smooth rendering and scrolling performance.

## Core Requirements
1. **Virtualization Integration**: Utilize `@tanstack/react-virtual` (e.g., `useWindowVirtualizer` or `useVirtualizer`) within `src/components/StorageGrid.tsx` to virtualize the rendering of storage locations and Pokémon slots.
2. **Responsive Grid Layout**: Support dynamic grid columns that adapt to container widths for a responsive layout. You may need to track the container's width (via `ResizeObserver` or similar) to calculate the number of columns and virtual rows dynamically.
3. **Absolute Positioning Constraints**: Ensure PC slots correctly apply virtualization styles (e.g., absolutely positioned within the scrolling container based on virtualized sizes and offsets) while preserving their internal tactical structure.
4. **Main-Thread Performance**: Prevent main-thread blocking during initial renders and filtering by ensuring that only visible rows/items (plus a small overscan) are rendered in the DOM.

## Acceptance Criteria
- [x] Implement `useVirtualizer` or `useWindowVirtualizer` in `StorageGrid.tsx`.
- [x] Calculate rows dynamically based on the container width to support responsive grid columns.
- [x] Apply correct absolute positioning to virtualized items.
- [x] Run `pnpm lint && pnpm test` and ensure all tests pass.
