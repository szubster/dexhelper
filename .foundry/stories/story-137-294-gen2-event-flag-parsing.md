---
id: story-137-294-gen2-event-flag-parsing
type: STORY
title: Gen 2 Event Flag Parsing
status: READY
owner_persona: tech_lead
created_at: '2026-07-10'
updated_at: '2026-07-16'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-106-137-gen2-static-encounters
tags:
  - gen2
  - backend
research_references: []
rejection_count: 2
rejection_reason: ''
notes: ''
---

# Gen 2 Event Flag Parsing

Extract the event flags for Gen 2 static encounters from the save file. This involves finding the offsets and bit positions for encounters like Sudowoodo, Snorlax, Red Gyarados, and Ho-Oh/Lugia, and exposing this data to the state management layer.

## Acceptance Criteria
- [x] Break down into Tasks
- [ ] task-294-316-gen2-static-encounter-flags-impl
- [ ] task-294-317-gen2-static-encounter-flags-qa
