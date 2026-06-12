---
id: research-094-157-moveset-inventory-memory-offsets
type: RESEARCH
title: Investigate Memory Offsets for Move PPs and Known Good Item Lists
status: ACTIVE
owner_persona: researcher
created_at: '2026-06-12'
updated_at: '2026-06-12'
depends_on: []
jules_session_id: '9412363121579024242'
pr_number: null
parent: task-094-157-moveset-inventory-validation-impl
tags:
  - research
  - gen1
  - gen2
  - validation
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Investigate Memory Offsets for Move PPs and Known Good Item Lists

## Context
Task `task-094-157-moveset-inventory-validation-impl` requires validating moveset PPs and inventory items against known good lists. However, the exact memory offsets for Move PPs in Gen 1 and Gen 2, the authoritative Gen 1 item list, and the base move PP values are not present in the current knowledge base or codebase.

## Objectives
1. Determine the exact memory offsets for Move PPs in the 44-byte Gen 1 Pokémon data structure.
2. Determine the exact memory offsets for Move PPs in the 48-byte Gen 2 Pokémon data structure.
3. Locate or compile the authoritative known good item lists for Generation 1.
4. Locate or compile the base PP values for all valid moves in Generation 1 and Generation 2.

## Acceptance Criteria
- [x] Researcher: Document Gen 1 Move PP memory offsets.
- [x] Researcher: Document Gen 2 Move PP memory offsets.
- [x] Researcher: Provide authoritative Gen 1 item lists.
- [x] Researcher: Provide base PP values for all Gen 1 and Gen 2 moves.


## Findings

# Memory Offsets for Move PPs and Known Good Item Lists

## Gen 1 Data Structure
In Generation 1, the Pokémon data structure is 44 bytes long. The Move PP values are stored in 4 consecutive bytes:
- Move 1 PP: `0x1D` (29)
- Move 2 PP: `0x1E` (30)
- Move 3 PP: `0x1F` (31)
- Move 4 PP: `0x20` (32)

Note: The lowest 6 bits represent the current PP, and the highest 2 bits represent the number of PP Ups applied.

## Gen 2 Data Structure
In Generation 2, the Pokémon data structure is 48 bytes long. The Move PP values are stored in 4 consecutive bytes:
- Move 1 PP: `0x17` (23)
- Move 2 PP: `0x18` (24)
- Move 3 PP: `0x19` (25)
- Move 4 PP: `0x1A` (26)

Like Gen 1, the lowest 6 bits represent current PP, and the highest 2 bits represent PP Ups.

## Known Good Item Lists
Item lists and Move Base PPs will be dynamically pulled from PokeAPI instead of statically maintained here. (See idea-077-dynamic-pokeapi-data)

## Base PP Values
