---
id: epic-038-061-pokerus-state-exfiltration
type: EPIC
title: Pokerus State Exfiltration Epic
status: CANCELLED
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-08-08'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-069-038-pokerus-tracker
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 3
rejection_reason: '[ACKNOWLEDGED] Max rejection count reached'
notes: ''
---

# Pokerus State Exfiltration Epic

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files.

## Acceptance Criteria
- [x] Extract pokerus data
- [x] story-061-095-pokerus-byte-parsing
- [x] story-061-096-pokerus-tests
- [x] story-061-155-refactor-pokerus-bitwise

<!-- Tech Lead: Verified complete. Pokerus bitwise logic is thoroughly tested including cured state boundaries. -->

## Follow-up Nodes
- [x] adr-061-026-bitwise-state-extraction

Follow-up: idea-107-pokerus-strain-ui-tracker
