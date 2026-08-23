---
id: task-429-473-generate-gen-specific-bundles
type: TASK
title: Generate Gen-Specific Bundles
status: ACTIVE
owner_persona: coder
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '1300348464815347291'
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Generate Gen-Specific Bundles

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we are splitting the monolithic `pokedata.msgpack` into a core bundle and generation-specific extension bundles (`pokedata-gen{N}.msgpack`). The core bundle has already been extracted.

## Description
This task involves modifying the data generation script (`scripts/generate-pokedata.ts`) and the Vite plugin (`vite-plugins/pokedata-plugin.ts`) to output `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack` files alongside the existing `pokedata-core.msgpack`. These extension bundles will contain the encounters and locations specifically for that generation.

## Acceptance Criteria
- [ ] Update `scripts/generate-pokedata.ts` to output `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, and `pokedata-gen3.msgpack` containing gen-specific data.
- [ ] Update `vite-plugins/pokedata-plugin.ts` to build and serve these generation-specific bundles.
- [ ] Ensure the generation scripts successfully build and that the bundles are outputted correctly to `data/`.
