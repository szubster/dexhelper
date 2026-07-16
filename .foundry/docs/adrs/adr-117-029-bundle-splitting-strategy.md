---
id: adr-117-029-bundle-splitting-strategy
type: ADR
title: Bundle and Data Splitting Strategy
status: PROPOSED
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
research_references:
  - research-117-325-bundle-splitting-analysis
rejection_count: 0
rejection_reason: ''
notes: ''
---

# ADR: Bundle and Data Splitting Strategy

## Status
Proposed

## Context
As analyzed in `research-117-325-bundle-splitting-analysis`, the application bundle and data are growing linearly with each added generation. To maintain performance and scalability, we need a strategy to split code, UI, and data based on the Pokémon generation currently in use by the user.

## Decision
We will implement a multi-stage loading strategy for JavaScript code, UI components, and static Pokedex data.

### 1. Engine Code Splitting
Generation-specific logic will be moved behind dynamic imports (`import()`).
*   **Save Parsers**: Refactor `parseSaveFile` to lazily load `gen1.ts`, `gen2.ts`, `gen3.ts` after initial detection.
*   **Assistant Strategies**: Refactor `getStrategy` to be asynchronous and dynamically import the requested strategy.

### 2. UI Component Splitting
UI components that are exclusively used for specific generations will be loaded via `React.lazy`.
*   **Gen 3 Specifics**: Components in `src/components/Gen3RTC/`, `ContestConditionStats.tsx`, etc., will be lazily loaded.
*   **Specialized Dashboards**: Large generation-specific dashboard widgets (e.g., Battle Frontier trackers) will also be lazily loaded.

### 3. Data Splitting
The monolithic `pokedata.msgpack` will be split into a "core" bundle and generation-specific "extension" bundles.
*   **Core Bundle (`pokedata-core.msgpack`)**: Shared data (basic Pokemon list, moves, items).
*   **Extension Bundles (`pokedata-gen{N}.msgpack`)**: Generation-specific encounters and locations.

### 4. Synchronization Flow
1.  App load: Fetch and sync `pokedata-core.msgpack`.
2.  Save upload:
    *   Detect generation.
    *   Download corresponding parser and parse save.
    *   Fetch and sync corresponding `pokedata-gen{N}.msgpack` extension if missing.
    *   UI renders and lazily loads gen-specific components as needed.

## Consequences

### Positive
*   Significant reduction in initial load time (~30-50%).
*   Improved runtime memory efficiency by not loading irrelevant generation logic/UI.
*   Future-proof architecture for Gen 4+.

### Negative / Risks
*   Increased complexity in state management (handling async loading states in UI and DB).
*   Latency when first switching generations.
