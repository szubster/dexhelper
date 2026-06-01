---
id: task-054-092-implement-gen2-strategy-plugin
type: TASK
title: Implement Gen 2 Strategy Plugin
status: COMPLETED
owner_persona: coder
created_at: '2026-05-17'
updated_at: '2026-05-17'
depends_on: []
jules_session_id: null
pr_number: null
parent: story-029-054-gen2-strategy-plugin
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 0
rejection_reason: ''
notes: ''
---

# Implement Gen 2 Strategy Plugin

## Description
Implement the Gen 2 strategy plugin (`gen2Strategy.ts`) conforming to the `AssistantStrategy` interface. This plugin handles Gen 2 specific suggestions including time-based and breeding mechanics, as well as headbutt/rock smash encounters and roamers. This will serve as the core of Gen 2 Assistant suggestions, connecting the previously extracted Gen 2 save data mechanics.

## Technical Blueprint

1. **Create `src/engine/assistant/strategies/gen2Strategy.ts`**
   - The class must implement the `AssistantStrategy` interface.
   - It should be linked in `strategies/index.ts`.

2. **Integration with Suggestion Engine**
   - The strategy must adapt or extend `suggestionEngine.ts` to implement Gen 2 specific mechanics as defined in the `Gen 2 Complete Implementation Plan`:
     - **Time-Based Suggestions:** Filter or warn about encounters only available at specific times of day, utilizing the Real-Time Clock requirements.
     - **Breeding Suggestions:** If compatible parents are in the PC/Party, suggest placing them in the Daycare for missing baby evolutions (e.g., Pichu, Cleffa).
     - **Headbutt / Rock Smash:** Cross-reference encounters utilizing `ENCOUNTER_METHOD.HEADBUTT` or `ROCK_SMASH` against the player's extracted TM/HM/Badge inventory.
     - **Roamer tracking:** Guide the player to check the Pokédex or tracking roamers if Entei, Raikou, or Suicune are missing.
     - **Stat-Based Evolutions:** Handle dynamic UI message suggestions for Tyrogue's stat requirements (Atk > Def, Atk < Def, Atk = Def).

## Context References
Make sure to read `.foundry/docs/knowledge_base/development/gen2_implementation_plan.md` for specific mechanics and expected behaviors.

## Acceptance Criteria
- [x] `src/engine/assistant/strategies/gen2Strategy.ts` is created and implements `AssistantStrategy`.
- [x] Gen 2 strategy is linked in `strategies/index.ts`.
- [x] Time-based suggestions are integrated.
- [x] Breeding suggestions are integrated.
- [x] Headbutt / Rock Smash inventory checks are integrated.
- [x] Roamer tracking guidance is integrated.
- [x] Stat-based evolutions (Tyrogue) logic is integrated.
- [x] Unit tests are provided or updated to cover the new Gen 2 specific logic and they pass.
