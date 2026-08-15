---
id: task-412-422-implement-egg-move-inventory
type: TASK
title: Implement Egg Move Inventory Formatting
status: READY
owner_persona: coder
created_at: '2026-08-12'
updated_at: '2026-08-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-114-412-egg-move-inventory-integration
tags:
  - dexhelper
  - feature
  - state
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Implement Egg Move Inventory Formatting

## Context
As part of the Egg Move Inventory Integration, this task connects the egg move pathfinding engine with the existing save file parser. The goal is to cleanly load and format the current PC box and party data into a unified, easily searchable inventory object (e.g., a Map of species IDs to arrays of `PokemonInstance` objects) so the cross-reference engine can efficiently query it.

## Execution Blueprint

1. **Implement Inventory Fetching & Formatting**
   - Extract the PC box (`pcDetails`) and party data (`partyDetails`) from the `SaveData` object.
   - Combine these arrays and format them into a unified, searchable inventory structure. If a similar abstraction like `instancesBySpecies` already exists in `suggestionEngine.ts`, formalize and extract it into a reusable utility module (e.g., `src/engine/breeding/inventoryTools.ts`).

2. **Integration with Egg Move Logic**
   - Ensure the new inventory structure can be seamlessly consumed by the egg move cross-reference logic (e.g., `generateBreedingSuggestions`).

3. **Write Integration Tests**
   - Create tests to verify that the unified inventory object correctly loads and maps `PokemonInstance` data from mock save files.
   - Verify that both party and PC members are included, and that the data is correctly indexed by species.

## Acceptance Criteria
- [x] Data fetching from the save file inventory parser is implemented or extracted into a robust utility.
- [x] PC box and party data are formatted into a unified, easily searchable inventory object.
- [x] Integration tests verify the inventory loading and formatting using mock save data.
