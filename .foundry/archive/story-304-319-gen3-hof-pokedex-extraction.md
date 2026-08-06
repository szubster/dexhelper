---
id: story-304-319-gen3-hof-pokedex-extraction
type: STORY
title: 'Story: Gen 3 Hall of Fame & Pokédex Data Extraction'
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-07-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-111-304-gen3-trainer-card-data-extraction
tags:
  - data-extraction
  - gen3
research_references:
  - .foundry/docs/knowledge_base/engine/save_parsing/gen3_hall_of_fame.md
  - .foundry/docs/knowledge_base/gen3_pokemon_data_structure.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Hall of Fame & Pokédex Data Extraction

## Objective
Extract the `GAME_STAT_ENTERED_HOF` (ID 10) to determine Hall of Fame entry and extract the number of caught Pokémon in both Hoenn and National Dex.

## Requirements
- Use the `DataView` API (ADR 010).
- Extract magic numbers into module-level reusable constants (ADR 028).

## Acceptance Criteria
- [x] Implement Hall of Fame extraction logic.
- [x] Implement Pokédex extraction logic.

- [x] task-319-323-gen3-hof-pokedex-extraction-impl
- [x] task-319-324-gen3-hof-pokedex-extraction-qa
- [x] [research-319-360-gen3-hof-magic-numbers](.foundry/archive/research-319-360-gen3-hof-magic-numbers.md)
- [x] [task-319-361-gen3-hof-pokedex-extraction-retry-impl](.foundry/archive/task-319-361-gen3-hof-pokedex-extraction-retry-impl.md)
- [x] [task-319-362-gen3-hof-pokedex-extraction-retry-qa](.foundry/archive/task-319-362-gen3-hof-pokedex-extraction-retry-qa.md)
