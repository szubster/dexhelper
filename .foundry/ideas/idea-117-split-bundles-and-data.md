---
id: idea-117-split-bundles-and-data
type: IDEA
title: Split bundles and data by game generation
status: READY
owner_persona: product_manager
created_at: '2025-07-16'
updated_at: '2026-07-24'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - performance
  - architecture
  - bundles
research_references:
  - research-117-325-bundle-splitting-analysis
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Idea: Split bundles and data by game generation

## Context
As DexHelper supports more Pokémon generations, the amount of code (parsers, strategies) and data (encounters, locations) is increasing. Currently, everything is loaded upfront, which affects initial load performance and memory usage.

## Proposal
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
- [x] prd-117-116-split-bundles-and-data
- [x] Research conducted on bundle size distribution and potential gains (`research-117-325-bundle-splitting-analysis`).
- [x] Architectural strategy documented in an ADR (`adr-117-029-bundle-splitting-strategy`).
- [ ] Save parsers refactored to use dynamic imports in `src/engine/saveParser/index.ts`.
- [ ] Assistant strategies refactored to use dynamic imports in `src/engine/assistant/strategies/index.ts`.
- [ ] Generation-specific UI components (e.g., Gen 3 RTC) refactored to use `React.lazy`.
- [ ] `pokedataPlugin` updated to emit multiple msgpack bundles.
- [ ] `PokeDB.ts` updated to support multi-part data synchronization.
- [ ] Performance verification: Measure and confirm reduction in initial JS and data payload.
- [ ] Assigned a scheduled agent (e.g., **Bolt**) to monitor and maintain bundle sizes and lazy loading adherence.
