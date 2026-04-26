---
id: task-007-043-tactical-card-refactor
type: TASK
title: "Implement Tactical Card Base Component"
status: PENDING
owner_persona: "coder"
created_at: "2026-04-26"
updated_at: "2026-04-26"
depends_on: []
jules_session_id: null
pr_number: null
parent: ".foundry/prds/prd-008-007-tactical-card-component.md"
tags: ["ui", "refactoring"]
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement Tactical Card Base Component

## Objective
Abstract the core `TacticalCard` component from `PokedexCard` and `StorageGrid` into a reusable UI component.

## Technical Blueprint
1. **Create `src/components/TacticalCard.tsx`**
   - Extract the outer tactical shell, background layers, scanline overlays, and base interaction states from `PokedexCard`.
   - Expose props for content injection.
2. **Refactor `src/components/PokedexCard.tsx`**
   - Replace the outer markup with `TacticalCard`.
3. **Refactor `src/components/StorageGrid.tsx`**
   - Replace the custom card implementations in `StorageGrid` with `TacticalCard`.

## Acceptance Criteria
- [ ] `TacticalCard` component is created and abstracts the shared UI shell.
- [ ] `PokedexCard` uses `TacticalCard` without visual regressions.
- [ ] `StorageGrid` uses `TacticalCard` without visual regressions.
