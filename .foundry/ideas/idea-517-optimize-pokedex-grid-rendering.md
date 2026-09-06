---
id: idea-517-optimize-pokedex-grid-rendering
type: IDEA
title: Optimize Pokedex and Storage Grids with Virtualization
status: PENDING
owner_persona: product_manager
created_at: '2025-07-27'
updated_at: '2025-07-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - performance
  - frontend
  - rendering
research_references: []
notes: ''
---

# Idea: Optimize Pokedex and Storage Grids with Virtualization

## Context
Currently, `PokedexGrid` maps over potentially hundreds of Pokémon (e.g., 386 for Gen 3) and renders a complex DOM tree for each `PokedexCard`. Similarly, `StorageGrid` renders up to 420 Pokémon slots simultaneously across all PC boxes and the party. As DexHelper adds support for newer generations with 1000+ Pokémon, this eagerly rendered approach will cause significant main-thread blocking, layout thrashing, and increased memory footprints due to excessive DOM nodes.

While some performance optimizations like decoupling search filtering (`useDeferredValue`) and manual loop allocations have been implemented, the core rendering bottleneck of mapping 400+ complex UI cards remains.

## Proposal
Implement virtualization (windowing) for large lists using `@tanstack/react-virtual` (which is already included in `package.json` and used in `GlobalRibbonChecklistDashboard.tsx`).

Specific changes:
- Refactor `PokedexGrid.tsx` to use `useVirtualizer` with a responsive grid layout. The virtualizer will only render the `PokedexCard` components that are currently visible in the viewport, significantly reducing the initial render time and DOM count.
- Refactor `StorageGrid.tsx` to use a virtualized grid for PC box storage, similarly only rendering visible slots.
- Ensure the virtualization implementation cleanly supports dynamic grid columns (`sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`) either via window resizing hooks or by calculating column counts based on container width.

## Value Proposition
- **Main-Thread Responsiveness:** Eliminates long React render pauses when first loading the application or when clearing search filters.
- **Memory Optimization:** Drastically reduces the number of DOM nodes held in memory, particularly important for mobile users or lower-end devices.
- **Scalability:** Future-proofs the UI for Gen 4+ which require rendering upwards of 500 to 1000+ entries.

## Next Steps
- [ ] prd-517-549-optimize-pokedex-grid-rendering
