---
id: task-402-408-gen3-iv-pv-parser-impl
type: TASK
title: Gen 3 IV/PV Parser Implementation
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on:
  - task-402-407-gen3-iv-pv-types-impl
jules_session_id: '5647805953903088409'
parent: story-112-402-gen3-iv-pv-extraction
tags:
  - dexhelper
  - generation-3
  - save-parsing
rejection_count: 1
rejection_reason: ''
---

# Gen 3 IV/PV Parser Implementation

## Overview
Implement the Gen 3 IV/PV extraction logic in `src/engine/saveParser/parsers/gen3.ts`. This involves reading the PV and OT ID to calculate the decryption key, determining the substructure permutation using `PV % 24`, locating the Miscellaneous (M) substructure, decrypting the IV data, and unpacking the individual values.

## Context
The extraction function must strictly adhere to the Save File Parsing Guidelines, specifically by catching `RangeError` from the `DataView` API and throwing a generic corrupted save error. It must use the constants defined in the prerequisite task.

## Acceptance Criteria
- [ ] Implement `parseGen3PokemonPVAndIVs(view: DataView, offset: number)`.
- [ ] Read PV and OT ID, and calculate `decryptionKey = PV ^ OT ID`.
- [ ] Determine the substructure permutation from `PV % 24` using the `SUBSTRUCTURE_ORDER` array.
- [ ] Locate the Miscellaneous (M) substructure based on the permutation index.
- [ ] Decrypt the 32-bit IV integer and unpack HP, Attack, Defense, Speed, Sp. Attack, and Sp. Defense using the defined bitwise constants.
- [ ] Catch `RangeError` and throw a new error with the exact message: "The save file is corrupted or incomplete."

## Intelligent Verification Protocol
This task implements complex bitwise logic and memory offset calculations. A separate QA task will explicitly verify this implementation. The `coder` must write tests for this implementation.
