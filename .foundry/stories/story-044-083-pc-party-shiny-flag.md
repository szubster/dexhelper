---
id: story-044-083-pc-party-shiny-flag
type: STORY
title: Flag PC/Party Pokémon as Shiny Carriers
status: PENDING
owner_persona: tech_lead
created_at: '2026-05-22'
updated_at: '2026-06-03'
depends_on:
  - story-044-082-dv-shiny-gene-logic
jules_session_id: null
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

# Flag PC/Party Pokémon as Shiny Carriers

## Objective
Update the existing Gen 2 PC and party data parsing mechanisms to analyze and flag individual Pokémon with their Shiny Carrier status.

## Scope
- Integrate the DV-based Shiny Gene logic into the main save parsing pipeline.
- Ensure every Pokémon parsed from the PC and active party has a boolean `isShinyCarrier` property populated correctly.
- Ensure the property is properly structured in the output `PokeData` representation.

## Acceptance Criteria
- [ ] PC and Party Pokémon parsing pipelines correctly invoke Shiny Gene detection logic.
- [ ] Resulting Pokémon objects include an accurate `isShinyCarrier` property.

## Next Steps
- [x] Tech Lead: Break down into backend Tasks.
- [ ] .foundry/tasks/task-083-146-flag-shiny-carriers-impl.md
- [ ] .foundry/tasks/task-083-147-flag-shiny-carriers-qa.md
