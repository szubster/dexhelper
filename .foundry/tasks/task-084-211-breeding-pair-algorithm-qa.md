---
id: task-084-211-breeding-pair-algorithm-qa
type: TASK
title: QA Shiny Carrier Breeding Pair Algorithm
status: PENDING
owner_persona: qa
created_at: '2026-06-19'
updated_at: '2026-06-19'
depends_on:
  - task-084-210-breeding-pair-algorithm-impl
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
  - qa
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# QA Shiny Carrier Breeding Pair Algorithm

## Objective
Verify the correctness of the Shiny Carrier breeding algorithm implementation, ensuring it strictly adheres to Gen 2 matching rules and accurately prioritizes Shiny Carriers.

## Verification Protocol
1. Review the implementation of the matching algorithm (`src/engine/breeding/pair_algorithm.ts` or similar).
2. Validate that the unit tests cover the following edge cases:
   - Male + Female in the same Egg Group.
   - Ditto + Any valid Egg Group (Male, Female, or Genderless).
   - Ditto + "No Eggs" group (should NOT match).
   - Two Pokémon of the same gender (should NOT match).
   - Prioritization logic correctly bubbles up pairs containing exactly one or two `isShinyCarrier` Pokémon.
3. Run the unit tests locally to ensure they pass.

## Acceptance Criteria
- [ ] Verified that the algorithm correctly identifies valid Gen 2 breeding pairs.
- [ ] Verified that the algorithm correctly prioritizes Shiny Carriers.
- [ ] Verified that edge cases (especially Ditto and No Eggs group) are properly handled and tested.
- [ ] All associated unit tests pass.
- [ ] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [ ] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
