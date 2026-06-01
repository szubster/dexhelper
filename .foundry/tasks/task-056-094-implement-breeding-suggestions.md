---
id: task-056-094-implement-breeding-suggestions
type: TASK
title: Implement Breeding Suggestions
status: COMPLETED
owner_persona: coder
created_at: '2026-05-17'
updated_at: '2026-05-18'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-056-breeding-suggestions
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - gen2_implementation_plan
rejection_count: 1
rejection_reason: Merged with unfulfilled acceptance criteria
notes: ''
---

# Implement Breeding Suggestions

## Description
Update the suggestion engine to detect compatible parents in the PC/Party and suggest breeding for missing baby evolutions (e.g., Pichu, Cleffa, Igglybuff, Tyrogue, Smoochum, Elekid, Magby) in Gen 2.

## Technical Blueprint

1. **Update `src/engine/assistant/suggestionEngine.ts`**
   - Modify the `generateEvolutionAndBreedingSuggestions` function (or create a dedicated breeding suggestion helper if more appropriate) to handle Gen 2 breeding mechanics.
   - For missing Pokémon that are baby evolutions, check if the player has compatible parents in their `allInstances` (PC/Party).
   - "Compatible parents" can be broadly defined as having at least one of the evolved forms, plus either another of the same species (opposite gender, though gender extraction might be complex, so having a Ditto or just an evolved form could be a heuristic). Wait, actually, the user can be suggested to breed if they have the evolved form or a Ditto.
   - *Detail:* Check if the missing ID is a baby Pokémon (e.g., Pichu (172), Cleffa (173), Igglybuff (174), Togepi (175), Tyrogue (236), Smoochum (238), Elekid (239), Magby (240)).
   - If missing a baby and the player owns the parent species (e.g., Pikachu/Raichu for Pichu), generate a `Suggestion` to place them in the Daycare.

2. **Integration with `gen2Strategy.ts`**
   - Ensure that `gen2Strategy.ts` properly supports or allows for breeding logic.
   - The breeding suggestion logic might best be integrated into `generateEvolutionAndBreedingSuggestions` by leveraging the `apiData` to look up evolution trees. If the missing ID is the base of an evolution tree and the player owns an evolved form of it, suggest breeding.

3. **Data Verification**
   - Use the `apiData` to dynamically determine if a missing Pokémon is a baby/base form and the player owns an evolved form.
   - The suggestion should have category `'Breed'` and a suitable priority (e.g., 60-70).

## Context References
Make sure to read `.foundry/docs/knowledge_base/development/gen2_implementation_plan.md` for specific mechanics and expected behaviors.

## Acceptance Criteria
- [x] The suggestion engine correctly detects when the player owns an evolved form of a missing baby/base Pokémon.
- [x] Suggestions of category `'Breed'` are generated, directing the player to the Daycare.
- [x] Unit tests are provided or updated to verify the breeding suggestion logic.
