---
id: epic-038-061-gen2-event-flag-parsing
type: EPIC
title: Gen 2 Event Flag Parsing Engine
status: ACTIVE
owner_persona: story_owner
created_at: '2026-06-07'
updated_at: '2026-08-23'
depends_on: []
jules_session_id: '16987269163286498303'
pr_number: null
parent: prd-069-038-gen2-daily-events
tags:
  - gen2
  - backend
  - save-parsing
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Epic: Gen 2 Event Flag Parsing Engine

## Objective
Develop the core save file parsing engine to extract specific time-gated event flags from Generation 2 save files. This is the foundational data layer required to power the dynamic event checklist. Note: We must NOT depend on RTC data from the save file itself, as it is emulator-dependent and incompatible with raw cartridge dumps.

## Acceptance Criteria
- [ ] Parse event flags indicating completion of daily/weekly events.
- [ ] Expose this data cleanly to the frontend UI components.


### Implementation Tasks
- [x] story-061-095-gen2-event-flag-extraction
- [x] story-061-096-gen2-event-data-layer
- [x] research-061-245-gen2-daily-event-offsets
- [ ] story-061-443-gen2-daily-event-mapping
- [ ] story-061-444-gen2-event-flag-parsing-e2e
