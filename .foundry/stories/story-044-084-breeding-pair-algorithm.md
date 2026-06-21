---
id: story-044-084-breeding-pair-algorithm
type: STORY
title: Shiny Carrier Breeding Pair Algorithm
status: READY
owner_persona: tech_lead
created_at: '2026-05-22'
updated_at: '2026-06-21'
depends_on:
  - story-044-083-pc-party-shiny-flag
jules_session_id: '7646001729894249329'
pr_number: null
parent: epic-034-044-shiny-gene-detection-engine
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

# Shiny Carrier Breeding Pair Algorithm

## Objective
Develop an algorithm to suggest optimal breeding pairs by cross-referencing Egg Groups, genders, and Shiny Carrier status across the user's PC storage.

## Scope
- Implement a matching algorithm that takes a full set of user Pokémon and identifies valid breeding pairs.
- Ensure the algorithm prioritizes pairs where at least one parent is a Shiny Carrier.
- Validate that the algorithm correctly respects Gen 2 breeding rules (e.g., Egg Group compatibility, gender requirements).

## Acceptance Criteria
- [ ] Algorithm correctly identifies valid breeding pairs based on Egg Groups and genders.
- [ ] Algorithm accurately identifies and highlights optimal pairs involving Shiny Carriers.

## Next Steps
- [x] Tech Lead: Break down into backend Tasks.
- [x] .foundry/tasks/task-084-204-breeding-pair-algorithm-impl.md
- [x] .foundry/tasks/task-084-205-breeding-pair-algorithm-qa.md
- [ ] .foundry/research/research-084-209-egg-groups-missing.md
- [ ] .foundry/tasks/task-084-210-breeding-pair-algorithm-impl.md
- [ ] .foundry/tasks/task-084-211-breeding-pair-algorithm-qa.md
