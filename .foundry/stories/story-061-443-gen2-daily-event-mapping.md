---
id: story-061-443-gen2-daily-event-mapping
type: STORY
title: Map Gen 2 Daily and Weekly Event Offsets
status: READY
owner_persona: tech_lead
created_at: '2026-08-23'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-038-061-gen2-event-flag-parsing
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Story: Map Gen 2 Daily and Weekly Event Offsets

## Objective
Map Gen 2 daily/weekly event offsets to the data layer.

## Technical Requirements
Utilize offsets documented in `research-061-245-gen2-daily-event-offsets` to map flags for Friday Lapras, Bug Catching Contest, and Haircut Brothers to expose them to the UI data layer.

## Acceptance Criteria
- [ ] Correctly extract and map time-gated event flags from the raw event block.
