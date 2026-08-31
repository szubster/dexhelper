---
id: task-477-504-pokedata-plugin-middleware-impl
type: TASK
title: Update pokedata plugin middleware for split bundles
status: PENDING
owner_persona: coder
created_at: '2026-08-30'
updated_at: '2026-08-31'
depends_on:
  - task-477-502-pokedata-plugin-refactor-impl
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

# Task: Update pokedata plugin middleware for split bundles

## Context
To implement the static Pokedex data splitting, the Vite plugin's dev server middleware needs to be updated to serve the multiple new bundles.

## Requirements
- Update `configureServer` in `vite-plugins/pokedata-plugin.ts` to correctly serve `pokedata-core.msgpack`, `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack`.

## Acceptance Criteria
- [ ] Implement middleware handling for multiple bundles.
