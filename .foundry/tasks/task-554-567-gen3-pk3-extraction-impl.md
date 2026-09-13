---
id: task-554-567-gen3-pk3-extraction-impl
type: TASK
title: Implement Gen 3 PK3 Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-09-07'
updated_at: '2026-09-07'
depends_on: []
jules_session_id: null
parent: story-530-554-gen3-pk3-extraction
tags:
  - data
  - gen3
locks: []
rejection_reason: ''
---

# Task: Implement Gen 3 PK3 Extraction Logic

## Overview
Implement the core logic to extract Gen 3 Pokémon data from save files and convert it into the standard `.pk3` format. This includes handling the 100-byte data structure, decryption via PV and OT ID, and mapping the 24 possible substructure permutations.

## Requirements
- Read `.foundry/docs/knowledge_base/gen3_pokemon_data_structure.md` and `.foundry/docs/schema.md` Section 13.
- Implement a parser that handles the 100-byte structure and the 48-byte encrypted Data block.
- Implement the XOR decryption using the 32-bit key derived from `PV XOR OT ID`.
- Implement logic to determine the substructure permutation based on `PV % 24` and extract the G, A, E, and M substructures appropriately.
- Ensure all memory offsets, lengths, and bit locations are defined as module-level constants.
- Avoid magic numbers and use `DataView` properly, catching `RangeError` for out-of-bounds reads.
- Write corresponding unit tests using Vitest to verify the extraction and decryption logic.

## Acceptance Criteria
- [ ] Implement Gen 3 PK3 extraction logic with proper substructure mapping.
- [ ] Ensure all constants are defined at the module level.
- [ ] Write Vitest unit tests verifying extraction correctness.
