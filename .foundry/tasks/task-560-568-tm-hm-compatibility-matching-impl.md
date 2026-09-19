---
id: task-560-568-tm-hm-compatibility-matching-impl
type: TASK
title: Implement TM/HM Compatibility Matching Core Logic
status: FAILED
owner_persona: coder
created_at: '2025-02-14'
updated_at: '2026-09-19'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-402-560-tm-hm-compatibility-matching
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: >-
  [ACKNOWLEDGED] Autonomous No-Ask Policy Violation: Session entered
  AWAITING_USER_FEEDBACK
notes: ''
locks: []
priority: 50
---

# Implement TM/HM Compatibility Matching Core Logic

## Overview
Implement the core logic layer for checking if Pokémon currently in the player's Party and PC Boxes can learn a selected TM/HM move.

## Technical Context
- The logic should accept a TM/HM item (or its associated move ID) and a list of Pokémon entities.
- It must look up the move and check each Pokémon's valid learnset to determine if they can learn it.
- A filtered list of compatible Pokémon should be returned.

## Acceptance Criteria
- [ ] Implement `getCompatiblePokemonForTMHM` (or similar) in the compatibility engine module.
