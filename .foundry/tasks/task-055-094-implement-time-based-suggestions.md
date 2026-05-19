---
id: task-055-094-implement-time-based-suggestions
type: TASK
title: Implement Time-Based Suggestions
status: COMPLETED
owner_persona: coder
created_at: '2026-05-17'
updated_at: '2026-05-18'
depends_on:
  - .foundry/tasks/task-054-092-implement-gen2-strategy-plugin.md
jules_session_id: null
pr_number: null
parent: .foundry/stories/story-029-055-time-based-suggestions.md
tags:
  - gen2
  - expansion
  - suggestion-engine
research_references:
  - .foundry/docs/knowledge_base/development/gen2_implementation_plan.md
rejection_count: 1
rejection_reason: 'Session terminated with state: FAILED'
notes: ''
---

# Implement Time-Based Suggestions

## Description
Implement time-based filtering and warnings in the suggestion engine specifically for Gen 2 mechanics. This will leverage the Gen 2 strategy plugin to filter encounters based on Morning/Day/Night cycles and display relevant warnings when an encounter is restricted by time of day.

## Technical Blueprint

1. **Extend `src/engine/assistant/strategies/gen2Strategy.ts`**
   - Add logic to evaluate if an encounter is available at the current time of day. Since RTC extraction from the save file is skipped per the implementation plan, the assistant should ideally use the system clock or let the user know about the time requirements. Wait, the implementation plan says "Assistant will simply state the time/day requirements to the user, allowing them to wait for the appropriate period instead of restricting suggestions based on emulator-specific RTC metadata."
   - Therefore, the implementation should NOT filter out encounters, but rather attach "Time of Day" warnings to the suggestion (e.g. "Only available in the Morning").
   - Define a mechanism in the suggestion engine to pass these warnings to the UI.

2. **Update Suggestion Engine Types and Engine**
   - If not already present, add a `warnings` or `timeRequirement` field to the `Suggestion` object interface in the suggestion engine.
   - Update `gen2Strategy.ts` to populate this field when generating suggestions for encounters that have time of day restrictions.

3. **Context References**
   - Read `.foundry/docs/knowledge_base/development/gen2_implementation_plan.md` (Phase 4).

## Acceptance Criteria
- [x] Gen 2 strategy plugin is updated to include time-based requirements in suggestions.
- [x] Encounters are NOT strictly filtered out (so the user knows they exist), but are flagged with time-of-day requirements (Morning/Day/Night).
- [x] UI warning mechanism is supported in the suggestion model.
- [x] Tests verify time-based suggestion logic.

### Implementation Steps Completed
- [x] Gen 2 strategy plugin is updated to include time-based requirements in suggestions.
- [x] Encounters are NOT strictly filtered out (so the user knows they exist), but are flagged with time-of-day requirements (Morning/Day/Night).
- [x] UI warning mechanism is supported in the suggestion model.
- [x] Tests verify time-based suggestion logic.
