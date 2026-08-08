---
id: prd-136-340-split-bundles-and-data
type: PRD
title: Split bundles and data by game generation
status: PENDING
owner_persona: epic_planner
created_at: '2026-08-08'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
parent: idea-136-split-bundles-and-data
tags:
  - performance
  - architecture
  - bundles
  - database
rejection_count: 0
rejection_reason: ""
notes: ""
---
# PRD: Split bundles and data by game generation

## Context & Objectives
As DexHelper supports more Pokémon generations, the amount of code (parsers, strategies) and data (encounters, locations) is increasing. Currently, everything is loaded upfront, which affects initial load performance and memory usage.

## Requirements
Implement generation-based splitting for JavaScript engine logic, UI components, and static Pokedex data.
- Use dynamic imports for generation-specific parsers in `src/engine/saveParser/index.ts`.
- Use dynamic imports for generation-specific assistant strategies in `src/engine/assistant/strategies/index.ts`.
- Utilize `React.lazy` for UI components that are only relevant to specific generations (e.g., Gen 3 RTC, Contests).
- Split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions in `vite-plugins/pokedata-plugin.ts` by emitting multiple msgpack bundles.
- Refactor the synchronization logic in `src/db/PokeDB.ts` to support multi-part data synchronization to load extensions and code on demand when a specific generation is detected.

## Acceptance Criteria
- [ ] Breakdown PRD into EPIC nodes.

### SCHEMA
https://github.com/szubster/dexhelper/blob/main/.foundry/docs/schema.md