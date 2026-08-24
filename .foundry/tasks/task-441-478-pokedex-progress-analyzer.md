---
id: task-441-478-pokedex-progress-analyzer
type: TASK
title: Pokédex Progress Analyzer
status: READY
owner_persona: coder
created_at: '2026-08-24'
updated_at: '2026-08-24'
depends_on:
  - task-441-477-game-exclusive-mapping-logic
jules_session_id: null
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

# Task: Pokédex Progress Analyzer

## Context
As part of the Cross-Save Synergy Analysis Engine, we need to analyze Pokédex progress across multiple save files to highlight missing entries.

## Requirements
- Implement logic to cross-reference the `seen` and `owned` Pokédex sets of two or more `SaveData` objects.
- Determine missing entries in Save A that are owned in Save B (and vice-versa).
- Return a structured representation of the gaps and overlaps in Pokédex completion between the provided saves.

## Acceptance Criteria
- [ ] Logic implemented to calculate missing vs owned Pokédex entries between multiple save files.
- [ ] Unit tests verify correct diffing of `seen`/`owned` sets.
