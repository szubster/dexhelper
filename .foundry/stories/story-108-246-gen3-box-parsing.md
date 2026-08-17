---
id: story-108-246-gen3-box-parsing
type: STORY
title: Gen 3 Box Parsing and Grouping
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-08-17'
depends_on: []
jules_session_id: '6245437706644371596'
pr_number: null
parent: epic-054-108-box-analyzer-save-parsing
tags:
  - feature
  - backend
  - save-parsing
  - gen3
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Story: Gen 3 Box Parsing and Grouping

## Objective
Implement the backend data grouping and aggregation logic to parse PC box data from Generation 3 save files, extract all stored Pokémon, and group them by species ID for duplicate analysis.

## Scope
- Extract PC Box Pokémon from Gen 3 save files.
- Exclude Party Pokémon to prevent accidental releases.
- Group the extracted Pokémon by their species ID.
- Ensure calculation of Individual Values (IVs), Natures, Hidden Power (Type and Base Power), and Shininess for each Pokémon.
- Format the aggregated data into a structure suitable for the frontend Comparison Matrix UI.

## Acceptance Criteria
- [x] Implement Gen 3 PC box parsing and species grouping.
- [x] Verify that Party Pokémon are successfully excluded from the extracted data.
- [x] Ensure all required stats (IVs, Natures, Hidden Power, Shininess) are calculated correctly for each Pokémon.
- [x] research-246-244-gen3-box-parsing
- [ ] task-246-435-gen3-box-parsing-extraction
- [ ] task-246-436-gen3-box-parsing-aggregation
- [ ] task-246-437-gen3-box-parsing-qa
