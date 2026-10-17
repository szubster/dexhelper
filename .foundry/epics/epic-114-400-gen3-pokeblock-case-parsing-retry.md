---
id: epic-114-400-gen3-pokeblock-case-parsing-retry
type: EPIC
title: Gen 3 Pokéblock Case Data Parsing
status: COMPLETED
owner_persona: epic_planner
created_at: '2026-08-05'
updated_at: '2026-10-15'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-113-114-gen3-pokeblock-stats-viewer
tags:
  - gen3
  - contests
  - pokeblocks
  - save-parsing
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Gen 3 Pokéblock Case Data Parsing

## Context
As defined in `prd-113-114-gen3-pokeblock-stats-viewer`, we need to extract exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the Feel value of Pokéblocks stored in a Gen 3 save file's Pokéblock Case. This epic covers the backend parsing logic necessary to expose these values to the application layer.

## Acceptance Criteria
- [x] Research and identify memory offsets for the Pokéblock Case in R/S/E.
- [x] Implement robust save parsing logic to extract Pokéblock data (flavors and feel).
- [x] Write unit tests verifying parsing correctness against known good save blocks.
- [x] Expose parsed data through clear TypeScript interfaces.
- [x] story-400-477-gen3-pokeblock-constants-types
- [x] story-400-478-gen3-pokeblock-parsing-logic
- [x] story-400-479-gen3-pokeblock-parsing-e2e
