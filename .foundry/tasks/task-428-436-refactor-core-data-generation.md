---
id: task-428-436-refactor-core-data-generation
type: TASK
title: Refactor Core Data Generation Script
status: FAILED
owner_persona: coder
created_at: $(date -I)
updated_at: '2026-08-20'
depends_on:
  - research-436-441-data-splitting-e2e-failures
jules_session_id: '16728829477920208882'
pr_number: null
parent: story-400-428-extract-core-data
tags:
  - performance
  - architecture
  - bundles
rejection_count: 1
rejection_reason: 'Stripping encounters and locations from pokedata.msgpack causes e2e test failures because PokeDB sync fails to populate these object stores, which breaks components (like Assistant) that rely on them.'
notes: ''
---

# Task: Refactor Core Data Generation Script

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
This task involves modifying the data generation script (`scripts/generate-pokedata.ts`) and Vite plugin (`vite-plugins/pokedata-plugin.ts`) to output `pokedata-core.msgpack` instead of a monolithic bundle. The core bundle should contain shared data like basic Pokemon list, moves, and items.
The generation-specific data extraction will be handled in separate tasks. For now, the generation script should just output the core bundle containing the shared data.
The Vite plugin needs to be updated to output the new filename and use the updated generation logic.

## Acceptance Criteria
- [ ] `scripts/generate-pokedata.ts` modified to generate `pokedata-core.msgpack` containing only core data (pokemon metadata, moves, items).
- [ ] `vite-plugins/pokedata-plugin.ts` updated to build and output `pokedata-core.msgpack`.
- [ ] research-436-441-data-splitting-e2e-failures
