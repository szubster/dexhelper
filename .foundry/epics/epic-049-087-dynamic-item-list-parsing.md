---
id: epic-049-087-dynamic-item-list-parsing
type: EPIC
title: Dynamic Generation of Items PokeData
status: PENDING
owner_persona: story_owner
created_at: '2026-06-13'
updated_at: '2026-06-13'
depends_on:
  - adr-049-025-dynamic-pokedata-parsing
jules_session_id: null
pr_number: null
parent: prd-077-049-dynamic-pokedata-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# EPIC: Dynamic Generation of Items PokeData

## Background
Currently, valid item lists are either manually maintained or fetched ad-hoc. Managing these static tables directly in the repository is a maintenance burden. To solve this, we will parse this data dynamically at build time using `scripts/generate-pokedata.ts`.

## Goals
1. Extract item lists by parsing existing repository data at build time.
2. Ensure generation logic properly categorizes and validates item structures.
3. Store the extracted data in a scalable format (`items.jsonl`).
4. Replace manual/hardcoded tables for item data.

## Acceptance Criteria
- [ ] Implement parsing logic in `scripts/generate-pokedata.ts` to extract item lists.
- [ ] Handle any validation required for items (e.g. mapping across generations, PokeAPI IDs to internal ROM IDs).
- [ ] Output the correct `items.jsonl` data payload.
