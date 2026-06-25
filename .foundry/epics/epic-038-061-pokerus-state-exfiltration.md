---
id: epic-038-061-pokerus-state-exfiltration
type: EPIC
title: Pokerus State Exfiltration Epic
status: PENDING
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-06-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-069-038-pokerus-tracker
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Pokerus State Exfiltration Epic

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files.

## Acceptance Criteria
- [ ] Extract pokerus data
- [x] .foundry/archive/stories/story-061-095-pokerus-byte-parsing.md
- [x] .foundry/archive/stories/story-061-096-pokerus-tests.md
- [ ] .foundry/stories/story-061-155-refactor-pokerus-bitwise.md

<!-- Tech Lead: Verified complete. Pokerus bitwise logic is thoroughly tested including cured state boundaries. -->

## Follow-up Nodes
- [x] .foundry/docs/adrs/adr-061-026-bitwise-state-extraction.md

### Auditor Rejection
Verification failed. The bitwise logic for Pokerus state extraction was implemented directly inline in `src/engine/saveParser/parsers/gen2.ts` instead of being standardized into shared helper functions in `src/engine/saveParser/parsers/common.ts`. This is a direct violation of ADR 026. Please refactor the extraction logic into a shared helper function in `common.ts` and update the parsing logic accordingly.
