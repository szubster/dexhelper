---
id: task-057-120-fix-headbutt-rocksmash-moves
type: TASK
title: Fix Headbutt and Rock Smash Move Checks
status: COMPLETED
owner_persona: coder
created_at: '2026-05-19'
updated_at: '2026-05-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-057-interaction-logic
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - gen2_implementation_plan
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Fix Headbutt and Rock Smash Move Checks

## Description
The current implementation for Headbutt and Rock Smash in the suggestion engine relies solely on checking the player's inventory for the TM items (TM02 and TM08) and checks for Johto gym badges. In Gen 2, these are single-use TMs (not HMs), meaning they disappear from inventory once used. Additionally, they do not require gym badges to be used in the field. The suggestion engine must check if any Pokémon in the player's Party or PC knows the moves instead of just relying on the TM inventory, and the badge checks should be removed.

## Technical Blueprint

1. **Update `gen2Strategy.ts` and `suggestionEngine.ts`**
   - Headbutt move ID is 29. Rock Smash move ID is 249.
   - Remove the gym badge checks for both moves (Johto badge bits 1 and 2).
   - In `suggestionEngine.ts`, update the `hasHeadbutt` and `hasRockSmash` checks to evaluate if any `PokemonInstance` in `allInstances` has move ID 29 (Headbutt) or 249 (Rock Smash) in their `moves` array, OR if the TM is in the inventory.
   - Do the same in `gen2Strategy.ts`. The strategy only has `saveData`, so use `[...(saveData.partyDetails || []), ...(saveData.pcDetails || [])]` to get the instances.

2. **Update Tests**
   - Update `generateSuggestions.test.ts` (and any other relevant tests) to verify the new move-based logic and the removal of the badge requirements.

## Acceptance Criteria
- [x] `gen2Strategy.ts` checks for Headbutt (Move 29) and Rock Smash (Move 249) on Pokémon instances or TMs in inventory, without badge checks.
- [x] `suggestionEngine.ts` checks for Headbutt (Move 29) and Rock Smash (Move 249) on Pokémon instances or TMs in inventory, without badge checks.
- [x] Tests verify the updated known-moves logic and lack of badge restrictions.
