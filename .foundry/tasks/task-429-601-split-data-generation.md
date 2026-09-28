---
id: task-429-601-split-data-generation
type: TASK
title: Split Data Generation Scripts
status: READY
owner_persona: coder
created_at: '2026-09-28'
updated_at: '2026-09-28'
depends_on:
  - research-429-531-investigate-gen-specific-bundle-timeout
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

# Task: Split Data Generation Scripts

## Context
As part of the Bundle and Data Splitting Strategy (ADR 029), we are splitting the monolithic data generation. Based on research `research-429-531-investigate-gen-specific-bundle-timeout`, this task handles just the `scripts/generate-pokedata.ts` side to reduce execution complexity.

## Description
Modify the data generation script to output `encounters-gen1.jsonl`, `encounters-gen2.jsonl`, `encounters-gen3.jsonl`, `locations-gen1.jsonl`, `locations-gen2.jsonl`, and `locations-gen3.jsonl` based on version ID and ROM map ID heuristics.

## Acceptance Criteria
- [ ] Update `scripts/generate-pokedata.ts` to output split encounters and locations JSONL files.
- [ ] Ensure generation logic filters correctly based on generation versions and IDs.
