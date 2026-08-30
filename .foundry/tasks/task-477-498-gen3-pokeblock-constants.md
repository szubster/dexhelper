---
id: task-477-498-gen3-pokeblock-constants
type: TASK
title: Implement Gen 3 Pokéblock Constants and Types
status: ACTIVE
owner_persona: coder
created_at: '2026-08-29'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: '7159529242794975272'
pr_number: null
parent: story-400-477-gen3-pokeblock-constants-types
tags:
  - gen3
  - pokeblocks
  - typescript
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Pokéblock Constants and Types

## Context
To parse the Pokéblock case from Gen 3 save files, we need to define the exact memory offsets, lengths, and TypeScript types. This involves data found in `SaveBlock1`.

## Instructions
1. Define the memory offsets for Pokéblocks in Emerald (`0x0848`) and R/S (`0x07F8`) in the appropriate constants file. Note that FRLG does not contain Pokéblocks.
2. Define the structure constants, such as `POKEBLOCK_SIZE = 8` and `POKEBLOCKS_COUNT = 40`.
3. Create TypeScript interfaces for a `Pokeblock`, including properties for `color`, `spicy`/`cool`, `dry`/`beauty`, `sweet`/`cute`, `bitter`/`smart`, `sour`/`tough`, and `feel`.
4. Define the Enum for the colors (`None`, `Red`, `Blue`, `Pink`, etc., up to `Gold`).
5. Ensure these types are appropriately exported and documented.

## Acceptance Criteria
- [ ] Constants for Pokéblock memory offsets and sizes are implemented.
- [ ] TypeScript interfaces for `Pokeblock` and `PokeblockColor` enum are implemented.
- [ ] Variables map exactly to the known structure.
