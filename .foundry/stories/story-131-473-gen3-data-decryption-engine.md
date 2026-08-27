---
id: story-131-473-gen3-data-decryption-engine
type: STORY
title: Gen 3 Data Decryption Engine
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-08-26'
depends_on:
  - epic-097-130-gen3-data-structure-extraction
jules_session_id: '8805279093421757777'
pr_number: null
parent: epic-097-131-gen3-data-decryption-mapping
tags:
  - gen3
  - save-engine
research_references:
  - .foundry/archive/research/research-175-176-gen3-pokerus-extraction.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Data Decryption Engine

## Objective
Implement the core logic to calculate the decryption key and decrypt the 48-byte Data block of the Gen 3 Pokemon structure.

## Details
- Extract the Personality Value (PV) and Original Trainer ID (OTID) from the raw data.
- Calculate the decryption key using `PV XOR OTID`.
- Write the logic to decrypt the 48-byte Data block.

## Acceptance Criteria
- [ ] Implement logic to calculate the decryption key.
- [ ] Implement logic to decrypt the data block.
- [ ] Add unit tests verifying the decryption.
- [ ] Adhere to schema constraints: Use relative offsets, avoid magic numbers, use module-level constants, and catch RangeError.
- [ ] task-473-493-gen3-data-decryption-impl
- [ ] task-473-494-gen3-data-decryption-tests
- [ ] task-473-495-gen3-data-decryption-qa
