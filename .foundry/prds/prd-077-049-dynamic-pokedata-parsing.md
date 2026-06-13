---
id: prd-077-049-dynamic-pokedata-parsing
type: PRD
title: Dynamic Generation of Moves and Items PokeData
status: ACTIVE
owner_persona: epic_planner
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: '15710274444595008829'
pr_number: null
parent: idea-077-dynamic-pokeapi-data
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Dynamic Generation of Moves and Items PokeData

## Background
Currently, data such as move PPs and valid item lists are either manually maintained or fetched ad-hoc. Managing these static tables directly in the repository is a maintenance burden and does not scale well as more generations of Pokémon are added. To solve this, we will parse this data dynamically at build time, similar to how encounters data is handled via `.jsonl` files.

## Goals
1. Extract move parameters (specifically Move PPs) and item lists by parsing existing repository data at build time.
2. Store the extracted data in a scalable, efficient format (`.jsonl` files) to be packaged by the Vite plugin and consumed by the client.
3. Remove manually compiled and hardcoded data tables for these entities.

## Requirements
- **Data Generation Script**: Enhance build scripts (e.g., `scripts/generate-pokedata.ts`) to parse moves and items from repository data.
- **Output Artifacts**: Generate `items.jsonl` and `moves.jsonl` containing the parsed authoritative data.
- **Vite Integration**: The Vite plugin must bundle the generated `.jsonl` files so they can be securely and efficiently loaded on the client side.
- **Data Validation**: Ensure the generated files correctly map to internal types and do not contain regressions.

## Acceptance Criteria
- [ ] Determine the precise data structure for the `moves.jsonl` and `items.jsonl` records.
- [ ] Ensure the generation logic handles any discrepancies between the generations (e.g., Gen 1 vs. Gen 2 PP limits).
- [ ] Write an ADR detailing the architectural approach for integrating this dynamic generation into the existing data pipeline.

### Epic Breakdown
- [ ] .foundry/docs/adrs/025-dynamic-pokedata-parsing.md
- [ ] .foundry/epics/epic-049-086-dynamic-move-pp-parsing.md
- [ ] .foundry/epics/epic-049-087-dynamic-item-list-parsing.md
- [ ] .foundry/epics/epic-049-088-vite-plugin-jsonl-integration.md
