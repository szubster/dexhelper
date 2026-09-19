---
id: epic-564-566-storage-grid-virtualization
type: EPIC
title: Virtualize StorageGrid
status: PENDING
owner_persona: story_owner
created_at: '2026-09-12'
updated_at: '2026-09-19'
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

# Virtualize StorageGrid

## Context
As defined in `prd-517-564-optimize-pokedex-grid-rendering`, the `StorageGrid` currently renders up to 420 Pokémon slots simultaneously across all PC boxes and the party. This Epic focuses on implementing windowing/virtualization using `@tanstack/react-virtual` for the `StorageGrid.tsx` component to eliminate rendering bottlenecks.

## Core Requirements
1. Implement virtualization for `StorageGrid` (specifically targeting PC boxes, but accommodating standard slots) using `useVirtualizer` from `@tanstack/react-virtual`.
2. Support dynamic grid columns that adapt to container widths.
3. Ensure PC slots receive the correct virtualization styles while preserving their internal structure and efficiency.
4. Avoid main-thread blocking during initial renders and filtering.
5. Adhere to tactical hardware aesthetics (ADR 008).

## Acceptance Criteria
- [x] Break down into Stories
- [ ] story-566-580-virtualize-storage-grid-impl
- [ ] story-566-581-storage-grid-virtualization-e2e
