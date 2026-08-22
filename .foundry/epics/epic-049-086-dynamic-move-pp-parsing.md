---
id: epic-049-086-dynamic-move-pp-parsing
type: EPIC
title: Dynamic Generation of Moves PP PokeData
status: READY
owner_persona: story_owner
created_at: '2026-06-13'
updated_at: '2026-08-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-077-049-dynamic-pokedata-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---
# EPIC: Dynamic Generation of Moves PP PokeData

## Background
Currently, data such as move PPs are either manually maintained or fetched ad-hoc. Managing these static tables directly in the repository is a maintenance burden. To solve this, we will parse this data dynamically at build time using `scripts/generate-pokedata.ts`.

## Goals
1. Extract move parameters (specifically Move PPs) by parsing existing repository data at build time.
2. Ensure generation logic properly handles generational discrepancies (e.g., Gen 1 vs. Gen 2 PP limits).
3. Store the extracted data in a scalable format (`moves.jsonl`).
4. Replace manual/hardcoded tables for move data.

## Acceptance Criteria
- [x] Implement parsing logic in `scripts/generate-pokedata.ts` to extract moves data (including PPs).
- [x] Handle any discrepancies between generations for moves.
- [x] Output the correct `moves.jsonl` data payload.
- [x] Replace manual/hardcoded tables for move data in the application runtime.

- [x] story-086-128-move-data-extraction
- [x] story-086-129-move-generation-discrepancies
- [x] story-086-130-move-jsonl-compaction

- [x] story-086-275-move-runtime-integration
