---
id: story-554-564-pokemon-held-item-tracker
type: STORY
title: Pokemon Held Item Tracker
status: COMPLETED
owner_persona: tech_lead
created_at: '2026-08-15'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-521-554-hunting-progress-tracker
tags:
  - dexhelper
  - gen2
  - gen3
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Pokemon Held Item Tracker

## Context
To help players track progress during a hunt, we need to scan Party Pokemon and PC Box Pokemon for newly acquired target held items.

## Requirements
- Parse the save state to read the held items of Pokemon in the Party and PC Boxes.
- Identify newly acquired target held items compared to the previous save state.

## Acceptance Criteria
- [x] Break down this Story into Tasks.
- [x] task-564-602-pokemon-held-item-tracker-extraction
- [x] task-564-603-pokemon-held-item-tracker-diff
- [x] task-564-604-pokemon-held-item-tracker-qa
- [x] research-564-719-investigate-held-item-extraction-failure
- [x] task-564-720-held-item-extraction-retry
- [x] task-564-721-held-item-tracker-qa-retry
