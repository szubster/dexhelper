---
id: task-128-214-qa-item-list-parsing-retry
type: TASK
title: Retry QA - Verify Dynamic Item List Parsing
status: PENDING
owner_persona: qa
created_at: '2026-06-21'
updated_at: '2026-06-21'
depends_on:
  - task-128-213-implement-item-list-parsing-retry
jules_session_id: null
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

# TASK: Retry QA - Verify Dynamic Item List Parsing

## Context & Background
The coder has implemented logic in `scripts/generate-pokedata.ts` to fetch and parse item data from the local PokeAPI dataset dynamically, per ADR-049-025, and updated the Vite build. This is a retry of `task-128-182` which failed because the Vite integration was missing.

## Verification Requirements
You need to verify that the item parser extracts the right fields, properly compacts data, writes the output correctly, and that the payload is correctly bundled into `pokedata.msgpack`.
1. Verify `data/db/items.jsonl` contains the dynamically generated item list payload.
2. Ensure the output strictly follows the schema defined in ADR-049-025.
3. Ensure compaction effectively stripped out zero-value costs and empty effects/sprites.
4. **Crucial:** Verify that `vite-plugins/pokedata-plugin.ts` includes `items.jsonl` in the msgpack generation.

## Acceptance Criteria
- [ ] Review the updated code in `scripts/generate-pokedata.ts` to ensure it parses the `item` resource.
- [ ] Inspect the generated `data/db/items.jsonl` to ensure all fields align with the schema.
- [ ] Confirm compaction logic works accurately.
- [ ] Review `vite-plugins/pokedata-plugin.ts` to ensure it integrates `items.jsonl`.
- [ ] Test that the build process succeeds and `items.jsonl` is correctly integrated by the Vite plugin into `pokedata.msgpack`.

## Critical Instructions for QA
- **Failure Policy**: If the coder's implementation is flawed and you must reject it, you MUST update the YAML frontmatter of the target task (`task-128-213-implement-item-list-parsing-retry`) to `status: FAILED`, provide a `rejection_reason`, and increment its `rejection_count`. Do NOT modify your own task's YAML frontmatter (it remains ACTIVE) and do NOT check off any Acceptance Criteria. Document the failure in your QA journal.
- **Empty PR Policy**: Since this is a verification task that may involve no code changes, you MUST check off all Acceptance Criteria checkboxes (`- [x]`) and explicitly call the `submit` tool to create an Empty PR when the validation is successful. Do NOT end your session without calling `submit`.
