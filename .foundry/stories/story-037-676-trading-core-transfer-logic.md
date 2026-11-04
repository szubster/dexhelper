---
id: story-037-676-trading-core-transfer-logic
type: STORY
title: Core Transfer Logic
status: READY
owner_persona: tech_lead
created_at: '2026-10-13'
updated_at: '2026-10-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: epic-031-037-inter-save-trading
tags:
  - backend
  - trading
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# Story: Core Transfer Logic

## Context
As part of the Inter-Save Trading Epic, this story focuses on implementing the fundamental mechanism to transfer a Pokémon data structure from one save file to another.

## Requirements
- Create core backend functions for moving a Pokémon entity between two separate game saves.
- Ensure attributes such as Original Trainer (OT), IDs, and caught data are maintained appropriately based on generation logic.
- Ensure the underlying game save blobs are correctly updated.

## Acceptance Criteria
- [x] Tech Lead: Break down into tasks.
- [ ] task-676-740-trading-core-transfer-types
- [ ] task-676-741-trading-core-transfer-impl
- [ ] task-676-742-trading-core-transfer-tests
- [ ] task-676-743-trading-core-transfer-qa
