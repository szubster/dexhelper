---
id: task-128-213-implement-item-list-parsing
type: TASK
title: Implement Dynamic Item List Parsing in scripts/generate-pokedata.ts
status: PENDING
owner_persona: coder
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - research-128-212-item-list-parsing-failure
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

# TASK: Implement Dynamic Item List Parsing in scripts/generate-pokedata.ts

## Context & Background
We need to transition from statically defined item lists to dynamically generated ones. Based on ADR-049-025, the existing ETL pipeline in `scripts/generate-pokedata.ts` needs to be updated to fetch and parse `item` resources from our local PokeAPI dataset, generating a compact `items.jsonl` output file inside `data/db/`.
This is a replacement for the previously cancelled `task-128-181`. A critical requirement (which caused the previous failure) is to integrate the generated file in the Vite plugin. Please refer to the output of `research-128-212-item-list-parsing-failure.md` to ensure all integration steps are handled.

## Architecture & Constraints (ADR-049-025)
The new item list will be generated as `items.jsonl`. We must perform a compaction pass to minimize payload size by stripping out defaults, nulls, and undefined values.
The items must be structured with the following fields:
*   `id`: `number` (The PokeAPI ID of the item)
*   `name`: `string` (The display name of the item)
*   `cost`: `number | undefined` (Cost in PokeMarts; omitted if 0)
*   `category`: `number` (Item category ID, mapped from `category.name`)
*   `fling_p` (fling_power): `number | undefined` (Power when used with Fling)
*   `effect`: `string | undefined` (Short effect description, if applicable)
*   `sprite`: `string | undefined` (Item sprite filename/URL, if applicable)

Ensure the generation logic leverages generation-specific datasets (e.g., `past_values` or `version_group_details`) when mapping past generation properties, falling back to Gen 1-3 accurate stats or latest stats as available.

## Acceptance Criteria
- [ ] Read the findings in `research-128-212-item-list-parsing-failure.md`.
- [ ] Implement parsing logic in `scripts/generate-pokedata.ts` to extract item data from the local PokeAPI dataset.
- [ ] Apply compaction to remove nulls, default values, and zeros (like a cost of 0).
- [ ] Ensure the generated structure matches the specification in ADR-049-025.
- [ ] Output the processed data as `data/db/items.jsonl`.
- [ ] Integrate the new `items.jsonl` dataset in `vite-plugins/pokedata-plugin.ts` so it is included in the final payload.
- [ ] Run the updated script to generate the initial `items.jsonl` file.

## Critical Instructions for Coder
- **Failure Policy**: If you experience a transient failure requiring retry, you MUST update the YAML frontmatter to `status: FAILED` with a `rejection_reason`. If you must abort or permanently fail a task (impossible or max rejections reached), you MUST update the YAML frontmatter to `status: CANCELLED` with a `rejection_reason`. Do NOT check off any Acceptance Criteria in the event of failure.
- **Empty PR Policy**: If you find that the artifacts are already complete and no code changes are necessary, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) and then explicitly call the `submit` tool to create an Empty PR. Do NOT end your session without calling `submit`.
