---
id: task-429-633-split-data-generation
type: TASK
title: Split Data Generation Scripts
status: CANCELLED
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-30'
depends_on:
  - research-429-632-investigate-task-553-failure
jules_session_id: null
pr_number: null
parent: story-400-429-gen-specific-extensions
tags:
  - performance
  - bundles
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  research-429-632-investigate-task-553-failure
notes: ''
locks: []
---

# Task: Split Data Generation Scripts

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we are splitting the monolithic `pokedata.msgpack` into a core bundle and generation-specific extension bundles (`pokedata-gen{N}.msgpack`).

## Description
This task focuses solely on modifying the data generation script (`scripts/generate-pokedata.ts`). The generator should output multiple generation-specific JSONL outputs for encounters and locations rather than single unified files. Following the recommendations from the previous timeout investigation:
- Encounters: Filter based on version ID. Output to `encounters-gen1.jsonl`, `encounters-gen2.jsonl`, etc.
- Locations: Map IDs dictate generation. Write them to `locations-gen1.jsonl`, etc.

## Acceptance Criteria
- [ ] Modify `scripts/generate-pokedata.ts` to generate generation-specific `encounters-genX.jsonl` files.
- [ ] Modify `scripts/generate-pokedata.ts` to generate generation-specific `locations-genX.jsonl` files.
- [ ] Ensure the generation scripts successfully build and output the correct JSONL files.
