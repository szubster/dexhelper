---
id: epic-038-061-pokerus-state-exfiltration
type: EPIC
title: Pokerus State Exfiltration Epic
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-06-20'
depends_on: []
jules_session_id: '16972287448317047678'
pr_number: null
parent: prd-069-038-pokerus-tracker
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Pokerus State Exfiltration Epic

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files.

## Acceptance Criteria
- [x] Extract pokerus data
- [x] .foundry/stories/story-061-095-pokerus-byte-parsing.md
- [x] .foundry/stories/story-061-096-pokerus-tests.md

<!-- Tech Lead: Verified complete. Pokerus bitwise logic is thoroughly tested including cured state boundaries. -->

## Follow-up Nodes
- [x] .foundry/docs/adrs/adr-061-026-bitwise-state-extraction.md
