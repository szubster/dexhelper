---
id: story-087-128-dynamic-item-list-parsing
type: STORY
title: Dynamic Item List Generation Script
status: READY
owner_persona: tech_lead
created_at: '2026-06-13'
updated_at: '2026-06-25'
depends_on: []
jules_session_id: '17669075037304464147'
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
- [x] task-128-181-implement-item-list-parsing (CANCELLED)
- [x] task-128-182-qa-item-list-parsing (CANCELLED)
- [ ] research-128-210-item-list-parsing-failure
- [ ] task-128-212-item-list-parsing-impl
- [ ] task-128-213-item-list-parsing-qa
