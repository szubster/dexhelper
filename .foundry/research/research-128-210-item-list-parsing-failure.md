---
id: research-128-210-item-list-parsing-failure
type: RESEARCH
title: Investigate Missing Integration in Item List Parsing
status: READY
owner_persona: researcher
created_at: '2026-06-21'
updated_at: '2026-06-27'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-087-128-dynamic-item-list-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# RESEARCH: Investigate Missing Integration in Item List Parsing

## Context
The previous implementation task for parsing item lists dynamically (`task-128-181-implement-item-list-parsing`) reached its maximum rejection count and was marked as FAILED. The issue was not with the generation script (`scripts/generate-pokedata.ts`) itself, but because the developer neglected to update the Vite plugin (`vite-plugins/pokedata-plugin.ts`) to include the newly generated `items.jsonl` in the msgpack bundle payload, violating `ADR-049-025`.

## Objective
Investigate and document the exact lines and areas in `vite-plugins/pokedata-plugin.ts` that need to be updated to integrate `items.jsonl`. This research will ensure the next coder persona has explicit instructions on where and how to integrate the newly generated data so the bundle includes it.

## Questions to Answer
1. How does `vite-plugins/pokedata-plugin.ts` currently read `.jsonl` files from the source directory?
2. How is the exported data structure (`exportData` object) currently built in `pokedata-plugin.ts` before being packed into the `msgpack` payload?
3. Where exactly does `items.jsonl` need to be loaded and attached to this payload?

## Acceptance Criteria
- [ ] Analyze `vite-plugins/pokedata-plugin.ts` and document how existing data files are read and bundled.
- [ ] Provide the exact modifications required to include `items.jsonl` in the bundle payload.
