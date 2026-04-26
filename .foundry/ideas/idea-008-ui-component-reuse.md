---
id: "idea-008-ui-component-reuse"
type: "IDEA"
title: "UI Component Reuse and Refactoring"
status: "ACTIVE"
owner_persona: "product_manager"
created_at: "2025-05-25"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: "3497364283890337009"
---

# IDEA-008: UI Component Reuse and Refactoring

## Problem Statement
Highly similar UI components (like PokedexCard and the proposed Storage Grid tactical cards) duplicate complex markup, styles, and interaction logic (such as tactical borders, corner crosshairs, hover scanline effects, and telemetry headers). This violates DRY principles and makes maintaining visual consistency across the app difficult when design tokens or patterns change.

## Proposed Strategy
Refactor the existing duplicated card UI into a unified, reusable base component (e.g., `TacticalCard.tsx`).

### 1. Abstract the Base Component
Create a core `TacticalCard` component that handles the outer tactical shell, background layers, scanline overlays, and base interaction states.

### 2. Update PokedexGrid
Refactor `PokedexCard.tsx` to use the new `TacticalCard` internally, overriding content specifically for the Pokédex view.

### 3. Update StorageGrid
Apply the new `TacticalCard` to `StorageGrid.tsx` to align its aesthetic with the "snooping hardware" tactical theme without duplicating the complex layout code.

## Next Steps
- [ ] **Product Manager**: Draft a PRD to formalize the scope of the component refactoring.
