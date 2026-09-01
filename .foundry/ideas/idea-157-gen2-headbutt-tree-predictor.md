---
id: idea-157-gen2-headbutt-tree-predictor
type: IDEA
title: Gen 2 Headbutt Tree Predictor
status: PENDING
owner_persona: product_manager
created_at: '2026-08-20'
updated_at: '2026-09-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - dexhelper
  - feature
  - gen2
  - tracker
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
locks: []
---

# Idea: Gen 2 Headbutt Tree Predictor

## Context & Problem Statement
In Generation 2 (Gold, Silver, Crystal), the move "Headbutt" can be used on special trees to trigger wild Pokémon encounters. Some rare Pokémon, such as Heracross, Pineco, and Aipom, are exclusively found this way.

However, not all trees spawn Pokémon. The mechanic is based on a hidden calculation involving the player's Trainer ID (TID) and the internal X/Y coordinates of the tree on the map. This divides trees into "groups" (encounter tables), and crucially, for any given player, some trees will *never* yield a Pokémon, while others have high encounter rates for specific rare species.

Because this math is completely hidden from the player, finding a Heracross often devolves into randomly headbutting trees for hours with no guarantee that the specific tree they chose is even capable of spawning a Pokémon.

## Proposed Idea
Create a "Gen 2 Headbutt Tree Predictor" feature in DexHelper.
Since DexHelper has full access to the player's `.sav` file, it can read the Trainer ID (TID).

1. **Tree Radar Map:** The app will overlay all interactable Headbutt trees onto the interactive map UI.
2. **Predictive Coloring:** By applying the reverse-engineered Gen 2 Headbutt algorithm (TID + Tree Coordinates), DexHelper will dynamically color-code the trees on the map to show exactly which ones will yield Pokémon for the specific player, and which encounter table (e.g., standard vs. rare) that tree belongs to.
3. **Targeted Hunting:** Players can select a desired Pokémon (like Heracross), and the map will highlight the exact trees in the Johto region they should travel to.

This transforms a notoriously frustrating, opaque grind into a highly targeted, satisfying deterministic hunt, perfectly aligning with DexHelper's vision as a premium utility app that surfaces hidden game mechanics.

## Next Steps / Acceptance Criteria
- [x] Product Manager: Draft this IDEA node to initiate the feature request.
- [ ] Product Manager: Convert this IDEA into a PRD detailing the Headbutt coordinate math and the integration with the existing map UI.
- [ ] research-157-505-gen2-headbutt-math
