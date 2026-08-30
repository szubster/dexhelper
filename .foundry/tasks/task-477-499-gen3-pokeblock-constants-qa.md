---
id: task-477-499-gen3-pokeblock-constants-qa
type: TASK
title: QA Gen 3 Pokéblock Constants and Types
status: READY
owner_persona: qa
created_at: '2026-08-29'
updated_at: '2026-08-29'
depends_on:
  - task-477-498-gen3-pokeblock-constants
jules_session_id: '8690503497960044382'
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

# QA Gen 3 Pokéblock Constants and Types

## Context
Ensure the implemented Gen 3 Pokéblock constants and types are correct and conform strictly to the offsets in `gen3_pokeblock_offsets.md`.

## Instructions
1. Verify that `POKEBLOCK_SIZE` is 8 and `POKEBLOCKS_COUNT` is 40.
2. Verify that Emerald offset is `0x0848` and Ruby/Sapphire offset is `0x07F8`.
3. Check the TypeScript types for correctness and that they properly map the flavor values (`spicy`/`cool`, `dry`/`beauty`, etc.).
4. Verify the `PokeblockColor` enum matches the values `0` through `14`.

## Acceptance Criteria
- [ ] Constants match the defined offsets.
- [ ] Types are correctly exported.
- [ ] Enums are correctly defined.
