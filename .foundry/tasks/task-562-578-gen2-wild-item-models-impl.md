---
id: task-562-578-gen2-wild-item-models-impl
type: TASK
title: Define Gen 2 Wild Encounter and Held Item Data Models
status: ACTIVE
owner_persona: coder
created_at: '${DATE}'
updated_at: '2026-09-17'
depends_on: []
jules_session_id: '7216377633753838550'
pr_number: null
parent: story-552-562-gen2-wild-item-parsing
tags:
  - gen2
  - dexhelper
  - typescript
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Define Gen 2 Wild Encounter and Held Item Data Models

## Context
We need to parse Gen 2 wild encounter data and determine drop probabilities for held items. This task focuses on defining the underlying data structures and models.

## Requirements
- Define data structures for Gen 2 wild encounters (locations, rates, times of day).
- Define models for held item drop rates for Gen 2 Pokémon.
- Ensure compliance with PokeData Property Naming Schema.
- Use MsgPack serialization conventions (`useRecords: true`) where applicable.

## Acceptance Criteria
- [x] Implement data models for Gen 2 wild encounters and held items.
