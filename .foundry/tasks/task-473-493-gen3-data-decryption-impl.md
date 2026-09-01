---
id: task-473-493-gen3-data-decryption-impl
type: TASK
title: Implement Gen 3 Data Decryption Engine
status: FAILED
owner_persona: coder
created_at: '2026-08-26'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-131-473-gen3-data-decryption-engine
tags:
  - gen3
  - save-engine
research_references: []
rejection_count: 1
rejection_reason: 'Uses magic numbers (48, 4, 3) in extractGen3PokemonData instead of constants'
notes: ''
---

# Implement Gen 3 Data Decryption Engine

## Objective
Implement the core logic to calculate the decryption key and decrypt the 48-byte Data block of the Gen 3 Pokemon structure.

## Details
- Extract the Personality Value (PV) and Original Trainer ID (OTID) from the raw data.
- Calculate the decryption key using PV XOR OTID.
- Write the logic to decrypt the 48-byte Data block.

## Acceptance Criteria
- [ ] Implement logic to calculate the decryption key.
- [ ] Implement logic to decrypt the data block.
- [ ] Adhere to schema constraints: Use relative offsets, avoid magic numbers, use module-level constants, and catch RangeError.

### Auditor Rejection
Transient rejection triggered. The implementation in `src/engine/saveParser/parsers/gen3.ts` contains inline magic numbers (e.g., `48`, `4`, `3`) within `extractGen3PokemonData`. According to Section 13 of the schema guidelines, all magic numbers must be extracted to module-level constants.
