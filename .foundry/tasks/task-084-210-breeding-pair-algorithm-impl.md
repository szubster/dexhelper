---
id: task-084-210-breeding-pair-algorithm-impl
type: TASK
title: Implement Shiny Carrier Breeding Pair Algorithm
status: FAILED
owner_persona: coder
created_at: '2026-06-19'
updated_at: '2026-06-29'
depends_on:
  - task-084-212-breeding-pair-algorithm-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 1
rejection_reason: 'Algorithm does not account for the Gen 2 rule that prevents two Shiny (or Shiny Carrier) Pokémon from breeding together due to identical DVs.'
notes: ''
---

# Implement Shiny Carrier Breeding Pair Algorithm

## Objective
Implement a core backend algorithm (`src/engine/breeding/pair_algorithm.ts` or similar) that takes a user's Pokémon storage as input, cross-references Gen 2 Egg Groups, Genders, and Shiny Carrier flags, and outputs a list of valid breeding pairs prioritized by Shiny Carrier status. This task explicitly depends on the data additions and formulas discovered in `research-084-209-egg-groups-missing`.

## Technical Contract
- Create a function (e.g., `calculateBreedingPairs(pokemonList: Pokemon[])`) that returns an array of `BreedingPair` objects.
- A valid pair in Gen 2 must share at least one Egg Group and have opposite genders (or one must be Ditto).
- Gen 2 specific: The Ditto Egg Group CAN breed with anything except the "No Eggs" (Undiscovered) group.
- The output should include a scoring or prioritization metric that elevates pairs where at least one parent is flagged as `isShinyCarrier`.
- **Constraint**: Do not implement UI in this task. Focus strictly on the data structure and pure function logic.
- Include explicit scaffolding instructions: Implement the `BreedingPair` type and the algorithm.

## Acceptance Criteria
- [x] Algorithm correctly matches valid Gen 2 breeding pairs based on Egg Groups and Gender.
- [x] Algorithm correctly accounts for Ditto mechanics.
- [x] Output explicitly highlights/prioritizes pairs involving Shiny Carriers.
- [x] Include unit tests (`test.ts`) validating these specific matching rules with mocked Gen 2 Pokémon data.
- [x] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [x] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
