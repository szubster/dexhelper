---
id: story-327-332-implement-gen3-pokeblock-parsing
type: STORY
title: Implement Gen 3 Pokéblock Case Parsing
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-17'
updated_at: '2026-07-30'
depends_on:
  - story-327-331-research-gen3-pokeblock-offsets
jules_session_id: '14192319002442727656'
pr_number: null
parent: epic-114-327-gen3-pokeblock-case-parsing
tags:
  - gen3
  - contests
  - pokeblocks
  - backend
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 3 Pokéblock Case Parsing

## Overview
Now that we have the exact memory offsets and data structure for the Pokéblock Case in Gen 3 save files, we can implement the parsing logic to extract exact Pokéblock data.

## Goals
- Parse the Pokéblock Case block from the Gen 3 save file.
- Extract individual Pokéblock structures from the case array.
- Parse the exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the feel (smoothness) bytes.

## Acceptance Criteria
- [x] Create TASK(s) to implement the extraction logic for Pokéblocks in the backend data engine.
- [ ] task-332-367-gen3-pokeblock-extraction-impl
- [ ] task-332-368-gen3-pokeblock-extraction-qa
