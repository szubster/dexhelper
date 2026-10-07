---
id: task-605-668-hydrate-mirage-island-state-schema-impl
type: TASK
title: Implement Schema Updates for Mirage Island Hydration
status: READY
owner_persona: coder
created_at: '2026-10-07'
updated_at: '2026-10-07'
depends_on: []
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
# Implement Schema Updates for Mirage Island Hydration

## Context
The daily Mirage Island value and Pokémon personality values are already parsed from Gen 3 save files, but they need to be hydrated into the unified application state for UI components to consume them without breaking backwards compatibility for older generations.

## Requirements
1. Update `src/engine/saveParser/parsers/common.ts` to move the `mirageIslandValue` field from `Gen3SaveData` into `BaseSaveData` as an optional number field, ensuring it is accessible on the base save object.
2. Ensure the relevant Pokémon `personalityValue` segments are correctly typed and exposed in the unified data payload schemas (`PokemonInstance` or related models depending on `BaseSaveData` aggregation).

## Acceptance Criteria
- [ ] Move mirageIslandValue to BaseSaveData.
- [ ] Ensure Pokémon personality values are typed and exposed on unified state payload schemas.
