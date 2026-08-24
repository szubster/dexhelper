---
id: prd-059-336-multi-save-trade-planner
type: PRD
title: Multi-Save Trade Planner
status: PENDING
owner_persona: epic_planner
created_at: '2026-07-21'
updated_at: '2026-08-05'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-059-multi-save-trade-planner
tags:
  - feature
  - trades
  - multi-save
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Multi-Save Trade Planner

## Context
A major challenge in Generation 1 and 2 is completing the Pokédex, which requires trading between different versions of the games (e.g., Red to Blue, Gold to Silver) to obtain version-exclusive Pokémon and trigger trade evolutions (like Kadabra to Alakazam). Players often manage multiple save files across different games to achieve this.

This idea directly expands upon the "Pokémon Trading (Inter-Save)" future feature outlined in IDEA-055 (Cloudflare Backend for Offline-First Save Syncing). Once the foundational multi-playthrough architecture is in place, we need intelligent systems to help users navigate their multiple concurrent states.

## Objective
Introduce a "Multi-Save Mode" in DexHelper that allows users to analyze two or more save files simultaneously.

## Requirements

1. **Cross-Save Synergy Analysis:**
    - The Assistant suggestion engine must evaluate the loaded saves and identify optimal trade opportunities.
    - For example, "Save A needs a Vulpix (exclusive to Blue). Save B has 3 spare Vulpix in Box 2. You should trade."
    - It must take into account game-exclusives and pokedex completion progress in each save file.

2. **Trade Evolution Tracking:**
    - The planner must automatically flag Pokémon that are ready to evolve via trade if moved between the loaded saves.
    - It must support Pokémon requiring specific held items for their trade evolution, warning if the item is missing or available in the other save.

3. **Consolidated Pokédex View:**
    - The UI must provide a unified view showing combined Pokédex progress across all loaded files.
    - It should visualize the overlap and the missing Pokémon, highlighting which loaded save file can supply the missing entries.

4. **Multi-Save Infrastructure:**
    - Integrate with the existing multi-playthrough architecture.
    - Develop the necessary data structures and comparison algorithms for analyzing multiple save files in memory simultaneously.

## Acceptance Criteria
- [x] Ensure all functional requirements are broken down into logical Epic chunks.
- [ ] epic-336-349-multi-save-infrastructure
- [ ] epic-336-350-cross-save-synergy-analysis
- [ ] epic-336-351-trade-evolution-tracking
- [ ] epic-336-352-consolidated-pokedex-ui
