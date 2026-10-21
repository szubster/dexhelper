---
id: epic-581-584-gen2-tid-extraction
type: EPIC
title: Gen 2 TID Extraction
status: READY
owner_persona: story_owner
created_at: '2026-10-16T17:53:10.106Z'
updated_at: '2026-10-21'
depends_on: []
jules_session_id: null
pr_number: null
parent: prd-157-581-gen2-headbutt-tree-predictor
tags:
  - dexhelper
  - feature
  - gen2
  - save-engine
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
priority: 50
---

# Epic: Gen 2 TID Extraction

## Objective
Extract the 16-bit Trainer ID from Generation 2 save files to enable player-specific Headbutt tree calculations.

## Scope
- Implement parser extensions for Gen 2 save files to accurately extract the `wPlayerID`.
- Ensure extraction logic matches Gen 2 save block structures.

## Acceptance Criteria
- [x] Story Owner: Break down this Epic into implementation stories and ensure a final E2E verification story is included.
- [ ] story-584-711-gen2-tid-extraction-core
- [ ] story-584-712-gen2-tid-extraction-e2e
