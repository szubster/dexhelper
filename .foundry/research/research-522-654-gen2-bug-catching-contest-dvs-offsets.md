---
id: research-522-654-gen2-bug-catching-contest-dvs-offsets
type: RESEARCH
title: Investigate Gen 2 Bug-Catching Contest DVs and Stats Offsets
status: COMPLETED
owner_persona: researcher
created_at: '2026-10-03'
updated_at: '2026-10-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-512-522-gen2-bug-catching-contest-dvs
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Bug-Catching Contest DVs and Stats Offsets

## Context
During the implementation of story `story-512-522-gen2-bug-catching-contest-dvs`, it was discovered that the exact SRAM offsets for the hidden values (DVs), held item, and stats (Attack, Defense, Speed, Special Attack, Special Defense) of the currently caught Bug-Catching Contest Pokémon are unknown.

## Goal
Find and document the exact memory offsets for the DVs, held item, and stats of the currently caught Bug-Catching Contest Pokémon in Gen 2 SRAM.

## Tasks
- [x] Investigate Bulbapedia or Pokecrystal disassembly to find the `BugContestMon` or equivalent structure in SRAM.
- [x] Determine the exact offsets for DVs, held item, and stats (Attack, Defense, Speed, Special Attack, Special Defense).
- [x] Note any differences between Gold/Silver and Crystal versions for these offsets.

## Findings

The Bug-Catching Contest currently caught Pokémon is stored in WRAM as `wContestMon`, which uses the standard `party_struct` format. When saved to SRAM, it sits inside the `sPokemonData` block.

The Dexhelper codebase already correctly maps the start of this `party_struct` relative to `sPokemonData` via `BUG_CONTEST_MON_RELATIVE_OFFSET = 0x02c5` (709 bytes into `sPokemonData`).

The internal byte offsets relative to the start of this `party_struct` (offset 0) are identical across both Gen 2 engine generations (Gold/Silver and Crystal):

- **Species:** + 0x00 (0)
- **Item:** + 0x01 (1)
- **DVs:** + 0x15 (21)
- **Level:** + 0x1f (31)
- **Current HP:** + 0x22 (34)
- **Max HP:** + 0x24 (36)
- **Attack:** + 0x26 (38)
- **Defense:** + 0x28 (40)
- **Speed:** + 0x2a (42)
- **Special Attack:** + 0x2c (44)
- **Special Defense:** + 0x2e (46)

Both versions use a 32-byte `box_struct` immediately followed by the additional fields of `party_struct`. DVs are stored as 2 bytes inside `box_struct`, while the battle stats are stored as big-endian 2-byte values at the end of `party_struct`.
