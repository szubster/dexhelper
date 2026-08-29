---
id: story-419-477-pokedata-plugin-refactor
type: STORY
title: Refactor pokedata plugin to emit multiple bundles
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-26'
updated_at: '2026-08-26'
depends_on: []
jules_session_id: '6706478323854200827'
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
- [ ] Break down into Tasks
