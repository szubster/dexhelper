---
id: story-306-320-gen2-trainer-data-extraction
type: STORY
title: Gen 2 Trainer Data Extraction
status: ACTIVE
owner_persona: tech_lead
created_at: '2026-07-13'
updated_at: '2026-07-29'
depends_on: []
jules_session_id: '9784147015314850491'
pr_number: null
parent: epic-109-306-missed-trainer-data-extraction-gen1-gen2
tags:
  - gen2
  - save-engine
  - extraction
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Trainer Data Extraction

## Objective
Extract and parse the trainer defeat flags for Generation 2 games from Bank 1.

## Requirements
1. Extract the trainer defeat event flags from Bank 1 in Generation 2 games.
2. Ensure explicit bitwise logic is used with boundary testing (ADR 026).
3. Use relative offsets and constants (ADR 028) strictly. No inline magic numbers.

## Acceptance Criteria
- [x] Break down into Tasks


- [x] task-320-322-gen2-trainer-flags-impl
- [x] task-320-323-gen2-trainer-flags-qa
