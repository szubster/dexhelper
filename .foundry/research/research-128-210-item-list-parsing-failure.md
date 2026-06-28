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
   **Answer:** Existing `.jsonl` files are read using the custom `readJsonl(filePath: string)` function, which reads the file and parses each line as JSON. For example: `const pokemon = readJsonl(path.join(sourceDir, 'pokemon.jsonl'));` inside the `generateData()` function.
2. How is the exported data structure (`exportData` object) currently built in `pokedata-plugin.ts` before being packed into the `msgpack` payload?
   **Answer:** The `exportData` object is built by calling `readJsonl` for `pokemon.jsonl`, `encounters.jsonl`, and `locations.jsonl`, reading `metadata.json`, and then explicitly building an object literal: `{ poke: pokemon, enc: encounters, loc: locations, sourceSha: metadata.sourceSha }`. This object is then merged into `finalData` and packed into a `msgpack` payload using the `Packr` class.
3. Where exactly does `items.jsonl` need to be loaded and attached to this payload?
   **Answer:** To integrate `items.jsonl`, we need to call `const items = readJsonl(path.join(sourceDir, 'items.jsonl'));` directly after the other `readJsonl` calls inside the `generateData` function. Then, we must attach this `items` variable to the `exportData` object by adding `items: items,` (or simply `items,`) inside the object literal definition.

## Acceptance Criteria
- [x] Analyze `vite-plugins/pokedata-plugin.ts` and document how existing data files are read and bundled.
- [x] Provide the exact modifications required to include `items.jsonl` in the bundle payload.
