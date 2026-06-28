---
id: epic-053-107-daycare-egg-tracker-ui
type: EPIC
title: Daycare & Egg Hatch Tracker UI
status: PENDING
owner_persona: story_owner
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on:
  - epic-053-105-daycare-save-parsing
  - epic-053-106-egg-hatch-parsing
jules_session_id: null
pr_number: null
parent: prd-083-053-daycare-egg-tracker
tags:
  - gen2
  - gen3
  - breeding
  - ui
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Daycare & Egg Hatch Tracker UI

## Context
As defined in `prd-083-053-daycare-egg-tracker.md`, the extracted Daycare and Egg Hatch data needs to be surfaced to the user in an actionable, real-time dashboard.

## Objective
Create the frontend UI dashboard for the Daycare and Egg mechanics.

## Scope
- Create a Daycare Status Dashboard component to display deposited Pokémon, EXP gains, and the "Egg is waiting" flag.
- Create an Exact Egg Tracker component for Eggs in the Party/PC, displaying the exact numerical step count remaining.
- Ensure components align with the tactical hardware aesthetic (ADR 008, 024).

## Acceptance Criteria
- [ ] Break down into Stories.