---
id: idea-066-feebas-tile-predictor
type: IDEA
title: Gen 3 Feebas Tile Predictor
status: ACTIVE
owner_persona: product_manager
created_at: '2026-05-28'
updated_at: '2026-05-30'
depends_on: []
jules_session_id: '13240438150255918587'
parent: null
tags:
  - feature
  - gen3
notes: ''
---

# Idea: Gen 3 Feebas Tile Predictor

## Context
In Generation 3 (Ruby, Sapphire, Emerald), Feebas can only be found by fishing on 6 random water tiles out of hundreds on Route 119. These tiles are determined by a hidden seed stored in the player's save file, which changes when the "trendy phrase" in Dewford Town is updated. This makes catching Feebas one of the most tedious tasks for players completing the Hoenn Pokédex.

## Proposal
Leverage our programmatic `.sav` file parsing to extract the Dewford Town trendy phrase/Feebas seed. We can then provide a visual representation of Route 119 in the app, explicitly highlighting the exact 6 tiles where the player can fish to encounter Feebas. This transforms a multi-hour manual search into a targeted 1-minute task.

## Acceptance Criteria
- [x] Investigate the exact memory offset for the Feebas seed in R/S/E save files.
- [x] Implement an extraction utility to derive the 6 tile coordinates from the seed.
- [x] Create a visual route map component for Route 119 that dynamically overlays the target tiles based on the parsed save state.

## Downstream Nodes
- PRD: `.foundry/prds/prd-066-036-feebas-tile-predictor.md`
- RESEARCH: `.foundry/research/research-036-006-feebas-seed-investigation.md`
