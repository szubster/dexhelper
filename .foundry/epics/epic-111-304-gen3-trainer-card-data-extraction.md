---
id: epic-111-304-gen3-trainer-card-data-extraction
type: EPIC
title: 'Epic: Gen 3 Trainer Card Stars Data Extraction'
status: READY
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-102-111-gen3-trainer-card-stars
tags:
  - data-extraction
  - gen3
  - achievements
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md
  - .foundry/docs/knowledge_base/gen3_battle_frontier_data.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Gen 3 Trainer Card Stars Data Extraction

## Objective
Implement the logic to extract the requisite achievements from the Gen 3 (Emerald) save file using the native `DataView` API to power the Trainer Card Stars Dashboard.

## Requirements

1. **Hall of Fame Extraction:**
   - Extract the `GAME_STAT_ENTERED_HOF` (ID 10) from the `gameStats` array in `SaveBlock1` or an equivalent flag to determine if the player has entered the Hall of Fame.

2. **Hoenn and National Pokédex:**
   - Extract the number of caught Pokémon in both the Hoenn and National Dex. This involves checking the pokedex bitfields.

3. **Master Rank Contests:**
   - Extract the contest condition ribbons, specifically checking if Master Rank ribbons are obtained for Cool, Beauty, Cute, Smart, and Tough categories.

4. **Battle Frontier Gold Symbols:**
   - Extract the `SYSTEM_FLAGS` corresponding to Gold Symbols for Tower, Dome, Palace, Arena, Factory, Pike, and Pyramid.
   - Example Flags: `FLAG_SYS_TOWER_GOLD` (0x8C5) to `FLAG_SYS_PYRAMID_GOLD` (0x8D1).

5. **Architectural Constraints:**
   - All extraction must be done using the `DataView` API (ADR 010).
   - Magic numbers for offsets and flags must be extracted into module-level reusable constants (ADR 028).

## Acceptance Criteria
- [x] Break down into Stories for data extraction implementation.
- [x] story-304-319-gen3-hof-pokedex-extraction
- [x] story-304-320-gen3-contest-frontier-extraction
