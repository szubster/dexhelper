---
id: task-560-568-tm-hm-compatibility-logic
type: TASK
title: Implement TM/HM Compatibility Matching Logic
status: READY
owner_persona: coder
created_at: '2025-02-14'
updated_at: '2025-02-14'
depends_on: []
jules_session_id: null
locks: []
pr_number: null
parent: story-402-560-tm-hm-compatibility-matching
priority: 50
tags:
  - feature
  - logic
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Implement TM/HM Compatibility Matching Logic

## Overview
Implement the core logic layer for checking if Pokémon currently in the player's Party and PC Boxes can learn a selected TM/HM move.

## Requirements
- Create a function/module that accepts a TM/HM item and a list of Pokémon entities.
- Look up the corresponding move for the given TM/HM.
- Cross-reference the move against each Pokémon's valid learnset to determine compatibility.
- Return a filtered list of Pokémon capable of learning the move.

## Acceptance Criteria
- [ ] Implement the compatibility matching function/module as described.
