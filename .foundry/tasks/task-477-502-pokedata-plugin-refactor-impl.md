---
id: task-477-502-pokedata-plugin-refactor-impl
type: TASK
title: Refactor pokedata plugin to emit multiple bundles logic
status: READY
owner_persona: coder
created_at: '2026-08-30'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-419-477-pokedata-plugin-refactor
tags:
  - performance
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Refactor pokedata plugin to emit multiple bundles logic

## Context
To implement the static Pokedex data splitting, the Vite plugin needs to be updated to output the data in separate pieces.
As proposed in ADR 117, we need to extract generation-specific encounters and locations into separate `pokedata-genX.msgpack` files, while keeping the rest in `pokedata-core.msgpack`.

## Requirements
- Modify `vite-plugins/pokedata-plugin.ts`'s `generateData` function to:
  1. Filter encounters and locations into Gen 1, Gen 2, and Gen 3 buckets.
  2. Emit `pokedata-core.msgpack` containing pokemon metadata, items, moves, berries, match calls, and a hash.
  3. Emit `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, `pokedata-gen3.msgpack` containing gen-specific encounters and locations.

## Acceptance Criteria
- [ ] Implement data splitting logic.
