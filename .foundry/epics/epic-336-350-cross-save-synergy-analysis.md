---
id: epic-336-350-cross-save-synergy-analysis
type: EPIC
title: Cross-Save Synergy Analysis Engine
status: READY
owner_persona: story_owner
created_at: '2026-08-04'
updated_at: '2026-08-20'
depends_on:
  - epic-336-349-multi-save-infrastructure
jules_session_id: null
pr_number: null
parent: prd-059-336-multi-save-trade-planner
tags:
  - backend
  - assistant
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Epic: Cross-Save Synergy Analysis Engine

## Context
Building on the multi-save infrastructure, this Epic introduces the assistant capabilities to evaluate multiple loaded save files and identify optimal trade opportunities across them.

## Requirements
- The Assistant must evaluate the loaded saves and identify optimal trade opportunities.
- It must account for game-exclusives and Pokédex completion progress in each save file.

## Acceptance Criteria
- [x] Story Owner: Break this Epic down into Stories.
- [x] Story Owner: Generate a final STORY dedicated exclusively to Integration and E2E Verification.

- [ ] story-350-440-synergy-evaluator-assistant-prompting
- [ ] story-350-441-game-exclusive-pokedex-analysis
- [ ] story-350-442-cross-save-synergy-e2e
