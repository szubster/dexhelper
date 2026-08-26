---
id: epic-114-400-gen3-pokeblock-case-parsing-retry
type: EPIC
title: Gen 3 Pokéblock Case Data Parsing
status: READY
owner_persona: epic_planner
created_at: '2026-08-05'
updated_at: '2026-08-14'
depends_on: []
jules_session_id: '2513819693854721323'
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
---

# Gen 3 Pokéblock Case Data Parsing

## Context
As defined in `prd-113-114-gen3-pokeblock-stats-viewer`, we need to extract exact numerical values for all five flavors (Cool, Beauty, Cute, Smart, Tough) and the Feel value of Pokéblocks stored in a Gen 3 save file's Pokéblock Case. This epic covers the backend parsing logic necessary to expose these values to the application layer.

## Acceptance Criteria
- [ ] Research and identify memory offsets for the Pokéblock Case in R/S/E.
- [ ] Implement robust save parsing logic to extract Pokéblock data (flavors and feel).
- [ ] Write unit tests verifying parsing correctness against known good save blocks.
- [ ] Expose parsed data through clear TypeScript interfaces.
- [ ] story-400-477-gen3-pokeblock-constants-types
- [ ] story-400-478-gen3-pokeblock-parsing-logic
- [ ] story-400-479-gen3-pokeblock-parsing-e2e
