---
id: research-095-157-gen2-event-flag-offsets
type: RESEARCH
title: Investigate Gen 2 Event Flag Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-06-12'
updated_at: '2026-06-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-095-157-gen2-event-flag-impl
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Event Flag Offsets

## Context
During the implementation of `task-095-157-gen2-event-flag-impl`, the exact memory offsets for event flags in Gen 2 (Gold/Silver and Crystal) save files could not be definitively confirmed. While the general structure suggests `0x283E` for GS and `0x281A` for Crystal, these offsets might be incorrect due to the "Shift Phenomenon" and differences in RAM architecture or localized builds.

## Goal
To successfully extract the correct event flag bytes using the `DataView` API, we need precise offset mapping and to ensure the extracted bounds match what is required by the `eventFlags` property in `SaveData`.

## Tasks
- [x] 1. Investigate and document the exact start offset for event flags in both GS and Crystal saves.
- [x] 2. Determine the exact length of the event flags block.
- [x] 3. Confirm if any additional shifts occur depending on the specific locale version of the game or other variables.
- [x] 4. Update `.foundry/docs/knowledge_base/engine/save_parsing/gen2_generic_structure.md` with the verified offsets.

## Research Conclusion
After analyzing the `pokecrystal` disassembly and cross-referencing with Bulbapedia's Generation II save structure:
1. The initial assumption that event flags might be at `0x283E` (GS) or `0x281A` (Crystal) was incorrect. Those offsets actually correspond to the **Party Pokémon Data** for English Crystal and Japanese Crystal, respectively.
2. The `wEventFlags` block is located exactly 256 bytes (`0x100`) before `wCurBox` (Current PC Box).
3. The exact start offsets are:
   - English Gold/Silver: `0x2624`
   - English Crystal: `0x2600`
   - Japanese Gold/Silver: `0x2600`
   - Japanese Crystal: `0x25E2`
4. The exact length of the event flags block is 256 bytes (representing 2048 flags/bits).
5. Shifts do indeed occur based on the locale version of the game (Japanese versions are shifted backwards due to shorter string allocations for names and PC box names).
