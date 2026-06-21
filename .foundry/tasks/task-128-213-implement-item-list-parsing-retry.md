---
id: task-128-213-implement-item-list-parsing-retry
type: TASK
title: Retry Implement Dynamic Item List Parsing
status: PENDING
owner_persona: coder
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on:
  - research-128-212-missing-vite-plugin-integration
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

# TASK: Retry Implement Dynamic Item List Parsing in scripts/generate-pokedata.ts

## Context & Background
This is a retry of the original implementation task (`task-128-181`). The initial logic correctly parsed the data into `items.jsonl` but failed to integrate it into the Vite plugin bundle. We need to transition from statically defined item lists to dynamically generated ones. Based on ADR-049-025, the ETL pipeline in `scripts/generate-pokedata.ts` needs to be updated to fetch and parse `item` resources from our local PokeAPI dataset, generating a compact `items.jsonl` output file. Furthermore, we MUST update `vite-plugins/pokedata-plugin.ts` to include this `items.jsonl` data into the final `pokedata.msgpack` bundle payload.

## Architecture & Constraints (ADR-049-025)
The items must be structured with the following fields:
*   `id`: `number` (The PokeAPI ID of the item)
*   `name`: `string` (The display name of the item)
*   `cost`: `number | undefined` (Cost in PokeMarts; omitted if 0)
*   `category`: `number` (Item category ID, mapped from `category.name`)
*   `fling_p` (fling_power): `number | undefined` (Power when used with Fling)
*   `effect`: `string | undefined` (Short effect description, if applicable)
*   `sprite`: `string | undefined` (Item sprite filename/URL, if applicable)

## Acceptance Criteria
- [ ] Implement parsing logic in `scripts/generate-pokedata.ts` to extract item data from the local PokeAPI dataset.
- [ ] Apply compaction to remove nulls, default values, and zeros (like a cost of 0).
- [ ] Ensure the generated structure matches the specification in ADR-049-025.
- [ ] Output the processed data as `data/db/items.jsonl`.
- [ ] Update `vite-plugins/pokedata-plugin.ts` to explicitly bundle the generated `items.jsonl` into the `.msgpack` payload, as researched in `research-128-212`.
- [ ] Run the updated script to generate the initial `items.jsonl` file and verify the Vite build succeeds.

## Critical Instructions for Coder
- **Failure Policy**: If you must abort this task or it fails permanently, you MUST update the YAML frontmatter to `status: FAILED` and provide a `rejection_reason`. Do NOT check off any Acceptance Criteria in the event of failure.
- **Empty PR Policy**: If you find that the artifacts are already complete and no code changes are necessary, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) and then explicitly call the `submit` tool to create an Empty PR. Do NOT end your session without calling `submit`.
