---
id: task-605-670-hydrate-mirage-island-state-logic-impl
type: TASK
title: Implement State Hydration Logic for Mirage Island
status: PENDING
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-09'
depends_on:
  - task-605-668-hydrate-mirage-island-state-schema-impl
jules_session_id: null
pr_number: null
parent: story-063-605-mirage-island-unified-state-hydration
tags:
  - feature
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---
# Implement State Hydration Logic for Mirage Island

## Context
With the schema types updated, the actual runtime mapping and hydration logic must be implemented to ensure the data is properly populated into the unified state payload for UI consumption.

## Requirements
1. Update any relevant save parsing or aggregation functions (e.g., in `src/engine/saveParser`) to correctly map and hydrate the `mirageIslandValue` to the new `BaseSaveData` structure during parsing.
2. Ensure runtime extraction and aggregation logic appropriately handles the Pokémon `personalityValue` segments into the unified payload.
3. Ensure backwards compatibility is maintained for Gen 1 and Gen 2 (these values should gracefully remain undefined and not break parsing or UI).
4. Update unit tests to verify the hydration of these fields works as expected.

## Acceptance Criteria
- [ ] Implement mapping and hydration logic for mirageIslandValue on BaseSaveData.
- [ ] Implement mapping and hydration logic for personalityValue segments on unified data payload.
- [ ] Update and verify test suite for these changes.
