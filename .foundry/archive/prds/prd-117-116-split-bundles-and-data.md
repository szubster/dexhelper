---
id: prd-117-116-split-bundles-and-data
type: PRD
title: Split bundles and data by game generation
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-07-16'
updated_at: '2026-07-19'
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

## 1. Problem Statement
As DexHelper supports more Pokémon generations, the amount of code (parsers, strategies) and data (encounters, locations) is increasing. Currently, everything is loaded upfront, which affects initial load performance and memory usage.

## 2. Goals & Objectives
*   **Performance:** Reduce initial load time (~30-50%).
*   **Efficiency:** Improve runtime memory efficiency by not loading irrelevant generation logic/UI.
*   **Scalability:** Create a future-proof architecture for Gen 4+.

## 3. Scope
*   **Engine Code Splitting:** Generation-specific logic will be moved behind dynamic imports (`import()`).
    *   Save Parsers: Refactor `parseSaveFile` to lazily load generation-specific parsers.
    *   Assistant Strategies: Refactor `getStrategy` to be asynchronous and dynamically import the requested strategy.
*   **UI Component Splitting:** UI components exclusively used for specific generations will be loaded via `React.lazy`.
*   **Data Splitting:** The monolithic `pokedata.msgpack` will be split into a "core" bundle and generation-specific "extension" bundles.

## 4. Dependencies
*   Research conducted on bundle size distribution (`research-117-325-bundle-splitting-analysis`).
*   Architectural strategy documented in an ADR (`adr-117-029-bundle-splitting-strategy`).

## 5. Acceptance Criteria
- [ ] Save parsers refactored to use dynamic imports.
- [ ] Assistant strategies refactored to use dynamic imports.
- [ ] Generation-specific UI components refactored to use `React.lazy`.
- [ ] `pokedataPlugin` updated to emit multiple msgpack bundles.
- [ ] `PokeDB.ts` updated to support multi-part data synchronization.
- [ ] Performance verification complete.
- [ ] Assigned a scheduled agent to monitor bundle sizes.
