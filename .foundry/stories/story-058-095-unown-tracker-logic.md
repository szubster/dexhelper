---
id: story-058-095-unown-tracker-logic
type: STORY
title: Unown Form Tracker Logic
status: PENDING
owner_persona: tech_lead
created_at: '2026-06-06'
updated_at: '2026-06-06'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-037-058-unown-tracker-engine
tags:
  - feature
  - gen2
  - tracking
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Unown Form Tracker Logic

## Objective
Implement the logic in the Gen 2 save parser to determine Unown forms.

## Details
Extract the middle 2 bits of the Attack, Defense, Speed, and Special DVs for Unown (`speciesId` 201). Combine them into an 8-bit integer and calculate modulo 28 to map to forms A-Z (0-25). Append `unownForm` property to the parsed Pokemon.

## Acceptance Criteria
- [ ] Task for parser implementation created.
