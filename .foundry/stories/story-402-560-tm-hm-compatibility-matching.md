---
id: story-402-560-tm-hm-compatibility-matching
type: STORY
title: Compatibility Matching Logic
status: PENDING
owner_persona: tech_lead
created_at: '2025-02-14'
updated_at: '2026-09-22'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-110-402-tm-hm-compatibility-logic-v2
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Compatibility Matching Logic

## Overview
This STORY implements the core logic layer for checking if Pokémon currently in the player's Party and PC Boxes can learn a selected TM/HM move.

## Requirements
- Create a function/module that accepts a TM/HM item and a list of Pokémon entities.
- Look up the corresponding move for the given TM/HM.
- Cross-reference the move against each Pokémon's valid learnset to determine compatibility.
- Return a filtered list of Pokémon capable of learning the move.

## Acceptance Criteria
- [x] Break down into TASK nodes for implementing the matching logic and unit testing it.
- [x] task-560-568-tm-hm-compatibility-matching-impl
- [x] task-560-574-tm-hm-compatibility-matching-tests
- [x] task-560-569-tm-hm-compatibility-matching-qa
- [ ] research-560-608-investigate-tm-hm-compatibility-matching-failure
- [ ] task-560-609-tm-hm-compatibility-matching-impl-retry
- [ ] task-560-610-tm-hm-compatibility-matching-tests-retry
- [ ] task-560-611-tm-hm-compatibility-matching-qa-retry
