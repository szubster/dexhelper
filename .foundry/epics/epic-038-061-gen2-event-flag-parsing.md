---
id: epic-038-061-gen2-event-flag-parsing
type: EPIC
title: Gen 2 Event Flag Parsing Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-06-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-069-038-gen2-daily-events
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Gen 2 Event Flag Parsing Engine

## Objective
Develop the core save file parsing engine to extract specific time-gated event flags from Generation 2 save files. This is the foundational data layer required to power the dynamic event checklist. Note: We must NOT depend on RTC data from the save file itself, as it is emulator-dependent and incompatible with raw cartridge dumps.

## Acceptance Criteria
- [ ] Parse event flags indicating completion of daily/weekly events.
- [ ] Expose this data cleanly to the frontend UI components.