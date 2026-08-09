---
id: research-055-405-gen3-move-tutor-offsets
type: RESEARCH
title: Gen 3 Move Tutor Event Flag Offsets Research
status: ACTIVE
owner_persona: researcher
created_at: '2026-08-08'
updated_at: '2026-08-09'
depends_on: []
jules_session_id: '3298853694244425673'
pr_number: null
parent: prd-094-055-move-tutor-tracker
tags:
  - research
  - gen3
  - move-tutor
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 3 Move Tutor Event Flag Offsets Research

## Objective
Find the exact event flag memory offsets for Move Tutors in Generation 3 games (FireRed/LeafGreen, Emerald).

## Scope
- Identify the memory addresses and bit flags for all one-time Move Tutors in Gen 3 games.
- Document the differences between FireRed/LeafGreen and Emerald.
- Provide a structured mapping for use in save parsing logic.

## Findings

The event flags used to track whether a one-time Move Tutor has been used are stored in a continuous bit array. This array starts at a specific memory offset in the save file (e.g., in Emerald, this is `0x1270` within `SaveBlock1`).

### Emerald Move Tutors

| Move Tutor | Flag ID | Flag Dec | Offset (bytes from Event Flag start) | Bit Position |
|---|---|---|---|---|
| Swagger | `0x1B1` | 433 | `+0x36` | `1` |
| Rollout | `0x1B2` | 434 | `+0x36` | `2` |
| Fury Cutter | `0x1B3` | 435 | `+0x36` | `3` |
| Mimic | `0x1B4` | 436 | `+0x36` | `4` |
| Metronome | `0x1B5` | 437 | `+0x36` | `5` |
| Sleep Talk | `0x1B6` | 438 | `+0x36` | `6` |
| Substitute | `0x1B7` | 439 | `+0x36` | `7` |
| DynamicPunch | `0x1B8` | 440 | `+0x37` | `0` |
| Double-Edge | `0x1B9` | 441 | `+0x37` | `1` |
| Explosion | `0x1BA` | 442 | `+0x37` | `2` |

### FireRed / LeafGreen Move Tutors

| Move Tutor | Flag ID | Flag Dec | Offset (bytes from Event Flag start) | Bit Position |
|---|---|---|---|---|
| Double-Edge | `0x2C0` | 704 | `+0x58` | `0` |
| Thunder Wave | `0x2C1` | 705 | `+0x58` | `1` |
| Rock Slide | `0x2C2` | 706 | `+0x58` | `2` |
| Explosion | `0x2C3` | 707 | `+0x58` | `3` |
| Mega Punch | `0x2C4` | 708 | `+0x58` | `4` |
| Mega Kick | `0x2C5` | 709 | `+0x58` | `5` |
| Dream Eater | `0x2C6` | 710 | `+0x58` | `6` |
| Soft-Boiled | `0x2C7` | 711 | `+0x58` | `7` |
| Substitute | `0x2C8` | 712 | `+0x59` | `0` |
| Swords Dance | `0x2C9` | 713 | `+0x59` | `1` |
| Seismic Toss | `0x2CA` | 714 | `+0x59` | `2` |
| Counter | `0x2CB` | 715 | `+0x59` | `3` |
| Metronome | `0x2CC` | 716 | `+0x59` | `4` |
| Mimic | `0x2CD` | 717 | `+0x59` | `5` |
| Body Slam | `0x2CE` | 718 | `+0x59` | `6` |
| Frenzy Plant | `0x2DE` | 734 | `+0x5B` | `6` |
| Blast Burn | `0x2DF` | 735 | `+0x5B` | `7` |
| Hydro Cannon | `0x2E0` | 736 | `+0x5C` | `0` |

### Parsing Logic
To calculate the exact byte offset and bit position from a given flag ID decimal value (`Flag_Decimal`):
1. `Byte Offset = Math.floor(Flag_Decimal / 8)`
2. `Bit Position = Flag_Decimal % 8`

In code handling `DataView`, add the resulting `Byte Offset` to the base memory address of the Event Flags block.
