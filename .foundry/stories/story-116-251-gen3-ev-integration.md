---
id: story-116-251-gen3-ev-integration
type: STORY
title: Story - Gen 3 EV Integration
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-02'
updated_at: '2026-08-17'
depends_on:
  - story-116-250-gen3-ev-parsing-logic
jules_session_id: '17870350212498519176'
pr_number: null
parent: epic-092-116-gen3-ev-data-extraction
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story - Gen 3 EV Integration

## 1. Objective
Integrate the Gen 3 EV parsing logic to populate the `evs` property for Party and PC Box Pokémon instances during save extraction.

## 2. Background
Now that the EV parsing logic and the `PokemonInstance` interface updates are defined, the parser needs to actually apply them.

## 3. Scope
- Update `parseGen3Pokemon` or the relevant extraction functions in `src/engine/saveParser/parsers/gen3.ts` to call the EV extraction logic.
- Ensure the result is correctly populated into the `PokemonInstance` objects returned for both party and PC box Pokémon.
- Ensure `RangeError` from the `DataView` is caught and handled gracefully (e.g., throwing a formatted Error).

## 4. Acceptance Criteria
