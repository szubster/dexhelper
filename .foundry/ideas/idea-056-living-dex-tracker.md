---
id: idea-056-living-dex-tracker
type: IDEA
title: Specialized "Living Dex" Organization Tracker UI
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-18'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: '14876162240733066291'
parent: null
tags:
  - feature
  - ui
  - living-dex
notes: >-
  Resurrected: Auditor found that the specialized numerical grid and box/slot
  overlay are missing.
rejection_reason: ''
rejection_count: 0
---

# Idea: Specialized "Living Dex" Organization Tracker UI

## Context
A major goal for players of early Pokémon games (Gen 1 and Gen 2, and soon Gen 3) is assembling a "Living Dex" — having exactly one of every Pokémon, stored in numerical order in their PC boxes.
Currently, DexHelper is a great premium storage viewer and provides AI-powered completion insights. However, organizing PC boxes in these early games is extremely tedious because there are no automated sorting tools. Players often have PC boxes filled with random Pokémon in random order.

## Proposal
Create a dedicated "Living Dex Tracker" view in the DexHelper UI.
- Display a unified grid of all Pokémon in the regional or national Pokédex in numerical order.
- Visually overlay the player's current PC box and Party state onto this grid.
- Highlight "ghosts" (missing Pokémon).
- Highlight "duplicates" or "evolution paths" (e.g., if you have 3 Bulbasaurs but no Ivysaur or Venusaur, it highlights that you have the raw material to fill those slots).
- Crucially, show exactly which PC Box and Slot the currently owned Pokémon is residing in, helping players physically locate and move the Pokémon in-game to organize their Living Dex.

## Value Proposition
This directly addresses a hardcore collector playstyle, heavily leaning into our "premium storage viewer" capabilities by solving a specific, highly manual pain point in older Pokémon generations.

## Next Steps
- [ ] Product Manager: Convert this idea into a PRD.

### Auditor Rejection
The specialized "Living Dex Tracker" UI has not been implemented. While there is a global "Living Dex" toggle in the settings that modifies the standard Pokédex view, the specific requirements of this IDEA (a dedicated view with numerical grid, PC Box/Slot overlay, and highlighting for ghosts/duplicates) are completely missing from the codebase. Furthermore, no downstream PRD node exists for this idea. The Product Manager must create a formal PRD that details the implementation of this dedicated UI view, and it must be fully implemented and merged by downstream child tasks before this IDEA can be verified as complete.

### Auditor Rejection
The node has been rejected again. The Product Manager must create the corresponding PRD (`.foundry/prds/prd-056-<NNN>-living-dex-tracker.md`) and append it as a checkbox in this IDEA node. The IDEA node cannot be verified and transitioned to COMPLETED until the PRD and its downstream implementation tasks are fully completed and merged.
