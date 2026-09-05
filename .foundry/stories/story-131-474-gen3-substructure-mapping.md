---
id: story-131-474-gen3-substructure-mapping
type: STORY
title: Gen 3 Substructure Mapping
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-25'
updated_at: '2026-09-03'
depends_on:
  - story-131-473-gen3-data-decryption-engine
jules_session_id: '6663484965554662997'
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
locks: []
---

# Gen 3 Substructure Mapping

## Objective
Implement the logic to resolve the substructure order within the decrypted 48-byte block.

## Details
- The 48-byte block consists of four 12-byte substructures: Growth (G), Attacks (A), EVs & Condition (E), and Miscellaneous (M).
- Calculate the order of these substructures using the formula `PV % 24`.
- Expose an API to access these specific blocks easily.

## Acceptance Criteria
- [ ] Implement logic to resolve the substructure order.
- [ ] Expose an API to retrieve specific substructure blocks.
- [ ] Add unit tests verifying correct mapping for different PV values.
- [ ] Adhere to schema constraints: Use relative offsets, avoid magic numbers, use module-level constants, and catch RangeError.
