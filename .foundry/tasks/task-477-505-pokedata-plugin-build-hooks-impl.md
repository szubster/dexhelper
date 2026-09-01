---
id: task-477-505-pokedata-plugin-build-hooks-impl
type: TASK
title: Update pokedata plugin build hooks for split bundles
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

# Task: Update pokedata plugin build hooks for split bundles

## Context
To implement the static Pokedex data splitting, the Vite plugin's production build hooks need to be updated to emit the new bundles as assets.

## Requirements
- Update `generateBundle` in `vite-plugins/pokedata-plugin.ts` to correctly emit the core bundle and the three generation-specific bundles (`pokedata-genX.msgpack`) instead of a single `pokedata.msgpack`.

## Acceptance Criteria
- [ ] Implement build asset emission for multiple bundles.
