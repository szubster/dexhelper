---
id: story-411-443-extract-pokerus-data
type: STORY
title: Extract Pokerus Data
status: PENDING
owner_persona: tech_lead
created_at: '2026-08-23'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-411-pokerus-state-exfiltration-retry
tags:
  - gen2
  - save-engine
  - pokerus
research_references:
  - research-038-407-investigate-pokerus-state-exfiltration-failure
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Extract Pokerus Data

## Description
Read the specific byte flags for Pokerus for every Pokemon in the party and PC from the Gen 2 sav files, based on the findings from the research node `research-038-407-investigate-pokerus-state-exfiltration-failure`.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-443-477-pokerus-type-definitions
- [ ] task-443-478-pokerus-parser-logic
- [ ] task-443-479-pokerus-parsing-tests
- [ ] task-443-480-pokerus-parsing-qa
