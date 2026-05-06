---
id: prd-006-017-gen2-expansion-phase-3-4
type: PRD
title: 'Gen 2 Expansion PRD: Phase 3 and 4'
status: "READY"
owner_persona: epic_planner
created_at: '2026-05-06'
updated_at: "2026-05-06"
depends_on: []
jules_session_id: null
pr_number: null
parent: .foundry/ideas/idea-006-gen2-expansion.md
tags:
  - gen2
  - expansion
  - map-graph
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 1
rejection_reason: ''
notes: ''
---

# Gen 2 Expansion PRD: Phase 3 and 4

## 1. Context and Problem Statement
Currently, the application supports parsing Gen 2 save files (Phase 1 & 2 in progress), but it lacks the logic for dual-region map traversal and generation-specific assistance logic. Phase 3 and Phase 4 focus on establishing the Johto/Kanto Map Graph Routing and injecting Gen 2 specific strategy into the Assistant's core.

## 2. Objective
Formalize the implementation scope for Phase 3 (Johto/Kanto Map Graph Routing) and Phase 4 (Strategy & Suggestion Engine Adaptations) to provide the engineering team with clear deliverables.

## 3. Requirements

### Phase 3: Johto/Kanto Map Graph Routing
- **Gen 2 Map Graph**: Create a comprehensive map graph for Johto and Kanto.
- **Indoor to Outdoor Resolution**: Implement `resolveOutdoorMapId` mapping Johto and Kanto indoor locations to their outdoor hubs.
- **Cross-Region Distance**: Implement `getDistanceToMap` algorithms adapted for Gen 2 transition points (e.g., Magnet Train, S.S. Aqua, and Route 27).

### Phase 4: Strategy & Suggestion Engine Adaptations
- **Gen 2 Strategy Plugin**: Create a Gen 2 specific strategy conforming to `AssistantStrategy`.
- **Time-Based Suggestions**: Implement filtering or warning for encounters based on Morning/Day/Night cycles using RTC state.
- **Breeding Suggestions**: Detect compatible parents in PC/Party and suggest breeding for missing baby evolutions.
- **Interaction Logic**: Handle Headbutt and Rock Smash encounters cross-referenced with player inventory.
- **Roamer Tracking**: Guide the player to checking the Pokédex or tracking roamers if Raikou, Entei, or Suicune are missing.
- **Stat-Based Evolutions**: Update evolution logic to handle stat-based evolutions like Tyrogue.

## 4. Next Steps
- [ ] **Architect**: Write ADRs for the Map Graph design and strategy engine adaptations.
