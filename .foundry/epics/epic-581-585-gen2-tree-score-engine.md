---
id: epic-581-585-gen2-tree-score-engine
type: EPIC
title: Gen 2 Tree Score Engine
status: PENDING
owner_persona: story_owner
created_at: '2026-10-16T17:53:10.106Z'
updated_at: '2026-10-16'
depends_on:
  - epic-581-584-gen2-tid-extraction
jules_session_id: null
locks: []
pr_number: null
parent: prd-157-581-gen2-headbutt-tree-predictor
priority: 50
confidence_score: null
tags:
  - dexhelper
  - feature
  - gen2
  - math
research_references:
  - .foundry/docs/knowledge_base/engine/gen2-headbutt-math.md
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Gen 2 Tree Score Engine

## Objective
Implement the Headbutt tree score calculation algorithm to determine if a specific tree is Rare, Good, or Bad based on player TID and coordinates.

## Scope
- Implement the `CoordScore` and `OTIDScore` calculations as outlined in the Gen 2 Headbutt math documentation.
- Provide a utility function to evaluate any given X, Y map coordinate against the player's extracted TID.

## Acceptance Criteria
- [ ] Story Owner: Break down this Epic into implementation stories and ensure a final E2E verification story is included.
