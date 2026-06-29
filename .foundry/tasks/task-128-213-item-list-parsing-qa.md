---
id: task-128-213-item-list-parsing-qa
type: TASK
title: QA - Verify Dynamic Item List Parsing and Integration
status: ACTIVE
owner_persona: qa
created_at: '2026-06-21'
updated_at: '2026-06-29'
depends_on:
  - task-128-212-item-list-parsing-impl
jules_session_id: '4741764116868011529'
pr_number: null
parent: story-087-128-dynamic-item-list-parsing
tags:
  - qa
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# TASK: QA - Verify Dynamic Item List Parsing and Integration

## Context & Background
The coder has re-implemented logic in `scripts/generate-pokedata.ts` to fetch and parse item data from the local PokeAPI dataset dynamically, and has updated `vite-plugins/pokedata-plugin.ts` to integrate it, per ADR-049-025. This task serves as the QA step to verify the generation logic and the resulting payload.

## Verification Requirements
You need to verify that the item parser extracts the right fields, properly compacts data, and writes the output correctly, and that the data is integrated into the Vite build correctly:
1. Verify `data/db/items.jsonl` contains the dynamically generated item list payload.
2. Ensure the output strictly follows the schema defined in ADR-049-025:
    *   `id`: `number` (The PokeAPI ID of the item)
    *   `name`: `string` (The display name of the item)
    *   `cost`: `number | undefined` (Cost in PokeMarts; omitted if 0)
    *   `category`: `number` (Item category ID, mapped from `category.name`)
    *   `fling_p` (fling_power): `number | undefined` (Power when used with Fling)
    *   `effect`: `string | undefined` (Short effect description, if applicable)
    *   `sprite`: `string | undefined` (Item sprite filename/URL, if applicable)
3. Ensure compaction effectively stripped out zero-value costs and empty effects/sprites.
4. Ensure `vite-plugins/pokedata-plugin.ts` correctly reads and includes the new `items.jsonl` in the msgpack bundle payload.

## Acceptance Criteria
- [x] Review the updated code in `scripts/generate-pokedata.ts` to ensure it parses the `item` resource.
- [x] Inspect the generated `data/db/items.jsonl` to ensure all fields align with the schema.
- [x] Confirm compaction logic works accurately.
- [x] Test that the build process succeeds and `items.jsonl` is correctly integrated by the Vite plugin.

## Critical Instructions for QA
- **Failure Policy**: If the coder's implementation is flawed and you must reject it, you MUST update the YAML frontmatter of the target task (`task-128-212-item-list-parsing-impl`) to `status: FAILED`, provide a `rejection_reason`, and increment its `rejection_count`. Do NOT modify your own task's YAML frontmatter (it remains ACTIVE) and do NOT check off any Acceptance Criteria. Document the failure in your QA journal.
- **Empty PR Policy**: Since this is a verification task that may involve no code changes, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) and explicitly call the `submit` tool to create an Empty PR when the validation is successful. Do NOT end your session without calling `submit`.
