---
id: epic-092-116-gen3-ev-data-extraction
type: EPIC
title: Epic - Gen 3 EV Data Extraction
status: FAILED
owner_persona: story_owner
created_at: '2026-06-30'
updated_at: '2026-08-20'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-092-056-gen3-ev-training-dashboard
tags:
  - gen3
  - save-engine
  - endgame
  - competitive
rejection_count: 2
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
---

# Epic - Gen 3 EV Data Extraction

## 1. Objective
Develop the parsing logic in the save engine to accurately extract the 6 Effort Value (EV) stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) for all Pokémon in the current party and PC boxes across all Generation 3 games.

## 2. Background
This epic covers the backend/data layer requirements of the Gen 3 EV Training Dashboard PRD (`prd-092-056-gen3-ev-training-dashboard.md`). Data extraction must be accurate, efficient, and support Ruby, Sapphire, Emerald, FireRed, and LeafGreen.

## 3. Scope
- Implement the parsing logic in `src/engine/gen3/` or appropriate module to read EV offsets for Party and PC Pokémon.
- Ensure the extraction uses the native `DataView` API exclusively (ADR 010).
- Catch `RangeError` from the `DataView` API gracefully for corrupted or truncated files.
- Return the extracted EV data in a structured format suitable for the frontend dashboard.

## 4. Acceptance Criteria
- [ ] Save engine successfully extracts EV data for party and PC Pokémon in Gen 3.
- [ ] Extraction logic handles all Generation 3 games (Ruby, Sapphire, Emerald, FireRed, LeafGreen).
- [ ] The parsing implementation strictly uses the `DataView` API.
- [x] story-116-249-gen3-ev-interface-definition
- [x] story-116-250-gen3-ev-parsing-logic
- [x] story-116-251-gen3-ev-integration
