---
id: idea-136-split-bundles-and-data
type: IDEA
title: Split bundles and data by game generation
status: READY
owner_persona: product_manager
created_at: '2024-08-07'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
parent: null
tags:
  - performance
  - architecture
  - bundles
  - database
rejection_count: 0
rejection_reason: ''
notes: ''
---
# Idea: Split bundles and data by game generation

## Context
As DexHelper supports more Pokémon generations, the amount of code (parsers, strategies) and data (encounters, locations) is increasing. Currently, everything is loaded upfront, which affects initial load performance and memory usage.

## Proposal
Implement generation-based splitting for JavaScript engine logic, UI components, and static Pokedex data.
- Use dynamic imports for generation-specific parsers in `src/engine/saveParser/index.ts`.
- Use dynamic imports for generation-specific assistant strategies in `src/engine/assistant/strategies/index.ts`.
- Utilize `React.lazy` for UI components that are only relevant to specific generations (e.g., Gen 3 RTC, Contests).
- Split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions in `vite-plugins/pokedata-plugin.ts` by emitting multiple msgpack bundles.
- Refactor the synchronization logic in `src/db/PokeDB.ts` to support multi-part data synchronization to load extensions and code on demand when a specific generation is detected.

## Value Proposition
- **Faster Initial Load**: Reduced initial download size by deferring generation-specific assets.
- **Improved Scalability**: Support for future generations (Gen 4+) without bloating the initial app experience.
- **Better Resource Management**: Only load the data, code, and UI the user actually needs.

## Next Steps
- [ ] prd-136-split-bundles-and-data
