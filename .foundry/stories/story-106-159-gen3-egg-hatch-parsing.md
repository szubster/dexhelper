---
id: story-106-159-gen3-egg-hatch-parsing
type: STORY
title: Gen 3 Egg Hatch Data Extraction
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-053-106-egg-hatch-parsing
tags:
  - gen3
  - save-parsing
  - breeding
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Egg Hatch Data Extraction

## Description
Implement the logic to calculate the exact remaining steps for an Egg to hatch in Gen 3 (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

Similar to Gen 2, Gen 3 repurposes the Friendship byte to store remaining "Egg Cycles" if the Pokémon has the "Is Egg" flag set (which is stored in the IVs/Egg/Ability bitfield). The Friendship byte is located in the Growth (G) substructure (offset 4). The cycle length is also 256 steps in Gen 3. Ensure the `DataView` API is used (ADR 010).

## Acceptance Criteria
- [x] Extract the "Is Egg" bit flag from the Miscellaneous (M) substructure.
- [x] If it is an egg, parse the Friendship byte from the Growth (G) substructure.
- [x] Multiply the parsed cycle count by 256 to calculate exact steps.
- [x] Ensure `DataView` API is used.
- [x] Write unit tests verifying the calculation.

- [x] .foundry/archive/tasks/task-159-249-gen3-egg-hatch-parsing-impl.md
- [x] .foundry/tasks/task-159-250-gen3-egg-hatch-parsing-qa.md
