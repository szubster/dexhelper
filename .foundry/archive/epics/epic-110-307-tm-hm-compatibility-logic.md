---
id: epic-110-307-tm-hm-compatibility-logic
type: EPIC
title: TM/HM Compatibility Engine
status: CANCELLED
owner_persona: story_owner
created_at: '2026-07-12'
updated_at: '2026-08-01'
depends_on:
  - epic-110-306-tm-hm-save-parsing
jules_session_id: null
pr_number: null
parent: prd-105-110-tm-hm-inventory-planner
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: >-
  Cancelled due to permanent failure of dependency:
  epic-110-306-tm-hm-save-parsing
notes: ''
---

# TM/HM Compatibility Engine

## Overview
As part of the Gen 1-3 TM/HM Inventory & Compatibility Planner, this Epic focuses on the Compatibility Engine (Logic Layer) requirement. It will determine which of the player's Pokémon can learn specific TMs and identify strategic gaps in their movesets.

## Requirements
- For a selected TM/HM, cross-reference the corresponding move against the learnsets of all Pokémon currently in the player's Party and PC Boxes.
- Filter and identify which Pokémon can learn the move.
- Further refine by identifying Pokémon that can learn the move but do not currently have a move of that type, highlighting strategic gaps.

## Acceptance Criteria
- [ ] Break down into STORY nodes for compatibility matching and strategic gap identification.
