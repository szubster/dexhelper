---
id: research-522-654-gen2-bug-catching-contest-dvs-offsets
type: RESEARCH
title: Investigate Gen 2 Bug-Catching Contest DVs and Stats Offsets
status: READY
owner_persona: researcher
created_at: '2026-10-03'
updated_at: '2026-10-03'
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
- [ ] Investigate Bulbapedia or Pokecrystal disassembly to find the `BugContestMon` or equivalent structure in SRAM.
- [ ] Determine the exact offsets for DVs, held item, and stats (Attack, Defense, Speed, Special Attack, Special Defense).
- [ ] Note any differences between Gold/Silver and Crystal versions for these offsets.
