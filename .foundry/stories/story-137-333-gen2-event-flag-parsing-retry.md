---
id: story-137-333-gen2-event-flag-parsing-retry
type: STORY
title: Gen 2 Event Flag Parsing (Retry)
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-07-18'
updated_at: '2026-07-30'
depends_on:
  - research-137-330-investigate-gen2-event-flag-failure
jules_session_id: null
pr_number: null
parent: epic-106-137-gen2-static-encounters
tags:
  - gen2
  - backend
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Gen 2 Event Flag Parsing (Retry)

Extract the event flags for Gen 2 static encounters from the save file. This involves finding the offsets and bit positions for encounters like Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia, and exposing this data to the state management layer.

## Acceptance Criteria
- [x] Break down into Tasks
- [x] task-137-338-gen2-event-flag-parsing-retry-impl
- [x] task-137-339-gen2-event-flag-parsing-retry-qa
