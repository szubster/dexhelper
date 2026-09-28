---
id: story-400-429-gen-specific-extensions
type: STORY
title: Generate Gen-Specific Extensions
status: READY
owner_persona: tech_lead
created_at: '2026-08-17'
updated_at: '2026-09-28'
depends_on:
  - story-400-428-extract-core-data
jules_session_id: '16179401622404760933'
pr_number: null
parent: epic-337-400-data-splitting
tags:
  - performance
  - architecture
  - bundles
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Generate Gen-Specific Extensions

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we need to split the monolithic `pokedata.msgpack` into a core bundle and generation-specific extensions.

## Description
This story covers the generation of generation-specific extension bundles (`pokedata-gen{N}.msgpack`) containing encounters and locations for each generation.

## Acceptance Criteria
- [x] Task to update data generation scripts to output `pokedata-gen1.msgpack`, `pokedata-gen2.msgpack`, etc.
- [x] Task to implement lazy fetching of generation-specific data upon save file detection
- [x] task-429-473-generate-gen-specific-bundles
- [x] task-429-474-implement-lazy-fetching
- [x] task-429-475-gen-specific-bundles-qa
- [ ] research-429-531-investigate-gen-specific-bundle-timeout
- [x] task-429-553-generate-gen-specific-bundles

- [ ] research-429-632-investigate-task-553-failure
- [ ] task-429-633-split-data-generation
- [ ] task-429-634-update-vite-plugin
- [ ] task-429-635-implement-lazy-fetching-v2
- [ ] task-429-636-gen-specific-bundles-qa-v2