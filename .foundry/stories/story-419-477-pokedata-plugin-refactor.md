---
id: story-419-477-pokedata-plugin-refactor
type: STORY
title: Refactor pokedata plugin to emit multiple bundles
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-08-30'
depends_on: []
jules_session_id: '5412354883755069025'
pr_number: null
parent: epic-340-419-data-splitting
tags:
  - performance
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Refactor pokedata plugin to emit multiple bundles

## Context
To implement the static Pokedex data splitting, the Vite plugin needs to be updated to output the data in separate pieces.

## Requirements
- Modify `vite-plugins/pokedata-plugin.ts` to output `pokedata-core.msgpack`.
- Modify the plugin to output generation-specific bundles like `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, etc.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-477-502-pokedata-plugin-refactor-impl
- [ ] task-477-504-pokedata-plugin-middleware-impl
- [ ] task-477-505-pokedata-plugin-build-hooks-impl
- [ ] task-477-503-pokedata-plugin-refactor-qa
