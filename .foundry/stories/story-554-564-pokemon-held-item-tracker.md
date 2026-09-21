---
id: story-554-564-pokemon-held-item-tracker
type: STORY
title: Pokemon Held Item Tracker
status: READY
owner_persona: tech_lead
created_at: '2026-08-15'
updated_at: '2026-09-19'
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
- [ ] task-564-602-pokemon-held-item-tracker-extraction
- [ ] task-564-603-pokemon-held-item-tracker-diff
- [ ] task-564-604-pokemon-held-item-tracker-qa
