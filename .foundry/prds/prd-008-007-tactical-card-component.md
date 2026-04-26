---
id: "prd-008-007-tactical-card-component"
type: "PRD"
title: "Tactical Card Base Component"
status: "ACTIVE"
owner_persona: "architect"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "15634813013039885614"
parent: ".foundry/ideas/idea-008-ui-component-reuse.md"
---

# PRD-008-007: Tactical Card Base Component

## Objective
Refactor the existing duplicated card UI into a unified, reusable base component (`TacticalCard.tsx`) to DRY up complex markup, styles, and interaction logic.

## Scope
- Abstract the core `TacticalCard` component.
- Update `PokedexCard.tsx` to use the new `TacticalCard`.
- Update `StorageGrid.tsx` to apply the new `TacticalCard`.
