---
id: research-098-171-investigate-mirage-island-offset
type: RESEARCH
title: Investigate Mirage Island Offset and Section
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-061-098-locate-mirage-island-data
tags:
  - gen3
  - mirage-island
  - save-parsing
  - research
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Mirage Island Offset and Section

## Context
The QA validation failed for the Mirage Island offset documentation (`task-098-158-qa-mirage-island-offset`). The rejection reason states:
> Validation FAILED: The documentation incorrectly attributes the offset to "Section 3-4 - Game Specific Data". According to Bulbapedia, 0x0408 and 0x0464 belong to "Section 2 - Game State". The target task has been failed and reverted for correction.

## Requirements
1. Investigate the Bulbapedia claims and cross-reference with authoritative sources (e.g., Pret decompilations) to determine the correct logical 4KB section boundaries for the Gen 3 save file.
2. Determine if the offset `0x0408` (Ruby/Sapphire) and `0x0464` (Emerald) falls within "Section 2 - Game State" or "Section 3-4 - Game Specific Data".
3. Provide a detailed summary of the findings so that the subsequent documentation task can record the correct offset and section information.

## Acceptance Criteria
- [x] Determine the correct section (Section 2 or Section 3-4) for the Mirage Island daily value.
- [x] Document the findings and provide references to authoritative sources.

## Findings

Based on cross-referencing with authoritative Pret decompilations (`pokeemerald` and `pokeruby`), Bulbapedia's claim that the offsets reside in "Section 2 - Game State" is correct.

1. **Section Breakdown**:
   - Section 0 is `SaveBlock2` (Trainer Info).
   - `SaveBlock1` is divided across the next four sections (Sections 1, 2, 3, and 4), each chunk holding exactly 3968 bytes (`0xF80`).
   - Thus, "Section 2 - Game State" logically maps to `SaveBlock1` Chunk 1 (spanning `SaveBlock1` relative offsets `0x0F80` through `0x1EFF`).

2. **Emerald Verification**:
   - In `pokeemerald/include/constants/vars.h`, `VAR_MIRAGE_RND_H` is `0x4024` and `VAR_MIRAGE_RND_L` is `0x4025`.
   - The general variables `vars[VARS_COUNT]` array (`VARS_START = 0x4000`) resides in `SaveBlock1` at relative offset `0x139C`.
   - Calculating the absolute offset within `SaveBlock1` for `VAR_MIRAGE_RND_H`: `0x139C + ((0x4024 - 0x4000) * 2) = 0x13E4`.
   - To find the section: `0x13E4 / 0x0F80 = 1` (which means it lands in the second chunk of `SaveBlock1`, i.e., Section 2).
   - Offset within Section 2: `0x13E4 % 0x0F80 = 0x0464`. (Matches Bulbapedia).

3. **Ruby/Sapphire Verification**:
   - In `pokeruby/include/constants/vars.h`, the variable IDs are the same.
   - However, the `vars` array resides at relative offset `0x1340` in `SaveBlock1`.
   - Calculating absolute offset: `0x1340 + ((0x4024 - 0x4000) * 2) = 0x1388`.
   - Finding the section: `0x1388 / 0x0F80 = 1` (Section 2).
   - Offset within Section 2: `0x1388 % 0x0F80 = 0x0408`. (Matches Bulbapedia).

**Conclusion:** The QA node correctly flagged the issue with the documentation previously stating "Section 3-4", but the actual `gen3_mirage_island_offsets.md` knowledge base file currently aligns with these proven offsets and correctly references Section 2. The finding confirms that the offsets and sections as laid out on Bulbapedia and in the `gen3_mirage_island_offsets.md` are completely accurate.
