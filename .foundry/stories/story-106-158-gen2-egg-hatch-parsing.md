---
id: story-106-158-gen2-egg-hatch-parsing
type: STORY
title: Gen 2 Egg Hatch Data Extraction
status: READY
owner_persona: tech_lead
created_at: '2026-06-29'
updated_at: '2026-07-02'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-053-106-egg-hatch-parsing
tags:
  - gen2
  - save-parsing
  - breeding
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Egg Hatch Data Extraction

## Description
Implement the logic to calculate the exact remaining steps for an Egg to hatch in Gen 2 (Gold, Silver, Crystal).

In Gen 2, if a Pokémon is an Egg (species ID 253), its Friendship byte is repurposed to store the remaining "Egg Cycles". We need to parse this byte and multiply it by the standard Gen 2 cycle length (256 steps) to get the exact numerical step count.

## Acceptance Criteria
- [x] Parse the Friendship byte for Gen 2 Eggs (Party and PC).
- [x] Multiply the parsed cycle count by 256 to calculate exact steps.
- [x] Write unit tests verifying the calculation.
- [x] task-158-249-gen2-egg-hatch-parsing-impl
- [x] task-158-250-gen2-egg-hatch-parsing-qa
