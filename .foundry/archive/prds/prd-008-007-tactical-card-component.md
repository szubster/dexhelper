---
id: "prd-008-007-tactical-card-component"
type: "PRD"
title: "Tactical Card Base Component"
status: "COMPLETED"
owner_persona: "architect"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
parent: ".foundry/archive/ideas/idea-008-ui-component-reuse.md"
---

# PRD-008-007: Tactical Card Base Component

## Objective
Refactor the existing duplicated card UI into a unified, reusable base component (`TacticalCard.tsx`) to DRY up complex markup, styles, and interaction logic.

## Scope
- [x] Abstract the core `TacticalCard` component.
- [x] Update `PokedexCard.tsx` to use the new `TacticalCard`.
- [x] Update `StorageGrid.tsx` to apply the new `TacticalCard`.

### Architectural Review
The proposed `TacticalCard` component aligns with our DRY principles and the established UI architecture. No new ADR is required. The UI extraction will improve maintainability and consistency across the app.

### Spawned Nodes
- `.foundry/tasks/task-007-043-tactical-card-refactor.md`
