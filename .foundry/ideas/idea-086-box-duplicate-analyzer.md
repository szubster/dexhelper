---
id: idea-086-box-duplicate-analyzer
type: IDEA
title: PC Box Duplicate Analyzer & Release Assistant
status: PENDING
owner_persona: product_manager
created_at: '2026-06-22'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - feature
  - ui
  - ux
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Idea: PC Box Duplicate Analyzer & Release Assistant

## Context
During intensive gameplay activities like breeding for perfect IVs/Natures (especially in Gen 2/3), shiny hunting via repetitive catching, or completing Safari Zone runs, players rapidly fill their PC boxes with dozens of duplicate Pokémon. The in-game UI is incredibly slow for comparing stats (IVs, Natures, Hidden Power) across these duplicates to determine which "keepers" to retain and which to release. This creates a massive manual overhead for hardcore players.

## Proposal
Introduce a "Duplicate Analyzer" view within DexHelper's PC Box tracking system.
- Automatically group Pokémon by species across all boxes.
- For each group, display a side-by-side comparison matrix highlighting key stats: DVs/IVs (with totals/averages), Natures (Gen 3+), Hidden Power Type/Power, and shininess.
- Allow players to easily spot their "best" duplicate at a glance.
- Introduce a UI tagging system to mark specific duplicates as "To Release" within DexHelper, creating an actionable checklist for the player to follow when they return to the actual game.

## Value Proposition
This feature transforms DexHelper from a passive storage viewer into an active box management assistant. By heavily leveraging our offline-first `.sav` parsing capabilities to instantly aggregate and compare hidden data (DVs/IVs) across hundreds of PC entities, we eliminate one of the most tedious logistical chores in retro Pokémon games. This deeply serves the hardcore, end-game player base.

## Next Steps
- [x] Product Manager: Convert this idea into a PRD.
- [ ] .foundry/prds/prd-086-054-box-duplicate-analyzer.md
