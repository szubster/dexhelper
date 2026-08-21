---
id: research-436-441-data-splitting-e2e-failures
type: RESEARCH
title: Investigate UI Handling of Missing Encounter/Location Data
status: COMPLETED
owner_persona: researcher
created_at: '2026-08-20'
updated_at: '2026-08-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-428-436-refactor-core-data-generation
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate UI Handling of Missing Encounter/Location Data

## Context
During the implementation of `task-428-436-refactor-core-data-generation`, the monolithic `pokedata.msgpack` was split, and `pokedata-core.msgpack` was configured to only include core data (Pokemon metadata, items, moves), excluding encounters and locations.

However, multiple E2E tests (specifically around the Assistant feature) failed immediately upon load because components rely heavily on `PokeDB.getEncounters` and `PokeDB.getLocations` during their initial rendering or suggestions generation.

## Problem Statement
When encounters and locations are removed from the core bundle, they are populated into IndexedDB only after a user uploads a save file and the generation-specific extension bundle (`pokedata-genX.msgpack`) is downloaded.

The current application logic and UI components assume that all encounter and location data is available immediately upon loading `pokedata.msgpack`. When this assumption is broken, the app throws errors or components fail to render.

## Research Objectives
1. **Identify Affected Components**: Determine exactly which UI components and logic (like `Assistant` and `LocationSuggestions`) fail when `encounters` and `locations` object stores are empty.
2. **Propose Fallbacks/Loading States**: Research and document how the UI should gracefully handle the absence of this data. Should components disable themselves? Should there be a loading state?
3. **Draft Architecture Changes**: If necessary, propose changes to how `PokeDB` or the suggestion engine fetches this data so that the app remains stable before the extension bundle is fetched.

## Acceptance Criteria
- [x] Research completed identifying components affected by the missing data.
- [x] Recommendations documented for graceful degradation or lazy loading of these components/features.
- [x] Task `task-428-436-refactor-core-data-generation` updated or new tasks spawned to implement the required UI/logic safeguards before the bundle splitting is merged.

## Findings

### 1. Affected Components & Logic
Based on tracing the missing `encounters` and `locations` object stores through the `PokeDB` reads, the following components and logic are directly impacted and will fail when data is missing:

- **`AssistantPanel.tsx` and `useAssistant.ts`**: The suggestion engine heavily relies on fetching large amounts of encounters and mapping locations. It throws an error and fails to render suggestions if `fetchAssistantApiData` cannot successfully retrieve location maps or encounters.
- **`LocationSuggestions.tsx`**: The location auto-complete search component will render an empty dropdown or fail completely if `pokeDB.getLocations` returns an empty array or errors out.
- **`DexDataLoader.ts`**: The core data loader tries to bulk load encounters for Pokemon via `dexDataLoader.encounters`. If encounters are missing and IDB fetches fail or return empty, any detail pages calling `getPokemonDetails` could crash or fail to construct their evolution/location chains.

### 2. Proposed Fallbacks & Graceful Degradation
To resolve these issues, we need to introduce protective guards:
- **Assistant Panel & Engine**: `src/engine/assistant/suggestionEngine.ts` needs to check if `allLocations` or `targetEncounters` are empty/missing. If they are, it should return an empty suggestion array safely instead of throwing. `AssistantPanel.tsx` should detect this empty state (or a specific loading state) and show a helpful "Data Loading" or "No suggestions available" message.
- **Location Suggestions**: `src/components/LocationSuggestions.tsx` must short-circuit the search and render a "Locations unavailable" empty state if `locations` array is empty, preventing unnecessary index searches.
- **DexDataLoader**: The DataLoader for encounters needs to safely handle `undefined` or empty results and resolve them to empty arrays (`[]`) so that upstream components like `PokemonDetails.tsx` simply render an empty locations list without crashing.

### 3. Architecture Task Updates
I have updated `task-428-436-refactor-core-data-generation.md` to include explicit Acceptance Criteria to implement these specific UI/logic safeguards (modifying `suggestionEngine.ts`, `LocationSuggestions.tsx`, `AssistantPanel.tsx`, and `DexDataLoader.ts`) *before* the bundle splitting is merged to ensure the tests pass.
