---
id: research-121-171-gen3-tv-block-offsets
type: RESEARCH
title: Investigate Gen 3 TV Block Memory Offsets and Structures
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-16'
updated_at: '2026-06-19'
depends_on: []
jules_session_id: '10936372883575576544'
pr_number: null
parent: task-121-171-gen3-tv-block-parser-impl
tags:
  - research
  - gen3
  - memory-offsets
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Gen 3 TV Block Memory Offsets and Structures

## Objective
The `task-121-171-gen3-tv-block-parser-impl` node is blocked because the exact memory offsets, block sizes, and data structures for the TV broadcast data block in Gen 3 save files (Ruby, Sapphire, Emerald) are not documented in the knowledge base.

Investigate and document these details to unblock the parser implementation.

## Findings

The memory offsets, block sizes, and data structures for the TV broadcast data block in Gen 3 save files (Ruby, Sapphire, Emerald) are as follows:

### 1. Upcoming Event Schedule (`PokeNews`)
The game maintains an array of `PokeNews` structs within `SaveBlock1` to manage upcoming events.
- **Offset within `SaveBlock1`:** `0x2B50`
- **Count:** `16`
- **Total Array Size:** `64` bytes (`0x40`)
- **Struct Size:** `4` bytes each

### 2. TV Broadcast Data (`TVShow`)
The game stores TV show broadcasts in an array of `TVShow` structures within `SaveBlock1`.
- **Offset within `SaveBlock1`:** `0x27CC`
- **Count:** `25`
- **Total Array Size:** `900` bytes (`0x384`)
- **Struct Size:** `36` bytes each

### 3. TVShow Common Header
- `0x00` (`u8`): `kind` (The ID of the TV show broadcast)
- `0x01` (`bool8`): `active` (Boolean flag indicating if the show is actively in rotation)
Following the header, bytes `0x02` to `0x23` contain show-specific payload data.
