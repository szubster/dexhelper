---
id: epic-114-327-gen3-pokeblock-case-parsing
type: EPIC
title: Gen 3 Pokéblock Case Parsing
status: PENDING
owner_persona: story_owner
created_at: '2026-07-14'
updated_at: '2026-08-04'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-113-114-gen3-pokeblock-stats-viewer
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

# Gen 3 Pokéblock Case Parsing

## Overview
This Epic implements the backend logic to parse the Pokéblock Case from Gen 3 save files, extracting exact values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the feel (smoothness) bytes.

## Goals
- Identify and implement the memory offsets for the Pokéblock Case block in Generation 3 save files.
- Extract individual Pokéblock structures from the case array.
- Parse the exact numerical values for all five flavors and the feel bytes into a runtime-friendly data structure.

## Acceptance Criteria
- [ ] Break down this Epic into STORY nodes for save parsing and data extraction.
- [ ] Create a STORY node dedicated exclusively to Integration and E2E Verification of the parsing logic.
