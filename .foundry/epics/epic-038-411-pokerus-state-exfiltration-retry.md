---
id: epic-038-411-pokerus-state-exfiltration-retry
type: EPIC
title: Pokerus State Exfiltration Epic (Retry)
status: READY
owner_persona: story_owner
created_at: '2026-08-10'
updated_at: '2026-08-20'
depends_on:
  - research-038-407-investigate-pokerus-state-exfiltration-failure
jules_session_id: null
pr_number: null
parent: prd-069-038-pokerus-tracker
tags:
  - gen2
  - save-engine
  - pokerus
research_references: []
rejection_count: 0
rejection_reason: ''
notes: Retry of the cancelled epic-038-061-pokerus-state-exfiltration
---

# Pokerus State Exfiltration Epic (Retry)

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files. This retry depends on the successful investigation of the previous implementation failure.

## Acceptance Criteria
- [ ] Extract pokerus data
- [ ] Story Owner: Generate a final STORY node dedicated exclusively to Integration and E2E Verification.
