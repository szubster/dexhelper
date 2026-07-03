---
id: epic-038-061-pokerus-state-exfiltration
type: EPIC
title: Pokerus State Exfiltration Epic
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-07-03'
depends_on: []
jules_session_id: '6673973318463572755'
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
- [x] Extract pokerus data
- [ ] story-061-095-pokerus-byte-parsing
- [x] story-061-096-pokerus-tests
- [ ] story-061-155-refactor-pokerus-bitwise

<!-- Tech Lead: Verified complete. Pokerus bitwise logic is thoroughly tested including cured state boundaries. -->

### Auditor Rejection
The macro node cannot be verified yet because its child nodes `story-061-095-pokerus-byte-parsing` and `story-061-155-refactor-pokerus-bitwise` are still in the active `.foundry/stories/` directory, which indicates they have not fully transitioned to the `COMPLETED` state (they would be in `.foundry/archive/` if they were). Wait for all spawned child nodes to be fully completed before transitioning this macro node to VERIFYING.

## Follow-up Nodes
- [x] adr-061-026-bitwise-state-extraction
