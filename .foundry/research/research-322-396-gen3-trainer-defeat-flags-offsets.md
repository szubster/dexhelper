---
id: research-322-396-gen3-trainer-defeat-flags-offsets
type: RESEARCH
title: Investigate Gen 3 Trainer Defeat Flags Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-04'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: '5739507086916954407'
pr_number: null
parent: task-319-322-gen3-trainer-flags-extraction-impl
tags:
  - data-extraction
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Trainer Defeat Flags Offsets

## Objective
Investigate the exact memory offsets, lengths, bit locations, and bit shifts for trainer defeat flags (both standard and rematch flags) in Generation 3 save files (Ruby, Sapphire, Emerald, FireRed, LeafGreen).

## Context
The current implementation of the Missed Trainer Radar requires extracting trainer defeat flags from Gen 3 save files. However, the exact memory locations and structures for these flags (especially standard trainer defeat flags) are currently missing from the knowledge base. This information is needed to implement the extraction logic correctly without relying on magic numbers or guessing.

## Questions to Answer
1. Where are the standard trainer defeat flags located in Gen 3 saves (RSE and FRLG)? Which section/offset? Are they within `SaveBlock1` or `SaveBlock2`?
2. How are standard trainer defeat flags structured (e.g. array of bytes, bitfield)? How many flags are there?
3. What are the specific offsets and logic for Rematch flags (e.g. VS Seeker data in FRLG)?

## Findings
1. Standard trainer defeat flags are located in `SaveBlock1` as a bitfield.
   - **Emerald:** `flags` array starts at byte offset `0x1270`.
   - **Ruby/Sapphire:** `flags` array starts at byte offset `0x1220`.
   - **FRLG:** `flags` array starts at byte offset `0x0EE0`.
   - Logical ID for standard trainers starts at `0x500`, so the byte offset within the `flags` array is `0x500 / 8 = 0xA0` (160 bytes).
2. Standard trainer defeat flags are structured as a bitfield (1 bit per trainer).
   - **Emerald:** `MAX_TRAINERS_COUNT = 864` (108 bytes).
   - **Ruby/Sapphire:** `NUMBER_OF_TRAINERS = 693` (87 bytes, although it might use up to 108 depending on save block).
   - **FRLG:** `MAX_TRAINERS_COUNT = 768` (96 bytes).
3. Rematch flags are stored in `SaveBlock1` in the `trainerRematches` array.
   - **Emerald:** Byte offset `0x9CA`, length 100 bytes.
   - **Ruby/Sapphire:** Byte offset `0x97A`, length 100 bytes.
   - **FRLG:** Byte offset `0x063A`, length 100 bytes.
   - Each entry is 1 byte indicating a rematch state (either the rematch table entry ID for RSE or state indexed by local ID for FRLG).

For a complete documentation reference, see `.foundry/docs/knowledge_base/gen3_trainer_flags_offsets.md`.
