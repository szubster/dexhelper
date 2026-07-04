---
id: story-116-249-gen3-ev-interface-definition
type: STORY
title: Story - Gen 3 EV Interface Definition
status: READY
owner_persona: tech_lead
created_at: '2026-07-02'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-092-116-gen3-ev-data-extraction
tags:
  - gen3
  - save-engine
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story - Gen 3 EV Interface Definition

## 1. Objective
Update the shared `PokemonInstance` interface to support structured Effort Values (EVs) for Gen 3 Pokémon.

## 2. Background
To properly represent EV data extracted from Gen 3 save files, the `PokemonInstance` interface needs a dedicated property to store the 6 EV stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).

## 3. Scope
- Update `src/engine/saveParser/parsers/common.ts` to include an `evs` property in the `PokemonInstance` interface.
- Ensure the property is optional to maintain compatibility with other generations that do not yet extract EVs.
- The `evs` property should be an object containing `hp`, `atk`, `def`, `spa`, `spd`, and `spe` properties.

## 4. Acceptance Criteria

- [x] Break down into Tasks
- [ ] task-249-261-gen3-ev-interface-impl
