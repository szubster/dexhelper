---
id: research-161-186-gen3-roamer-iv-bitfield
type: RESEARCH
title: Investigate Gen 3 Roamer IVs Bitfield Parsing Formula
status: READY
owner_persona: researcher
created_at: '2026-06-15'
updated_at: '2026-06-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: task-108-161-gen3-roamer-dataview-extraction-impl
tags:
  - gen3
  - roamer
  - save-parsing
  - research
research_references:
  - .foundry/archive/research/research-071-138-gen3-roamer-offsets.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Investigate Gen 3 Roamer IVs Bitfield Parsing Formula

## Objective
Discover the exact IVs bitfield parsing formula for Gen 3 roamers, including the size of each stat field and the specific bit shifts required.

## Context
During the implementation of `task-108-161-gen3-roamer-dataview-extraction-impl`, it was discovered that the previous research (`research-071-138-gen3-roamer-offsets.md`) identified the IVs field as a 32-bit integer at offset `0x00` in the roamer data structure, containing the HP, Atk, Def, Spd, SpAtk, and SpDef stats. However, the explicit sizes of these fields (e.g., 5-bit vs other) and the exact bitwise operations (shifts and masks) needed to extract each individual stat were not provided. To adhere to groundedness and prevent hallucinated math, we need explicit confirmation of how to parse this bitfield.

## Acceptance Criteria
- [x] Determine the exact bit size for each of the 6 IV stats within the 32-bit field.
- [x] Document the precise bitwise shift (`>>`) and mask (`&`) required to extract HP, Attack, Defense, Speed, Special Attack, and Special Defense from the 32-bit IV integer.

## Findings

The 32-bit `ivs` field in the Gen 3 `Roamer` struct stores the Individual Values (IVs) for HP, Attack, Defense, Speed, Special Attack, and Special Defense.

Each IV stat takes exactly 5 bits (giving a range of 0 to 31). The remaining top 2 bits (bits 30-31) are unused in the context of the Roamer IVs specifically (in the main Pokemon structure they represent `isEgg` and `abilityNum`).

### Extraction Formula
To extract each specific stat from the 32-bit IV integer, the following bitwise shift (`>>`) and mask (`&`) are required:

- **HP:** `(ivs >> 0) & 0x1F` (or simply `ivs & 0x1F`)
- **Attack:** `(ivs >> 5) & 0x1F`
- **Defense:** `(ivs >> 10) & 0x1F`
- **Speed:** `(ivs >> 15) & 0x1F`
- **Special Attack:** `(ivs >> 20) & 0x1F`
- **Special Defense:** `(ivs >> 25) & 0x1F`

Note: `0x1F` is binary `11111`, representing the 5-bit mask (decimal 31).
