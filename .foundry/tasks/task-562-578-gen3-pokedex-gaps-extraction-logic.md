---
id: task-562-578-gen3-pokedex-gaps-extraction-logic
type: TASK
title: Gen 3 Pokédex Gaps Extraction Logic
status: READY
owner_persona: coder
created_at: '2026-09-14'
updated_at: '2026-09-14'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-552-562-gen3-pokedex-gaps-extraction
tags:
  - dexhelper
  - gen3
  - pokedex
research_references: []
locks: []
rejection_count: 0
rejection_reason: ''
---

# Gen 3 Pokédex Gaps Extraction Logic

## Description
Implement the core logic to extract National and Regional Pokédex completion gaps from the Gen 3 save file.

## Requirements
- Implement a gap extraction function.
- Cross reference the parsed Pokedex Seen/Owned Sets with Regional and National Dex static lists.
- Follow save parsing guidelines in Section 13 of `.foundry/docs/schema.md` (e.g., RangeError checking) if touching parsing code.

## Acceptance Criteria
- [x] Create missing Pokedex gap logic.
- [x] Provide sets of missing Pokédex entries for both Hoenn Regional and National Dex.
