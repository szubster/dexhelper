---
id: story-108-245-gen2-box-parsing
type: STORY
title: Gen 2 Box Parsing and Grouping
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-07-01'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-054-108-box-analyzer-save-parsing
tags:
  - feature
  - backend
  - save-parsing
  - gen2
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''

---

# Story: Gen 2 Box Parsing and Grouping

## Objective
Implement the backend data grouping and aggregation logic to parse PC box data from Generation 2 save files, extract all stored Pokémon, and group them by species ID for duplicate analysis.

## Scope
- Extract PC Box Pokémon from Gen 2 save files.
- Exclude Party Pokémon to prevent accidental releases.
- Group the extracted Pokémon by their species ID.
- Ensure calculation of Individual Values (DVs) and Shininess for each Pokémon.
- Format the aggregated data into a structure suitable for the frontend Comparison Matrix UI.

## Acceptance Criteria
- [ ] Implement Gen 2 PC box parsing and species grouping.
- [ ] Verify that Party Pokémon are successfully excluded from the extracted data.
- [ ] Ensure all required stats (DVs, Shininess) are calculated correctly for each Pokémon.

- [ ] .foundry/archive/tasks/task-245-249-gen2-box-grouping-impl.md
- [ ] .foundry/archive/tasks/task-245-250-gen2-box-grouping-qa.md
