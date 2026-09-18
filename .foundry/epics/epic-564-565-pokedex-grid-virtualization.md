---
id: epic-564-565-pokedex-grid-virtualization
type: EPIC
title: Virtualize PokedexGrid
status: READY
owner_persona: story_owner
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-517-564-optimize-pokedex-grid-rendering
tags:
  - performance
  - frontend
  - rendering
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Virtualize PokedexGrid

## Context
As defined in `prd-517-564-optimize-pokedex-grid-rendering`, rendering hundreds of `PokedexCard` components simultaneously in the `PokedexGrid` causes main-thread blocking and layout thrashing. This Epic focuses on implementing windowing/virtualization using `@tanstack/react-virtual` for the `PokedexGrid.tsx` component.

## Core Requirements
1. Implement virtualization for `PokedexGrid` using `useVirtualizer` from `@tanstack/react-virtual`.
2. Support dynamic grid columns that adapt to container widths (e.g., `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`). This requires a mechanism to calculate items per row based on container width.
3. Ensure `PokedexCard` receives correct virtualization styles (`position: absolute`, `top`, `left`, `width`, `height`).
4. Maintain performance optimizations like `useDeferredValue` for search and memoized sets for shiny lookups.
5. Adhere to tactical hardware aesthetics (ADR 008).

## Acceptance Criteria
- [x] Break down into Stories
- [ ] story-565-580-virtualize-pokedex-grid-implementation
- [ ] story-565-581-pokedex-grid-e2e-verification
