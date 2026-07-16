---
id: research-117-325-bundle-splitting-analysis
type: RESEARCH
title: Bundle and Data Splitting Analysis for Generation-based Loading
status: COMPLETED
owner_persona: architect
created_at: '2025-07-16'
updated_at: '2025-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: null
tags:
  - performance
  - architecture
  - bundles
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Bundle and Data Splitting Analysis

## Context
As DexHelper grows to support multiple Pokémon generations, both the JavaScript bundle size and the static data payload (pokedata.msgpack) are increasing. Currently, all save parsers, assistant strategies, and Pokedex data for all supported generations are loaded upfront.

## Current State Analysis

### Data Distribution (Msgpack)
Analysis of the source `.jsonl` files (raw sizes):
- **Encounters (`encounters.jsonl`)**: ~403 KB
- **Locations (`locations.jsonl`)**: ~595 KB
- **Pokemon (`pokemon.jsonl`)**: ~37 KB
- **Items & Moves**: ~242 KB

The total `pokedata.msgpack` is approximately **477 KB**.

### JavaScript Bundle Distribution
Main chunks (minified + gzip):
- `index.js` (App Logic): ~90 KB (311 KB raw)
- `react.js`: ~57 KB
- `xyflow.js`: ~56 KB
- `router.js`: ~27 KB
- `dag.js`: ~28 KB

The `index.js` chunk currently contains:
- `src/engine/saveParser/`: All parsers for Gen 1, 2, and 3.
- `src/engine/assistant/strategies/`: All strategies for Gen 1, 2, and 3.
- Generation-specific UI components (e.g., RTC displays, Contest condition panels, specific Dashboard widgets).

## Opportunities for Splitting

### 1. Code Splitting (JS Engine)
The Save Parsers and Assistant Strategies are strictly generation-specific.
- **Save Parsers**: Only one parser is used at a time based on the uploaded file.
- **Assistant Strategies**: Only one strategy is active based on the loaded save data.

### 2. UI Splitting (JS Frontend)
Many UI components are only relevant for specific generations:
- **Gen 3**: `Gen3RTC`, `ContestConditionStats`, `ContestRecommendationPanel`.
- **Gen 2/3**: Detailed Box organization assistants, specialized Nuzlocke trackers.
Using `React.lazy` and `Suspense` can defer loading these until the user navigates to a relevant view or loads a relevant save.

### 3. Data Splitting (Msgpack)
The largest data components are encounters and locations. Deferring loading of non-active generation data could save significant initial bandwidth.

## Potential Gains
- **Initial Load**: If we defer loading Gen 2/3 code and data, we could reduce the initial payload by ~150-200 KB (uncompressed) of data and several dozen KB of JS.
- **Scalability**: As Gen 4+ are added, the "all-at-once" approach will eventually lead to significant performance degradation on mobile devices.

## Recommendations
1. Implement dynamic loading for `AssistantStrategy` and Save Parsers.
2. Utilize `React.lazy` for generation-specific UI components.
3. Refactor `pokedataPlugin` and `PokeDB` to handle multi-part data synchronization.
