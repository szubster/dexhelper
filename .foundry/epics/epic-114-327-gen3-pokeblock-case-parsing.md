---
id: epic-114-327-gen3-pokeblock-case-parsing
type: EPIC
title: Gen 3 Pokéblock Case Save Parsing
status: ACTIVE
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-03'
depends_on: []
jules_session_id: '18193594393335192194'
pr_number: null
parent: prd-113-114-gen3-pokeblock-stats-viewer
tags:
  - gen3
  - contests
  - pokeblocks
  - backend
  - save-parsing
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 3 Pokéblock Case Save Parsing

## Overview
This Epic covers the backend save parsing necessary to extract exact Pokéblock data from the Pokéblock Case block in Gen 3 save files.

## Goals
- Identify the memory offsets for the Pokéblock Case in Gen 3.
- Extract individual Pokéblock structures from the case array.
- Parse the exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the feel (smoothness) bytes.

## Acceptance Criteria
- [x] Create STORY(s) for researching offsets and implementing the Pokéblock extraction logic.
- [x] story-327-331-research-gen3-pokeblock-offsets
- [x] story-327-332-implement-gen3-pokeblock-parsing
