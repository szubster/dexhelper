---
id: task-429-635-implement-lazy-fetching-v2
type: TASK
title: Implement Lazy Fetching of Gen-Specific Bundles (v2)
status: CANCELLED
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-30'
depends_on:
  - task-429-634-update-vite-plugin
jules_session_id: null
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-429-632-investigate-task-553-failure
notes: ''
locks: []
---

# Task: Implement Lazy Fetching of Gen-Specific Bundles (v2)

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we have split our data into a core bundle and generation-specific extension bundles.

## Description
This task replaces the cancelled `task-429-474-implement-lazy-fetching`. It involves modifying the data loading logic in `src/db/PokeDB.ts` (and possibly related data loading components) to implement lazy fetching of the generation-specific bundles (`pokedata-gen{N}.msgpack`) upon save file detection or when generation-specific components are loaded. The core bundle should be loaded initially, and the generation specific bundles should only be fetched and synced when needed by the current generation.

## Acceptance Criteria
- [ ] Implement fetching of `pokedata-gen{N}.msgpack` bundles when a save file of generation `N` is detected or when data for that generation is requested.
- [ ] Ensure the generation-specific data is correctly synced with IndexedDB (similar to the core data).
- [ ] Add tests or update existing tests in `src/db/__tests__/PokeDB.test.ts` to cover the new lazy loading mechanism.
