---
id: research-602-628-gen2-bug-catching-contest-offsets
type: RESEARCH
title: Investigate Gen 2 Bug-Catching Contest Memory Offsets
status: ACTIVE
owner_persona: researcher
created_at: '2026-09-19'
updated_at: '2026-09-29'
depends_on: []
jules_session_id: '408043603102705787'
pr_number: null
parent: task-521-602-gen2-bug-catching-contest-core-data-impl
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Bug-Catching Contest Memory Offsets

## Context
During the implementation of `task-521-602-gen2-bug-catching-contest-core-data-impl`, it was discovered that the exact SRAM offsets for the currently caught Bug-Catching Contest Pokémon (Species ID, Level, Current HP, and Max HP) are unknown and not documented in the codebase or standard Pokecrystal SRAM mappings.

## Goal
Find and document the exact memory offsets for the currently caught Bug-Catching Contest Pokémon in Gen 2 SRAM.

## Tasks
- [ ] Investigate Bulbapedia or Pokecrystal disassembly to find the `BugContestMon` or equivalent structure in SRAM.
- [ ] Determine the exact offsets for Species ID, Level, Current HP, and Max HP.
- [ ] Note any differences between Gold/Silver and Crystal versions for these offsets.
