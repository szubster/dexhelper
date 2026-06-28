---
id: epic-053-105-daycare-save-parsing
type: EPIC
title: Daycare Core Data Extraction Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-06-22'
updated_at: '2026-06-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-083-053-daycare-egg-tracker
tags:
  - gen2
  - gen3
  - breeding
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Daycare Core Data Extraction Engine

## Context
As defined in `prd-083-053-daycare-egg-tracker.md`, players need a programmatic way to extract Daycare state without manually visiting the NPC in-game. This epic focuses purely on the engine/parsing layer.

## Objective
Implement offline save parsing to extract real-time Daycare data.

## Scope
- Extract the currently deposited Pokémon (species, nickname, level).
- Calculate accumulated EXP/level gains while in the Daycare.
- Surface the hidden "Egg is waiting" memory flag.

## Acceptance Criteria
- [ ] Break down into Stories.