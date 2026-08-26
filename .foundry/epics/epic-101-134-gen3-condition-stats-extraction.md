---
id: epic-101-134-gen3-condition-stats-extraction
type: EPIC
title: Gen 3 Contest Condition Data Extraction
status: PENDING
owner_persona: story_owner
created_at: '2026-07-02'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-093-101-gen3-ribbon-data-extraction
tags:
  - gen3
  - save-engine
  - data-extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Contest Condition Data Extraction

## Background
To track if a Pokémon is "Challenge Ready" for specific Contest Ribbons, we need to extract the Pokémon's Contest stats (Coolness, Beauty, Cuteness, Smartness, Toughness, Feel) from Gen 3 save files.

## Objective
Implement parsing logic for Contest stats located in the EVs & Condition (E) substructure of the 48-byte encrypted Data block.

## Technical Context
- The engine must handle the XOR cipher decryption using the Pokémon's Personality Value (PV) and Original Trainer ID (OT ID).
- Resolve the `PV % 24` permutation to locate the 'E' substructure.
- Use native `DataView` API for safe memory reads as per ADR 010.
- Ensure all new memory offsets and bit locations are defined as reusable constants at the module level, avoiding inline magic numbers.

## Acceptance Criteria
- [x] Break down epic into stories for implementing extraction logic for Contest stats from the 'E' substructure.
- [x] Break down epic into stories for writing unit tests to verify Condition data extraction.
- [ ] story-134-473-gen3-condition-stats-extraction-impl
- [ ] story-134-474-gen3-condition-stats-extraction-tests
- [ ] story-134-475-gen3-condition-stats-extraction-e2e
