---
id: epic-101-133-gen3-ribbon-extraction
type: EPIC
title: Gen 3 Ribbon Data Extraction
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

# Gen 3 Ribbon Data Extraction

## Background
To support the Ribbon Master challenge tracker, we need to extract the 32-bit Ribbon and Obedience bitfield for each Pokémon from Gen 3 save files.

## Objective
Implement parsing logic for the 32-bit Ribbon and Obedience bitfield located in the Miscellaneous (M) substructure at offset 8 of the 48-byte encrypted Data block.

## Technical Context
- The engine must handle the XOR cipher decryption using the Pokémon's Personality Value (PV) and Original Trainer ID (OT ID).
- Resolve the `PV % 24` permutation to locate the 'M' substructure.
- Use native `DataView` API for safe memory reads as per ADR 010.
- Ensure all new memory offsets and bit locations are defined as reusable constants at the module level, avoiding inline magic numbers.

## Acceptance Criteria
- [x] Break down epic into stories for defining reusable constants for Ribbon bitmask offsets and lengths.
- [x] Break down epic into stories for implementing extraction logic for the 32-bit Ribbon bitfield from the 'M' substructure.
- [x] Break down epic into stories for writing unit tests to verify Ribbon data extraction.
- [ ] story-133-473-gen3-ribbon-constants
- [ ] story-133-474-gen3-ribbon-extraction-logic
- [ ] story-133-475-gen3-ribbon-unit-tests
- [ ] story-133-476-gen3-ribbon-e2e-verification
