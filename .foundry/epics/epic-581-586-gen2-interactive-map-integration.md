---
id: epic-581-586-gen2-interactive-map-integration
type: EPIC
title: Gen 2 Interactive Map Integration
status: PENDING
owner_persona: story_owner
created_at: '2026-10-16T17:53:10.106Z'
updated_at: '2026-10-16'
depends_on:
  - epic-581-585-gen2-tree-score-engine
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
  - map-ui
research_references: []
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Epic: Gen 2 Interactive Map Integration

## Objective
Render Headbutt trees on the Johto map UI with color-coding to reflect their calculated score for the current player's TID.

## Scope
- Update the Map UI to overlay Headbutt tree locations.
- Integrate the Tree Score Calculation Engine to determine tree status (Green = Rare, Yellow = Good, Gray = Bad).
- Connect the UI to the live save data context to dynamically update colors when a new Gen 2 save is loaded.

## Acceptance Criteria
- [ ] Story Owner: Break down this Epic into implementation stories and ensure a final E2E verification story is included.
