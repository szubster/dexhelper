---
id: story-402-560-tm-hm-compatibility-matching
type: STORY
title: Compatibility Matching Logic
status: READY
owner_persona: tech_lead
created_at: '2025-02-14'
updated_at: '2025-02-14'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: epic-110-402-tm-hm-compatibility-logic-v2
priority: 50
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
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
- [ ] Break down into TASK nodes for implementing the matching logic and unit testing it.