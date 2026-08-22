---
id: research-241-449-gen3-daycare-offsets
type: RESEARCH
title: Investigate Gen 3 Daycare Memory Offsets
status: PENDING
owner_persona: researcher
created_at: "2026-08-22"
updated_at: "2026-08-22"
depends_on: []
jules_session_id: null
pr_number: null
parent: task-241-440-daycare-gen3-parsing-impl
tags:
  - gen3
  - daycare
  - offsets
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Investigate Gen 3 Daycare Memory Offsets

## Context
During the implementation of Gen 3 Daycare Data Parsing, it became apparent that the exact memory offsets for the Daycare struct in Gen 3 (`SaveBlock1` / Section 1) are not documented in the project's knowledge base or easily accessible from standard community documentation (like Bulbapedia).

We need the explicit memory offsets for the Daycare save block across the different Gen 3 game versions (Ruby/Sapphire, Emerald, FireRed/LeafGreen) to properly parse the `DaycareMon` structures.

According to `pokeemerald` decompilation:
- `struct DayCare` contains an array of 2 `struct DaycareMon`, followed by a 4-byte `offspringPersonality` and a 1-byte `stepCounter`.
- Each `struct DaycareMon` contains a `struct BoxPokemon` (80 bytes), a `struct DaycareMail` (56 bytes), and `u32 steps`.
- It appears to be located around `0x3030` in the `SaveBlock1` for Emerald, but this needs to be verified for all versions.

## Objectives
- Determine the absolute offsets for the Daycare block within `SaveBlock1` for Ruby/Sapphire.
- Determine the absolute offsets for the Daycare block within `SaveBlock1` for Emerald.
- Determine the absolute offsets for the Daycare block within `SaveBlock1` for FireRed/LeafGreen.
- Verify the exact size and struct layout of the Daycare data (e.g. `BoxPokemon` vs full `Pokemon`).
- Create a new document `.foundry/docs/knowledge_base/dexhelper/gen3_daycare_offsets.md` detailing these findings.

## Deliverables
- [ ] Document Gen 3 Daycare offsets for RS, E, and FRLG in a new knowledge base markdown file.
