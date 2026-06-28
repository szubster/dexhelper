---
id: story-061-155-refactor-pokerus-bitwise
type: STORY
title: Refactor Pokerus Bitwise Extraction
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-23'
updated_at: '2026-06-28'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-061-pokerus-state-exfiltration
tags:
  - refactor
  - save-engine
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Refactor Pokerus Bitwise Extraction

## Description
Refactor the inline bitwise logic for Pokerus state extraction from `src/engine/saveParser/parsers/gen2.ts` into a standardized shared helper function `parsePokerus(rawPokerus: number)` in `src/engine/saveParser/parsers/common.ts`, in accordance with ADR 026. Update the parsing logic to use this helper.

## Acceptance Criteria
- [ ] Create `parsePokerus` in `common.ts`
- [ ] Refactor `gen2.ts` to use `parsePokerus`
- [ ] Ensure tests cover boundary states
- [ ] task-155-234-refactor-pokerus-bitwise-impl
- [ ] task-155-235-refactor-pokerus-bitwise-qa
