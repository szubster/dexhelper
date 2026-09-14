---
id: story-553-563-thief-covet-engine-logic
type: STORY
title: Engine Logic for Thief/Covet Move Analysis
status: PENDING
owner_persona: tech_lead
created_at: '2026-09-12'
updated_at: '2026-09-12'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-521-553-thief-covet-team-optimizer
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

# Story: Engine Logic for Thief/Covet Move Analysis

## Context
As part of the Thief/Covet Team Optimizer epic, we need the core engine logic to scan through the player's saved state (both Party and PC Box Pokemon) and identify those that know item-stealing moves like "Thief" (Gen 2/3) or "Covet" (Gen 3).

## Requirements
- Create utility functions in the engine to traverse Party and PC Pokemon.
- Check the movesets of these Pokemon for specific move IDs corresponding to Thief and Covet.
- Return a structured list of these optimal hunting Pokemon.

## Acceptance Criteria
- [ ] tech_lead: Break down this Story into Tasks.
