---
id: task-429-602-vite-plugin-bundle-split
type: TASK
title: Update Vite Plugin Bundle Split
status: PENDING
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-28'
depends_on:
  - task-429-601-split-data-generation
jules_session_id: null
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Task: Update Vite Plugin Bundle Split

## Context
Based on research `research-429-531-investigate-gen-specific-bundle-timeout`, this task focuses exclusively on `vite-plugins/pokedata-plugin.ts` to implement the separate generation specific bundles.

## Description
Update the `generateData()` function to read the split JSONL files and package them into `pokedata-core.msgpack`, `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack`. Update `generateBundle()` and `configureServer` middleware to correctly route these new bundles.

## Acceptance Criteria
- [ ] Read split JSONL files (encounters-gen*, locations-gen*) in `vite-plugins/pokedata-plugin.ts`.
- [ ] Create and emit separate hashes/buffers for core, gen1, gen2, and gen3 msgpack bundles.
- [ ] Update `configureServer` middleware to correctly serve the new bundles.
