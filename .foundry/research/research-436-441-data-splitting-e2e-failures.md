---
id: research-436-441-data-splitting-e2e-failures
type: RESEARCH
title: Investigate UI Handling of Missing Encounter/Location Data
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-20'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: '14628778509875551832'
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
- [ ] Research completed identifying components affected by the missing data.
- [ ] Recommendations documented for graceful degradation or lazy loading of these components/features.
- [ ] Task `task-428-436-refactor-core-data-generation` updated or new tasks spawned to implement the required UI/logic safeguards before the bundle splitting is merged.
