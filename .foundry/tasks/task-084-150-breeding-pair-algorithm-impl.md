---
id: task-084-150-breeding-pair-algorithm-impl
type: TASK
title: Implement Gen 2 Breeding Pair Algorithm
status: ACTIVE
owner_persona: coder
created_at: '2026-06-08'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '6392408959598286518'
pr_number: null
parent: story-044-084-breeding-pair-algorithm
tags:
  - feature
  - breeding
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Breeding Pair Algorithm

## Context
As part of the Shiny Carrier Breeding engine, we need to suggest optimal breeding pairs from the user's PC storage. This requires an algorithm that can cross-reference Gen 2 Egg Groups, genders, and the newly implemented Shiny Carrier flags.

## Objective
Develop a backend utility function that processes a list of Pokemon (from the PC/Party) and identifies valid breeding pairs, prioritizing those where at least one parent is a Shiny Carrier to maximize the chance of breeding a Shiny Pokemon in Gen 2.

## Technical Blueprint

1. **Create utility function**:
   - Create a new file or add to an existing breeding utilities module (e.g., `src/engine/breeding/breeding-algorithm.ts`).
   - The function should take an array of `Pokemon` objects (or similar representations used in PC storage).

2. **Gen 2 Breeding Rules Implementation**:
   - **Gender**: Pairs must have opposite genders (Male + Female), OR one parent must be Ditto (can breed with Male, Female, or Genderless). Note: Ditto cannot breed with another Ditto.
   - **Egg Groups**: Parents must share at least one Egg Group. Ditto can breed with any Pokemon that is not in the "No Eggs Discovered" (Undiscovered) egg group.
   - **Undiscovered Group**: Pokemon in the "Undiscovered" egg group cannot breed.

3. **Shiny Carrier Prioritization**:
   - The output should be a list of valid pairs.
   - The list must be sorted or structured to prioritize pairs where *at least one* parent is a Shiny Carrier (the `isShinyCarrier` flag or similar property must be true).
   - *Note*: In Gen 2, two shiny Pokemon (or two pokemon with the exact same DVs used for shininess) cannot breed with each other due to the DV inheritance mechanics acting as an incest check. Ensure the algorithm prevents suggesting pairs where both parents have incompatible DVs (or simply avoid suggesting two shiny/shiny-carrier parents if their DVs are identical in the relevant stats, though a simple "at least one shiny carrier" is the primary goal if exact DVs aren't fully resolved yet. Stick to prioritizing one shiny carrier for now unless DV incompatibility is already implemented).
   - Actually, to be safe and accurate for Gen 2: Two pokemon with the same Defense DV and identical or offset Special DVs cannot breed. If we don't have exact DVs, simply prioritizing one Shiny Carrier is sufficient for the scope, but add a note or check if DV data is available.

4. **Return Structure**:
   - Return an array of paired objects, e.g., `Array<{ parent1: Pokemon, parent2: Pokemon, isOptimal: boolean }>` where `isOptimal` is true if one is a Shiny Carrier.

## Acceptance Criteria
- [ ] A function exists that takes an array of Pokemon and returns valid breeding pairs.
- [ ] The function correctly applies Gen 2 Egg Group and Gender rules.
- [ ] The function prioritizes or highlights pairs where at least one parent is a Shiny Carrier.
- [ ] Unit tests are written to verify the algorithm with various combinations (valid pairs, invalid pairs, Ditto pairs, Shiny Carrier pairs).

## Contract
- **Coder**: Implement the logic and tests as described. If you cannot complete this, update the frontmatter to `status: FAILED` with a `rejection_reason`.
- **QA**: A separate QA task will verify this implementation. Do NOT transition this task to COMPLETED if acceptance criteria are unchecked.
