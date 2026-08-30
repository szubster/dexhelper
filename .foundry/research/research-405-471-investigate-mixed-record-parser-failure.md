---
id: research-405-471-investigate-mixed-record-parser-failure
type: RESEARCH
title: Investigate Mixed Record Parser Failure
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-25'
updated_at: '2026-08-25'
depends_on: []
jules_session_id: '18022819836563758032'
pr_number: null
parent: story-397-405-gen3-mixed-record-npc-data
tags:
  - research
  - gen3
  - mixed-records
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Mixed Record Parser Failure

## Context
The previous implementation for parsing Gen 3 mixed records (`task-405-416-gen3-mixed-record-parser-impl`) failed permanently due to reaching the max rejection count. We need to investigate the root cause of the failure and provide guidelines for a successful implementation.

## Acceptance Criteria
- [x] Investigate the root cause of the failure for `task-405-416-gen3-mixed-record-parser-impl`.
- [x] Determine correct offsets and parsing strategies for Gen 3 mixed records.
- [x] Provide clear recommendations for the implementation.

## Findings

1. **Root Cause**: The implementation task (`task-405-416`) failed primarily because the codebase currently lacks a `decodeGen3String` utility and the corresponding `GEN3_CHAR_MAP` required to parse the `trainerName` from Gen 3 mixed records. It only contains `decodeGen12String`.
2. **Struct of Arrays (SoA)**: The `party` array within the Mixed Record NPC data is not stored as an array of structs (where each Pokémon's properties are stored sequentially). Instead, it is stored as a Struct of Arrays. For example, all 6 Personality Values are stored sequentially (24 bytes), followed by all 24 moves (4 moves per Pokémon * 6 Pokémon * 2 bytes = 48 bytes), followed by all 6 species IDs, and so forth.

## Recommendations

1. **Implement `decodeGen3String`**: Create a `GEN3_CHAR_MAP` mapping array and a `decodeGen3String` function in `src/engine/saveParser/parsers/common.ts`.
2. **Adopt SoA Parsing Strategy**: When implementing the mixed record parser in `src/engine/saveParser/gen3/mixedRecords/parser.ts`, the party extraction loop must iterate 6 times, calculating offsets relative to the start of each array chunk. For example, to read the moves for Pokémon `p`, the offset should be calculated as `partyBaseOffset + MIXED_RECORD_POKEMON_MOVES_OFFSET + p * (MIXED_RECORD_POKEMON_MOVES_COUNT * 2) + m * 2`.
3. **Validation**: Ensure that parsing handles unused slots gracefully (e.g. checking for `0x00` or `0xff` characters, or `personality === 0` to skip empty party slots).
