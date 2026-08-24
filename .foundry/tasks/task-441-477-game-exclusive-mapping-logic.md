---
id: task-441-477-game-exclusive-mapping-logic
type: TASK
title: Game Exclusive Mapping Logic
status: ACTIVE
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on: []
jules_session_id: '15330133947365505757'
pr_number: null
parent: story-350-441-game-exclusive-pokedex-analysis
tags:
  - backend
  - assistant
  - multi-save
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Task: Game Exclusive Mapping Logic

## Context
As part of the Cross-Save Synergy Analysis Engine, we need to map out game exclusives across loaded save files.

## Requirements
- Implement logic to extract and map game-exclusive Pokémon from loaded save files.
- The logic should use `SaveData.gameVersion` to query offline database/metadata to determine which Pokémon are exclusively available in that specific game version.

## Acceptance Criteria
- [x] Logic implemented to extract game exclusives based on `SaveData.gameVersion`.
- [x] Unit tests verify the accurate retrieval of game exclusives for different versions.
