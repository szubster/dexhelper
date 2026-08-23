---
id: epic-054-108-box-analyzer-save-parsing
type: EPIC
title: Box Analyzer Save Parsing
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-28'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '24108712817236519'
pr_number: null
parent: prd-086-054-box-duplicate-analyzer
tags:
  - feature
  - backend
  - save-parsing
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Box Analyzer Save Parsing

## Objective
Implement the backend data grouping and aggregation logic to parse PC box data from Generation 2 and Generation 3 save files, extract all stored Pokémon, and group them by species ID for duplicate analysis.

## Scope
- Extract PC Box Pokémon from Gen 2 and Gen 3 save files.
- Exclude Party Pokémon to prevent accidental releases.
- Group the extracted Pokémon by their species ID.
- Ensure calculation of Individual Values (DVs/IVs), Natures (Gen 3), Hidden Power (Type and Base Power), and Shininess for each Pokémon.
- Format the aggregated data into a structure suitable for the frontend Comparison Matrix UI.

## Dependencies
- Existing save file parsing infrastructure for Gen 2 and Gen 3.

## Acceptance Criteria
- [x] Implement Gen 2 PC box parsing and species grouping.
- [x] Implement Gen 3 PC box parsing and species grouping.
- [x] Verify that Party Pokémon are successfully excluded from the extracted data.
- [x] Ensure all required stats (DVs/IVs, Natures, Hidden Power, Shininess) are calculated correctly for each Pokémon.
- [x] .foundry/archive/stories/story-108-245-gen2-box-parsing.md
- [x] .foundry/stories/story-108-246-gen3-box-parsing.md
