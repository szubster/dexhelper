---
id: task-084-204-breeding-pair-algorithm-impl
type: TASK
title: Implement Shiny Carrier Breeding Pair Algorithm
status: CANCELLED
owner_persona: coder
created_at: '2026-06-18'
updated_at: '2026-06-18'
depends_on:
  - story-044-083-pc-party-shiny-flag
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: 'Missing prerequisite: utility to compute Gen 2 Pokemon gender based on Attack DV and Gender Ratio.'
notes: ''
---

# Implement Shiny Carrier Breeding Pair Algorithm

## Objective
Implement a core backend algorithm (`src/engine/breeding/pair_algorithm.ts` or similar) that takes a user's Pokémon storage as input, cross-references Gen 2 Egg Groups, Genders, and Shiny Carrier flags, and outputs a list of valid breeding pairs prioritized by Shiny Carrier status.

## Technical Contract
- Create a function (e.g., `calculateBreedingPairs(pokemonList: Pokemon[])`) that returns an array of `BreedingPair` objects.
- A valid pair in Gen 2 must share at least one Egg Group and have opposite genders (or one must be Ditto).
- Gen 2 specific: The Ditto Egg Group CAN breed with anything except the "No Eggs" (Undiscovered) group.
- The output should include a scoring or prioritization metric that elevates pairs where at least one parent is flagged as `isShinyCarrier`.
- **Constraint**: Do not implement UI in this task. Focus strictly on the data structure and pure function logic.
- Include explicit scaffolding instructions: Implement the `BreedingPair` type and the algorithm.

## Acceptance Criteria
- [ ] Algorithm correctly matches valid Gen 2 breeding pairs based on Egg Groups and Gender.
- [ ] Algorithm correctly accounts for Ditto mechanics.
- [ ] Output explicitly highlights/prioritizes pairs involving Shiny Carriers.
- [ ] Include unit tests (`test.ts`) validating these specific matching rules with mocked Gen 2 Pokémon data.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
