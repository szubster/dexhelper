---
id: research-084-242-gen2-breeding-dvs
type: RESEARCH
title: Investigate Gen 2 Shiny / DV Overlap Breeding Constraints
status: READY
owner_persona: researcher
created_at: '2026-06-29'
updated_at: '2026-06-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - backend
  - breeding
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 2 Shiny / DV Overlap Breeding Constraints

## Context
The QA task `task-084-211-breeding-pair-algorithm-qa` was rejected with the reason "Merged with unfulfilled acceptance criteria". We know from system memory that in Gen 2, two Shiny (or Shiny Carrier) Pokémon cannot breed with each other due to overlapping DVs. We need to properly document these Gen 2 DV overlap breeding constraints to ensure the new implementation handles them correctly.

## Objectives
- Investigate and document the exact conditions where two Pokémon are considered "related" and therefore incompatible for breeding based on Gen 2 DVs.
- Provide the exact logic and test cases required to enforce this constraint in the breeding algorithm.

## Findings: Gen 2 DV Overlap Mechanics

In Generation II, whether a Pokémon is Shiny is completely determined by its DVs (Individual Values).
A Pokémon is considered Shiny if its Defense, Speed, and Special DVs are all exactly 10, and its Attack DV is 2, 3, 6, 7, 10, 11, 14, or 15.

To prevent incest (inbreeding), the Gen 2 breeding algorithm enforces a strict constraint based on DVs:
Two Pokémon are considered incompatible ("related") if:
1. Their Defense DVs are strictly identical.
2. AND their Special DVs are either identical OR differ by exactly 8.

Because all Shiny Pokémon have a Defense DV of 10 and a Special DV of 10, any two Shiny Pokémon will trigger this rule (Defense DVs match, Special DVs match) and be unable to breed.
This rule also heavily affects "Shiny Carriers" (Pokémon with DVs matching the Shiny criteria or 8 off in Special, often passed down from Shiny parents). A Shiny Carrier will frequently be unable to breed with a Shiny Pokémon or another Shiny Carrier if their Defense and Special DVs overlap in this manner.

## Test Cases

To properly implement this constraint, the breeding algorithm must evaluate the Defense and Special DVs of both parents (Parent A and Parent B).

**Test Case 1: Two Shiny Pokémon**
- Parent A: Defense DV = 10, Special DV = 10
- Parent B: Defense DV = 10, Special DV = 10
- Result: **Incompatible** (Defense match: `10 == 10`, Special match: `10 == 10`)

**Test Case 2: Shiny and Shiny Carrier (Difference of 8)**
- Parent A: Defense DV = 10, Special DV = 10 (Shiny)
- Parent B: Defense DV = 10, Special DV = 2 (Carrier)
- Result: **Incompatible** (Defense match: `10 == 10`, Special difference: `|10 - 2| == 8`)

**Test Case 3: Shiny and Unrelated Non-Shiny**
- Parent A: Defense DV = 10, Special DV = 10 (Shiny)
- Parent B: Defense DV = 7, Special DV = 10 (Non-Shiny)
- Result: **Compatible** (Defense mismatch: `10 != 7`)

**Test Case 4: Identical Non-Shiny Defense, Different Special**
- Parent A: Defense DV = 14, Special DV = 5
- Parent B: Defense DV = 14, Special DV = 10
- Result: **Compatible** (Defense match: `14 == 14`, but Special difference `|5 - 10| == 5` is not 0 or 8)

## Acceptance Criteria
- [x] Investigate and document the exact conditions where two Pokémon are considered "related" and therefore incompatible for breeding based on Gen 2 DVs.
- [x] Provide the exact logic and test cases required to enforce this constraint in the breeding algorithm.
