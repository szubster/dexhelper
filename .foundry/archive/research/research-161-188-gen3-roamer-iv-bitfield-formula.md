---
id: research-161-188-gen3-roamer-iv-bitfield-formula
type: RESEARCH
title: Investigate Gen 3 Roamer IVs Bitfield Parsing Formula
status: CANCELLED
owner_persona: researcher
created_at: '2026-06-16'
updated_at: '2026-06-16'
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
rejection_reason: Cancelled due to cascading cancellation from parent
notes: ''
---

# Investigate Gen 3 Roamer IVs Bitfield Parsing Formula

## Objective
Discover the exact IVs bitfield parsing formula for Gen 3 roamers, including the size of each stat field and the specific bit shifts required.

## Context
During the implementation of `task-108-161-gen3-roamer-dataview-extraction-impl`, it was discovered that the previous research (`research-071-138-gen3-roamer-offsets.md`) identified the IVs field as a 32-bit integer at offset `0x00` in the roamer data structure, containing the HP, Atk, Def, Spd, SpAtk, and SpDef stats. However, the explicit sizes of these fields (e.g., 5-bit vs other) and the exact bitwise operations (shifts and masks) needed to extract each individual stat were not provided. To adhere to groundedness and prevent hallucinated math, we need explicit confirmation of how to parse this bitfield.

## Acceptance Criteria
- [ ] Determine the exact bit size for each of the 6 IV stats within the 32-bit field.
- [ ] Document the precise bitwise shift (`>>`) and mask (`&`) required to extract HP, Attack, Defense, Speed, Special Attack, and Special Defense from the 32-bit IV integer.
