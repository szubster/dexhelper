---
id: story-087-128-dynamic-item-list-parsing
type: STORY
title: Dynamic Item List Generation Script
status: READY
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: '12174888266524984013'
pr_number: null
parent: epic-049-087-dynamic-item-list-parsing
tags:
  - refactor
  - build
  - db
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# STORY: Dynamic Item List Generation Script

## Background
To eliminate manually maintained static item lists in the repository, we need to extract item lists by parsing existing data dynamically at build time, and output a compact `items.jsonl` payload.

## Goals
1. Implement the ETL generation script `scripts/generate-pokedata.ts` to fetch and parse item data.
2. Validate and map items properties properly according to ADR-049-025.
3. Replace hardcoded instances.

## Acceptance Criteria
- [ ] Implement parsing logic in `scripts/generate-pokedata.ts` to extract item data from PokeAPI resources.
- [ ] Perform compaction to omit nulls and default values.
- [ ] Output the final structure to `data/db/items.jsonl`.
- [x] Break down this STORY into concrete TASK nodes for implementation.
- [ ] task-128-181-implement-item-list-parsing (CANCELLED)
- [ ] task-128-182-qa-item-list-parsing (CANCELLED)
- [ ] research-128-212-item-list-parsing-failure
- [ ] task-128-213-implement-item-list-parsing
- [ ] task-128-214-qa-item-list-parsing
