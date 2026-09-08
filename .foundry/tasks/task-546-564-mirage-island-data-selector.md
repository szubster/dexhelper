---
id: task-546-564-mirage-island-data-selector
type: TASK
title: Mirage Island Data Selector Logic
status: PENDING
owner_persona: coder
created_at: '2026-09-08'
updated_at: '2026-09-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-062-546-implement-mirage-island-tracker
tags:
  - gen3
  - mirage-island
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Mirage Island Data Selector Logic

## Description
Implement a selector or utility function to extract and format the matching Mirage Island Pokémon from the save data.

## Requirements
- Create a utility in `src/engine/gen3/mirageIsland/selector.ts` (or similar).
- The function should take `saveData` as input and iterate over `saveData.party` and `saveData.pc.boxes`.
- It should identify the first Pokémon where `isMirageIslandKey` is `true`.
- It should return a formatted object containing the match status, the Pokémon's name, and its location (e.g., 'Party' or the specific PC Box name).
- Write unit tests for this logic.

## Acceptance Criteria
- [ ] Self-verification: The selector correctly identifies a matching Pokémon in the party.
- [ ] Self-verification: The selector correctly identifies a matching Pokémon in a PC Box.
- [ ] Self-verification: The selector handles the case where no match is found.
- [ ] Self-verification: Unit tests are passing.
