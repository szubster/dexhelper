---
id: epic-053-106-egg-hatch-parsing
type: EPIC
title: Egg Hatch Tracker Data Extraction Engine
status: FAILED
owner_persona: story_owner
created_at: '2026-06-22'
updated_at: '2026-08-17'
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
rejection_reason: 'Merged with unfulfilled acceptance criteria: Missing E2E/integration story'
notes: ''
---

# Epic: Egg Hatch Tracker Data Extraction Engine

## Context
As defined in `prd-083-053-daycare-egg-tracker.md`, the vague in-game text prompts for Egg hatching are a massive pain point. This epic handles the raw data extraction to calculate exact numerical step counts.

## Objective
Implement offline save parsing to calculate exact steps remaining for Eggs.

## Scope
- Identify Eggs currently residing in the player's Party or PC.
- Parse the remaining friendship/egg cycles byte for each Egg.
- Multiply the parsed byte by the generation-specific cycle length to calculate exact numerical step count remaining.

## Acceptance Criteria
- [x] Break down into Stories.
- [x] .foundry/archive/stories/story-106-158-gen2-egg-hatch-parsing.md
- [x] .foundry/stories/story-106-159-gen3-egg-hatch-parsing.md
