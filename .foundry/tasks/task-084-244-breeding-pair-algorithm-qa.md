---
id: task-084-244-breeding-pair-algorithm-qa
type: TASK
title: QA Shiny Carrier Breeding Pair Algorithm
status: ACTIVE
owner_persona: qa
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on:
  - task-084-243-breeding-pair-algorithm-impl
jules_session_id: '7293614654531249238'
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
Verify the correctness of the Shiny Carrier breeding algorithm implementation, ensuring it strictly adheres to Gen 2 matching rules and accurately prioritizes Shiny Carriers while correctly preventing related Pokémon from breeding.

## Verification Protocol
1. Review the implementation of the matching algorithm (`src/engine/breeding/pair_algorithm.ts` or similar).
2. Validate that the unit tests cover the following edge cases:
   - Male + Female in the same Egg Group.
   - Two Pokémon of the same gender (should NOT match).
   - Two Shiny (or Shiny Carrier) Pokémon with related DVs (should NOT match).
   - Prioritization logic correctly bubbles up pairs containing exactly one or two `isShinyCarrier` Pokémon, provided they are not related.
3. Run the unit tests locally to ensure they pass.

## Acceptance Criteria
- [x] Verified that the algorithm correctly identifies valid Gen 2 breeding pairs.
- [x] Verified that the algorithm correctly prevents breeding between related Pokémon based on Gen 2 DV rules.
- [x] Verified that the algorithm correctly prioritizes Shiny Carriers.
- [x] All associated unit tests pass.
- [x] If transient failures occur, update YAML to `status: FAILED` with a `rejection_reason`. If aborting, update to `status: CANCELLED` with `rejection_reason`.
- [x] If submitting an empty PR for a completed task, you MUST check off all Acceptance Criteria checkboxes before submitting.
