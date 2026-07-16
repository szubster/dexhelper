---
id: prd-117-116-split-bundles-and-data
type: PRD
title: "PRD: Split bundles and data by game generation"
status: PENDING
owner_persona: "epic_planner"
created_at: '2026-07-16'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-117-split-bundles-and-data
tags:
  - performance
  - architecture
  - bundles
research_references:
  - research-117-325-bundle-splitting-analysis
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Split bundles and data by game generation

## Context
<!-- Copy or adapt context from IDEA -->
As DexHelper supports more Pokémon generations, the amount of code (parsers, strategies) and data (encounters, locations) is increasing. Currently, everything is loaded upfront, which affects initial load performance and memory usage.

## Requirements
Implement generation-based splitting for JavaScript engine logic, UI components, and static Pokedex data.
- Use dynamic imports for generation-specific parsers and assistant strategies.
- Utilize `React.lazy` for UI components that are only relevant to specific generations (e.g., Gen 3 RTC, Contests).
- Split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.
- Refactor the synchronization logic to load extensions and code on demand when a specific generation is detected.

## Benefits
- **Faster Initial Load**: Reduced initial download size by deferring generation-specific assets.
- **Improved Scalability**: Support for future generations (Gen 4+) without bloating the initial app experience.
- **Better Resource Management**: Only load the data, code, and UI the user actually needs.

## Acceptance Criteria
- [ ] Refactor save parsers to use dynamic imports in `src/engine/saveParser/index.ts`
- [ ] Refactor assistant strategies to use dynamic imports in `src/engine/assistant/strategies/index.ts`
- [ ] Refactor generation-specific UI components to use `React.lazy`
- [ ] Update `pokedataPlugin` to emit multiple msgpack bundles
- [ ] Update `PokeDB.ts` to support multi-part data synchronization
- [ ] Verify reduction in initial JS and data payload
- [ ] Assign a scheduled agent to monitor bundle sizes

## Generated Epics
<!-- Append generated children here as unchecked tasks -->
