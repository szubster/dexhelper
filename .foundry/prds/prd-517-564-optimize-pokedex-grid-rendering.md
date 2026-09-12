---
id: prd-517-564-optimize-pokedex-grid-rendering
type: PRD
title: 'PRD: Optimize Pokedex and Storage Grids with Virtualization'
status: READY
owner_persona: epic_planner
created_at: '2026-09-09'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-517-optimize-pokedex-grid-rendering
tags:
  - performance
  - frontend
  - rendering
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# PRD: Optimize Pokedex and Storage Grids with Virtualization

## Context
Currently, `PokedexGrid` maps over potentially hundreds of Pokémon (e.g., 386 for Gen 3) and renders a complex DOM tree for each `PokedexCard`. Similarly, `StorageGrid` renders up to 420 Pokémon slots simultaneously across all PC boxes and the party. As DexHelper adds support for newer generations with 1000+ Pokémon, this eagerly rendered approach will cause significant main-thread blocking, layout thrashing, and increased memory footprints due to excessive DOM nodes.

While some performance optimizations like decoupling search filtering (`useDeferredValue`) and manual loop allocations have been implemented, the core rendering bottleneck of mapping 400+ complex UI cards remains. `@tanstack/react-virtual` is already available in the project and can be used to optimize list rendering.

## Core Requirements
1.  **Virtualization for PokedexGrid:** Implement windowing/virtualization using `@tanstack/react-virtual` for the `PokedexGrid.tsx` component.
2.  **Virtualization for StorageGrid:** Implement windowing/virtualization using `@tanstack/react-virtual` for the `StorageGrid.tsx` component (specifically targeting PC boxes, but should handle the standard slots).
3.  **Responsive Layout Support:** The virtualization implementation must support dynamic grid columns that adapt to container widths (e.g., `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`).
4.  **Performance Maintenance:** The implementation must maintain or improve the optimizations introduced previously (e.g., `useDeferredValue` for search, memoized sets for shiny lookups).
5.  **Aesthetic Adherence:** Ensure that any container or scrolling modifications adhere to the established "tactical hardware" aesthetic (ADR 008, no rounded corners, dashed borders where appropriate).

## Technical Implementation Guidelines
*   **Virtualizer Configuration:** Use `useVirtualizer` from `@tanstack/react-virtual`.
*   **Grid Calculations:** Implement a mechanism to calculate the number of items per row based on the container width to properly virtualize a grid layout, rather than a simple 1D list. This might require a ResizeObserver or an established custom hook if one exists in the project.
*   **Component Structure:** Ensure that `PokedexCard` and the PC slots receive the correct virtualization styles (e.g., `position: absolute`, `top`, `left`, `width`, `height`) from the virtualizer instance while preserving their internal structure and performance optimizations.
*   **Avoid Main-Thread Blocking:** Ensure initial renders and filtering operations do not cause significant pauses.

## Acceptance Criteria
- [ ] Breakdown into EPICs
