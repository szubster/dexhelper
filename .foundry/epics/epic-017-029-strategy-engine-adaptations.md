---
id: epic-017-029-strategy-engine-adaptations
type: EPIC
title: "Phase 4: Strategy & Suggestion Engine Adaptations"
status: PENDING
owner_persona: story_owner
created_at: "2026-05-06"
updated_at: "2026-05-06"
depends_on:
  - .foundry/epics/epic-017-028-map-graph-routing.md
jules_session_id: null
pr_number: null
parent: .foundry/prds/prd-006-017-gen2-expansion-phase-3-4.md
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ""
notes: ""
---

# Phase 4: Strategy & Suggestion Engine Adaptations

## Objective
Inject Gen 2 specific strategy into the Assistant's core to handle new mechanics such as time-based events, breeding, and new interaction methods.

## Requirements
- **Gen 2 Strategy Plugin**: Create a Gen 2 specific strategy conforming to `AssistantStrategy`.
- **Time-Based Suggestions**: Implement filtering or warning for encounters based on Morning/Day/Night cycles using RTC state.
- **Breeding Suggestions**: Detect compatible parents in PC/Party and suggest breeding for missing baby evolutions.
- **Interaction Logic**: Handle Headbutt and Rock Smash encounters cross-referenced with player inventory.
- **Roamer Tracking**: Guide the player to checking the Pokédex or tracking roamers if Raikou, Entei, or Suicune are missing.
- **Stat-Based Evolutions**: Update evolution logic to handle stat-based evolutions like Tyrogue.

## Acceptance Criteria
- [ ] Gen 2 Strategy Plugin is created and linked.
- [ ] Suggestion engine handles time-based (RTC) availability.
- [ ] Suggestion engine detects breeding opportunities for baby Pokémon.
- [ ] Suggestion engine accounts for Headbutt and Rock Smash interactions.
- [ ] Roamer tracking logic guides the player appropriately.
- [ ] Evolution logic accurately processes stat-based evolutions.
