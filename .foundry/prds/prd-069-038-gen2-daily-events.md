---
id: prd-069-038-gen2-daily-events
type: PRD
title: Gen 2 Daily and Weekly Event Tracker PRD
status: READY
owner_persona: epic_planner
created_at: '2026-06-05'
updated_at: '2026-06-07'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-069-daily-event-tracker
tags:
  - feature
  - gen2
  - daily-events
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# PRD: Gen 2 Daily and Weekly Event Tracker

## Context
Generation 2 introduced a Real Time Clock (RTC) and numerous time-gated mechanics. Because the game relies entirely on the player remembering these days and times, it creates significant friction for players trying to optimize their playthrough or complete their Pokédex.

## Scope
Leverage DexHelper's deep save file parsing to track event flags, combined with the user's system clock, to build a dynamic "Daily/Weekly Event Checklist".

### Key Features
- Dynamic Daily Agenda: Present a checklist of events available today.
- Smart Filtering: Filter events based on Pokédex completion.
- State Validation: Check event flags to see if the player completed the daily event.
- Future Forecasting: Allow players to see upcoming events.

## Acceptance Criteria
- [ ] Epic Planner: Break down the "Event Flag Parsing" into Epics.
- [ ] Epic Planner: Break down the "Dynamic Checklist UI" into Epics.
- [ ] Epic Planner: Break down the "Smart Filtering & Forecasting" into Epics.
