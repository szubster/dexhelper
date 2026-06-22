---
id: task-128-182-qa-item-list-parsing
type: TASK
title: QA - Verify Dynamic Item List Parsing
status: ACTIVE
owner_persona: qa
created_at: '2026-06-13'
updated_at: '2026-06-21'
depends_on:
  - task-128-181-implement-item-list-parsing
jules_session_id: '16562040030628466568'
pr_number: null
parent: story-087-128-dynamic-item-list-parsing
tags:
  - qa
  - db
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# TASK: QA - Verify Dynamic Item List Parsing

## Context & Background
The coder has implemented logic in `scripts/generate-pokedata.ts` to fetch and parse item data from the local PokeAPI dataset dynamically (task-128-181-implement-item-list-parsing), per ADR-049-025. This task serves as the QA step to verify the generation logic and the resulting payload.

## Verification Requirements
You need to verify that the item parser extracts the right fields, properly compacts data, and writes the output correctly:
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

## Acceptance Criteria
- [ ] Review the updated code in `scripts/generate-pokedata.ts` to ensure it parses the `item` resource.
- [ ] Inspect the generated `data/db/items.jsonl` to ensure all fields align with the schema.
- [ ] Confirm compaction logic works accurately.
- [ ] Test that the build process succeeds and `items.jsonl` is correctly integrated by the Vite plugin.

## QA Notes (2026-06-21)
The implementation of `task-128-181-implement-item-list-parsing` has been REJECTED. The generation logic was implemented and the dataset was accurately produced, but the developer neglected to update `vite-plugins/pokedata-plugin.ts` to include `items.jsonl` in the generated msgpack bundle payload, violating `ADR-049-025`. The target task's frontmatter has been updated to `FAILED`, the status of this node is left active without checked acceptance criteria, and this has been recorded in the QA journal.

## Critical Instructions for QA
- **Failure Policy**: If the coder's implementation is flawed and you must reject it, you MUST update the YAML frontmatter of the target task (`task-128-181-implement-item-list-parsing`) to `status: FAILED`, provide a `rejection_reason`, and increment its `rejection_count`. Do NOT modify your own task's YAML frontmatter (it remains ACTIVE) and do NOT check off any Acceptance Criteria. Document the failure in your QA journal.
- **Empty PR Policy**: Since this is a verification task that may involve no code changes, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) and explicitly call the `submit` tool to create an Empty PR when the validation is successful. Do NOT end your session without calling `submit`.

### Auditor Rejection
**CANCELLED**: The implementation task (`task-128-181-implement-item-list-parsing`) has reached its maximum rejection count and has been permanently cancelled. Therefore, this QA task is no longer actionable.
A new research node and replacement implementation/QA tasks have been created. This task has been replaced by `task-128-213-qa-item-list-parsing-retry`.
