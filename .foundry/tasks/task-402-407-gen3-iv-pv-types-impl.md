---
id: task-402-407-gen3-iv-pv-types-impl
type: TASK
title: Gen 3 IV/PV Types and Constants Definition
status: ACTIVE
owner_persona: coder
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '1167701633476155096'
parent: story-112-402-gen3-iv-pv-extraction
tags:
  - dexhelper
  - generation-3
  - save-parsing
rejection_reason: ''
rejection_count: 1
---

# Gen 3 IV/PV Types and Constants Definition

## Overview
As the first step in implementing Gen 3 IV/PV extraction, define the necessary types and constants in `src/engine/saveParser/parsers/gen3.ts` (or the relevant types file if it exists, such as `src/engine/saveParser/parsers/gen3Types.ts`). This ensures compliance with the Save File Parsing & Extraction Guidelines by explicitly defining memory offsets, lengths, bit locations, and shifts as reusable constants, avoiding magic numbers in the core logic.

## Context
Gen 3 Pokémon data is stored in a 48-byte encrypted data block, which is divided into four 12-byte substructures (Growth, Attacks, EVs/Condition, Miscellaneous). The order of these substructures is determined by `PV % 24`. The IVs are packed into a 32-bit integer within the Miscellaneous substructure.

## Acceptance Criteria
- [ ] Define constants for `GEN3_POKEMON_PV_OFFSET` and `GEN3_POKEMON_OT_ID_OFFSET`.
- [ ] Define the `SUBSTRUCTURE_ORDER` array containing the 24 possible permutations (e.g., 'G', 'A', 'E', 'M').
- [ ] Define constants for `NUM_SUBSTRUCTURE_PERMUTATIONS` and `SUBSTRUCTURE_SIZE`.
- [ ] Define the `MISC_IVS_OFFSET` constant.
- [ ] Ensure all constants related to IV bitwise shifts (`IV_SHIFT_HP`, `IV_SHIFT_ATK`, etc.) and masks (`IV_MASK`) are defined and exported if they don't already exist.

## Intelligent Verification Protocol
This task creates constants and types that will be used by the parser. The `coder` is responsible for self-verifying these changes. The subsequent QA task will verify the end-to-end integration.
