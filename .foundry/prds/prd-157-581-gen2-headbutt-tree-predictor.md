---
id: prd-157-581-gen2-headbutt-tree-predictor
type: PRD
title: Gen 2 Headbutt Tree Predictor
status: READY
owner_persona: epic_planner
created_at: '2026-09-15T20:19:40Z'
updated_at: '2026-09-15T20:19:40Z'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-157-gen2-headbutt-tree-predictor
tags:
  - dexhelper
  - feature
  - gen2
  - tracker
research_references:
  - research-157-505-gen2-headbutt-math
rejection_count: 0
rejection_reason: ''
notes: ''
locks: []
---

# PRD: Gen 2 Headbutt Tree Predictor

## 1. Product Overview
This feature provides a dynamic overlay on the Johto map in DexHelper to reveal which Headbutt trees are "Rare", "Good", or "Bad" for the specific player, based on their Trainer ID (TID) and the game's hidden mathematics. This allows players to accurately hunt for specific encounters like Heracross without wasting time on trees that will never yield them.

## 2. Dependencies & Constraints
- Requires extracting the 16-bit Trainer ID from Gen 2 save files.
- The algorithm for calculating the encounter group is detailed in `.foundry/docs/knowledge_base/engine/gen2-headbutt-math.md`.

## 3. Core Features
1. **TID Extraction:** Parse the user's Gen 2 `.sav` to get their Trainer ID.
2. **Tree Score Calculation Engine:** A utility to calculate `(CoordScore - OTIDScore + 10) % 10` for any given X, Y map coordinate.
3. **Interactive Map Integration:** Render Headbutt trees on the map UI, color-coding them (e.g., Green = Rare, Yellow = Good, Gray = Bad) based on the calculated score.

## Acceptance Criteria
- [ ] Epic Planner: Break down this PRD into specific EPIC nodes.
