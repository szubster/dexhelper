---
id: epic-110-402-tm-hm-compatibility-logic-v2
type: EPIC
title: TM/HM Compatibility Engine V2
status: PENDING
owner_persona: story_owner
created_at: '2026-08-05'
updated_at: '2026-08-05'
depends_on:
  - epic-110-401-tm-hm-save-parsing-v2
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - feature
  - logic
research_references: []
notes: ''
---

# TM/HM Compatibility Engine V2

## Overview
This Epic focuses on the Compatibility Engine (Logic Layer) to determine which of the player's Pokémon can learn specific TMs and identify strategic gaps in their movesets.

## Requirements
- For a selected TM/HM, cross-reference the corresponding move against the learnsets of all Pokémon currently in the player's Party and PC Boxes.
- Filter and identify which Pokémon can learn the move.
- Further refine by identifying Pokémon that can learn the move but do not currently have a move of that type, highlighting strategic gaps.

## Acceptance Criteria
- [ ] Break down into STORY nodes for compatibility matching and strategic gap identification.
- [ ] Generate a final STORY dedicated exclusively to Integration and E2E Verification.
