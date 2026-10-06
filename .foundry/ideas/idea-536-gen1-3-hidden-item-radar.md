---
id: idea-536-gen1-3-hidden-item-radar
type: IDEA
title: Gen 1-3 Hidden Item Radar & Dowsing Machine Visualizer
status: READY
owner_persona: product_manager
created_at: '2026-10-06'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: null
priority: 50
confidence_score: 100
tags:
  - feature
  - gen1
  - gen2
  - gen3
  - radar
  - items
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: Gen 1-3 Hidden Item Radar & Dowsing Machine Visualizer

## Context
Across Generations 1 through 3, over 200 valuable items (such as Rare Candies, PP Maxes, Heart Scales, Sacred Ash, and key TMs) are hidden on invisible ground tiles. In-game, finding these items requires holding the Itemfinder or Dowsing Machine and manually walking tile-by-tile across every route, cave, and building in the game. This process is opaque, time-consuming, and heavily prone to human error, leading many players to miss limited consumable resources critical for endgame challenges and competitive team preparation.

While DexHelper currently parses save files and reads bitwise event flags, it lacks a dedicated visual interface for hidden item tracking.

## Proposed Solution
Introduce a **Gen 1-3 Hidden Item Radar & Dowsing Machine Visualizer** in DexHelper that scans save file bitwise event flags to identify uncollected hidden items across all visited maps.

- **Global & Location Radar**: Filterable dashboard showing all hidden items across Gen 1, Gen 2, and Gen 3 maps, categorized by region, route, and item rarity (e.g. Rare Candy, PP Up, TM, Heart Scale).
- **Save State Verification**: Parse the save file's hidden item bitwise flags (`hiddenItemFlags`) to instantly mark collected items as done and isolate remaining uncollected items.
- **Tile Coordinates & Visual Map Overlay**: Display precise map coordinates, visual tile location previews, and route navigation cues for each uncollected hidden item, replacing pixel-hunting with targeted retrieval.

## Strategic Value
This feature transforms a tedious retro gaming chore into a deterministic, high-value companion utility. By surfacing bitwise event flags from save files, DexHelper provides players with an offline-first "bounty board" for rare consumables. Furthermore, it maintains the strategic balance between core product features (DexHelper) and internal pipeline tooling (Foundry).

## Acceptance Criteria
- [ ] prd-536-001-gen1-3-hidden-item-radar
