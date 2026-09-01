---
id: research-157-505-gen2-headbutt-math
type: RESEARCH
title: Investigate Gen 2 Headbutt Tree Math & Coordinates
status: READY
owner_persona: researcher
created_at: '2026-08-31'
updated_at: '2026-08-31'
depends_on: []
jules_session_id: null
pr_number: null
parent: idea-157-gen2-headbutt-tree-predictor
tags:
  - dexhelper
  - gen2
  - tracker
research_references: []
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Research: Gen 2 Headbutt Tree Math & Coordinates

## Context & Problem Statement
The "Gen 2 Headbutt Tree Predictor" feature aims to dynamically color-code Headbutt trees on the interactive map UI based on the player's Trainer ID (TID) to show exactly which ones will yield Pokémon for the specific player, and which encounter table (e.g., standard vs. rare) that tree belongs to.
However, the exact math involving the TID and the internal X/Y coordinates of the trees to determine the encounter table group is currently unknown. This information is a critical dependency for drafting the PRD and moving forward with the implementation.

## Research Objectives
1. **Determine the Algorithm**: Investigate and document the exact mathematical algorithm used in Generation 2 games (Gold, Silver, Crystal) that calculates a tree's encounter group based on the player's Trainer ID (TID) and the tree's X/Y coordinates.
2. **Identify Coordinate Mapping**: Document how the internal map X/Y coordinates map to the specific trees in the Johto region.

## Next Steps / Acceptance Criteria
- [ ] Investigate the mathematical algorithm for Gen 2 Headbutt trees and document the logic.
- [ ] Determine how to map internal X/Y coordinates to tree locations.
- [ ] Document the findings in a new file in the knowledge base (e.g., `.foundry/docs/knowledge_base/engine/gen2-headbutt-math.md`).
- [ ] Complete the research node.
